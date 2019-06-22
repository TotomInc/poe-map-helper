import axios, { AxiosError, AxiosResponse } from 'axios';
import { IpcMessageEvent } from 'electron';

import { IpcHttpRequestOption, IpcHttpResponse } from '@/models/IpcHttp';

/**
 * Execute an HTTP request using axios. Send an IPC event
 * `HTTP_REQUEST_SUCCESS` or `HTTP_REQUEST_FAIL` after the result of the HTTP
 * request.
 *
 * @param event message event sent by the renderer process
 * @param options request option for the http-request (and axios)
 */
export function ipcHttpRequest(event: IpcMessageEvent, options: IpcHttpRequestOption) {
  return axios(options.url, options.axiosOptions)
    .then((res: AxiosResponse) => {
      const payload: IpcHttpResponse = {
        requestOptions: options,
        response: res
      };

      event.sender.send('HTTP_REQUEST_SUCCESS', payload);
    })
    .catch((err: AxiosError) => {
      const payload: IpcHttpResponse = {
        requestOptions: options,
        error: err
      };

      event.sender.send('HTTP_REQUEST_FAIL', payload);
    });
}
