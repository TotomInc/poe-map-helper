<template>
  <div id="setup-character-view" class="flex flex-col justify-center items-center h-full w-full text-white">
    <div v-if="user.loading">
      <h1 class="text-xl text-white">
        Retrieving your account characters...
      </h1>
    </div>

    <div v-else-if="!user.loading" class="flex flex-col justify-center items-center">
      <p class="text-center mb-4">
        Choose the character you want to play with:
      </p>

      <div class="mb-4">
        <v-select
          v-model="selectedCharacter"
          label="name"
          placeholder="Select your character..."
          :options="user.characters"
          :reduce="(character) => character.name"
        >
          <template slot="option" slot-scope="option">
            {{ option.name }}
            <span class="text-xs text-discord-100">({{ option.league }})</span>
          </template>
        </v-select>
      </div>

      <div>
        <p class="mb-4">
          Select your Client.txt log-file on your Path of Exile directory:
        </p>

        <div class="flex flex-row justify-between">
          <input id="file" ref="file-input" type="file" accept=".txt" class="hidden" @change="onFileSelected" />

          <label for="file">
            <v-button>
              Select Client.txt
            </v-button>
          </label>

          <v-button
            :loading="user.loading"
            :disabled="!poeSelectedCharacter || !logfilePath || user.loading"
            @click="finishSetupCharacter"
          >
            Finish setup
          </v-button>
        </div>
      </div>
    </div>

    <notifications group="CHARACTER" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { POECharacter } from '@/models/PathOfExile';
import { UserState } from '@/store/user/user.state';
import { userActions, userMutations } from '@/store/user/user.consts';
import Button from '@/components/ui-components/Button.vue';

@Component({
  components: {
    VButton: Button,
  },
})
export default class SetupCharacterView extends Vue {
  private selectedCharacter = '';

  private logfilePath = '';

  get user(): UserState {
    return this.$store.state.user;
  }

  // get charactersOptions() {
  //   return this.user.characters.map((character) => ({

  //   }));
  // }

  get poeSelectedCharacter(): POECharacter | undefined {
    return this.user.characters.find((char) => char.name === this.selectedCharacter);
  }

  public mounted(): void {
    this.$store.dispatch(userActions.LOAD_CHARACTERS);

    this.$store.subscribeAction(({ type, payload }) => {
      if (type === userActions.LOAD_CHARACTERS_FAILED) {
        this.$notify({
          group: 'CHARACTER',
          title: 'Unable to load characters',
          text: 'Unable to load characters from your PoE account, please restart the app.',
          type: 'error',
        });
      }
    });
  }

  /**
   * Set the selected character and the logfile path in the store, then go to
   * the `setup-stash` view.
   */
  public finishSetupCharacter(): void {
    const payload = {
      selectedCharacter: this.selectedCharacter,
      logfilePath: this.logfilePath,
    };

    this.$store.dispatch(userActions.FINISH_SETUP, payload);

    this.$router.push('/setup-stash');
  }

  /**
   * Triggered when a file have been selected in the `file-input` element.
   * Make sure there is at least 1 file selected and it must have the
   * `Client.txt` name, otherwise, throw notification errors.
   */
  public onFileSelected(): void {
    const fileInputEl = this.$refs['file-input'] as HTMLInputElement;
    const { files } = fileInputEl;

    if (files) {
      const file = files.item(0);

      if (file && file.name === 'Client.txt') {
        this.logfilePath = file.path;
      } else {
        this.logfilePath = '';

        this.$notify({
          group: 'CHARACTER',
          title: 'No Client.txt file selected or invalid file',
          text: 'Make sure you selected the Client.txt file in your Path of Exile game directory.',
          type: 'error',
        });
      }
    } else {
      this.logfilePath = '';

      this.$notify({
        group: 'CHARACTER',
        title: 'No Client.txt file selected',
        text: 'You need to select the Client.txt file in your Path of Exile game directory.',
        type: 'error',
      });
    }
  }
}
</script>
