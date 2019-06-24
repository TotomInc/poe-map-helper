/* eslint-disable import/no-extraneous-dependencies */
import { EventEmitter } from 'events';
import { app, protocol, BrowserWindow, IpcMessageEvent, ipcMain } from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { ipcHttpRequest } from './ipc-http-request';
import Clipboard from './clipboard';
import TailLogfile from './tail-logfile';

const isDevelopment = process.env.NODE_ENV !== 'production';
const webpackDevURL: string | undefined = process.env.WEBPACK_DEV_SERVER_URL;
const clipboard = new Clipboard();

export const ee = new EventEmitter();

let win: BrowserWindow | null;
let tail: TailLogfile | null;

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

  // When receiving the logfile path during the setup, instanciate a
  // `TailLogfile` with the logfile path to watch
  ipcMain.on('LOGFILE_PATH', (event: IpcMessageEvent, path: string) => {
    tail = new TailLogfile(path);

    tail.on('line', (line) => console.log('TODO: parser for a PoE line from logfile', line));
  });

  clipboard.on('content', (clipboardData) => {
    ipcMain.emit('CLIPBOARD_CONTENT', clipboardData);
  });
}
