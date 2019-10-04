import axios, { AxiosError, AxiosResponse } from 'axios';
import { IpcMessageEvent } from 'electron';

import { IpcHttpRequestOption, IpcHttpResponse } from '@/models/IpcHttp';
import { HTTP_REQUEST_FAILED, HTTP_REQUEST_SUCCESS } from '../consts/ipc-events';

/**
 * Execute an HTTP request using Axios on the main process.
 *
 * Send an IPC event `HTTP_REQUEST_SUCCESS` or `HTTP_REQUEST_FAILED` after the
 * HTTP request have been executed, to the renderer process.
 *
 * @param event message event sent by the renderer process
 * @param options request option for the http-request (and axios)
 */
export function ipcHttpRequest(event: IpcMessageEvent, options: IpcHttpRequestOption) {
  return axios(options.url, options.axiosOptions)
    .then((res: AxiosResponse) => {
      const payload: IpcHttpResponse = {
        requestOptions: options,
        response: res,
      };

      event.sender.send(HTTP_REQUEST_SUCCESS, payload);
    })
    .catch((err: AxiosError) => {
      const payload: IpcHttpResponse = {
        requestOptions: options,
        error: err,
      };

      event.sender.send(HTTP_REQUEST_FAILED, payload);
    });
}
