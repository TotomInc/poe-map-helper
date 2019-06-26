<template>
  <div id="login-view" class="flex flex-col justify-center items-center h-full w-full">
    <div class="splash-screen" />

    <h1 class="mb-4 text-white text-2xl">
      PoE Mapper Assistant
    </h1>

    <div v-if="league.loading">
      <p class="text-lg text-gray-300">
        Loading leagues, this should not take too long...
      </p>
    </div>

    <div v-else>
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
        <vue-input
          v-model="POESESSID"
          icon-left="lock"
          placeholder="Your POESESSID"
          class="w-1/3 mr-2"
          :disabled="user.loading"
        />

        <vue-button class="primary" :loading="user.loading" :disabled="user.loading" @click="login()">
          Login
        </vue-button>
      </div>
    </div>

    <notifications group="LOGIN" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { UserState } from '@/store/user/user.state';
import { userActions } from '@/store/user/user.actions';
import { leagueActions } from '@/store/league/league.actions';
import { LeagueState } from '@/store/league/league.state';

@Component({})
export default class LoginView extends Vue {
  private POESESSID = '';

  get user(): UserState {
    return this.$store.state.user;
  }

  get league(): LeagueState {
    return this.$store.state.league;
  }

  public mounted(): void {
    this.$store.dispatch(leagueActions.LOAD_LEAGUES);

    this.$store.subscribeAction({
      after: ({ type, payload }) => {
        if (type === userActions.COOKIE_LOGIN_SUCCESS) {
          this.$router.push('setup');
        } else if (type === userActions.COOKIE_LOGIN_FAILED) {
          this.$notify({
            group: 'LOGIN',
            title: 'Unable to login',
            text: 'Invalid or expired POESESSID, try to generate a new one.',
            type: 'error'
          });
        }
      }
    });
  }

  public login(): void {
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
