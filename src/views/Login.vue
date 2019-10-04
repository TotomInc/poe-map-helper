<template>
  <div id="login-view" class="flex flex-col justify-center items-center h-full w-full">
    <div class="splash-screen z-0" />

    <div class="z-10 flex flex-col justify-center items-center">
      <h1 class="mb-4 text-white text-2xl">
        PoE Mapper Assistant
      </h1>

      <div class="mb-4 text-white">
        <p>
          This software needs your POESESSID in order to:
        </p>

        <ul class="list-disc mt-2 ml-10">
          <li>Retrieve and select your characters</li>
          <li>Retrieve your stash-tabs and their content</li>
        </ul>
      </div>

      <div class="flex">
        <v-input
          v-model="POESESSID"
          class="mr-2"
          type="text"
          placeholder="Set your POESESSID..."
          icon="lock"
          :disabled="user.loading"
        />

        <v-button :loading="user.loading" :disabled="user.loading" @click="login()">
          Login
        </v-button>
      </div>
    </div>

    <notifications group="LOGIN" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { UserState } from '@/store/user/user.state';
import { userActions } from '@/store/user/user.consts';
import Button from '@/components/ui-components/Button.vue';
import Input from '@/components/ui-components/Input.vue';

@Component({
  components: {
    VButton: Button,
    VInput: Input,
  },
})
export default class LoginView extends Vue {
  private POESESSID = '';

  get user(): UserState {
    return this.$store.state.user;
  }

  public mounted(): void {
    const localPOESESSID = localStorage.getItem('POESESSID');

    if (localPOESESSID) {
      this.POESESSID = localPOESESSID;
    }

    this.$store.subscribeAction({
      after: ({ type, payload }) => {
        if (type === userActions.COOKIE_LOGIN_SUCCESS) {
          this.$router.push('setup-character');
        } else if (type === userActions.COOKIE_LOGIN_FAILED) {
          this.$notify({
            group: 'LOGIN',
            title: 'Unable to login',
            text: 'Invalid or expired POESESSID, try to generate a new one.',
            type: 'error',
          });
        }
      },
    });
  }

  public login(): void {
    localStorage.setItem('POESESSID', this.POESESSID);

    this.$store.dispatch(userActions.COOKIE_LOGIN, this.POESESSID);
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
