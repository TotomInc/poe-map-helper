import { app } from 'electron';
import { JSONStorage } from 'node-localstorage';
import ua from 'universal-analytics';
import uuidv4 from 'uuid/v4';

import { GoogleAnalyticsPayload } from '@/models/Analytics';

const jsonStoragePath = app.getPath('userData');
const jsonStorage = new JSONStorage(jsonStoragePath);

const userID: string = jsonStorage.getItem('userID') || uuidv4();

jsonStorage.setItem('userID', userID);

const analyticsUser = ua('UA-136985393-1', userID);

/**
 * Track a Google Analytics event.
 *
 * @param category category of the event
 * @param action name of the action
 * @param label additional label
 * @param value value to send
 */
function trackEvent(tracking: GoogleAnalyticsPayload) {
  analyticsUser
    .event({
      ec: tracking.category,
      ea: tracking.action,
      el: tracking.label,
      ev: tracking.value,
    })
    .send();
}

export default trackEvent;
