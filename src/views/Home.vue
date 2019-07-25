<template>
  <div id="home-view" class="container mx-auto py-8">
    <h1 class="text-gray-300 text-center text-4xl mb-4">
      PoE Mapper Assistant
    </h1>

    <character-overview class="mb-4" />

    <map-status class="mb-4" />

    <latest-map-income class="mb-4" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import CharacterOverview from '@/components/CharacterOverview.vue';
import MapStatus from '@/components/MapStatus.vue';
import LatestMapIncome from '@/components/LatestMapIncome.vue';
import { StashState } from '@/store/stash/stash.state';
import { stashActions } from '@/store/stash/stash.consts';

@Component({
  components: {
    CharacterOverview,
    MapStatus,
    LatestMapIncome
  }
})
export default class HomeView extends Vue {
  get stash(): StashState {
    return this.$store.state.stash;
  }

  public mounted(): void {
    this.$store.dispatch(stashActions.GET_STASH_ITEMS);
  }
}
</script>
