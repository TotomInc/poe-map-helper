/* eslint-disable import/no-extraneous-dependencies */
import { EventEmitter } from 'events';
import { app, protocol, BrowserWindow, IpcMessageEvent, ipcMain } from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

import { IpcHttpRequestOption } from '@/types/IpcHttpRequestOption';
import { ipcHttpRequest } from './ipc-http-request';

const isDevelopment = process.env.NODE_ENV !== 'production';
const webpackDevURL: string | undefined = process.env.WEBPACK_DEV_SERVER_URL;
export const ee = new EventEmitter();

let win: BrowserWindow | null;

/**
 * Register schemes as privileged, need to be called before the `ready` event
 * is fired.
 */
export function registerSchemes() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: {
        secure: true,
        standard: true
      }
    }
  ]);
}

/**
 * Create a new `BrowserWindow`, erase the current window.
 */
export function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (webpackDevURL) {
    win.loadURL(webpackDevURL);
  } else {
    createProtocol('app');
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

/**
 * Register various Electron events such as `ready`. Also send a `ready` event
 * to the local event-emitter.
 */
export function registerEvents() {
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      try {
        await installVueDevtools();
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString());
      }
    }

    createWindow();
    ee.emit('ready');
  });
}

/**
 * Register various IPC events that can be sent from the renderer to the main
 * process.
 */
export function registerIpcEvents() {
  ipcMain.on('HTTP_REQUEST', (event: IpcMessageEvent, option: IpcHttpRequestOption) => {
    ipcHttpRequest(event, option);
  });
}
