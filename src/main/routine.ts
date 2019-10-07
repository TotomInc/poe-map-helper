/* eslint-disable import/no-extraneous-dependencies */
import { EventEmitter } from 'events';
import { app, protocol, BrowserWindow, IpcMessageEvent, ipcMain } from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

import { IpcHttpRequestOption } from '@/models/IpcHttp';
import { GoogleAnalyticsPayload } from '@/models/Analytics';
import {
  HTTP_REQUEST,
  ANALYTICS_TRACKING,
  LOGFILE_PATH_RECEIVED,
  MAP_ITEM_COPIED,
  ENTER_MAP,
  ENTER_HIDEOUT,
} from '../consts/ipc-events';
import { ipcHttpRequest } from './ipc-http-request';
import { isMapItem, parseMapItem } from './parse-map-item';
import { parseLogLine } from './parse-log-file';
import Clipboard from './clipboard';
import TailLogfile from './tail-logfile';
import trackEvent from './analytics';

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
        standard: true,
      },
    },
  ]);
}

/**
 * Create a new `BrowserWindow`, erase the current window.
 */
export function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (webpackDevURL) {
    win.loadURL(webpackDevURL);
  } else {
    createProtocol('app');
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;

    // Make sure to delete the Tail instance when the window is closed
    if (tail) {
      tail.unwatch();
      tail = null;
    }
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
 * process:
 *
 * - handle IPC HTTP-REQUESTS
 * - analytics tracking
 * - tail logfile on new line
 * - watch clipboard new content
 */
export function registerIpcEvents() {
  ipcMain.on(HTTP_REQUEST, (event: IpcMessageEvent, option: IpcHttpRequestOption) => {
    ipcHttpRequest(event, option);
  });

  ipcMain.on(ANALYTICS_TRACKING, (event: IpcMessageEvent, tracking: GoogleAnalyticsPayload) => trackEvent(tracking));

  ipcMain.on(LOGFILE_PATH_RECEIVED, (event: IpcMessageEvent, path: string) => {
    tail = new TailLogfile(path);

    tail.on('line', (line) => {
      if (win) {
        const parsedLine = parseLogLine(line);

        if (parsedLine.enterMap && parsedLine.mapZoneDetails) {
          win.webContents.send(ENTER_MAP, parsedLine.mapZoneDetails);
        } else if (parsedLine.enterHideout) {
          win.webContents.send(ENTER_HIDEOUT);
        }
      }
    });
  });

  clipboard.on('content', (clipboardData) => {
    const cliboardDataIsMapItem = isMapItem(clipboardData);

    if (cliboardDataIsMapItem && win) {
      const parsedMapItem = parseMapItem(clipboardData);

      win.webContents.send(MAP_ITEM_COPIED, parsedMapItem);
    }
  });
}
