<template>
  <div
    id="button-component"
    class="hover:bg-discord-300 flex items-center justify-center px-3 py-1 min-w-16 rounded text-white text-base bg-discord-500 cursor-pointer select-none"
    :class="{ 'cursor-not-allowed': ghost, 'opacity-50': ghost }"
    @click.capture="handleClick"
  >
    <slot v-if="!loading" />

    <div v-else>
      <half-circle-spinner :animation-duration="3000" :size="20" color="#42b983" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { HalfCircleSpinner } from 'epic-spinners';

@Component({
  components: {
    HalfCircleSpinner,
  },
})
export default class ButtonComponent extends Vue {
  @Prop({
    type: Boolean,
    required: false,
  })
  readonly loading!: boolean | undefined;

  @Prop({
    type: Boolean,
    required: false,
  })
  readonly disabled!: boolean | undefined;

  /**
   * The button is considered as ghosted if it's loading or disabled.
   */
  get ghost(): boolean {
    return !!this.disabled || !!this.loading;
  }

  /**
   * Handle the click on the button. If button is not ghosted, emit `click`
   * event to the parent component, otherwise ignore and stop propagation.
   *
   * @param event `MouseEvent` that triggered the click
   */
  public handleClick(event: MouseEvent) {
    if (!this.ghost) {
      this.$emit('click', event);
    } else {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }
}
</script>
