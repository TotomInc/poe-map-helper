<template>
  <div id="map-income-table-component">
    <vue-good-table
      ref="vgt"
      :columns="columns"
      :rows="itemsDiffIncome"
      :pagination-options="{
        enabled: true,
        perPage: 10,
        perPageDropdown: [10, 20, 40],
        dropdownAllowAll: false,
        rowsPerPageLabel: 'Items per page'
      }"
      :sort-options="{
        initialSortBy: {
          field: 'chaos',
          type: 'desc'
        }
      }"
      style-class="vgt-table striped"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'typeLine'" class="flex flex-row items-center">
          <img :src="cleanIconURL(props.row.icon)" class="h-6 mr-1" />
          <span>{{ props.row.typeLine }}</span>
        </span>

        <span v-if="props.column.field == 'chaos'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.chaos }}</span>
          <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="w-6 h-6" />
        </span>

        <span v-if="props.column.field == 'exalt'" class="flex flex-row items-center float-right">
          <span class="mr-2">{{ props.row.exalt }}</span>
          <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="w-6 h-6" />
        </span>
      </template>
    </vue-good-table>

    <div class="flex flex-row px-2 py-1 rounded">
      <div class="flex flex-row items-center w-1/2">
        <p>Total:</p>
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ totalItemsDiffIncome.chaos }}</p>
        <img :src="require('@/assets/images/orbs/chaos-orb.png')" class="h-6 ml-1" />
      </div>

      <div class="flex flex-row items-center justify-end w-1/4">
        <p>{{ totalItemsDiffIncome.exalt }}</p>
        <img :src="require('@/assets/images/orbs/exalted-orb.png')" class="h-6 ml-1" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { POEPricedStashItem } from '@/models/PathOfExile';
import { POEWatchCurrency } from '@/models/POEWatch';
import { RateState } from '@/store/rate/rate.state';

@Component({})
export default class MapIncomeTableComponent extends Vue {
  @Prop() readonly itemsDiffIncome!: POEPricedStashItem[];

  private columns = [
    {
      label: 'Item name',
      field: 'typeLine',
      sortable: false
    },
    {
      label: 'Chaos income',
      field: 'chaos',
      type: 'decimal'
    },
    {
      label: 'Exalt income',
      field: 'exalt',
      type: 'decimal'
    }
  ];

  get rate(): RateState {
    return this.$store.state.rate;
  }

  get totalItemsDiffIncome(): { chaos: number; exalt: number } {
    let chaos = 0;
    let exalt = 0;

    this.itemsDiffIncome.forEach((item) => {
      chaos += item.chaos;
      exalt += item.exalt;
    });

    chaos = Math.round(chaos * 100) / 100;
    exalt = Math.round(exalt * 1000) / 1000;

    return { chaos, exalt };
  }

  private cleanIconURL(iconURL: string): string {
    const url = new URL(iconURL);

    url.search = '';

    return url.href;
  }
}
</script>
