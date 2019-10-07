<template>
  <div id="browser-view" class="flex flex-col justify-center items-center h-full w-full">
    <splash-screen />

    <h1 class="text-white text-2xl mb-4">
      PoE Mapper Assistant is not available for browsers
    </h1>

    <p class="text-white text-base mb-2">
      Due to PoE's API limitations, this application is not available for browsers.
    </p>

    <p class="text-white text-base mb-2">
      As soon as PoE's OAuth API is out, the application will be also available as a web-app, directly in your browser.
    </p>

    <p class="text-white text-base">
      Please, download the application
      <span class="underline text-vue-500 cursor-pointer" @click="openDownloadLink">here</span>.
    </p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SplashScreen from '@/components/SplashScreen.vue';

@Component({
  components: {
    SplashScreen,
  },
})
export default class BrowserView extends Vue {
  public openDownloadLink(): void {
    window.open('https://github.com/TotomInc/poe-map-helper/releases', '_blank');
  }
}
</script>
