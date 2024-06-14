# Vue3是如何使用proxy来实现数据响应式的

Vue 3 通过使用 `Proxy` 对象来实现数据响应式，从而取代了 Vue 2 中使用的 `Object.defineProperty`。`Proxy` 提供了一种更强大和灵活的方式来拦截和处理对对象的操作，使得 Vue 3 的响应式系统更加高效和功能丰富。

### 主要步骤和实现细节

#### 1. 创建响应式对象

Vue 3 提供了 `reactive` 函数来创建响应式对象。`reactive` 函数内部会使用 `Proxy` 来代理传入的原始对象。

```javascript
import { reactive } from 'vue';

const state = reactive({
  count: 0,
  nested: {
    message: 'Hello'
  }
});
```

#### 2. 使用 `Proxy` 拦截操作

`Proxy` 对象可以拦截多种操作，如读取属性、写入属性、删除属性等。Vue 3 利用这些拦截器来实现响应式的核心机制。

```javascript
const handler = {
  get(target, key, receiver) {
    // 依赖收集
    track(target, key);
    const result = Reflect.get(target, key, receiver);
    // 深层嵌套对象的响应式处理
    if (typeof result === 'object' && result !== null) {
      return reactive(result);
    }
    return result;
  },
  set(target, key, value, receiver) {
    const oldValue = target[key];
    const result = Reflect.set(target, key, value, receiver);
    if (oldValue !== value) {
      // 触发更新
      trigger(target, key);
    }
    return result;
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key);
    if (result) {
      // 触发更新
      trigger(target, key);
    }
    return result;
  }
};
```

#### 3. 依赖收集（Tracking）

当响应式对象的属性被访问时，Vue 3 需要记录哪些副作用（例如渲染函数或计算属性）依赖于这个属性。这就是依赖收集。

```javascript
let activeEffect = null;

function track(target, key) {
  if (activeEffect) {
    // 建立 target -> key -> effects 的映射关系
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}
```

#### 4. 触发更新（Triggering）

当响应式对象的属性被修改时，Vue 3 需要通知所有依赖于这个属性的副作用重新运行。这就是触发更新。

```javascript
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}
```

### 完整示例

下面是一个完整的示例，展示了如何使用 `Proxy` 来实现响应式数据：

```javascript
const targetMap = new WeakMap();

function reactive(target) {
  if (!isObject(target)) return target;
  return new Proxy(target, handler);
}

const handler = {
  get(target, key, receiver) {
    track(target, key);
    const result = Reflect.get(target, key, receiver);
    if (typeof result === 'object' && result !== null) {
      return reactive(result);
    }
    return result;
  },
  set(target, key, value, receiver) {
    const oldValue = target[key];
    const result = Reflect.set(target, key, value, receiver);
    if (oldValue !== value) {
      trigger(target, key);
    }
    return result;
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key);
    if (result) {
      trigger(target, key);
    }
    return result;
  }
};

let activeEffect = null;

function effect(eff) {
  activeEffect = eff;
  eff();
  activeEffect = null;
}

function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}

function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}

function isObject(val) {
  return val !== null && typeof val === 'object';
}

// Usage example
const state = reactive({
  count: 0,
  nested: {
    message: 'Hello'
  }
});

effect(() => {
  console.log(state.count); // This will re-run whenever state.count changes
});

state.count++; // Console: 1
```

### 总结

- **`Proxy` 和 `Reflect`**：Vue 3 使用 `Proxy` 来拦截对象操作，通过 `Reflect` 提供的默认行为来处理这些操作。
- **依赖收集**：当响应式对象的属性被访问时，记录哪些副作用依赖于这个属性。
- **触发更新**：当响应式对象的属性被修改时，通知所有依赖于这个属性的副作用重新运行。

通过这些机制，Vue 3 实现了比 Vue 2 更加灵活和高效的响应式系统。