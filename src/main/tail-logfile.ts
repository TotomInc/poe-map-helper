import { Tail } from 'tail';
import { EventEmitter } from 'events';

export default class TailLogfile {
  public ee: EventEmitter;

  private tail: Tail;

  constructor(logfilePath: string) {
    this.ee = new EventEmitter();
    this.tail = new Tail(logfilePath);

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
