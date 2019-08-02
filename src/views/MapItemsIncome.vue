<template>
  <div id="maps-items-income-view" class="relative container mx-auto py-8">
    <div
      class="back-home absolute inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 cursor-pointer"
      @click="goBack()"
    >
      <i class="material-icons mr-2">
        arrow_back
      </i>

      <p>Back</p>
    </div>

    <h1 class="text-gray-300 text-center text-4xl mb-4 select-none">
      Map income report
    </h1>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class mapItemsIncomeView extends Vue {
  get mapIndex(): string | undefined {
    return this.$route.params.id;
  }

  public goBack() {
    this.$router.back();
  }
}
</script>

<style scoped>
.back-home {
  top: 42px;
}
</style>
