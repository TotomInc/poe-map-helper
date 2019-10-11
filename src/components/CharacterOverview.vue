<template>
  <div
    id="character-overview-component"
    class="max-w-2xl mx-auto rounded text-discord-100 bg-discord-700 shadow-2xl select-none"
  >
    <div v-if="!user.loading && character" class="flex flex-row">
      <div>
        <img
          :src="require(`@/assets/images/ascendencies/${character.class.toLowerCase()}.png`)"
          alt="Ascendency image"
          class="rounded-l-sm"
        />
      </div>

      <div class="relative flex flex-col justify-center flex-grow px-4 py-2">
        <div
          v-if="canSwitchCharacter"
          class="change-character absolute w-6 h-6 rounded-full bg-discord-500 cursor-pointer"
          @click="changeCharacter()"
        >
          <i class="material-icons flex items-center justify-center text-xl w-6 h-6">
            refresh
          </i>
        </div>

        <h1 class="text-3xl text-gray-300">
          {{ character.name }}

          <small class="text-xl bg-discord-500 rounded-full px-2 py-1 text-gray text-discord-100">
            {{ character.league }}
          </small>
        </h1>

        <p class="text-xl">
          Level

          <span class="text-vue-500">
            {{ character.level }}
          </span>

          <small>({{ character.experience }} / {{ experienceRequired }} exp.)</small>
        </p>

        <div class="w-full h-2 bg-discord-300 rounded">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { POECharacter } from '@/models/PathOfExile';
import { UserState } from '@/store/user/user.state';
import { userActions, userMutations } from '@/store/user/user.consts';
import { experiencePerLevel } from '@/utils/experience-per-level';

@Component({})
export default class CharacterOverviewComponent extends Vue {
  @Prop()
  readonly character!: POECharacter;

  @Prop({
    type: Boolean,
    default: true,
  })
  readonly canSwitchCharacter!: boolean;

  private experienceRequired = 0;

  private experiencePercentage = 0;

  private lastLevelExperienceRequired = 0;

  get user(): UserState {
    return this.$store.state.user;
  }

  public mounted(): void {
    this.$store.subscribeAction({
      after: ({ type, payload }) => {
        if (type === userActions.LOAD_CHARACTERS_SUCCESS) {
          this.updateRequiredExperience();
        }
      },
    });

    this.updateRequiredExperience();
  }

  public changeCharacter(): void {
    this.$store.commit(userMutations.removeSelectedCharacter);
    this.$router.push('setup-character');
  }

  private updateRequiredExperience(): void {
    if (this.character) {
      this.experienceRequired = experiencePerLevel[this.character.level];
      this.lastLevelExperienceRequired = experiencePerLevel[this.character.level - 1];
    }
  }

  private calculateExperienceBarWidth(): string {
    let width = '0%';

    if (this.character) {
      const { experience } = this.character;

      // eslint-disable-next-line
      const widthPercentage = ((this.character.experience - this.lastLevelExperienceRequired) / (this.experienceRequired - this.lastLevelExperienceRequired)) * 100;

      this.experiencePercentage = widthPercentage;
      width = `${widthPercentage}%`;
    }

    return width;
  }
}
</script>

<style scoped>
.change-character {
  top: 8px;
  right: 8px;
}
</style>
