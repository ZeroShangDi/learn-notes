# Vue路由的两种模式


Vue 路由有两种模式，分别是哈希模式（Hash mode）和历史模式（History mode）。这两种模式决定了 Vue 路由在浏览器中的 URL 格式和路由的实现方式。下面我会简要介绍一下这两种模式的特点和使用方法：

1. **哈希模式（Hash mode）：**
   - 在哈希模式下，URL 中的路由会以 `#` 符号开始，例如 `http://example.com/#/home`。
   - 哈希模式的优点是兼容性好，在不支持 HTML5 History API 的浏览器中也可以正常运行。
   - 在 Vue 中使用哈希模式，只需要在路由配置中设置 `mode: 'hash'` 即可，这是默认的模式。
   ```javascript
   const router = new VueRouter({
     mode: 'hash',
     routes: [
       { path: '/home', component: Home },
       { path: '/about', component: About },
       // Other routes
     ],
   });
   ```

2. **历史模式（History mode）：**
   - 在历史模式下，URL 中的路由不需要 `#` 符号，例如 `http://example.com/home`。
   - 历史模式利用 HTML5 History API，可以使用 `history.pushState` 和 `history.replaceState` 来操作浏览器历史记录。
   - 历史模式的优点是 URL 更加美观，没有 `#` 符号，并且可以利用浏览器的前进后退功能。
   - 在 Vue 中使用历史模式，需要在路由配置中设置 `mode: 'history'`，并且要注意在服务器端配置，以处理所有可能的路由路径。
   ```javascript
   const router = new VueRouter({
     mode: 'history',
     routes: [
       { path: '/home', component: Home },
       { path: '/about', component: About },
       // Other routes
     ],
   });
   ```

需要注意的是，使用历史模式时，你需要确保服务器端配置了适当的路由规则，以确保在直接访问特定路由时不会出现 404 错误，而是正确地渲染 Vue 应用。

在选择路由模式时，可以根据项目的需求和浏览器的兼容性做出选择。通常情况下，如果需要兼容性较好且不需要处理服务器端路由，可以使用哈希模式；如果需要 URL 更加美观、可以利用浏览器历史记录等功能，可以使用历史模式。

# vue的路由模式分别是监听什么来获取的？

Vue Router 是 Vue.js 的官方路由库，用于在单页面应用（SPA）中实现路由功能。Vue Router 支持两种主要的路由模式：`hash` 模式和 `history` 模式。它们分别监听不同的浏览器 API 来获取和管理路由状态。

### 1. Hash 模式

**监听对象**：`window.location.hash`

**原理**：
- `hash` 模式利用的是 URL 中的哈希（`#`）部分。哈希部分的变化不会触发页面刷新，而是通过监听 `hashchange` 事件来检测 URL 的变化。
- 在 `hash` 模式下，URL 的格式通常是 `http://example.com/#/some/path`，其中 `#/some/path` 就是路由路径。

**实现机制**：
- 当路由变化时，Vue Router 会改变 `window.location.hash` 的值。
- 浏览器会触发 `hashchange` 事件，Vue Router 会通过监听这个事件来更新视图。

**代码示例**：
```javascript
const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
});
```

### 2. History 模式

**监听对象**：`window.history`

**原理**：
- `history` 模式利用的是 HTML5 History API（`pushState`、`replaceState` 和 `popstate` 事件）来实现路由管理。
- 这种模式的 URL 看起来像常规的路径（例如 `http://example.com/some/path`），更符合 RESTful 风格和用户习惯。

**实现机制**：
- 当路由变化时，Vue Router 使用 `pushState` 或 `replaceState` 方法来改变浏览器的历史记录栈。
- 浏览器会触发 `popstate` 事件，Vue Router 通过监听这个事件来更新视图。

**代码示例**：
```javascript
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
});
```

### 3. Abstract 模式

**监听对象**：无（内存中的状态）

**原理**：
- `abstract` 模式主要用于非浏览器环境，例如 Node.js 环境下的服务端渲染（SSR）。
- 这种模式下，Vue Router 不依赖浏览器的历史记录或哈希变化，而是通过内存中的状态管理路由。

**实现机制**：
- 路由的变化仅在内存中维护，不会反映到 URL 上。

**代码示例**：
```javascript
const router = new VueRouter({
  mode: 'abstract',
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
});
```

### 总结

- **Hash 模式**：通过监听 `window.location.hash` 和 `hashchange` 事件来获取路由变化，URL 格式包含 `#` 符号，不会触发页面刷新。
- **History 模式**：通过 HTML5 History API（`pushState`、`replaceState` 和 `popstate` 事件）来管理路由，更加符合标准的 URL 格式，支持服务器端的配置。
- **Abstract 模式**：主要用于非浏览器环境，不依赖 URL 变化，路由状态仅在内存中维护。

选择哪种模式主要取决于应用的需求和运行环境。对于大多数前端应用来说，`history` 模式提供了更好的用户体验，但需要服务器配置支持；而 `hash` 模式简单易用，无需服务器配置，适用于静态文件托管环境。


# 简述vue-router 路由钩子函数是什么？执行顺序是什么？",


在 Vue.js 中，Vue Router 是官方的路由管理器，用于构建单页应用程序 (SPA)。Vue Router 提供了一系列的路由钩子函数（导航守卫），用于在路由切换过程中执行特定的逻辑。这些钩子函数可以在不同的层级上定义，主要分为以下几种类型：

### 路由钩子函数（导航守卫）类型

1. **全局守卫**
   - **`beforeEach`**：在每次导航之前执行。
   - **`beforeResolve`**：在导航被确认之前，但在所有组件内守卫和异步路由组件被解析之后执行。
   - **`afterEach`**：在每次导航之后执行。

2. **路由独享守卫**
   - **`beforeEnter`**：在路由配置中定义，只在进入该路由之前执行。

3. **组件内守卫**
   - **`beforeRouteEnter`**：在进入路由之前执行。
   - **`beforeRouteUpdate`**：在当前路由改变，但该组件被复用时调用（例如，从 `/foo/1` 导航到 `/foo/2`）。
   - **`beforeRouteLeave`**：在导航离开该组件的对应路由时调用。

### 执行顺序

当触发一次导航时，这些守卫函数会按以下顺序执行：

1. **全局前置守卫 `beforeEach`**
2. **路由独享守卫 `beforeEnter`**
3. **组件内守卫 `beforeRouteEnter`**
4. **解析异步路由组件**
5. **全局解析守卫 `beforeResolve`**
6. **导航确认**
7. **全局后置守卫 `afterEach`**
8. **组件内守卫 `beforeRouteUpdate` 和 `beforeRouteLeave`**（在组件被复用或导航离开时）

### 示例

#### 全局守卫

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
});

router.beforeEach((to, from, next) => {
  console.log('Global beforeEach');
  next();
});

router.beforeResolve((to, from, next) => {
  console.log('Global beforeResolve');
  next();
});

router.afterEach((to, from) => {
  console.log('Global afterEach');
});

export default router;
```

#### 路由独享守卫

```javascript
const routes = [
  {
    path: '/foo',
    component: Foo,
    beforeEnter: (to, from, next) => {
      console.log('Route-specific beforeEnter');
      next();
    }
  }
];
```

#### 组件内守卫

```javascript
export default {
  name: 'Foo',
  beforeRouteEnter(to, from, next) {
    console.log('Component beforeRouteEnter');
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('Component beforeRouteUpdate');
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('Component beforeRouteLeave');
    next();
  }
};
```

### 执行顺序示例

假设从路径 `/a` 导航到路径 `/b`，并且 `Foo` 组件是路径 `/a` 的组件，`Bar` 组件是路径 `/b` 的组件：

1. **全局前置守卫 `beforeEach`**
   - 打印 "Global beforeEach"
2. **路由独享守卫 `beforeEnter`**（如果有定义在 `/b` 路由中）
   - 打印 "Route-specific beforeEnter"
3. **组件内守卫 `beforeRouteLeave`**（`Foo` 组件的 `beforeRouteLeave`）
   - 打印 "Component beforeRouteLeave"
4. **组件内守卫 `beforeRouteEnter`**（`Bar` 组件的 `beforeRouteEnter`）
   - 打印 "Component beforeRouteEnter"
5. **全局解析守卫 `beforeResolve`**
   - 打印 "Global beforeResolve"
6. **导航确认**
7. **全局后置守卫 `afterEach`**
   - 打印 "Global afterEach"

### 总结

Vue Router 提供了多种导航守卫，用于在路由切换的不同阶段执行相应的逻辑。理解这些钩子函数的执行顺序，对于处理复杂的导航逻辑、权限验证以及数据预取等场景至关重要。



# 简述如何使用Vue-router实现懒加载的方式

在 Vue.js 应用中，使用 Vue Router 实现懒加载可以有效地提高性能，特别是对于大型应用。懒加载是一种按需加载资源的技术，只在用户访问特定路由时才加载对应的组件。这不仅减少了初始加载时间，还节省了带宽。

以下是使用 Vue Router 实现懒加载的方法：

### 1. 使用动态 `import`

Vue Router 支持使用 ES6 提案中的动态 `import()` 语法，这是一种基于 Promise 的语法，可以用于按需加载组件。动态 `import` 是最常用的懒加载方式。

#### 示例

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import('@/components/Home.vue');
const About = () => import('@/components/About.vue');
const Contact = () => import('@/components/Contact.vue');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
});
```

### 2. 使用 Webpack 的 `require.ensure`

这是 Webpack 特有的语法，用于实现代码分割和按需加载。不过，现代开发中更推荐使用动态 `import`，因为 `require.ensure` 语法较旧。

#### 示例

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = (resolve) => {
  require.ensure(['@/components/Home.vue'], () => {
    resolve(require('@/components/Home.vue'));
  });
};
const About = (resolve) => {
  require.ensure(['@/components/About.vue'], () => {
    resolve(require('@/components/About.vue'));
  });
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
```

### 3. 使用 Webpack 魔法注释

通过在动态 `import` 中使用 Webpack 魔法注释，可以命名生成的代码块。这样做有助于在构建时更容易识别和管理生成的文件。

#### 示例

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/components/About.vue');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});
```

### 4. 配合 Vue CLI 的代码分割

如果使用 Vue CLI 创建项目，代码分割和懒加载已经内置配置好。只需使用动态 `import`，Webpack 会自动处理代码分割和懒加载。

### 5. 结合 Vue 的异步组件

Vue Router 也支持异步组件，这些组件在需要时才会加载。可以结合 `import` 和异步组件实现懒加载。

#### 示例

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => ({
  component: import('@/components/Home.vue'),
  loading: LoadingComponent,
  error: ErrorComponent,
  delay: 200,
  timeout: 3000
});

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});
```

### 6. 使用路由前守卫进行预加载

在某些情况下，可能需要在用户导航到某个路由之前提前加载组件。这可以通过路由前守卫实现。

#### 示例

```javascript
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Home = () => import('@/components/Home.vue');
const About = () => import('@/components/About.vue');

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
});

// 在进入路由前，预加载目标组件
router.beforeEach((to, from, next) => {
  if (to.name === 'about') {
    import('@/components/About.vue').then(() => {
      next();
    });
  } else {
    next();
  }
});

export default router;
```

### 总结

使用 Vue Router 实现懒加载的常见方法包括动态 `import`、Webpack 的 `require.ensure`、Webpack 魔法注释、结合 Vue 的异步组件以及在路由前守卫中进行预加载。推荐使用动态 `import` 结合 Vue CLI 来实现简单、高效的懒加载。通过合理使用懒加载技术，可以显著提升 Vue.js 应用的性能和用户体验。


# 解释 Vue route和router的区别

在 Vue.js 中，`route` 和 `router` 是 Vue Router 提供的两个核心概念，理解它们的区别有助于更好地使用 Vue Router 进行前端路由管理。

### Vue Router 概述

Vue Router 是 Vue.js 官方的路由管理器，它用于在单页应用（SPA）中实现不同 URL 对应的不同视图。它通过改变 URL 来导航视图，同时保持应用状态不变。

### `route` 和 `router` 的区别

#### 1. `route` - 当前激活的路由信息对象

`route` 是一个包含当前激活路由信息的对象。每个路由对象都包含许多属性，如路径参数、查询参数、路由名称、匹配的路由记录等。

##### 常用属性

- `path`: 当前路由的路径。
- `params`: 路由参数对象。
- `query`: URL 查询参数对象。
- `name`: 路由名称。
- `meta`: 路由元信息对象。
- `matched`: 匹配的路由记录数组。

##### 获取 `route` 对象

可以通过 `this.$route` 在组件内部访问当前路由信息。

```javascript
export default {
  computed: {
    currentRoute() {
      return this.$route;
    },
    routeParams() {
      return this.$route.params;
    },
    routeQuery() {
      return this.$route.query;
    }
  }
};
```

#### 2. `router` - 路由实例对象

`router` 是 Vue Router 的实例，它包含了路由的配置和实例方法。通过 `router` 对象，你可以进行编程式导航、访问和操作路由实例的配置等。

##### 常用方法

- `push(location)`: 导航到一个新的 URL，添加一个新的历史记录。
- `replace(location)`: 导航到一个新的 URL，替换当前的历史记录。
- `go(n)`: 前进或后退 n 步历史记录。
- `back()`: 后退一步历史记录。
- `forward()`: 前进一步历史记录。
- `beforeEach(fn)`: 注册全局前置守卫。
- `afterEach(fn)`: 注册全局后置钩子。

##### 获取 `router` 对象

可以通过 `this.$router` 在组件内部访问路由实例。

```javascript
export default {
  methods: {
    navigateToHome() {
      this.$router.push('/');
    },
    navigateWithQuery() {
      this.$router.push({ path: '/user', query: { id: 123 } });
    },
    replaceRoute() {
      this.$router.replace('/profile');
    }
  }
};
```

### 使用示例

假设有以下路由配置：

```javascript
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home.vue';
import User from '@/components/User.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    }
  ]
});
```

在一个组件中，可以使用 `route` 和 `router` 来访问路由信息和执行路由操作：

```javascript
<template>
  <div>
    <h1>Current Route: {{ $route.path }}</h1>
    <button @click="goToUser(1)">Go to User 1</button>
    <button @click="replaceToHome">Replace to Home</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToUser(id) {
      this.$router.push({ name: 'user', params: { id } });
    },
    replaceToHome() {
      this.$router.replace({ name: 'home' });
    }
  }
};
</script>
```

### 总结

- `route` 是一个包含当前路由信息的对象，访问当前路径、参数、查询等信息时使用。
- `router` 是 Vue Router 的实例对象，用于进行导航和操作路由配置时使用。

理解 `route` 和 `router` 的区别和用途，有助于在开发 Vue.js 应用时，更加灵活和高效地管理路由。





