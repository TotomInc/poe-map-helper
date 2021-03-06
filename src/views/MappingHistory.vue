<template>
  <div id="mapping-history-view" class="relative container mx-auto py-8">
    <back-button :label="'Home'" @on-click="goToHome" />

    <div
      class="share-button absolute inline-flex text-gray-300 py-1 px-3 mr-4 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
      :class="{
        'cursor-not-allowed': share.loading,
        'opacity-50': share.loading,
      }"
      @click="createShareableLink"
    >
      <i class="material-icons flex items-center mr-2">
        share
      </i>

      <p>Share</p>
    </div>

    <router-link
      tag="div"
      to="/shared/mapping-history"
      class="import-button absolute inline-flex text-gray-300 py-1 px-3 mr-4 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
    >
      <i class="material-icons flex items-center mr-2">
        cloud_download
      </i>

      <p>Import</p>
    </router-link>

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Mapping history
    </h1>

    <p class="mb-16 text-center text-discord-100 select-none">
      Click on a row for a list of detailed income items.
    </p>

    <mapping-history-table
      ref="mappingHistoryTable"
      class="opacity-0"
      :maps-history="map.mapsHistory"
      :character="selectedPoeCharacter"
      @on-row-click="onRowClick"
    />

    <div
      ref="mostRecentMaps"
      class="max-w mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none opacity-0"
    >
      <h2 class="mb-2 text-gray-300 text-xl text-center">
        Income of your 50 most recent maps
      </h2>

      <p v-if="map.mapsHistory.length < 2" class="text-center">
        No data. Run some maps (at least 2)!
      </p>

      <line-chart
        v-if="map.mapsHistory.length >= 2"
        :height="150"
        :colors="['#3daa79']"
        :labels="chartLabels"
        :datasets="chartDatasets"
      />

      <div v-if="map.mapsHistory.length >= 2" class="flex items-center justify-center">
        <div class="w-8 h-4 rounded mr-2 bg-green-500" />

        <p class="text-base">
          Chaos income
        </p>
      </div>
    </div>

    <notifications group="MAPPING-HISTORY" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';
import * as Anime from 'animejs';
import axios from 'axios';
import isElectron from 'is-electron';

import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import { mapMutations, mapGetters } from '@/store/map/map.consts';
import { MapState } from '@/store/map/map.state';
import { userGetters } from '@/store/user/user.consts';
import { shareActions } from '@/store/share/share.consts';
import { ShareState } from '@/store/share/share.state';
import { POEMapItem, POEMapHistoryDate, POEMapHistory, POECharacter } from '@/models/PathOfExile';
import LineChart from '@/components/charts/LineChart.vue';
import BackButton from '@/components/ui-components/BackButton.vue';
import MappingHistoryTable from '@/components/tables/MappingHistoryTable.vue';

const anime = Anime.default;

@Component({
  components: {
    LineChart,
    BackButton,
    MappingHistoryTable,
  },
})
export default class MappingHistoryView extends Mixins(POEMapIconURLMixin) {
  get map(): MapState {
    return this.$store.state.map;
  }

  get share(): ShareState {
    return this.$store.state.share;
  }

  get rows(): POEMapHistoryDate[] {
    return this.$store.getters[mapGetters.mapsHistoryDate];
  }

  get selectedPoeCharacter(): POECharacter {
    return this.$store.getters[userGetters.poeSelectedCharacter];
  }

  /**
   * Charts labels, return only the 50 most recent maps.
   */
  get chartLabels(): string[] {
    const mapsHistoryDataset: POEMapHistory[] = JSON.parse(JSON.stringify(this.map.mapsHistory));

    return mapsHistoryDataset.slice(0, 50).map((mapHistory, i) => `#${i + 1}`);
  }

  /**
   * Generate dataset of maps-history, return only the 50 most recent maps.
   */
  get chartDatasets() {
    const mapsHistoryDataset: POEMapHistory[] = JSON.parse(JSON.stringify(this.map.mapsHistory));

    return [
      {
        values: mapsHistoryDataset.slice(0, 50).map((mapHistory) => mapHistory.income.chaos),
      },
    ];
  }

  public onRowClick(params: any) {
    const { originalIndex } = params.row;

    this.$router.push(`/map-income/${originalIndex}`);
  }

  public goToHome() {
    this.$router.push('/');
  }

  /**
   * Stringify the map-history and push it to a JSONBin, once created copy the
   * JSONBin ID to the clipboard.
   */
  public createShareableLink() {
    if (!this.share.loading) {
      if (this.map.mapsHistory.length > 0) {
        const payload = JSON.stringify({
          character: this.selectedPoeCharacter,
          maps: this.map.mapsHistory,
        });

        this.$store.dispatch(shareActions.CREATE_SHARE, payload);
      } else {
        this.$notify({
          group: 'MAPPING-HISTORY',
          title: 'Share mapping-history',
          text: "You can't create an empty mapping-history share",
          type: 'error',
        });
      }
    }
  }

  public mounted(): void {
    this.animateAppearingComponents();

    this.$store.subscribeAction({
      after: ({ type, payload }) => {
        if (type === shareActions.CREATE_SHARE_SUCCESS) {
          const binID: string = payload;

          this.copyToClipboard(binID);

          this.$notify({
            group: 'MAPPING-HISTORY',
            title: 'Share mapping-history',
            text: `Mapping-history successfully shared with ID: ${binID} (copied to your clipboard)`,
          });
        }
      },
    });
  }

  public beforeDestroy(): void {
    this.animateDiseappearingComponents();
  }

  /**
   * Copy to the clipboard the JSONBin ID if in an electron environment.
   *
   * @param binID ID of the JSONBin to copy to clipboard
   */
  private copyToClipboard(binID: string) {
    if (isElectron()) {
      import('electron').then((electron) => {
        electron.clipboard.writeText(binID);
      });
    }
  }

  /**
   * Animate appearing components, translateX from bottom to top with opacity
   * from 0 to 1.
   */
  private animateAppearingComponents() {
    const mappingHistoryTableComp = this.$refs.mappingHistoryTable as Vue;
    const mostRecentMaps = this.$refs.mostRecentMaps as HTMLDivElement;

    const targets = [mappingHistoryTableComp.$el, mostRecentMaps];

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
    const mappingHistoryTableComp = this.$refs.mappingHistoryTable as Vue;
    const mostRecentMaps = this.$refs.mostRecentMaps as HTMLDivElement;

    const targets = [mappingHistoryTableComp.$el, mostRecentMaps];

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

<style scoped>
.share-button,
.import-button {
  transition: all 0.2s ease-in-out;
}

.share-button {
  top: 42px;
  right: 16px;
}

.import-button {
  top: 42px;
  right: 116px;
}
</style>
