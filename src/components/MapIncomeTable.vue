<template>
  <div id="map-income-table-component">
    <vue-good-table
      ref="vgt"
      :columns="columns"
      :rows="itemsDiffIncome"
      :pagination-options="paginationOptions"
      :sort-options="sortOptions"
      style-class="vgt-table striped"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'typeLine'" class="flex flex-row items-center">
          <img :src="cleanIconURL(props.row.icon)" class="h-6 mr-1" />
          <span class="mr-2">{{ props.row.typeLine }}</span>
          <span class="text-vue-500">x{{ props.row.stackSize ? props.row.stackSize : 1 }}</span>
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

      <template slot="pagination-bottom" slot-scope="props">
        <div class="flex flex-row px-3 py-1 rounded">
          <div class="flex flex-row items-center w-1/2">
            <p class="ml-2 text-gray-300">
              Total
            </p>
          </div>

          <div class="flex flex-row items-center justify-end w-1/4">
            <p class="text-gray-300">
              {{ totalItemsDiffIncome.chaos }}
            </p>
          </div>

          <div class="flex flex-row items-center justify-end w-1/4">
            <p class="text-gray-300">
              {{ totalItemsDiffIncome.exalt }}
            </p>
          </div>
        </div>

        <div class="flex flex-row justify-between mt-2">
          <div class="flex">
            <p class="mr-4">
              Items per page
            </p>

            <select
              id="pagination-select"
              v-model="itemsPerPage"
              class="rounded text-gray-300 bg-discord-900 outline-none"
              @change="paginationPerPageChanged(props.perPageChanged, props.pageChanged)"
            >
              <option
                v-for="(perPage, index) in paginationOptions.perPageDropdown"
                :key="'pagination-option-' + index"
                :value="perPage"
                class="text-gray-300 bg-discord-700"
              >
                {{ perPage }}
              </option>
            </select>
          </div>

          <div class="flex">
            <i
              class="material-icons flex items-center justify-center mr-2 rounded bg-discord-900 cursor-pointer"
              :class="{ 'text-discord-500': currentPage <= 1, 'cursor-not-allowed': currentPage <= 1 }"
              @click="paginationPageChanged(props.pageChanged, props.total, 'decrease')"
            >
              keyboard_arrow_left
            </i>

            <p class="mr-2">
              {{ currentPage }}
              /
              {{ pages }}
            </p>

            <i
              class="material-icons flex items-center justify-center rounded bg-discord-900 cursor-pointer"
              :class="{ 'text-discord-500': currentPage >= pages, 'cursor-not-allowed': currentPage >= pages }"
              @click="paginationPageChanged(props.pageChanged, props.total, 'increase')"
            >
              keyboard_arrow_right
            </i>
          </div>
        </div>
      </template>
    </vue-good-table>
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

  private paginationOptions = {
    enabled: true,
    perPage: 10,
    perPageDropdown: [10, 20, 40],
    dropdownAllowAll: false,
    rowsPerPageLabel: 'Items per page'
  };

  private sortOptions = {
    initialSortBy: {
      field: 'chaos',
      type: 'desc'
    }
  };

  private currentPage = 1;

  private itemsPerPage = 10;

  private pages = 1;

  public mounted(): void {
    this.recalculatePages();

    this.currentPage = this.pages <= 0 ? 0 : 1;
  }

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

  private paginationPerPageChanged(perPageChanged: (...args: any) => any, pageChanged: (...args: any) => any): void {
    this.currentPage = 1;

    this.recalculatePages();

    perPageChanged({ currentPerPage: this.itemsPerPage });

    this.paginationPageChanged(pageChanged);
  }

  private paginationPageChanged(
    pageChanged: (...args: any) => any,
    total?: number,
    type?: 'increase' | 'decrease'
  ): void {
    if (type === 'decrease') {
      this.currentPage = this.currentPage <= 1 ? 1 : this.currentPage - 1;
    }

    if (type === 'increase') {
      this.currentPage = this.currentPage >= this.pages ? this.currentPage : this.currentPage + 1;
    }

    pageChanged({ currentPage: this.currentPage });
  }

  private recalculatePages(): void {
    this.pages = Math.ceil(this.itemsDiffIncome.length / this.itemsPerPage);
  }
}
</script>
