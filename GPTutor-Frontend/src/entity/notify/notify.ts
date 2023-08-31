type Listener<T> = (value: T) => void;

export class Notify<T> {
  private listeners = new Set<Listener<T>>([]);

  on(listener: Listener<T>) {
    this.listeners.add(listener);
  }

  off(listener: Listener<T>) {
    this.listeners.delete(listener);
  }

  notify(value: T) {
    this.listeners.forEach((listener) => listener(value));
  }
}
