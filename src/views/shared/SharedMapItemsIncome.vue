<template>
  <div id="shared-map-items-income-view" class="relative container mx-auto py-8">
    <back-button :label="'Back'" @on-click="goBack" />

    <h1 class="text-gray-300 text-center text-4xl mb-16 select-none">
      Map income report
    </h1>

    <map-details ref="mapDetails" :map="sharedMapHistory.map" :character="share.character" class="mb-4 opacity-0" />

    <div
      ref="mapIncomeTable"
      class="max-w-2xl mx-auto p-4 rounded text-discord-100 bg-discord-700 shadow-2xl select-none opacity-0"
    >
      <map-income-table :items-diff-income="sharedMapHistory.items" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import anime from 'animejs';

import { POEPricedStashItem, POEMapHistory } from '@/models/PathOfExile';
import { ShareState } from '@/store/share/share.state';
import MapIncomeTable from '@/components/tables/MapIncomeTable.vue';
import MapDetails from '@/components/MapDetails.vue';
import BackButton from '@/components/ui-components/BackButton.vue';

@Component({
  components: {
    MapIncomeTable,
    MapDetails,
    BackButton,
  },
})
export default class SharedMapItemsIncomeView extends Vue {
  private currentAnimation: anime.AnimeInstance | undefined;

  get mapParamIndex(): number {
    return parseInt(this.$route.params.id, 10);
  }

  get share(): ShareState {
    return this.$store.state.share;
  }

  get sharedMapHistory(): Readonly<POEMapHistory> {
    return this.share.mapsHistory[this.mapParamIndex];
  }

  public goBack() {
    this.$router.back();
  }

  public mounted(): void {
    this.animateAppearingComponents();
  }

  public beforeDestroy(): void {
    this.animateDiseappearingComponents();
  }

  /**
   * Animate appearing components, translateX from bottom to top with opacity
   * from 0 to 1.
   */
  private animateAppearingComponents() {
    const mapDetailsComp = this.$refs.mapDetails as Vue;
    const mapIncomeTableComp = this.$refs.mapIncomeTable as HTMLDivElement;

    const targets = [mapDetailsComp.$el, mapIncomeTableComp];

    const animation = anime({
      targets,
      easing: 'spring(2, 100, 100, 0)',
      delay: anime.stagger(250),
      translateY: -50,
      opacity: 1,
    });

    this.currentAnimation = animation;

    animation.play();
  }

  /**
   * Animate disappearing components, translate from top to bottom with opacity
   * from 1 to 0.
   */
  private animateDiseappearingComponents() {
    const mapDetailsComp = this.$refs.mapDetails as Vue;
    const mapIncomeTableComp = this.$refs.mapIncomeTable as HTMLDivElement;

    const targets = [mapDetailsComp.$el, mapIncomeTableComp];

    const animation = anime({
      targets,
      easing: 'spring(1, 100, 100, 0)',
      delay: anime.stagger(100),
      translateY: 0,
      opacity: 0,
    });

    this.currentAnimation = animation;

    animation.play();
  }
}
</script>
