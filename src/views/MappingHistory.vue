<template>
  <div id="mapping-history-view" class="relative container mx-auto py-8">
    <div
      class="back-home absolute inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 cursor-pointer"
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

    <vue-good-table
      class="max-w-2xl mx-auto"
      :columns="columns"
      :rows="rows"
      :pagination-options="{
        enabled: true,
        perPage: 10,
        perPageDropdown: [5, 10, 20],
        dropdownAllowAll: false,
        rowsPerPageLabel: 'Maps per page'
      }"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'map.name'" class="flex flex-row items-center">
          <img :src="getMapIconURL(props.row.map)" class="w-8 h-8 mr-2" />
          <span>{{ props.row.map.name }}</span>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins } from 'vue-property-decorator';

import POEMapIconURLMixin from '@/mixins/POEMapIconURL';
import { MapState } from '@/store/map/map.state';
import { POEMapItem } from '@/models/PathOfExile';
import { rawMapsImageURL } from '../consts/zones';

@Component({})
export default class MappingHistoryView extends Mixins(POEMapIconURLMixin) {
  private columns = [
    {
      label: 'Map',
      field: 'map.name',
      sortable: false
    },
    {
      label: 'Chaos',
      field: 'income.chaos',
      type: 'decimal'
    },
    {
      label: 'Exalt',
      field: 'income.exalt',
      type: 'decimal'
    }
  ];

  get map(): MapState {
    return this.$store.state.map;
  }

  get rows() {
    return this.map.mapsHistory;
  }

  public onRowClick(params: any) {
    const { originalIndex } = params.row;

    this.$router.push(`/map-income/${originalIndex}`);
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
