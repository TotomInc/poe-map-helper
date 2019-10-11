<template>
  <div id="input-component" class="inline-flex">
    <div v-if="icon" class="flex items-center content-center px-2 py-1 rounded-tl rounded-bl bg-white">
      <i class="material-icons text-discord-700 text-base">{{ icon }}</i>
    </div>

    <input
      v-model="inputValue"
      class="outline-none rounded py-1 px-3 bg-white"
      :class="{ 'rounded-tl-none': icon, 'rounded-bl-none': icon, 'pl-1': icon, 'cursor-not-allowed': ghost }"
      :type="type || 'text'"
      :placeholder="placeholder || ''"
      :disabled="ghost"
      @keyup.enter="$emit('on-enter', $event)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class InputComponent extends Vue {
  @Prop({
    type: Boolean,
    required: false,
  })
  readonly disabled!: boolean | undefined;

  @Prop({
    type: String,
    required: false,
  })
  readonly type!: string | undefined;

  @Prop({
    type: String,
    required: false,
  })
  readonly placeholder!: string | undefined;

  @Prop({
    type: String,
    required: false,
  })
  readonly icon!: string | undefined;

  @Prop()
  readonly value!: string;

  @Watch('inputValue', { immediate: true })
  onInputValueChanged(value: string, oldValue: string) {
    this.$emit('input', value);
  }

  @Watch('value', { immediate: true })
  onValueChanged(value: string, oldValue: string) {
    this.inputValue = value;
  }

  public inputValue = this.value;

  /**
   * The input is considered as ghosted if it's disabled.
   */
  get ghost(): boolean {
    return !!this.disabled;
  }
}
</script>
