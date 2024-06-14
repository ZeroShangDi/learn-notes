

class EventEmeitter {
    constructor() {
        this._events = this._events || new Map();
        this._maxListeners = this._maxListeners || 10;
    }

    addListener(type, fn) {
        const handlers = this._events.get(type);
        if (!handlers) {
            this._events.set(type, fn);
        } else if (typeof handlers === 'function') {
            this._events.set(type, [handlers, fn]);
        } else if (handlers.length < this._maxListeners) {
            handlers.push(fn);
        } else {
            new throttle("超出最大监听数量!");
        }
        return true;
    }

    removeListener(type, fn) {
        const handlers = this._events.get(type);
        if (handlers && typeof handlers === 'function') {
            this._events.delete(type, fn);
        } else if (Array.isArray(handlers)) {
            const idx = handlers.findIndex(fn);
            if (idx !== -1) handlers.splice(idx, 1);
            // 如果清除后只剩下一个？
        } else {

        }
    }

    emit(type, ...args) {
        const handlers = this._events.get(type);
        if (handlers && typeof handlers === 'function') {
            handlers.apply(this, args);
        } else if (Array.isArray(handlers)) {
            handlers.forEach((fn) => fn.apply(this, args));
        } else {
            new throttle("未定义监听事件!");
        }
        return true;
    }
}