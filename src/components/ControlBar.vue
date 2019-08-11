<template>
  <div id="control-bar-component" class="z-10 absolute top-0 left-0 right-0 h-8 flex bg-discord-900">
    <div class="draggable-area flex h-full w-full" />

    <div class="flex h-full select-none">
      <div
        class="hover:bg-discord-500 hover:text-white flex items-center justify-center w-8 h-full text-gray-300 cursor-pointer"
        @click="minimize"
      >
        <i class="material-icons text-base">minimize</i>
      </div>

      <div
        class="hover:bg-discord-500 hover:text-white flex items-center justify-center w-8 h-full text-gray-300 cursor-pointer"
        @click="maximize"
      >
        <i class="material-icons text-base">fullscreen</i>
      </div>

      <div
        class="hover:bg-red-500 hover:text-white flex items-center justify-center w-8 h-full text-gray-300 cursor-pointer"
        @click="close"
      >
        <i class="material-icons text-base">close</i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { remote } from 'electron';
import { Vue, Component } from 'vue-property-decorator';

@Component({})
export default class ControlBarComponent extends Vue {
  private browserWindow!: Electron.BrowserWindow | null;

  public mounted(): void {
    this.browserWindow = remote.BrowserWindow.getFocusedWindow();
  }

  public minimize(): void {
    if (this.browserWindow) {
      this.browserWindow.minimize();
    }
  }

  public maximize(): void {
    if (this.browserWindow) {
      if (process.platform === 'darwin') {
        this.browserWindow.setFullScreen(!this.browserWindow.isFullScreen());
      } else if (process.platform === 'win32') {
        if (this.browserWindow.isMaximized()) {
          this.browserWindow.unmaximize();
        } else {
          this.browserWindow.maximize();
        }
      }
    }
  }

  public close(): void {
    if (this.browserWindow) {
      this.browserWindow.close();
    }
  }
}
</script>

<style scoped>
#control-bar-component .draggable-area {
  -webkit-app-region: drag;
}
</style>
