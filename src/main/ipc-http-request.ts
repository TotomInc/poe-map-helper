import axios, { AxiosError, AxiosResponse } from 'axios';
import { IpcMessageEvent } from 'electron';

import { IpcHttpRequestOption } from '@/types/IpcHttpRequestOption';

/**
 * Execute an HTTP request using axios. Send an IPC event `onSuccess` or
 * `onFail` after request done, with the request response.
 *
 * @param event message event sent by the renderer process
 * @param options request options for the http-request (and axios)
 */
export function ipcHttpRequest(event: IpcMessageEvent, options: IpcHttpRequestOption) {
  return axios(options.url, options.axiosOptions)
    .then((res: AxiosResponse) => {
      event.sender.send(options.onSuccessIpc, res);
      console.log(res);
    })
    .catch((err: AxiosError) => {
      event.sender.send(options.onFailIpc, err);
    });
}
