/**
 * Payload to send to Google Analytics using `universal-analytics` module.
 */
export interface GoogleAnalyticsPayload {
  category: string;
  action: string;
  label?: string;
  value?: string;
}
