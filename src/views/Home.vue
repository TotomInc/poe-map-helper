<template>
  <div id="home-view" class="container mx-auto py-8">
    <h1 class="text-gray-300 text-center text-4xl mb-16 select-none">
      PoE Mapper Assistant
    </h1>

    <character-overview
      ref="characterOverview"
      class="mb-4 opacity-0"
      :character="poeSelectedCharacter"
      :can-switch-character="true"
    />

    <mapping-status ref="mappingStatus" class="mb-4 opacity-0" />

    <latest-map-income ref="latestMapIncome" class="mb-4 opacity-0" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import * as Anime from 'animejs';

import { POECharacter } from '@/models/PathOfExile';
import { StashState } from '@/store/stash/stash.state';
import { stashActions } from '@/store/stash/stash.consts';
import { userGetters } from '@/store/user/user.consts';
import CharacterOverview from '@/components/CharacterOverview.vue';
import MappingStatus from '@/components/MappingStatus.vue';
import LatestMapIncome from '@/components/LatestMapIncome.vue';

const anime = Anime.default;

@Component({
  components: {
    CharacterOverview,
    MappingStatus,
    LatestMapIncome,
  },
})
export default class HomeView extends Vue {
  get stash(): StashState {
    return this.$store.state.stash;
  }

  get poeSelectedCharacter(): POECharacter | undefined {
    return this.$store.getters[userGetters.poeSelectedCharacter];
  }

  /**
   * Make sure to only load stash-items if we haven't already loaded them.
   */
  public mounted(): void {
    this.animateAppearingComponents();

    this.$store.dispatch(stashActions.GET_STASH_ITEMS);

    if (!this.stash.initialLoad) {
      this.$store.dispatch(stashActions.GET_STASH_ITEMS);
    }
  }

  public beforeDestroy(): void {
    this.animateDiseappearingComponents();
  }

  /**
   * Animate appearing components, translateX from bottom to top with opacity
   * from 0 to 1.
   */
  private animateAppearingComponents() {
    const characterOverviewComp = this.$refs.characterOverview as Vue;
    const mappingStatusComp = this.$refs.mappingStatus as Vue;
    const latestMapIncomeComp = this.$refs.latestMapIncome as Vue;

    const targets = [characterOverviewComp.$el, mappingStatusComp.$el, latestMapIncomeComp.$el];

    const animation = anime({
      targets,
      easing: 'spring(2, 100, 100, 0)',
      delay: anime.stagger(250),
      translateY: -50,
      opacity: 1,
    });

    animation.play();
  }

  /**
   * Animate disappearing components, translate from top to bottom with opacity
   * from 1 to 0.
   */
  private animateDiseappearingComponents() {
    const characterOverviewComp = this.$refs.characterOverview as Vue;
    const mappingStatusComp = this.$refs.mappingStatus as Vue;
    const latestMapIncomeComp = this.$refs.latestMapIncome as Vue;

    const targets = [characterOverviewComp.$el, mappingStatusComp.$el, latestMapIncomeComp.$el];

    const animation = anime({
      targets,
      easing: 'spring(1, 100, 100, 0)',
      delay: anime.stagger(100),
      translateY: 0,
      opacity: 0,
    });

    animation.play();
  }
}
</script>
