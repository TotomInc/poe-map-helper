<template>
  <div id="mapping-history-table-component">
    <vue-good-table
      class="max-w shadow-2xl mb-4"
      :columns="columns"
      :rows="rows"
      :pagination-options="paginationOptions"
      style-class="vgt-table striped"
      @on-row-click="$emit('on-row-click', $event)"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'map.name'" class="flex flex-row items-center">
          <img :src="getMapIconURL(props.row.map, character.league)" class="w-8 h-8 mr-3" />
          <span>{{ props.row.map.name }}</span>
        </span>

        <span v-if="props.column.field == 'income.chaos'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.income.chaos }}</span>
          <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="w-6 h-6" />
        </span>

        <span v-if="props.column.field == 'income.exalt'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.income.exalt }}</span>
          <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="w-6 h-6" />
        </span>

        <span v-if="props.column.field == 'duration'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ (props.row.duration * 1000) | date('mm:ss') }}</span>
        </span>

        <span v-if="props.column.field == 'endDate'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.endDate | date('DD-MM-YYYY') }}</span>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Mixins, Prop } from 'vue-property-decorator';

import { POECharacter, POEMapHistory, POEMapHistoryDate } from '@/models/PathOfExile';
import POEMapIconURLMixin from '@/mixins/POEMapIconURL';

@Component({})
export default class SharedMappingHistoryView extends Mixins(POEMapIconURLMixin) {
  @Prop()
  readonly mapsHistory!: POEMapHistory;

  @Prop()
  readonly character!: POECharacter;

  private columns = [
    {
      label: 'Map',
      field: 'map.name',
      sortable: false,
    },
    {
      label: 'Chaos income',
      field: 'income.chaos',
      type: 'decimal',
    },
    {
      label: 'Exalt income',
      field: 'income.exalt',
      type: 'decimal',
    },
    {
      label: 'Run duration',
      field: 'duration',
      type: 'number',
    },
    {
      label: 'Run date',
      field: 'endDate',
      type: 'date',
      dateInputFormat: 'DD-MM-YYYY HH:mm:ss',
      dateOutputFormat: 'DD-MM-YYYY',
      sortable: false,
    },
  ];

  private paginationOptions = {
    enabled: true,
    perPage: 10,
    perPageDropdown: [10, 20, 40],
    dropdownAllowAll: false,
    rowsPerPageLabel: 'Maps per page',
  };

  get rows(): any {
    return this.mapsHistoryWithDateFormatted;
  }

  get mapsHistoryWithDateFormatted(): POEMapHistoryDate[] {
    const mapsHistoryCopy: POEMapHistory[] = JSON.parse(JSON.stringify(this.mapsHistory));

    return mapsHistoryCopy.map((map) => {
      const mapHistoryDate: POEMapHistoryDate = {
        ...map,
        startDate: new Date(map.startTime),
        endDate: new Date(map.endTime),
        duration: Math.ceil((map.endTime - map.startTime) / 1000),
      };

      return mapHistoryDate;
    });
  }
}
</script>
