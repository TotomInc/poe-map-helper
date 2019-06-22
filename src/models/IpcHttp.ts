import { Method, AxiosResponse, AxiosError } from 'axios';

/**
 * Option object for HTTP request over IPC.
 */
export interface IpcHttpRequestOption {
  url: string;
  onSuccessIpc: string;
  onFailIpc: string;
  axiosOptions: {
    method: Method;
    maxRedirects?: number;
    headers?: {
      [key: string]: string;
    };
  };
}

/**
 * Response for an HTTP reqsuest over IPC.
 */
export interface IpcHttpResponse {
  requestOptions: IpcHttpRequestOption;
  response?: AxiosResponse<any>;
  error?: AxiosError<any>;
}
