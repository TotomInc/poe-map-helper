/**
 * Send an IPC event to execute an HTTP request on the main process.
 */
export const HTTP_REQUEST = 'HTTP_REQUEST';

/**
 * If the HTTP request is a success, it will send back an
 * `HTTP_REQUEST_SUCCESS` IPC event to the renderer process.
 */
export const HTTP_REQUEST_SUCCESS = 'HTTP_REQUEST_SUCCESS';

/**
 * If the HTTP request is failed, it will send back an `HTTP_REQUEST_FAILED`
 * IPC event to the renderer process.
 */
export const HTTP_REQUEST_FAILED = 'HTTP_REQUEST_FAILED';

/**
 * IPC event emitted to the main process when the logfile path (Client.txt)
 * have been selected by the user (in the renderer process).
 */
export const LOGFILE_PATH_RECEIVED = 'LOGFILE_PATH_RECEIVED';

/**
 * IPC event emitted to the renderer process when the clipboard data contains a
 * PoE map data.
 */
export const MAP_ITEM_COPIED = 'MAP_ITEM_COPIED';

/**
 * IPC event emitted to the renderer process when a user is entering a new
 * zone, by checking the logfile.
 */
export const ENTER_ZONE = 'ENTER_ZONE';
