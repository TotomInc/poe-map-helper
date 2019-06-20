<template>
  <div id="login-view" class="flex flex-col justify-center items-center h-full w-full font-display">
    <div class="splash-screen" />

    <h1 class="mb-4 text-white text-2xl">
      PoE Mapper Assistant
    </h1>

    <div class="mb-4 text-white">
      <p>
        This software needs your POESESSID in order to:
      </p>

      <ul class="list-disc mt-2 ml-10">
        <li>Retrieve and select your characters</li>
        <li>Check the state of your player inventory</li>
      </ul>
    </div>

    <div class="flex">
      <vue-input v-model="poesessid" icon-left="lock" placeholder="Your POESESSID" class="w-1/3 mr-2" />

      <vue-button class="primary" :loading="loading" :disabled="loading" @click="login()">
        Login
      </vue-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class LoginView extends Vue {
  private poesessid = '';

  private loading = false;

  public login(): void {
    this.loading = true;
  }
}
</script>

<style>
.splash-screen {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.1;
  background-image: url('../assets/images/legion-splash.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
