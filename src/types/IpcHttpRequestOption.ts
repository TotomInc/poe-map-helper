import { Method } from 'axios';

export interface IpcHttpRequestOption {
  url: string;
  onSuccessIpc: string;
  onFailIpc: string;
  axiosOptions: {
    method: Method;
    maxRedirects: number;
    headers: {
      [key: string]: string;
    };
  };
}
