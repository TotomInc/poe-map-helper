import { Tail } from 'tail';
import { EventEmitter } from 'events';

export default class TailLogfile {
  private ee: EventEmitter;

  private tail: Tail;

  constructor(logfilePath: string) {
    this.ee = new EventEmitter();
    this.tail = new Tail(logfilePath, {
      useWatchFile: true,
      fsWatchOptions: {
        interval: 250
      }
    });

    this.registerEvents();
  }

  /**
   * Start/resume watching the current file.
   */
  public watch() {
    this.tail.watch();
  }

  /**
   * Stop watching the current file.
   */
  public unwatch() {
    this.tail.unwatch();
  }

  /**
   * Listen to `line` and `error` events emitted from the Tail module and
   * execute your own callback.
   *
   * @param eventName name of the event for the EventEmitter
   * @param callback callback function with a param that will contain the
   * latest line added to the file
   */
  public on(eventName: 'line' | 'error', callback: (line: string) => void) {
    this.ee.on(eventName, callback);
  }

  /**
   * Register `line` and `error` events from Tail module. Tail events will
   * trigger a `line` event or an `error` event in the EventEmitter.
   */
  private registerEvents() {
    this.tail.on('line', (data: string) => {
      this.ee.emit('line', data);
    });

    this.tail.on('error', (err: Error) => {
      this.ee.emit('error', err);
    });
  }
}
