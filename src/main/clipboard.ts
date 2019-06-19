import { EventEmitter } from 'events';
import { clipboard } from 'electron';

export default class Clipboard {
  private ee: EventEmitter;

  private clipboardContent: string;

  private intervalRef: NodeJS.Timer;

  constructor() {
    this.ee = new EventEmitter();
    this.clipboardContent = clipboard.readText();
    this.intervalRef = setInterval(() => this.detectChanges(), 250);
  }

  /**
   * Listen for the `content` event emitted when there is a new content
   * replaced in the clipboard.
   *
   * @param eventName name of the event for the EventEmitter
   * @param callback callback function with a param that will contain the new
   * clipboard content
   */
  public on(eventName: 'content', callback: (content: string) => void) {
    this.ee.on(eventName, callback);
  }

  /**
   * Read the clipboard and find if there is new copied content.
   */
  private detectChanges() {
    const clipboardContent = clipboard.readText();

    if (clipboardContent !== this.clipboardContent) {
      this.clipboardContent = clipboardContent;

      this.ee.emit('content', clipboardContent);
    }
  }
}
