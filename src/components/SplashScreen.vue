<template>
  <div id="splash-screen-component" class="h-full w-full z-0 pointer-events-none">
    <div class="splash-screen z-0" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class SplashScreenComponent extends Vue {}
</script>

<style>
#splash-screen-component {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.splash-screen {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.1;
  background-image: url('../assets/images/splashes/blight.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
