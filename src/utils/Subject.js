export class Subject {
  constructor(value) {
    this.value = value;
    this.listeners = new Set();
  }

  getValue() {
    return this.value;
  }

  next(value) {
    if (this.value === value) return;

    this.value = value;
    this._notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  _notify() {
    this.listeners.forEach((listener) => listener());
  }
}
