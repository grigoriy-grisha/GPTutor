type Listener = () => void;
export class Subject<T> {
  private value: T;
  private listeners: Set<Listener>;

  constructor(value: T) {
    this.value = value;
    this.listeners = new Set();
  }

  getValue() {
    return this.value;
  }

  next(value: T) {
    if (this.value === value) return;

    this.value = value;
    this._notify();
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  _notify() {
    this.listeners.forEach((listener) => listener());
  }
}
