import { app } from 'electron';
import { JSONStorage } from 'node-localstorage';
import ua from 'universal-analytics';
import uuidv4 from 'uuid/v4';

const jsonStoragePath = app.getPath('userData');
const jsonStorage = new JSONStorage(jsonStoragePath);

const userID: string = jsonStorage.getItem('userID') || uuidv4();

jsonStorage.setItem('userID', userID);

const analyticsUser = ua('UA-XXXXXXXX-X', userID);

/**
 * Track a Google Analytics event.
 *
 * @param category category of the event
 * @param action name of the action
 * @param label additional label
 * @param value value to send
 */
function trackEvent(category: string, action: string, label: string, value: string) {
  analyticsUser
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value,
    })
    .send();
}

export default trackEvent;
