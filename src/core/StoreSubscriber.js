import {isEqual} from './utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.prevState = this.store.getState() || {};
    this.sub = null;
  }

  subscribeComponents(components) {
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.subscribe.includes(key)) {
              const changes = {[key]: state[key]};
              component.storeChanged(changes);
            }
          });
        }
      });

      this.prevState = this.store.getState();
    });
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
