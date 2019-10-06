<template>
  <div
    id="back-button-component"
    class="back-home absolute inline-flex text-gray-300 py-1 px-3 rounded-full bg-discord-500 hover:bg-discord-300 cursor-pointer shadow-2xl hover:shadow-none"
    @click="onClick"
  >
    <i class="material-icons flex items-center mr-2">
      arrow_back
    </i>

    <p>{{ label }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class BackButtonComponent extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly label!: String;

  @Emit('on-click')
  onClick() {
    console.log('go back event');
  }
}
</script>

<style scoped>
.back-home {
  transition: all 0.2s ease-in-out;
  top: 42px;
  left: 16px;
}
</style>
