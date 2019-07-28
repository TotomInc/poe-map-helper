<template>
  <div id="setup-character-view" class="flex flex-col justify-center items-center h-full w-full text-white">
    <div v-if="user.loading">
      <h1 class="text-xl text-white">
        Retrieving your account characters...
      </h1>
    </div>

    <div v-if="rate.loading">
      <h1 class="text-xl text-white">
        Loading items rates for
        <span class="text-vue-500">{{ poeSelectedCharacter.league }}</span>
        league...
      </h1>
    </div>

    <div v-if="!user.loading && !rate.loading" class="flex flex-col justify-center items-center">
      <p class="text-center mb-4">
        Choose the character you want to play with:
      </p>

      <div class="mb-4">
        <vue-select
          v-model="selectedCharacter"
          placeholder="Select your character..."
          icon-left="perm_identity"
          class="w-64 mr-2"
        >
          <vue-select-button
            v-for="(character, index) in user.characters"
            :key="'character-option-' + index"
            :value="character.name"
            :label="character.name"
          />
        </vue-select>
      </div>

      <div>
        <p class="mb-4">
          Select your Client.txt log-file on your Path of Exile directory:
        </p>

        <div class="flex flex-row justify-between">
          <input id="file" ref="file-input" type="file" accept=".txt" class="hidden" @change="onFileSelected" />

          <label
            for="file"
            class="flex items-center px-3 py-1 rounded text-sm cursor-pointer bg-vue-500 focus:bg-vue-700 hover:bg-vue-300"
          >
            Select Client.txt
          </label>

          <vue-button
            class="primary"
            :loading="user.loading"
            :disabled="!poeSelectedCharacter || !logfilePath"
            @click="finishSetupCharacter()"
          >
            Finish setup
          </vue-button>
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
import { RateState } from '@/store/rate/rate.state';
import { rateActions } from '@/store/rate/rate.consts';

@Component({})
export default class SetupCharacterView extends Vue {
  private selectedCharacter = '';

  private logfilePath = '';

  get user(): UserState {
    return this.$store.state.user;
  }

  get rate(): RateState {
    return this.$store.state.rate;
  }

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
          type: 'error'
        });
      } else if (type === rateActions.LOAD_CURRENCIES_RATE_SUCCESS) {
        this.$router.push('/');
      } else if (type === rateActions.LOAD_CURRENCIES_RATE_FAILED) {
        this.$notify({
          group: 'CHARACTER',
          title: 'Unable to load currency rates',
          text: 'Unable to load currency rates from poe.watch, is the API down? Try to restart the app.',
          type: 'error'
        });
      }
    });
  }

  /**
   * Set the selected character and the logfile path in the store, make sure to
   * load rates before accessing the Home view.
   */
  public finishSetupCharacter(): void {
    const payload = {
      selectedCharacter: this.selectedCharacter,
      logfilePath: this.logfilePath
    };

    this.$store.dispatch(userActions.FINISH_SETUP, payload);
    this.$store.dispatch(rateActions.LOAD_CURRENCIES_RATE);
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
          type: 'error'
        });
      }
    } else {
      this.logfilePath = '';

      this.$notify({
        group: 'CHARACTER',
        title: 'No Client.txt file selected',
        text: 'You need to select the Client.txt file in your Path of Exile game directory.',
        type: 'error'
      });
    }
  }
}
</script>
