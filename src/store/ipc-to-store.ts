import { Store } from 'vuex';
import isElectron from 'is-electron';

import { IpcHttpResponse, IpcHttpRequestOption } from '@/models/IpcHttp';
import { POEMapItem, POEMapZone } from '@/models/PathOfExile';
import {
  HTTP_REQUEST_SUCCESS,
  HTTP_REQUEST_FAILED,
  MAP_ITEM_COPIED,
  HTTP_REQUEST,
  ENTER_MAP,
  ENTER_HIDEOUT,
} from '../consts/ipc-events';
import { RootState } from './state';
import { mapActions } from './map/map.consts';

/**
 * Register IPC events from main to renderer process and bind them to Vuex,
 * except for `HTTP_REQUEST_SUCCESS` and `HTTP_REQUEST_FAILED` whose works
 * differently.
 *
 * In order to take advantage of Vuex `async` actions, each HTTP-related action
 * have their own `X_SUCCESS` and `X_FAILED` ipcRenderer listener channel for
 * the time of the action to be done.
 *
 * We need to `ipcRenderer.emit` in order to notify the action listener that
 * the data have been successfully (or not) fetched. Actions listeners are
 * removed after the action is done.
 *
 * @param store store instance of the Vue app
 */
export async function ipcToStore(store: Store<RootState>): Promise<void> {
  if (isElectron()) {
    const { ipcRenderer } = await import('electron');

    ipcRenderer.on(HTTP_REQUEST_SUCCESS, (event: Electron.IpcMessageEvent, args: IpcHttpResponse) => {
      console.log(`Received ${HTTP_REQUEST_SUCCESS} IPC event:`, args);

      ipcRenderer.emit(args.requestOptions.onSuccessIpc, args.response ? args.response.data : null);
    });

    ipcRenderer.on(HTTP_REQUEST_FAILED, (event: Electron.IpcMessageEvent, args: IpcHttpResponse) => {
      console.log(`Received ${HTTP_REQUEST_FAILED} IPC event:`, args);

      ipcRenderer.emit(args.requestOptions.onFailIpc, args.error);
    });

    ipcRenderer.on(MAP_ITEM_COPIED, (event: Electron.IpcMessageEvent, args: POEMapItem) => {
      console.log(`Received ${MAP_ITEM_COPIED} IPC event:`, args);

      store.dispatch(mapActions.MAP_ITEM_COPIED, args);
    });

    ipcRenderer.on(ENTER_MAP, (event: Electron.IpcMessageEvent, args: POEMapZone) => {
      console.log(`Received ${ENTER_MAP} IPC event:`, args);

      store.dispatch(mapActions.ENTER_MAP, args);
    });

    ipcRenderer.on(ENTER_HIDEOUT, (event: Electron.IpcMessageEvent, args: void) => {
      console.log(`Received ${ENTER_HIDEOUT} IPC event:`, args);

      store.dispatch(mapActions.LEAVE_MAP);
    });
  }
}

/**
 * Send an `HTTP_REQUEST` IPC event to the main process with an options object.
 *
 * @param options HTTP request options
 */
export async function ipcHttpRequest(options: IpcHttpRequestOption) {
  if (isElectron()) {
    const { ipcRenderer } = await import('electron');

    console.log(`Store sent an ${HTTP_REQUEST} IPC event:`, options);

    ipcRenderer.send(HTTP_REQUEST, options);
  }
}
