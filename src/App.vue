<template>
  <div id="app" class="overflow-x-hidden w-screen h-screen font-display bg-discord-900">
    <control-bar />

    <div id="router-wrapper" class="z-0 h-full w-full">
      <transition name="fade" mode="out-in" :duration="300">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import ControlBar from '@/components/ControlBar.vue';

@Component({
  components: {
    ControlBar
  }
})
export default class App extends Vue {}
</script>

<style lang="postcss">
@import 'assets/css/fonts.css';
@import 'assets/css/transitions.css';

@import 'assets/styles/tailwind.postcss';
@import 'assets/styles/vue-good-table.postcss';
@import 'assets/styles/vue-select.postcss';
@import 'assets/styles/scrollbar.postcss';
</style>
