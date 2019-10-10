<template>
  <div id="shared-mapping-history-view" class="relative container mx-auto py-8">
    <back-button v-if="user.logged" :label="'Home'" @on-click="goToHome" />

    <div class="share-container absolute">
      <div
        v-if="map.mapsHistoryShared.length <= 0"
        class="share-button inline-flex text-gray-300 py-1 px-3 mr-4 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
      >
        <i class="material-icons flex items-center mr-2">
          share
        </i>

        <p>Share</p>
      </div>

      <div
        v-if="map.mapsHistoryShared.length <= 0"
        class="import-button inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
      >
        <i class="material-icons flex items-center mr-2">
          edit
        </i>

        <p>Import</p>
      </div>

      <div
        v-if="map.mapsHistoryShared.length > 0"
        class="remove-import-button inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
      >
        <i class="material-icons flex items-center mr-2">
          trash
        </i>

        <p>Remove</p>
      </div>
    </div>

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Shared mapping history
    </h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';

import { UserState } from '@/store/user/user.state';
import { MapState } from '@/store/map/map.state';
import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import BackButton from '@/components/ui-components/BackButton.vue';

@Component({
  components: {
    BackButton,
  },
})
export default class MappingHistoryView extends Mixins(POEMapIconURLMixin) {
  get user(): UserState {
    return this.$store.state.user;
  }

  get map(): MapState {
    return this.$store.state.map;
  }

  public goToHome() {
    if (this.user.logged) {
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.share-container {
  top: 42px;
  right: 16px;
}

.share-button,
.import-button,
.remove-import-button {
  transition: all 0.2s ease-in-out;
}
</style>
