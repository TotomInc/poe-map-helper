<template>
  <div id="setup-stash-view" class="flex flex-col justify-center items-center h-full w-full text-white">
    <div v-if="stash.loading">
      <h1 class="text-xl text-white">
        Retrieving your stash-tabs for
        <span class="text-vue-500">{{ poeSelectedCharacter.league }}</span>
        league...
      </h1>
    </div>

    <div v-else-if="rate.loading">
      <h1 class="text-xl text-white">
        Loading rates for
        <span class="text-vue-500">{{ poeSelectedCharacter.league }}</span>
        league...
      </h1>
    </div>

    <div v-else-if="!stash.loading && !rate.loading" class="flex flex-col items-center justify-center">
      <p class="text-center mb-4">
        Choose the stash-tab you want to use, to track your income per map:
      </p>

      <div class="flex mb-4">
        <vue-select v-model="selectedTab" placeholder="Select a stash-tab..." icon-left="vpn_key" class="w-48 mr-2">
          <vue-select-button
            v-for="(tab, index) in stash.stashTabs"
            :key="'stash-tab-option-' + index"
            :value="tab.id"
            :label="`${tab.n} (${tab.type ? tab.type : 'UnkownStashType'})`"
          />
        </vue-select>

        <vue-button class="primary" :disabled="!selectedTab" @click="finishSetup()">
          Finish setup
        </vue-button>
      </div>
    </div>

    <notifications group="STASH" position="bottom right" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { POECharacter } from '@/models/PathOfExile';
import { StashState } from '@/store/stash/stash.state';
import { stashActions, stashMutations } from '@/store/stash/stash.consts';
import { RateState } from '@/store/rate/rate.state';
import { rateActions } from '@/store/rate/rate.consts';
import { userGetters } from '@/store/user/user.consts';

@Component({})
export default class SetupView extends Vue {
  private selectedTab = '';

  get rate(): RateState {
    return this.$store.state.rate;
  }

  get stash(): StashState {
    return this.$store.state.stash;
  }

  get poeSelectedCharacter(): POECharacter | undefined {
    return this.$store.getters[userGetters.poeSelectedCharacter];
  }

  public mounted(): void {
    this.$store.dispatch(stashActions.GET_STASH_TABS);

    this.$store.subscribeAction(({ type, payload }) => {
      if (type === stashActions.GET_STASH_TABS_FAILED) {
        this.$notify({
          group: 'STASH',
          title: 'Unable to load stash-tabs',
          text: 'Unable to load stash-tabs from your PoE account, is the PoE API down? Try to restart the app.',
          type: 'error'
        });
      } else if (type === rateActions.LOAD_CURRENCIES_RATE_SUCCESS) {
        this.$router.push('/');
      } else if (type === rateActions.LOAD_CURRENCIES_RATE_FAILED) {
        this.$notify({
          group: 'STASH',
          title: 'Unable to load rates',
          text: 'Unable to load rates from poe.watch, is the API down? Try to restart the app.',
          type: 'error'
        });
      }
    });
  }

  public finishSetup(): void {
    this.$store.commit(stashMutations.selectStashTab, this.selectedTab);

    this.$store.dispatch(rateActions.LOAD_CURRENCIES_RATE);
  }
}
</script>
