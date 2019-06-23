<template>
  <div id="app" class="w-screen h-screen bg-dark-discord">
    <transition name="fade" mode="out-in" :duration="300">
      <router-view />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {}
</script>

<style lang="postcss">
@import '../node_modules/@vue/ui/dist/vue-ui.css';

@import 'assets/styles/tailwind.postcss';
@import 'assets/styles/vue-ui.postcss';

@import 'assets/css/fonts.css';
@import 'assets/css/transitions.css';
</style>
