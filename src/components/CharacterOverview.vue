<template>
  <transition name="smooth" appear>
    <div
      id="character-overview-component"
      class="max-w-2xl mx-auto rounded font-display text-discord-100 bg-discord-700 shadow-2xl select-none"
    >
      <div v-if="!user.loading && poeCharacter" class="flex flex-row">
        <div>
          <img
            :src="require(`@/assets/images/ascendencies/${poeCharacter.class.toLowerCase()}.png`)"
            alt="Ascendency image"
            class="rounded-l-sm"
          />
        </div>

        <div class="flex flex-col justify-center flex-grow px-4 py-2">
          <h1 class="text-3xl">
            {{ poeCharacter.name }}

            <small class="text-xl bg-discord-500 rounded-full px-2 py-1">
              {{ poeCharacter.league }}
            </small>
          </h1>

          <p class="text-xl">
            Level

            <span class="text-vue-500">
              {{ poeCharacter.level }}
            </span>

            <small>({{ poeCharacter.experience }} / XXX exp.)</small>
          </p>

          <div class="w-full h-1 bg-discord-300 rounded">
            <div class="h-full w-0 max-w-full rounded bg-vue-500" :style="{ width: calculateExperienceBarWidth() }" />
          </div>
        </div>
      </div>

      <div v-else class="p-4">
        <h1 class="text-2xl text-center">
          Refreshing character data...
        </h1>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { POECharacter } from '@/models/PathOfExileAPI';
import { UserState } from '@/store/user/user.state';
import { userActions } from '@/store/user/user.actions';
import { experiencePerLevel } from '@/utils/experience-per-level';

@Component({})
export default class CharacterOverviewComponent extends Vue {
  private experienceRequired = 0;

  private experiencePercentage = 0;

  get user(): UserState {
    return this.$store.state.user;
  }

  get poeCharacter(): POECharacter | undefined {
    if (this.user.selectedCharacter) {
      return this.user.characters.find((char) => char.name === this.user.selectedCharacter);
    }

    return undefined;
  }

  public mounted(): void {
    this.$store.subscribeAction({
      after: ({ type, payload }) => {
        if (type === userActions.LOAD_CHARACTERS_SUCCESS) {
          this.updateRequiredExperience();
        }
      }
    });

    this.updateRequiredExperience();
  }

  private updateRequiredExperience(): void {
    if (this.poeCharacter) {
      this.experienceRequired = experiencePerLevel[this.poeCharacter.level];
    }
  }

  private calculateExperienceBarWidth(): string {
    let width = '0%';

    if (this.poeCharacter) {
      const widthPercentage = Math.floor((this.poeCharacter.experience / this.experienceRequired) * 100);

      this.experiencePercentage = widthPercentage;
      width = `${widthPercentage}%`;
    }

    return width;
  }
}
</script>
