export class Emitter {
  constructor() {
    this.listeners = {};
  }

  subscribe(event, fn) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(fn);

    return () => {
      const elIndex =
        this.listeners[event].findIndex(listener => listener === fn);
      this.listeners[event].splice(elIndex, 1);
    };
  }

  emit(event, ...arg) {
    if (!this.listeners[event]) {
      return false;
    }
    this.listeners[event].forEach(listener => listener(...arg));
    return true;
  }
}
