<template>
  <div id="mapping-history-view" class="relative container mx-auto py-8">
    <div
      class="back-home absolute inline-flex text-discord-100 py-1 px-3 rounded-full bg-discord-500 cursor-pointer"
      @click="goToHome()"
    >
      <i class="material-icons mr-2">
        arrow_back
      </i>

      <p>Home</p>
    </div>

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Mapping history
    </h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { MapState } from '@/store/map/map.state';

@Component({})
export default class MappingHistoryView extends Vue {
  get map(): MapState {
    return this.$store.state.map;
  }

  public goToHome() {
    this.$router.push('/');
  }
}
</script>

<style scoped>
.back-home {
  top: 42px;
}
</style>
