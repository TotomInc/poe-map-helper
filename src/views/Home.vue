<template>
  <div id="home-view" class="container mx-auto py-8">
    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      PoE Mapper Assistant
    </h1>

    <character-overview class="mb-4" :character="poeSelectedCharacter" :can-switch-character="true" />

    <mapping-status class="mb-4" />

    <latest-map-income class="mb-4" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { POECharacter } from '@/models/PathOfExile';
import { StashState } from '@/store/stash/stash.state';
import { stashActions } from '@/store/stash/stash.consts';
import { userGetters } from '@/store/user/user.consts';
import CharacterOverview from '@/components/CharacterOverview.vue';
import MappingStatus from '@/components/MappingStatus.vue';
import LatestMapIncome from '@/components/LatestMapIncome.vue';

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
    this.$store.dispatch(stashActions.GET_STASH_ITEMS);

    if (!this.stash.initialLoad) {
      this.$store.dispatch(stashActions.GET_STASH_ITEMS);
    }
  }
}
</script>
