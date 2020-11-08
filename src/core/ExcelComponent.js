import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.store = options.store;
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.unsubscribers = [];

    this.prepare();
  }

  prepare() {}

  toHTML() {
    return '';
  }

  $emit(event, ...arg) {
    this.emitter.emit(event, ...arg);
  }

  $on(event, fn) {
    const unSub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unSub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach(unSub => unSub());
  }
}
