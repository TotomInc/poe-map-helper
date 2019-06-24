<template>
  <div id="home-view" class="container mx-auto py-8">
    <h1 class="text-gray-300 text-center text-4xl mb-4">
      PoE Mapper Assistant
    </h1>

    <character-overview />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import CharacterOverview from '@/components/CharacterOverview.vue';

@Component({
  components: {
    CharacterOverview
  }
})
export default class HomeView extends Vue {}
</script>
