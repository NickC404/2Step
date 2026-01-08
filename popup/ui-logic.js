// node_modules/@vue/shared/dist/shared.esm-bundler.js
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
var EMPTY_OBJ = false ? Object.freeze({}) : {};
var EMPTY_ARR = false ? Object.freeze([]) : [];
var NOOP = () => {
};
var NO = () => false;
var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
var isModelListener = (key) => key.startsWith("onUpdate:");
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = (val, key) => hasOwnProperty.call(val, key);
var isArray = Array.isArray;
var isMap = (val) => toTypeString(val) === "[object Map]";
var isSet = (val) => toTypeString(val) === "[object Set]";
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isSymbol = (val) => typeof val === "symbol";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
var isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
var cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
var camelizeRE = /-\w/g;
var camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
  }
);
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction(
  (str) => {
    const s = str ? `on${capitalize(str)}` : ``;
    return s;
  }
);
var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
var invokeArrayFns = (fns, ...arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](...arg);
  }
};
var def = (obj, key, value, writable = false) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable,
    value
  });
};
var looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
var _globalThis;
var getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
var listDelimiterRE = /;(?![^(]*\))/g;
var propertyDelimiterRE = /:([^]+)/;
var styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
var isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
var isRef = (val) => {
  return !!(val && val["__v_isRef"] === true);
};
var toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
};
var replacer = (_key, val) => {
  if (isRef(val)) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce(
        (entries, [key, val2], i) => {
          entries[stringifySymbol(key, i) + " =>"] = val2;
          return entries;
        },
        {}
      )
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v))
    };
  } else if (isSymbol(val)) {
    return stringifySymbol(val);
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
var stringifySymbol = (v, i = "") => {
  var _a;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v
  );
};

// node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
var activeEffectScope;
var EffectScope = class {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this._on = 0;
    this.effects = [];
    this.cleanups = [];
    this._isPaused = false;
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = true;
      let i, l;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].pause();
        }
      }
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].pause();
      }
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active) {
      if (this._isPaused) {
        this._isPaused = false;
        let i, l;
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].resume();
          }
        }
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].resume();
        }
      }
    }
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (false) {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    if (++this._on === 1) {
      this.prevScope = activeEffectScope;
      activeEffectScope = this;
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      activeEffectScope = this.prevScope;
      this.prevScope = void 0;
    }
  }
  stop(fromParent) {
    if (this._active) {
      this._active = false;
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      this.effects.length = 0;
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      this.cleanups.length = 0;
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
    }
  }
};
function getCurrentScope() {
  return activeEffectScope;
}
var activeSub;
var pausedQueueEffects = /* @__PURE__ */ new WeakSet();
var ReactiveEffect = class {
  constructor(fn) {
    this.fn = fn;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 1 | 4;
    this.next = void 0;
    this.cleanup = void 0;
    this.scheduler = void 0;
    if (activeEffectScope && activeEffectScope.active) {
      activeEffectScope.effects.push(this);
    }
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    if (this.flags & 64) {
      this.flags &= -65;
      if (pausedQueueEffects.has(this)) {
        pausedQueueEffects.delete(this);
        this.trigger();
      }
    }
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags & 2 && !(this.flags & 32)) {
      return;
    }
    if (!(this.flags & 8)) {
      batch(this);
    }
  }
  run() {
    if (!(this.flags & 1)) {
      return this.fn();
    }
    this.flags |= 2;
    cleanupEffect(this);
    prepareDeps(this);
    const prevEffect = activeSub;
    const prevShouldTrack = shouldTrack;
    activeSub = this;
    shouldTrack = true;
    try {
      return this.fn();
    } finally {
      if (false) {
        warn(
          "Active effect was not restored correctly - this is likely a Vue internal bug."
        );
      }
      cleanupDeps(this);
      activeSub = prevEffect;
      shouldTrack = prevShouldTrack;
      this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let link = this.deps; link; link = link.nextDep) {
        removeSub(link);
      }
      this.deps = this.depsTail = void 0;
      cleanupEffect(this);
      this.onStop && this.onStop();
      this.flags &= -2;
    }
  }
  trigger() {
    if (this.flags & 64) {
      pausedQueueEffects.add(this);
    } else if (this.scheduler) {
      this.scheduler();
    } else {
      this.runIfDirty();
    }
  }
  /**
   * @internal
   */
  runIfDirty() {
    if (isDirty(this)) {
      this.run();
    }
  }
  get dirty() {
    return isDirty(this);
  }
};
var batchDepth = 0;
var batchedSub;
var batchedComputed;
function batch(sub, isComputed = false) {
  sub.flags |= 8;
  if (isComputed) {
    sub.next = batchedComputed;
    batchedComputed = sub;
    return;
  }
  sub.next = batchedSub;
  batchedSub = sub;
}
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  if (batchedComputed) {
    let e = batchedComputed;
    batchedComputed = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      e = next;
    }
  }
  let error;
  while (batchedSub) {
    let e = batchedSub;
    batchedSub = void 0;
    while (e) {
      const next = e.next;
      e.next = void 0;
      e.flags &= -9;
      if (e.flags & 1) {
        try {
          ;
          e.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e = next;
    }
  }
  if (error) throw error;
}
function prepareDeps(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    link.version = -1;
    link.prevActiveLink = link.dep.activeLink;
    link.dep.activeLink = link;
  }
}
function cleanupDeps(sub) {
  let head;
  let tail = sub.depsTail;
  let link = tail;
  while (link) {
    const prev = link.prevDep;
    if (link.version === -1) {
      if (link === tail) tail = prev;
      removeSub(link);
      removeDep(link);
    } else {
      head = link;
    }
    link.dep.activeLink = link.prevActiveLink;
    link.prevActiveLink = void 0;
    link = prev;
  }
  sub.deps = head;
  sub.depsTail = tail;
}
function isDirty(sub) {
  for (let link = sub.deps; link; link = link.nextDep) {
    if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) {
      return true;
    }
  }
  if (sub._dirty) {
    return true;
  }
  return false;
}
function refreshComputed(computed3) {
  if (computed3.flags & 4 && !(computed3.flags & 16)) {
    return;
  }
  computed3.flags &= -17;
  if (computed3.globalVersion === globalVersion) {
    return;
  }
  computed3.globalVersion = globalVersion;
  if (!computed3.isSSR && computed3.flags & 128 && (!computed3.deps && !computed3._dirty || !isDirty(computed3))) {
    return;
  }
  computed3.flags |= 2;
  const dep = computed3.dep;
  const prevSub = activeSub;
  const prevShouldTrack = shouldTrack;
  activeSub = computed3;
  shouldTrack = true;
  try {
    prepareDeps(computed3);
    const value = computed3.fn(computed3._value);
    if (dep.version === 0 || hasChanged(value, computed3._value)) {
      computed3.flags |= 128;
      computed3._value = value;
      dep.version++;
    }
  } catch (err) {
    dep.version++;
    throw err;
  } finally {
    activeSub = prevSub;
    shouldTrack = prevShouldTrack;
    cleanupDeps(computed3);
    computed3.flags &= -3;
  }
}
function removeSub(link, soft = false) {
  const { dep, prevSub, nextSub } = link;
  if (prevSub) {
    prevSub.nextSub = nextSub;
    link.prevSub = void 0;
  }
  if (nextSub) {
    nextSub.prevSub = prevSub;
    link.nextSub = void 0;
  }
  if (false) {
    dep.subsHead = nextSub;
  }
  if (dep.subs === link) {
    dep.subs = prevSub;
    if (!prevSub && dep.computed) {
      dep.computed.flags &= -5;
      for (let l = dep.computed.deps; l; l = l.nextDep) {
        removeSub(l, true);
      }
    }
  }
  if (!soft && !--dep.sc && dep.map) {
    dep.map.delete(dep.key);
  }
}
function removeDep(link) {
  const { prevDep, nextDep } = link;
  if (prevDep) {
    prevDep.nextDep = nextDep;
    link.prevDep = void 0;
  }
  if (nextDep) {
    nextDep.prevDep = prevDep;
    link.nextDep = void 0;
  }
}
var shouldTrack = true;
var trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function cleanupEffect(e) {
  const { cleanup } = e;
  e.cleanup = void 0;
  if (cleanup) {
    const prevSub = activeSub;
    activeSub = void 0;
    try {
      cleanup();
    } finally {
      activeSub = prevSub;
    }
  }
}
var globalVersion = 0;
var Link = class {
  constructor(sub, dep) {
    this.sub = sub;
    this.dep = dep;
    this.version = dep.version;
    this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
};
var Dep = class {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed3) {
    this.computed = computed3;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
    if (false) {
      this.subsHead = void 0;
    }
  }
  track(debugInfo) {
    if (!activeSub || !shouldTrack || activeSub === this.computed) {
      return;
    }
    let link = this.activeLink;
    if (link === void 0 || link.sub !== activeSub) {
      link = this.activeLink = new Link(activeSub, this);
      if (!activeSub.deps) {
        activeSub.deps = activeSub.depsTail = link;
      } else {
        link.prevDep = activeSub.depsTail;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
      }
      addSub(link);
    } else if (link.version === -1) {
      link.version = this.version;
      if (link.nextDep) {
        const next = link.nextDep;
        next.prevDep = link.prevDep;
        if (link.prevDep) {
          link.prevDep.nextDep = next;
        }
        link.prevDep = activeSub.depsTail;
        link.nextDep = void 0;
        activeSub.depsTail.nextDep = link;
        activeSub.depsTail = link;
        if (activeSub.deps === link) {
          activeSub.deps = next;
        }
      }
    }
    if (false) {
      activeSub.onTrack(
        extend(
          {
            effect: activeSub
          },
          debugInfo
        )
      );
    }
    return link;
  }
  trigger(debugInfo) {
    this.version++;
    globalVersion++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) {
        for (let head = this.subsHead; head; head = head.nextSub) {
          if (head.sub.onTrigger && !(head.sub.flags & 8)) {
            head.sub.onTrigger(
              extend(
                {
                  effect: head.sub
                },
                debugInfo
              )
            );
          }
        }
      }
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
};
function addSub(link) {
  link.dep.sc++;
  if (link.sub.flags & 4) {
    const computed3 = link.dep.computed;
    if (computed3 && !link.dep.subs) {
      computed3.flags |= 4 | 16;
      for (let l = computed3.deps; l; l = l.nextDep) {
        addSub(l);
      }
    }
    const currentTail = link.dep.subs;
    if (currentTail !== link) {
      link.prevSub = currentTail;
      if (currentTail) currentTail.nextSub = link;
    }
    if (false) {
      link.dep.subsHead = link;
    }
    link.dep.subs = link;
  }
}
var targetMap = /* @__PURE__ */ new WeakMap();
var ITERATE_KEY = /* @__PURE__ */ Symbol(
  false ? "Object iterate" : ""
);
var MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  false ? "Map keys iterate" : ""
);
var ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  false ? "Array iterate" : ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    if (false) {
      dep.track({
        target,
        type,
        key
      });
    } else {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    globalVersion++;
    return;
  }
  const run = (dep) => {
    if (dep) {
      if (false) {
        dep.trigger({
          target,
          type,
          key,
          newValue,
          oldValue,
          oldTarget
        });
      } else {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (isReadonly(target)) {
    return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
var arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x) => isArray(x) ? reactiveReadArray(x) : x)
    );
  },
  entries() {
    return iterator(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v) => v.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
var arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  let wrappedFn = fn;
  if (arr !== self2) {
    if (!isShallow(self2)) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  return arr[method](wrappedFn, ...args);
}
function searchProxy(self2, method, args) {
  const arr = toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && isProxy(args[0])) {
    args[0] = toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = toRaw(self2)[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
var isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
var builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty2(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
var BaseReactiveHandler = class {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty2;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      isRef2(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (isRef2(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject(value) ? readonly(value) : value;
    }
    if (isObject(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
};
var MutableReactiveHandler = class extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = isReadonly(oldValue);
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArrayWithIntegerKey && isRef2(oldValue) && !isRef2(value)) {
        if (isOldValueReadonly) {
          if (false) {
            warn(
              `Set operation on key "${String(key)}" failed: target is readonly.`,
              target[key]
            );
          }
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      isRef2(target) ? target : receiver
    );
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
};
var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    if (false) {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (false) {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
};
var mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
var readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
var shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(true);
var toShallow = (value) => value;
var getProto = (v) => Reflect.getPrototypeOf(v);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (false) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      warn(
        `${capitalize(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
          target.add(value);
          trigger(target, "add", value, value);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !isShallow(value) && !isReadonly(value)) {
          value = toRaw(value);
        }
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        } else if (false) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value, oldValue);
        }
        return this;
      },
      delete(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = toRaw(key);
          hadKey = has.call(target, key);
        } else if (false) {
          checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0, oldValue);
        }
        return result;
      },
      clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = false ? isMap(target) ? new Map(target) : new Set(target) : void 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0,
            oldTarget
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
var mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
var shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
var readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
var reactiveMap = /* @__PURE__ */ new WeakMap();
var shallowReactiveMap = /* @__PURE__ */ new WeakMap();
var readonlyMap = /* @__PURE__ */ new WeakMap();
var shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject(target)) {
    if (false) {
      warn(
        `value cannot be made ${isReadonly2 ? "readonly" : "reactive"}: ${String(
          target
        )}`
      );
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) {
    def(value, "__v_skip", true);
  }
  return value;
}
var toReactive = (value) => isObject(value) ? reactive(value) : value;
var toReadonly = (value) => isObject(value) ? readonly(value) : value;
function isRef2(r) {
  return r ? r["__v_isRef"] === true : false;
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef2(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
var RefImpl = class {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    if (false) {
      this.dep.track({
        target: this,
        type: "get",
        key: "value"
      });
    } else {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
    newValue = useDirectValue ? newValue : toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      if (false) {
        this.dep.trigger({
          target: this,
          type: "set",
          key: "value",
          newValue,
          oldValue
        });
      } else {
        this.dep.trigger();
      }
    }
  }
};
function unref(ref2) {
  return isRef2(ref2) ? ref2.value : ref2;
}
var shallowUnwrapHandlers = {
  get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef2(oldValue) && !isRef2(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var ComputedRefImpl = class {
  constructor(fn, setter, isSSR) {
    this.fn = fn;
    this.setter = setter;
    this._value = void 0;
    this.dep = new Dep(this);
    this.__v_isRef = true;
    this.deps = void 0;
    this.depsTail = void 0;
    this.flags = 16;
    this.globalVersion = globalVersion - 1;
    this.next = void 0;
    this.effect = this;
    this["__v_isReadonly"] = !setter;
    this.isSSR = isSSR;
  }
  /**
   * @internal
   */
  notify() {
    this.flags |= 16;
    if (!(this.flags & 8) && // avoid infinite self recursion
    activeSub !== this) {
      batch(this, true);
      return true;
    } else if (false) ;
  }
  get value() {
    const link = false ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track();
    refreshComputed(this);
    if (link) {
      link.version = this.dep.version;
    }
    return this._value;
  }
  set value(newValue) {
    if (this.setter) {
      this.setter(newValue);
    } else if (false) {
      warn("Write operation failed: computed value is readonly");
    }
  }
};
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, isSSR);
  if (false) {
    cRef.onTrack = debugOptions.onTrack;
    cRef.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
var INITIAL_WATCHER_VALUE = {};
var cleanupMap = /* @__PURE__ */ new WeakMap();
var activeWatcher = void 0;
function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
  if (owner) {
    let cleanups = cleanupMap.get(owner);
    if (!cleanups) cleanupMap.set(owner, cleanups = []);
    cleanups.push(cleanupFn);
  } else if (false) {
    warn(
      `onWatcherCleanup() was called when there was no active watcher to associate with.`
    );
  }
}
function watch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, once, scheduler, augmentJob, call } = options;
  const warnInvalidSource = (s) => {
    (options.onWarn || warn)(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const reactiveGetter = (source2) => {
    if (deep) return source2;
    if (isShallow(source2) || deep === false || deep === 0)
      return traverse(source2, 1);
    return traverse(source2);
  };
  let effect2;
  let getter;
  let cleanup;
  let boundCleanup;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef2(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => reactiveGetter(source);
    forceTrigger = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef2(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return reactiveGetter(s);
      } else if (isFunction(s)) {
        return call ? call(s, 2) : s();
      } else {
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = call ? () => call(source, 2) : source;
    } else {
      getter = () => {
        if (cleanup) {
          pauseTracking();
          try {
            cleanup();
          } finally {
            resetTracking();
          }
        }
        const currentEffect = activeWatcher;
        activeWatcher = effect2;
        try {
          return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
        } finally {
          activeWatcher = currentEffect;
        }
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    const depth = deep === true ? Infinity : deep;
    getter = () => traverse(baseGetter(), depth);
  }
  const scope = getCurrentScope();
  const watchHandle = () => {
    effect2.stop();
    if (scope && scope.active) {
      remove(scope.effects, effect2);
    }
  };
  if (once && cb) {
    const _cb = cb;
    cb = (...args) => {
      _cb(...args);
      watchHandle();
    };
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = (immediateFirstRun) => {
    if (!(effect2.flags & 1) || !effect2.dirty && !immediateFirstRun) {
      return;
    }
    if (cb) {
      const newValue = effect2.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
        if (cleanup) {
          cleanup();
        }
        const currentWatcher = activeWatcher;
        activeWatcher = effect2;
        try {
          const args = [
            newValue,
            // pass undefined as the old value when it's changed for the first time
            oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
            boundCleanup
          ];
          oldValue = newValue;
          call ? call(cb, 3, args) : (
            // @ts-expect-error
            cb(...args)
          );
        } finally {
          activeWatcher = currentWatcher;
        }
      }
    } else {
      effect2.run();
    }
  };
  if (augmentJob) {
    augmentJob(job);
  }
  effect2 = new ReactiveEffect(getter);
  effect2.scheduler = scheduler ? () => scheduler(job, false) : job;
  boundCleanup = (fn) => onWatcherCleanup(fn, false, effect2);
  cleanup = effect2.onStop = () => {
    const cleanups = cleanupMap.get(effect2);
    if (cleanups) {
      if (call) {
        call(cleanups, 4);
      } else {
        for (const cleanup2 of cleanups) cleanup2();
      }
      cleanupMap.delete(effect2);
    }
  };
  if (false) {
    effect2.onTrack = options.onTrack;
    effect2.onTrigger = options.onTrigger;
  }
  if (cb) {
    if (immediate) {
      job(true);
    } else {
      oldValue = effect2.run();
    }
  } else if (scheduler) {
    scheduler(job.bind(null, true), true);
  } else {
    effect2.run();
  }
  watchHandle.pause = effect2.pause.bind(effect2);
  watchHandle.resume = effect2.resume.bind(effect2);
  watchHandle.stop = watchHandle;
  return watchHandle;
}
function traverse(value, depth = Infinity, seen) {
  if (depth <= 0 || !isObject(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Map();
  if ((seen.get(value) || 0) >= depth) {
    return value;
  }
  seen.set(value, depth);
  depth--;
  if (isRef2(value)) {
    traverse(value.value, depth, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], depth, seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, depth, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], depth, seen);
    }
    for (const key of Object.getOwnPropertySymbols(value)) {
      if (Object.prototype.propertyIsEnumerable.call(value, key)) {
        traverse(value[key], depth, seen);
      }
    }
  }
  return value;
}

// node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js
function callWithErrorHandling(fn, instance, type, args) {
  try {
    return args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  if (isArray(fn)) {
    const values = [];
    for (let i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  } else if (false) {
    warn$1(
      `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof fn}`
    );
  }
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = false ? ErrorTypeStrings$1[type] : `https://vuejs.org/error-reference/#runtime-${type}`;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    if (errorHandler) {
      pauseTracking();
      callWithErrorHandling(errorHandler, null, 10, [
        err,
        exposedInstance,
        errorInfo
      ]);
      resetTracking();
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
}
function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
  if (false) {
    const info = ErrorTypeStrings$1[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else if (throwInProd) {
    throw err;
  } else {
    console.error(err);
  }
}
var queue = [];
var flushIndex = -1;
var pendingPostFlushCbs = [];
var activePostFlushCbs = null;
var postFlushIndex = 0;
var resolvedPromise = /* @__PURE__ */ Promise.resolve();
var currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.flags & 2) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!(job.flags & 1)) {
    const jobId = getId(job);
    const lastJob = queue[queue.length - 1];
    if (!lastJob || // fast path when the job id is larger than the tail
    !(job.flags & 2) && jobId >= getId(lastJob)) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(jobId), 0, job);
    }
    job.flags |= 1;
    queueFlush();
  }
}
function queueFlush() {
  if (!currentFlushPromise) {
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (activePostFlushCbs && cb.id === -1) {
      activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
    } else if (!(cb.flags & 1)) {
      pendingPostFlushCbs.push(cb);
      cb.flags |= 1;
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(instance, seen, i = flushIndex + 1) {
  if (false) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.flags & 2) {
      if (instance && cb.id !== instance.uid) {
        continue;
      }
      if (false) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      cb();
      if (!(cb.flags & 4)) {
        cb.flags &= -2;
      }
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)].sort(
      (a, b) => getId(a) - getId(b)
    );
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (false) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      const cb = activePostFlushCbs[postFlushIndex];
      if (false) {
        continue;
      }
      if (cb.flags & 4) {
        cb.flags &= -2;
      }
      if (!(cb.flags & 8)) cb();
      cb.flags &= -2;
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
function flushJobs(seen) {
  if (false) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  const check = false ? (job) => checkRecursiveUpdates(seen, job) : NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && !(job.flags & 8)) {
        if (false) {
          continue;
        }
        if (job.flags & 4) {
          job.flags &= ~1;
        }
        callWithErrorHandling(
          job,
          job.i,
          job.i ? 15 : 14
        );
        if (!(job.flags & 4)) {
          job.flags &= ~1;
        }
      }
    }
  } finally {
    for (; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job) {
        job.flags &= -2;
      }
    }
    flushIndex = -1;
    queue.length = 0;
    flushPostFlushCbs(seen);
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
if (false) {
  getGlobalThis().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
var currentRenderingInstance = null;
var currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (false) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function withDirectives(vnode, directives) {
  if (currentRenderingInstance === null) {
    return vnode;
  }
  const instance = getComponentPublicInstance(currentRenderingInstance);
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
var TeleportEndKey = /* @__PURE__ */ Symbol("_vte");
var isTeleport = (type) => type.__isTeleport;
var leaveCbKey = /* @__PURE__ */ Symbol("_leaveCb");
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function markAsyncBoundary(instance) {
  instance.ids = [instance.ids[0] + instance.ids[2]++ + "-", 0, 0];
}
var pendingSetRefMap = /* @__PURE__ */ new WeakMap();
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) {
      setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
    }
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  if (false) {
    warn$1(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  const rawSetupState = toRaw(setupState);
  const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
    if (false) {
      if (hasOwn(rawSetupState, key) && !isRef2(rawSetupState[key])) {
        warn$1(
          `Template ref "${key}" used on a non-ref value. It will not work in the production build.`
        );
      }
      if (knownTemplateRefs.has(rawSetupState[key])) {
        return false;
      }
    }
    return hasOwn(rawSetupState, key);
  };
  const canSetRef = (ref22) => {
    return true;
  };
  if (oldRef != null && oldRef !== ref2) {
    invalidatePendingSetRef(oldRawRef);
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (canSetSetupRef(oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef2(oldRef)) {
      if (canSetRef(oldRef)) {
        oldRef.value = null;
      }
      const oldRawRefAtom = oldRawRef;
      if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef2(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? canSetSetupRef(ref2) ? setupState[ref2] : refs[ref2] : canSetRef(ref2) || !rawRef.k ? ref2.value : refs[rawRef.k];
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue);
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (canSetSetupRef(ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                const newVal = [refValue];
                if (canSetRef(ref2)) {
                  ref2.value = newVal;
                }
                if (rawRef.k) refs[rawRef.k] = newVal;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (canSetSetupRef(ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          if (canSetRef(ref2)) {
            ref2.value = value;
          }
          if (rawRef.k) refs[rawRef.k] = value;
        } else if (false) {
          warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
        }
      };
      if (value) {
        const job = () => {
          doSet();
          pendingSetRefMap.delete(rawRef);
        };
        job.id = -1;
        pendingSetRefMap.set(rawRef, job);
        queuePostRenderEffect(job, parentSuspense);
      } else {
        invalidatePendingSetRef(rawRef);
        doSet();
      }
    } else if (false) {
      warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
    }
  }
}
function invalidatePendingSetRef(rawRef) {
  const pendingSetRef = pendingSetRefMap.get(rawRef);
  if (pendingSetRef) {
    pendingSetRef.flags |= 8;
    pendingSetRefMap.delete(rawRef);
  }
}
var requestIdleCallback = getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
var cancelIdleCallback = getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      pauseTracking();
      const reset = setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      reset();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (false) {
    const apiName = toHandlerKey(ErrorTypeStrings$1[type].replace(/ hook$/, ""));
    warn$1(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`
    );
  }
}
var createHook = (lifecycle) => (hook, target = currentInstance) => {
  if (!isInSSRComponentSetup || lifecycle === "sp") {
    injectHook(lifecycle, (...args) => hook(...args), target);
  }
};
var onBeforeMount = createHook("bm");
var onMounted = createHook("m");
var onBeforeUpdate = createHook(
  "bu"
);
var onUpdated = createHook("u");
var onBeforeUnmount = createHook(
  "bum"
);
var onUnmounted = createHook("um");
var onServerPrefetch = createHook(
  "sp"
);
var onRenderTriggered = createHook("rtg");
var onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
var NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  const sourceIsArray = isArray(source);
  if (sourceIsArray || isString(source)) {
    const sourceIsReactiveArray = sourceIsArray && isReactive(source);
    let needsWrap = false;
    let isReadonlySource = false;
    if (sourceIsReactiveArray) {
      needsWrap = !isShallow(source);
      isReadonlySource = isReadonly(source);
      source = shallowReadArray(source);
    }
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(
        needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i],
        i,
        void 0,
        cached && cached[i]
      );
    }
  } else if (typeof source === "number") {
    if (false) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
var getPublicInstance = (i) => {
  if (!i) return null;
  if (isStatefulComponent(i)) return getComponentPublicInstance(i);
  return getPublicInstance(i.parent);
};
var publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) => false ? shallowReadonly(i.props) : i.props,
    $attrs: (i) => false ? shallowReadonly(i.attrs) : i.attrs,
    $slots: (i) => false ? shallowReadonly(i.slots) : i.slots,
    $refs: (i) => false ? shallowReadonly(i.refs) : i.refs,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $host: (i) => i.ce,
    $emit: (i) => i.emit,
    $options: (i) => true ? resolveMergedOptions(i) : i.type,
    $forceUpdate: (i) => i.f || (i.f = () => {
      queueJob(i.update);
    }),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) => true ? instanceWatch.bind(i) : NOOP
  })
);
var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
var PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    if (key === "__v_skip") {
      return true;
    }
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (false) {
      return true;
    }
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (hasOwn(props, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance.attrs, "get", "");
      } else if (false) {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (false) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn$1(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn$1(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (false) {
      warn$1(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      if (false) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, props, type }
  }, key) {
    let cssModules;
    return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (false) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
function normalizePropsOrEmits(props) {
  return isArray(props) ? props.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props;
}
var shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render: render6,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = false ? createDuplicateChecker() : null;
  if (false) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        if (false) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          ctx[key] = methodHandler.bind(publicThis);
        }
        if (false) {
          checkDuplicateProperties("Methods", key);
        }
      } else if (false) {
        warn$1(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if (false) {
      warn$1(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (false) {
      warn$1(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!isObject(data)) {
    } else {
      instance.data = reactive(data);
      if (false) {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (false) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : false ? () => {
        warn$1(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      } : NOOP;
      const c = computed2({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (false) {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val,
          enumerable: true
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render6 && instance.render === NOOP) {
    instance.render = render6;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components) instance.components = components;
  if (directives) instance.directives = directives;
  if (serverPrefetch) {
    markAsyncBoundary(instance);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef2(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (false) {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      {
        watch2(getter, handler);
      }
    } else if (false) {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    {
      watch2(getter, raw.bind(publicThis));
    }
  } else if (isObject(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch2(getter, handler, raw);
      } else if (false) {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (false) {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
var internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray(to) && isArray(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to) return from;
  if (!from) return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
var uid$1 = 0;
function createAppAPI(render6, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    const pluginCleanupFns = [];
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (false) {
          warn$1(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
        } else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else if (false) {
          warn$1(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app2;
      },
      mixin(mixin) {
        if (true) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (false) {
            warn$1(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        } else if (false) {
          warn$1("Mixins are only available in builds supporting Options API");
        }
        return app2;
      },
      component(name, component) {
        if (false) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (false) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (false) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (false) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, namespace) {
        if (!isMounted) {
          if (false) {
            warn$1(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = app2._ceVNode || createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (namespace === true) {
            namespace = "svg";
          } else if (namespace === false) {
            namespace = void 0;
          }
          if (false) {
            context.reload = () => {
              const cloned = cloneVNode(vnode);
              cloned.el = null;
              render6(cloned, rootContainer, namespace);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render6(vnode, rootContainer, namespace);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          if (false) {
            app2._instance = vnode.component;
            devtoolsInitApp(app2, version);
          }
          return getComponentPublicInstance(vnode.component);
        } else if (false) {
          warn$1(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      onUnmount(cleanupFn) {
        if (false) {
          warn$1(
            `Expected function as first argument to app.onUnmount(), but got ${typeof cleanupFn}`
          );
        }
        pluginCleanupFns.push(cleanupFn);
      },
      unmount() {
        if (isMounted) {
          callWithAsyncErrorHandling(
            pluginCleanupFns,
            app2._instance,
            16
          );
          render6(null, app2._container);
          if (false) {
            app2._instance = null;
            devtoolsUnmountApp(app2);
          }
          delete app2._container.__vue_app__;
        } else if (false) {
          warn$1(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if (false) {
          if (hasOwn(context.provides, key)) {
            warn$1(
              `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
            );
          } else {
            warn$1(
              `App already provides property with key "${String(key)}" inherited from its parent element. It will be overwritten with the new value.`
            );
          }
        }
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        const lastApp = currentApp;
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = lastApp;
        }
      }
    };
    return app2;
  };
}
var currentApp = null;
function provide(key, value) {
  if (false) {
    if (!currentInstance || currentInstance.isMounted) {
      warn$1(`provide() can only be used inside setup().`);
    }
  }
  if (currentInstance) {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = getCurrentInstance();
  if (instance || currentApp) {
    let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (false) {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else if (false) {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
var ssrContextKey = /* @__PURE__ */ Symbol.for("v-scx");
var useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
    }
    return ctx;
  }
};
function watch2(source, cb, options) {
  if (false) {
    warn$1(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, options = EMPTY_OBJ) {
  const { immediate, deep, flush, once } = options;
  if (false) {
    if (immediate !== void 0) {
      warn$1(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn$1(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (once !== void 0) {
      warn$1(
        `watch() "once" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const baseWatchOptions = extend({}, options);
  if (false) baseWatchOptions.onWarn = warn$1;
  const runsImmediately = cb && immediate || !cb && flush !== "post";
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else if (!runsImmediately) {
      const watchStopHandle = () => {
      };
      watchStopHandle.stop = NOOP;
      watchStopHandle.resume = NOOP;
      watchStopHandle.pause = NOOP;
      return watchStopHandle;
    }
  }
  const instance = currentInstance;
  baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
  let isPre = false;
  if (flush === "post") {
    baseWatchOptions.scheduler = (job) => {
      queuePostRenderEffect(job, instance && instance.suspense);
    };
  } else if (flush !== "sync") {
    isPre = true;
    baseWatchOptions.scheduler = (job, isFirstRun) => {
      if (isFirstRun) {
        job();
      } else {
        queueJob(job);
      }
    };
  }
  baseWatchOptions.augmentJob = (job) => {
    if (cb) {
      job.flags |= 4;
    }
    if (isPre) {
      job.flags |= 2;
      if (instance) {
        job.id = instance.uid;
        job.i = instance;
      }
    }
  };
  const watchHandle = watch(source, cb, baseWatchOptions);
  if (isInSSRComponentSetup) {
    if (ssrCleanup) {
      ssrCleanup.push(watchHandle);
    } else if (runsImmediately) {
      watchHandle();
    }
  }
  return watchHandle;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const reset = setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  reset();
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
var getModelModifiers = (props, modelName) => {
  return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
};
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted) return;
  const props = instance.vnode.props || EMPTY_OBJ;
  if (false) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(camelize(event)) in propsOptions)) {
          warn$1(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(camelize(event))}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modifiers = isModelListener2 && getModelModifiers(props, event.slice(7));
  if (modifiers) {
    if (modifiers.trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (modifiers.number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  if (false) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (false) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(
          event
        )}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
var mixinEmitsCache = /* @__PURE__ */ new WeakMap();
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit2,
    render: render6,
    renderCache,
    props,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  const prev = setCurrentRenderingInstance(instance);
  let result;
  let fallthroughAttrs;
  if (false) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy = false ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn$1(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render6.call(
          thisProxy,
          proxyToUse,
          renderCache,
          false ? shallowReadonly(props) : props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render22 = Component;
      if (false) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render22.length > 1 ? render22(
          false ? shallowReadonly(props) : props,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return shallowReadonly(attrs);
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }
        ) : render22(
          false ? shallowReadonly(props) : props,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if (false) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs, false, true);
      } else if (false) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if (isOn(key)) {
            if (!isModelListener(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn$1(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text or teleport root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn$1(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if (false) {
      warn$1(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root, null, false, true);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if (false) {
      warn$1(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    setTransitionHooks(root, vnode.transition);
  }
  if (false) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
var getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
var filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (false) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent) {
    const root = parent.subTree;
    if (root.suspense && root.suspense.activeBranch === vnode) {
      root.el = vnode.el;
    }
    if (root === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    } else {
      break;
    }
  }
}
var internalObjectProto = {};
var createInternalObject = () => Object.create(internalObjectProto);
var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = createInternalObject();
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (false) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance.attrs, "set", "");
  }
  if (false) {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          const reset = setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          reset();
        }
      } else {
        value = defaultValue;
      }
      if (instance.ce) {
        instance.ce._setProp(key, value);
      }
    }
    if (opt[
      0
      /* shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
var mixinPropsCache = /* @__PURE__ */ new WeakMap();
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = asMixin ? mixinPropsCache : appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys) needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (false) {
        warn$1(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (false) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        const propType = prop.type;
        let shouldCast = false;
        let shouldCastTrue = true;
        if (isArray(propType)) {
          for (let index = 0; index < propType.length; ++index) {
            const type = propType[index];
            const typeName = isFunction(type) && type.name;
            if (typeName === "Boolean") {
              shouldCast = true;
              break;
            } else if (typeName === "String") {
              shouldCastTrue = false;
            }
          }
        } else {
          shouldCast = isFunction(propType) && propType.name === "Boolean";
        }
        prop[
          0
          /* shouldCast */
        ] = shouldCast;
        prop[
          1
          /* shouldCastTrue */
        ] = shouldCastTrue;
        if (shouldCast || hasOwn(prop, "default")) {
          needCastKeys.push(normalizedKey);
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$" && !isReservedProp(key)) {
    return true;
  } else if (false) {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
var normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false) {
      warn$1(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
var normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key)) continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (false) {
        warn$1(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
var normalizeVNodeSlots = (instance, children) => {
  if (false) {
    warn$1(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
var assignSlots = (slots, children, optimized) => {
  for (const key in children) {
    if (optimized || !isInternalKey(key)) {
      slots[key] = children[key];
    }
  }
};
var initSlots = (instance, children, optimized) => {
  const slots = instance.slots = createInternalObject();
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      assignSlots(slots, children, optimized);
      if (optimized) {
        def(slots, "_", type, true);
      }
    } else {
      normalizeObjectSlots(children, slots);
    }
  } else if (children) {
    normalizeVNodeSlots(instance, children);
  }
};
var updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (false) {
        assignSlots(slots, children, optimized);
        trigger(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        assignSlots(slots, children, optimized);
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};
function initFeatureFlags() {
  const needWarn = [];
  if (false) {
    getGlobalThis().__VUE_OPTIONS_API__ = true;
  }
  if (false) {
    getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
  }
  if (false) {
    getGlobalThis().__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;
  }
  if (false) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}
var queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = getGlobalThis();
  target.__VUE__ = true;
  if (false) {
    setDevtoolsHook$1(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = false ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, namespace);
        } else if (false) {
          patchStaticNode(n1, n2, container, namespace);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (false) {
          warn$1("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    } else if (ref2 == null && n1 && n1.ref != null) {
      setRef(n1.ref, null, parentSuspense, n1, true);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, namespace) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      namespace,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, namespace) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        namespace
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    if (n2.type === "svg") {
      namespace = "svg";
    } else if (n2.type === "math") {
      namespace = "mathml";
    }
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      const customElement = !!(n1.el && n1.el._isVueCE) ? n1.el : null;
      try {
        if (customElement) {
          customElement._beginPatch();
        }
        patchElement(
          n1,
          n2,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } finally {
        if (customElement) {
          customElement._endPatch();
        }
      }
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      namespace,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(vnode, namespace),
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(el, key, null, props[key], namespace, parentComponent);
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value, namespace);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (false) {
      def(el, "__vnode", vnode, true);
      def(el, "__vueParentComponent", parentComponent, true);
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (false) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    if (false) {
      el.__vnode = n2;
    }
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if (false) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) {
      hostSetElementText(el, "");
    }
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds
      );
      if (false) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        resolveChildrenNamespace(n2, namespace),
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(el, oldProps, newProps, parentComponent, namespace);
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, namespace);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(el, key, prev, next, namespace, parentComponent);
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(el, oldProps, newProps, parentComponent, namespace);
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64 | 128)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              namespace,
              parentComponent
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key)) continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(el, key, prev, next, namespace, parentComponent);
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (false) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        // #10007
        // such fragment like `<></>` will be compiled into
        // a fragment which doesn't have a children.
        // In this case fallback to an empty array
        n2.children || [],
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds
        );
        if (false) {
          traverseStaticChildren(n1, n2);
        } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree
        ) {
          traverseStaticChildren(
            n1,
            n2,
            true
            /* shallow */
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          namespace,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (false) {
      registerHMR(instance);
    }
    if (false) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (false) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance, false, optimized);
      if (false) {
        endMeasure(instance, `init`);
      }
    }
    if (false) initialVNode.el = null;
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
        initialVNode.placeholder = placeholder.el;
      }
    } else {
      setupRenderEffect(
        instance,
        initialVNode,
        container,
        anchor,
        parentSuspense,
        namespace,
        optimized
      );
    }
    if (false) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (false) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (false) {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent, root, type } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (false) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (false) {
              endMeasure(instance, `render`);
            }
            if (false) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (false) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode && type.__asyncHydrate) {
            type.__asyncHydrate(
              el,
              instance,
              hydrateSubTree
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (root.ce && // @ts-expect-error _def is private
          root.ce._def.shadowRoot !== false) {
            root.ce._injectChildStyle(type);
          }
          if (false) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (false) {
            endMeasure(instance, `render`);
          }
          if (false) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            namespace
          );
          if (false) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (false) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        {
          const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
          if (nonHydratedAsyncRoot) {
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            }
            nonHydratedAsyncRoot.asyncDep.then(() => {
              if (!instance.isUnmounted) {
                componentUpdateFn();
              }
            });
            return;
          }
        }
        let originNext = next;
        let vnodeHook;
        if (false) {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (false) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (false) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (false) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          namespace
        );
        if (false) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if (false) {
          devtoolsComponentUpdated(instance);
        }
        if (false) {
          popWarningContext();
        }
      }
    };
    instance.scope.on();
    const effect2 = instance.effect = new ReactiveEffect(componentUpdateFn);
    instance.scope.off();
    const update = instance.update = effect2.run.bind(effect2);
    const job = instance.job = effect2.runIfDirty.bind(effect2);
    job.i = instance;
    job.id = instance.uid;
    effect2.scheduler = () => queueJob(job);
    toggleRecurse(instance, true);
    if (false) {
      effect2.onTrack = instance.rtc ? (e) => invokeArrayFns(instance.rtc, e) : void 0;
      effect2.onTrigger = instance.rtg ? (e) => invokeArrayFns(instance.rtg, e) : void 0;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs(instance);
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        namespace,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          namespace,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if (false) {
            warn$1(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchorVNode = c2[nextIndex + 1];
        const anchor = nextIndex + 1 < l2 ? (
          // #13559, fallback to el placeholder for unresolved async component
          anchorVNode.el || anchorVNode.placeholder
        ) : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            namespace,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => {
          if (vnode.ctx.isUnmounted) {
            hostRemove(el);
          } else {
            hostInsert(el, container, anchor);
          }
        };
        const performLeave = () => {
          if (el._isLeaving) {
            el[leaveCbKey](
              true
              /* cancelled */
            );
          }
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs,
      cacheIndex
    } = vnode;
    if (patchFlag === -2) {
      optimized = false;
    }
    if (ref2 != null) {
      pauseTracking();
      setRef(ref2, null, parentSuspense, vnode, true);
      resetTracking();
    }
    if (cacheIndex != null) {
      parentComponent.renderCache[cacheIndex] = void 0;
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !dynamicChildren.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if (false) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove2(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if (false) {
      unregisterHMR(instance);
    }
    const { bum, scope, job, subTree, um, m, a } = instance;
    invalidateMount(m);
    invalidateMount(a);
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (job) {
      job.flags |= 8;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (false) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    const el = hostNextSibling(vnode.anchor || vnode.el);
    const teleportEnd = el && el[TeleportEndKey];
    return teleportEnd ? hostNextSibling(teleportEnd) : el;
  };
  let isFlushing = false;
  const render6 = (vnode, container, namespace) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(
        container._vnode || null,
        vnode,
        container,
        null,
        null,
        null,
        namespace
      );
    }
    container._vnode = vnode;
    if (!isFlushing) {
      isFlushing = true;
      flushPreFlushCbs();
      flushPostFlushCbs();
      isFlushing = false;
    }
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render: render6,
    hydrate,
    createApp: createAppAPI(render6, hydrate)
  };
}
function resolveChildrenNamespace({ type, props }, currentNamespace) {
  return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
}
function toggleRecurse({ effect: effect2, job }, allowed) {
  if (allowed) {
    effect2.flags |= 32;
    job.flags |= 4;
  } else {
    effect2.flags &= -33;
    job.flags &= -5;
  }
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray(ch1) && isArray(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow && c2.patchFlag !== -2)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text && // avoid cached text nodes retaining detached dom nodes
      c2.patchFlag !== -1) {
        c2.el = c1.el;
      }
      if (c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
      if (false) {
        c2.el && (c2.el.__vnode = c2);
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
function locateNonHydratedAsyncRoot(instance) {
  const subComponent = instance.subTree.component;
  if (subComponent) {
    if (subComponent.asyncDep && !subComponent.asyncResolved) {
      return subComponent;
    } else {
      return locateNonHydratedAsyncRoot(subComponent);
    }
  }
}
function invalidateMount(hooks) {
  if (hooks) {
    for (let i = 0; i < hooks.length; i++)
      hooks[i].flags |= 8;
  }
}
var isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
var Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
var Text = /* @__PURE__ */ Symbol.for("v-txt");
var Comment = /* @__PURE__ */ Symbol.for("v-cmt");
var Static = /* @__PURE__ */ Symbol.for("v-stc");
var blockStack = [];
var currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
var isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if (false) {
    const dirtyInstances = hmrDirtyComponents.get(n2.type);
    if (dirtyInstances && dirtyInstances.has(n1.component)) {
      n1.shapeFlag &= -257;
      n2.shapeFlag &= -513;
      return false;
    }
  }
  return n1.type === n2.type && n1.key === n2.key;
}
var normalizeKey = ({ key }) => key != null ? key : null;
var normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef2(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (false) {
    warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
var createVNode = false ? createVNodeWithArgsTransform : _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if (false) {
      warn$1(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject(style)) {
      if (isProxy(style) && !isArray(style)) {
        style = extend({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
  if (false) {
    type = toRaw(type);
    warn$1(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref2, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref2 ? isArray(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children: false ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (isVNode(child)) {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
var emptyAppContext = createAppContext();
var uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    ids: parent ? parent.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (false) {
    instance.ctx = createDevRenderContext(instance);
  } else {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
var currentInstance = null;
var getCurrentInstance = () => currentInstance || currentRenderingInstance;
var internalSetCurrentInstance;
var setInSSRSetupState;
{
  const g = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g[key])) setters = g[key] = [];
    setters.push(setter);
    return (v) => {
      if (setters.length > 1) setters.forEach((set) => set(v));
      else setters[0](v);
    };
  };
  internalSetCurrentInstance = registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v) => currentInstance = v
  );
  setInSSRSetupState = registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v) => isInSSRComponentSetup = v
  );
}
var setCurrentInstance = (instance) => {
  const prev = currentInstance;
  internalSetCurrentInstance(instance);
  instance.scope.on();
  return () => {
    instance.scope.off();
    internalSetCurrentInstance(prev);
  };
};
var unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
var isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false, optimized = false) {
  isSSR && setInSSRSetupState(isSSR);
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children, optimized || isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isSSR && setInSSRSetupState(false);
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  if (false) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn$1(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  if (false) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    pauseTracking();
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    const reset = setCurrentInstance(instance);
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [
        false ? shallowReadonly(instance.props) : instance.props,
        setupContext
      ]
    );
    const isAsyncSetup = isPromise(setupResult);
    resetTracking();
    reset();
    if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) {
      markAsyncBoundary(instance);
    }
    if (isAsyncSetup) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if (false) {
          const name = formatComponentName(instance, Component);
          warn$1(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject(setupResult)) {
    if (false) {
      warn$1(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    if (false) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    if (false) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (false) {
    warn$1(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
var compile;
var installWithProxy;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (false) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        if (false) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (true) {
    const reset = setCurrentInstance(instance);
    pauseTracking();
    try {
      applyOptions(instance);
    } finally {
      resetTracking();
      reset();
    }
  }
  if (false) {
    if (!compile && Component.template) {
      warn$1(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
      );
    } else {
      warn$1(`Component is missing template or render function: `, Component);
    }
  }
}
var attrsProxyHandlers = false ? {
  get(target, key) {
    markAttrsAccessed();
    track(target, "get", "");
    return target[key];
  },
  set() {
    warn$1(`setupContext.attrs is readonly.`);
    return false;
  },
  deleteProperty() {
    warn$1(`setupContext.attrs is readonly.`);
    return false;
  }
} : {
  get(target, key) {
    track(target, "get", "");
    return target[key];
  }
};
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (false) {
      if (instance.exposed) {
        warn$1(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef2(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn$1(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (false) {
    let attrsProxy;
    let slotsProxy;
    return Object.freeze({
      get attrs() {
        return attrsProxy || (attrsProxy = new Proxy(instance.attrs, attrsProxyHandlers));
      },
      get slots() {
        return slotsProxy || (slotsProxy = getSlotsProxy(instance));
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {
    return {
      attrs: new Proxy(instance.attrs, attrsProxyHandlers),
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getComponentPublicInstance(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  } else {
    return instance.proxy;
  }
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
var computed2 = (getterOrOptions, debugOptions) => {
  const c = computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
  if (false) {
    const i = getCurrentInstance();
    if (i && i.appContext.config.warnRecursiveComputed) {
      c._warnRecursive = true;
    }
  }
  return c;
};
var version = "3.5.25";

// node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js
var policy = void 0;
var tt = typeof window !== "undefined" && window.trustedTypes;
if (tt) {
  try {
    policy = /* @__PURE__ */ tt.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e) {
  }
}
var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
var svgNS = "http://www.w3.org/2000/svg";
var mathmlNS = "http://www.w3.org/1998/Math/MathML";
var doc = typeof document !== "undefined" ? document : null;
var templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
var nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, namespace, is, props) => {
    const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, namespace, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling)) break;
      }
    } else {
      templateContainer.innerHTML = unsafeToTrustedHTML(
        namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content
      );
      const template = templateContainer.content;
      if (namespace === "svg" || namespace === "mathml") {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
var vtcKey = /* @__PURE__ */ Symbol("_vtc");
function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
var vShowOriginalDisplay = /* @__PURE__ */ Symbol("_vod");
var vShowHidden = /* @__PURE__ */ Symbol("_vsh");
var vShow = {
  // used for prop mismatch check during hydration
  name: "show",
  beforeMount(el, { value }, { transition }) {
    el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue) return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOriginalDisplay] : "none";
  el[vShowHidden] = !value;
}
var CSS_VAR_TEXT = /* @__PURE__ */ Symbol(false ? "CSS_VAR_TEXT" : "");
var displayRE = /(?:^|;)\s*display\s*:/;
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  let hasControlledDisplay = false;
  if (next && !isCssString) {
    if (prev) {
      if (!isString(prev)) {
        for (const key in prev) {
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      } else {
        for (const prevStyle of prev.split(";")) {
          const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
          if (next[key] == null) {
            setStyle(style, key, "");
          }
        }
      }
    }
    for (const key in next) {
      if (key === "display") {
        hasControlledDisplay = true;
      }
      setStyle(style, key, next[key]);
    }
  } else {
    if (isCssString) {
      if (prev !== next) {
        const cssVarText = style[CSS_VAR_TEXT];
        if (cssVarText) {
          next += ";" + cssVarText;
        }
        style.cssText = next;
        hasControlledDisplay = displayRE.test(next);
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
  }
  if (vShowOriginalDisplay in el) {
    el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
    if (el[vShowHidden]) {
      style.display = "none";
    }
  }
}
var importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null) val = "";
    if (false) {
      if (semicolonRE.test(val)) {
        warn2(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
var prefixes = ["Webkit", "Moz", "ms"];
var prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
var xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(
        key,
        isBoolean ? "" : isSymbol(value) ? String(value) : value
      );
    }
  }
}
function patchDOMProp(el, key, value, parentComponent, attrName) {
  if (key === "innerHTML" || key === "textContent") {
    if (value != null) {
      el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
    }
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
    const newValue = value == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      el.type === "checkbox" ? "on" : ""
    ) : String(value);
    if (oldValue !== newValue || !("_value" in el)) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    el._value = value;
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if (false) {
      warn2(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(attrName || key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
var veiKey = /* @__PURE__ */ Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = false ? sanitizeEventValue(nextValue, rawName) : nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(
        false ? sanitizeEventValue(nextValue, rawName) : nextValue,
        instance
      );
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
var optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
var cachedNow = 0;
var p = /* @__PURE__ */ Promise.resolve();
var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map(
      (fn) => (e2) => !e2._stopped && fn && fn(e2)
    );
  } else {
    return value;
  }
}
var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // lowercase letter
key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
  const isSVG = namespace === "svg";
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(el, key, nextValue);
    if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) {
      patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
    }
  } else if (
    // #11081 force set props for possible async custom element
    el._isVueCE && (/[A-Z]/.test(key) || !isString(nextValue))
  ) {
    patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && isNativeOn(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") {
    return false;
  }
  if (key === "sandbox" && el.tagName === "IFRAME") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (key === "width" || key === "height") {
    const tag = el.tagName;
    if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") {
      return false;
    }
  }
  if (isNativeOn(key) && isString(value)) {
    return false;
  }
  return key in el;
}
var rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
var renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
var createApp = ((...args) => {
  const app2 = ensureRenderer().createApp(...args);
  if (false) {
    injectNativeTagCheck(app2);
    injectCompilerOptionsCheck(app2);
  }
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container) return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    if (container.nodeType === 1) {
      container.textContent = "";
    }
    const proxy = mount(container, false, resolveRootNamespace(container));
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
});
function resolveRootNamespace(container) {
  if (container instanceof SVGElement) {
    return "svg";
  }
  if (typeof MathMLElement === "function" && container instanceof MathMLElement) {
    return "mathml";
  }
}
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    if (false) {
      warn2(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if (false) {
    warn2(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}

// node_modules/vue/dist/vue.runtime.esm-bundler.js
if (false) {
  initDev();
}

// sfc-script:/private/var/www/apps/2Step/src/components/Input.vue?type=script
var Input_default = {
  __name: "Input",
  props: {
    modelValue: String,
    label: String
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};

// sfc-template:/private/var/www/apps/2Step/src/components/Input.vue?type=template
var _hoisted_1 = { class: "space-y-1" };
var _hoisted_2 = {
  key: 0,
  class: "block text-sm font-medium text-gray-700"
};
var _hoisted_3 = ["value"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    $props.label ? (openBlock(), createElementBlock(
      "label",
      _hoisted_2,
      toDisplayString($props.label),
      1
      /* TEXT */
    )) : createCommentVNode("v-if", true),
    createBaseVNode("input", mergeProps({
      value: $props.modelValue,
      onInput: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.value)),
      class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
    }, _ctx.$attrs), null, 16, _hoisted_3)
  ]);
}

// src/components/Input.vue
Input_default.render = render;
Input_default.__file = "src/components/Input.vue";
var Input_default2 = Input_default;

// sfc-script:/private/var/www/apps/2Step/src/components/TabBar.vue?type=script
var TabBar_default = {
  __name: "TabBar",
  props: {
    tabs: {
      type: Array,
      required: true
      // Expects objects with { id, label, icon }
    },
    modelValue: {
      type: String,
      required: true
    },
    has2FA: {
      type: Boolean,
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = {};
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};

// sfc-template:/private/var/www/apps/2Step/src/components/TabBar.vue?type=template
var _hoisted_12 = { class: "flex px-3 space-x-1 pb-2" };
var _hoisted_22 = ["onClick"];
function render2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_12, [
    (openBlock(true), createElementBlock(
      Fragment,
      null,
      renderList($props.tabs, (tab) => {
        return openBlock(), createElementBlock("button", {
          key: tab.id,
          onClick: ($event) => _ctx.$emit("update:modelValue", tab.id),
          class: normalizeClass([
            "flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-all duration-200 cursor-pointer relative uppercase tracking-tight",
            $props.modelValue === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-blue-100 hover:bg-white/10 hover:text-white"
          ])
        }, toDisplayString(tab.label), 11, _hoisted_22);
      }),
      128
      /* KEYED_FRAGMENT */
    ))
  ]);
}

// src/components/TabBar.vue
TabBar_default.render = render2;
TabBar_default.__file = "src/components/TabBar.vue";
var TabBar_default2 = TabBar_default;

// sfc-script:/private/var/www/apps/2Step/src/components/MethodBadge.vue?type=script
var MethodBadge_default = {
  __name: "MethodBadge",
  props: {
    method: {
      type: String,
      required: true
    },
    compact: {
      type: Boolean,
      default: false
    },
    side: {
      type: String,
      default: "top",
      validator: (v) => ["top", "bottom"].includes(v)
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const props = __props;
    const siteColorClass = computed2(() => {
      return props.compact ? "bg-emerald-50 border-emerald-100/50 text-emerald-700 hover:bg-emerald-100" : "bg-gray-50 border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50/50";
    });
    const tooltipPositionClass = computed2(() => {
      if (props.side === "bottom") {
        return "top-full mt-2 transform -translate-y-1 group-hover:translate-y-0";
      }
      return "bottom-full mb-2 transform translate-y-1 group-hover:translate-y-0";
    });
    const arrowClass = computed2(() => {
      if (props.side === "bottom") {
        return "bottom-full border-b-blue-600";
      }
      return "top-full border-t-white";
    });
    const descriptions = {
      totp: "Time-based One-Time Password. Uses an app like Google Authenticator or Authy to generate unique codes every 30 seconds.",
      u2f: "Universal 2nd Factor. The most secure method, using physical hardware keys like a Yubikey for hardware-level protection.",
      sms: "Sends a one-time verification code to your mobile phone via SMS text message.",
      email: "Sends a one-time verification code to your registered email address.",
      phone: "Delivers a verification code via an automated voice call to your phone.",
      prop: "A proprietary method unique to this service, typically a push notification or in-app approval step.",
      "custom-software": "Uses a custom mobile app developed specifically by this service for secure authentication.",
      "custom-hardware": "Requires a specific physical hardware device or token provided by the service.",
      hardware: "Requires a physical security device or token to authenticate.",
      software: "Uses a software-based authenticator app on your computer or mobile device.",
      push: "Sends a push notification to your mobile device for quick, one-tap approval.",
      biometric: "Uses fingerprint, facial recognition, or other biological markers to verify your identity."
    };
    const description = computed2(() => {
      return descriptions[props.method.toLowerCase()] || "An additional security method used to verify your identity beyond just a password.";
    });
    const __returned__ = { props, siteColorClass, tooltipPositionClass, arrowClass, descriptions, description, computed: computed2 };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};

// sfc-template:/private/var/www/apps/2Step/src/components/MethodBadge.vue?type=template
var _hoisted_13 = { class: "relative group inline-block" };
var _hoisted_23 = {
  key: 0,
  class: "w-1.5 h-1.5 rounded-full bg-emerald-400"
};
var _hoisted_32 = { class: "font-bold bg-blue-600 text-white px-3 py-2 flex items-center justify-between" };
var _hoisted_4 = { class: "p-3" };
var _hoisted_5 = { class: "leading-relaxed font-semibold text-gray-600" };
function render3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_13, [
    createBaseVNode(
      "div",
      {
        class: normalizeClass([
          "px-2 py-1 border rounded-lg font-bold uppercase tracking-tight flex items-center gap-1.5 transition-all cursor-help",
          $setup.siteColorClass,
          $props.compact ? "px-1.5 py-0.5 text-[10px]" : "px-3 py-1.5 text-xs"
        ])
      },
      [
        !$props.compact ? (openBlock(), createElementBlock("div", _hoisted_23)) : createCommentVNode("v-if", true),
        createTextVNode(
          " " + toDisplayString($props.method.toUpperCase()),
          1
          /* TEXT */
        )
      ],
      2
      /* CLASS */
    ),
    createCommentVNode(" Tooltip "),
    createBaseVNode(
      "div",
      {
        class: normalizeClass([
          "absolute left-1/2 -translate-x-1/2 w-48 bg-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 shadow-2xl border border-gray-100 overflow-hidden",
          $setup.tooltipPositionClass
        ])
      },
      [
        createBaseVNode("div", _hoisted_32, [
          createBaseVNode(
            "span",
            null,
            toDisplayString($props.method.toUpperCase()),
            1
            /* TEXT */
          ),
          _cache[0] || (_cache[0] = createBaseVNode(
            "span",
            { class: "text-[8px] opacity-70 border border-white/20 px-1 rounded" },
            "METHOD",
            -1
            /* CACHED */
          ))
        ]),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode(
            "p",
            _hoisted_5,
            toDisplayString($setup.description),
            1
            /* TEXT */
          )
        ]),
        createCommentVNode(" Arrow "),
        createBaseVNode(
          "div",
          {
            class: normalizeClass([
              "absolute left-1/2 -translate-x-1/2 border-[6px] border-transparent",
              $setup.arrowClass
            ])
          },
          null,
          2
          /* CLASS */
        )
      ],
      2
      /* CLASS */
    )
  ]);
}

// src/components/MethodBadge.vue
MethodBadge_default.render = render3;
MethodBadge_default.__file = "src/components/MethodBadge.vue";
var MethodBadge_default2 = MethodBadge_default;

// sfc-script:/private/var/www/apps/2Step/src/components/SiteDetails.vue?type=script
var SiteDetails_default = {
  __name: "SiteDetails",
  props: {
    site: {
      type: Object,
      required: true
    }
  },
  setup(__props, { expose: __expose }) {
    __expose();
    const __returned__ = { MethodBadge: MethodBadge_default2 };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};

// sfc-template:/private/var/www/apps/2Step/src/components/SiteDetails.vue?type=template
var _hoisted_14 = { class: "bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 relative" };
var _hoisted_24 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-8 h-8",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var _hoisted_33 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-8 h-8",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var _hoisted_42 = { class: "text-xl font-bold text-gray-900 tracking-tight" };
var _hoisted_52 = { key: 0 };
var _hoisted_6 = { key: 1 };
var _hoisted_7 = {
  key: 0,
  class: "p-6 bg-white border-t border-gray-100"
};
var _hoisted_8 = { class: "flex flex-wrap gap-2 justify-center" };
var _hoisted_9 = {
  key: 0,
  class: "mt-4"
};
var _hoisted_10 = ["href"];
var _hoisted_11 = {
  key: 1,
  class: "p-6 bg-white border-t border-gray-100"
};
function render4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_14, [
    createBaseVNode(
      "div",
      {
        class: normalizeClass([
          "p-8 flex flex-col items-center text-center space-y-4 transition-colors duration-500 rounded-t-2xl",
          $props.site.has2FA ? "bg-emerald-50/40" : "bg-rose-50/40"
        ])
      },
      [
        createBaseVNode(
          "div",
          {
            class: normalizeClass([
              "w-16 h-16 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 transform hover:scale-105",
              $props.site.has2FA ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
            ])
          },
          [
            $props.site.has2FA ? (openBlock(), createElementBlock("svg", _hoisted_24, [..._cache[0] || (_cache[0] = [
              createBaseVNode(
                "path",
                { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                null,
                -1
                /* CACHED */
              ),
              createBaseVNode(
                "polyline",
                { points: "9 11 11 13 15 9" },
                null,
                -1
                /* CACHED */
              )
            ])])) : (openBlock(), createElementBlock("svg", _hoisted_33, [..._cache[1] || (_cache[1] = [
              createBaseVNode(
                "path",
                { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                null,
                -1
                /* CACHED */
              ),
              createBaseVNode(
                "line",
                {
                  x1: "15",
                  y1: "9",
                  x2: "9",
                  y2: "15"
                },
                null,
                -1
                /* CACHED */
              ),
              createBaseVNode(
                "line",
                {
                  x1: "9",
                  y1: "9",
                  x2: "15",
                  y2: "15"
                },
                null,
                -1
                /* CACHED */
              )
            ])]))
          ],
          2
          /* CLASS */
        ),
        createBaseVNode("div", null, [
          createBaseVNode(
            "h2",
            _hoisted_42,
            toDisplayString($props.site.domain),
            1
            /* TEXT */
          ),
          createBaseVNode(
            "p",
            {
              class: normalizeClass([
                "text-sm font-semibold mt-1.5 flex items-center justify-center gap-1.5",
                $props.site.has2FA ? "text-emerald-700" : "text-rose-700"
              ])
            },
            [
              $props.site.has2FA ? (openBlock(), createElementBlock("span", _hoisted_52, "2FA Available")) : (openBlock(), createElementBlock("span", _hoisted_6, "2FA Not Supported"))
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    ),
    $props.site.has2FA && $props.site.methods && $props.site.methods.length ? (openBlock(), createElementBlock("div", _hoisted_7, [
      _cache[3] || (_cache[3] = createBaseVNode(
        "div",
        { class: "flex flex-col items-center mb-4" },
        [
          createBaseVNode("h3", { class: "text-xs font-bold text-gray-400 uppercase tracking-widest" }, "Security Methods"),
          createBaseVNode("div", { class: "h-1 w-8 bg-emerald-100 rounded-full mt-1.5 opacity-50" })
        ],
        -1
        /* CACHED */
      )),
      createBaseVNode("div", _hoisted_8, [
        (openBlock(true), createElementBlock(
          Fragment,
          null,
          renderList($props.site.methods, (method) => {
            return openBlock(), createBlock($setup["MethodBadge"], {
              key: method,
              method
            }, null, 8, ["method"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      $props.site.documentation ? (openBlock(), createElementBlock("div", _hoisted_9, [
        createBaseVNode("a", {
          href: $props.site.documentation,
          target: "_blank",
          class: "flex items-center justify-center gap-1.5 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm shadow-blue-200 no-underline text-center uppercase tracking-tight"
        }, [..._cache[2] || (_cache[2] = [
          createBaseVNode(
            "span",
            null,
            "Setup Guide",
            -1
            /* CACHED */
          ),
          createBaseVNode(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              class: "w-3.5 h-3.5",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            },
            [
              createBaseVNode("path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" }),
              createBaseVNode("polyline", { points: "15 3 21 3 21 9" }),
              createBaseVNode("line", {
                x1: "10",
                y1: "14",
                x2: "21",
                y2: "3"
              })
            ],
            -1
            /* CACHED */
          )
        ])], 8, _hoisted_10)
      ])) : createCommentVNode("v-if", true)
    ])) : createCommentVNode("v-if", true),
    !$props.site.has2FA ? (openBlock(), createElementBlock("div", _hoisted_11, [..._cache[4] || (_cache[4] = [
      createBaseVNode(
        "p",
        { class: "text-xs text-gray-500 text-center leading-relaxed" },
        " This site doesn't seem to support 2FA yet. We recommend using a strong, unique password and a password manager. ",
        -1
        /* CACHED */
      )
    ])])) : createCommentVNode("v-if", true),
    _cache[5] || (_cache[5] = createStaticVNode('<div class="py-3 bg-gray-50/80 border-t border-gray-100 text-center rounded-b-2xl"><a href="#" class="text-[11px] uppercase tracking-widest font-bold text-gray-400 hover:text-blue-600 transition-colors no-underline inline-flex items-center gap-1.5"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg> Flag incorrect details </a></div>', 1))
  ]);
}

// src/components/SiteDetails.vue
SiteDetails_default.render = render4;
SiteDetails_default.__file = "src/components/SiteDetails.vue";
var SiteDetails_default2 = SiteDetails_default;

// 2fa.directory/sites.json
var sites_default = {
  "zoopla.co.uk": {},
  "zybooks.com": {},
  "zoom.us": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.zoom.com/hc/article?id=zm_kb&sysparm_article=KB0066054"
  },
  "zondaglobal.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://zondaglobal.com/en/helpdesk/zonda-exchange/my-account/how-to-use-two-factor-authentication-provided-by-google-authenticator",
    recovery: "https://zondaglobal.com/en/helpdesk/zonda-exchange/my-account/what-can-be-done-if-google-authenticator-app-is-lost"
  },
  "zola.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "zoho.com": {
    methods: [
      "sms",
      "custom-software",
      "totp",
      "u2f"
    ],
    "custom-software": [
      "Zoho OneAuth"
    ],
    documentation: "https://help.zoho.com/portal/kb/articles/mfa-introduction"
  },
  "zomato.com": {},
  "zocdoc.com": {},
  "zkb.ch": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "ZKB Access"
    ],
    "custom-hardware": [
      "photoTAN reader"
    ],
    documentation: "https://www.zkb.ch/de/pr/pk/efinance/ebanking/login-verfahren.html"
  },
  "zip.co": {
    methods: [
      "sms"
    ],
    documentation: "https://help.zip.co/hc/en-us/articles/360004059836"
  },
  "zimbra.com": {
    methods: [
      "totp"
    ],
    documentation: "https://blog.zimbra.com/2016/02/zimbra-collaboration-8-7-two-factor-authentication-2fa-technical-preview/",
    notes: "Available in Zimbra Collaboration 8.7 and above, Network Edition only"
  },
  "zillow.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://zillow.zendesk.com/hc/articles/360057432754"
  },
  "zight.com": {},
  "getcloudapp.com": {},
  "zerotier.com": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "zerodha.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.zerodha.com/category/your-zerodha-account/login-credentials/login-credentials-of-trading-platforms/articles/time-based-otp-setup"
  },
  "zeplin.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.zeplin.io/en/articles/7189128"
  },
  "zendesk.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.zendesk.com/hc/en-us/articles/4408829277466"
  },
  "zara.com": {},
  "zapsplat.com": {
    methods: [
      "totp"
    ]
  },
  "zazzle.com": {},
  "zappos.com": {},
  "zapier.com": {
    methods: [
      "totp"
    ],
    documentation: "https://zapier.com/help/two-factor-authentication/"
  },
  "zalando.com": {},
  "zaba.hr": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "m-zaba app"
    ],
    documentation: "https://www.zaba.hr/home/token#pan3"
  },
  "youtube.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "youinvest.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://www.youinvest.co.uk/faq/how-do-i-set-two-factor-authentication"
  },
  "youhodler.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.youhodler.com/en/articles/3787039"
  },
  "youi.com.au": {
    methods: [
      "sms"
    ]
  },
  "yorku.ca": {
    methods: [
      "u2f",
      "custom-software",
      "custom-hardware",
      "sms",
      "call"
    ],
    "custom-software": [
      "Duo Mobile"
    ],
    "custom-hardware": [
      "Duo token",
      "Touch ID"
    ],
    documentation: "https://infosec.yorku.ca/2FA",
    notes: "2FA via SMS or phone call can only be enabled by the support team."
  },
  "yoomoney.ru": {
    methods: [
      "sms"
    ],
    documentation: "https://yoomoney.ru/page?id=536116"
  },
  "ynab.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.ynab.com/rkKHuLlRc",
    recovery: "https://support.ynab.com/rkKHuLlRc#troubleshoot"
  },
  "youneedabudget.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.ynab.com/rkKHuLlRc",
    recovery: "https://support.ynab.com/rkKHuLlRc#troubleshoot"
  },
  "ymobile.jp": {},
  "yle.fi": {},
  "yclas.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.yclas.com/2-step-authentication/"
  },
  "yelp.com": {},
  "xplenty.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.xplenty.com/docs/2-factor-authentication/"
  },
  "xink.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.xink.io/support/solutions/articles/1000271422"
  },
  "xing.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://faq.xing.com/en/settings-security/two-factor-login-two-factor-authentication"
  },
  "xfinity.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Xfinity Authenticator"
    ],
    documentation: "https://www.xfinity.com/support/articles/two-step-verification-xfinity-app-setup/",
    notes: "Email 2FA requires the use of a non-Comcast.net email address."
  },
  "comcast.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Xfinity Authenticator"
    ],
    documentation: "https://www.xfinity.com/support/articles/two-step-verification-xfinity-app-setup/",
    notes: "Email 2FA requires the use of a non-Comcast.net email address."
  },
  "xero.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Xero Verify"
    ],
    documentation: "https://help.xero.com/nz/MyXero_Two-Step_About"
  },
  "xbox.com": {
    methods: [
      "sms",
      "email",
      "custom-software",
      "call",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "xapo.com": {
    methods: [
      "sms"
    ],
    documentation: "https://customersupport.xapo.com/en_us/r1aIYObOd"
  },
  "wyze.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.wyze.com/hc/en-us/articles/360024402052",
    notes: "2FA via SMS is only available for USA and Canada."
  },
  "x.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.x.com/en/managing-your-account/two-factor-authentication",
    recovery: "https://help.x.com/en/managing-your-account/issues-with-login-authentication",
    notes: "SMS only available on select providers and for X Premium members only."
  },
  "twitter.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.x.com/en/managing-your-account/two-factor-authentication",
    recovery: "https://help.x.com/en/managing-your-account/issues-with-login-authentication",
    notes: "SMS only available on select providers and for X Premium members only."
  },
  "wyndhamhotels.com": {},
  "wykop.pl": {
    methods: [
      "totp"
    ]
  },
  "wwe.com": {},
  "wrike.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.wrike.com/hc/en-us/articles/210324445",
    notes: "Only accessible to Enterprise accounts and users may need to contact their account administrator to enable 2FA."
  },
  "wpscan.com": {},
  "wpengine.com": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://wpengine.com/support/2-factor-authentication/"
  },
  "wp.pl": {
    methods: [
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "1login od WP"
    ],
    documentation: "https://pomoc.wp.pl/1login/jak-wlaczyc-i-wylaczyc-logowanie-dwustopniowe"
  },
  "world4you.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.world4you.com/faq/en/w4y-app/faq.zwei-faktor-authentifizierung-world4you-app.html"
  },
  "workplace.com": {
    methods: [
      "totp",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Workplace App Code Generator"
    ],
    documentation: "https://www.workplace.com/help/work/1331628866920315"
  },
  "workflowy.com": {
    methods: [
      "totp"
    ],
    documentation: "https://workflowy.zendesk.com/hc/en-us/articles/4401923146516"
  },
  "workato.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.workato.com/security/two-factor-authentication.html"
  },
  "wordpress.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://en.support.wordpress.com/security/two-step-authentication/"
  },
  "woolworths.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "wordfence.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.wordfence.com/help/central/2fa/"
  },
  "woodforest.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.woodforest.com/Personal/Services/Online-Banking/Online-Banking-Security"
  },
  "wolt.com": {},
  "wolfram.com": {},
  "wolframalpha.com": {},
  "wolframcloud.com": {},
  "woltlab.com": {
    methods: [
      "totp",
      "u2f",
      "email"
    ]
  },
  "wolf.bet": {
    methods: [
      "totp"
    ],
    documentation: "https://www.youtube.com/watch?v=3B_zlGVldRY"
  },
  "wix.com": {
    methods: [
      "totp",
      "email",
      "sms"
    ],
    documentation: "https://support.wix.com/en/article/using-2-step-verification-for-your-wix-account",
    notes: "SMS is only available with Premium plans; email is restricted to selected providers."
  },
  "wizard101.com": {},
  "withings.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.withings.com/hc/articles/21866853734545",
    notes: "The following apps do not support 2FA: Thermo, WithBaby, Withings Home Security Camera, WiScale."
  },
  "wise.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Wise App"
    ],
    documentation: "https://wise.com/help/articles/2932125",
    notes: "SMS 2FA must be enabled before software methods can be enabled."
  },
  "transferwise.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Wise App"
    ],
    documentation: "https://wise.com/help/articles/2932125",
    notes: "SMS 2FA must be enabled before software methods can be enabled."
  },
  "wisc.edu": {
    methods: [
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token",
      "Feitian OTP c100 Token"
    ],
    documentation: "https://it.wisc.edu/services/duo-multi-factor-authentication-mfa/"
  },
  "wirexapp.com": {
    methods: [
      "totp"
    ],
    documentation: "https://wirexapp.com/hc/articles/207160259"
  },
  "wire.com": {},
  "wingo.ch": {},
  "windy.com": {},
  "windscribe.com": {
    methods: [
      "totp"
    ],
    documentation: "https://windscribe.com/knowledge-base/articles/how-do-i-enable-2-factor-authentication-on-my-account"
  },
  "winamax.fr": {},
  "winamax.com": {},
  "winamax.de": {},
  "win2day.at": {
    methods: [
      "sms"
    ],
    documentation: "https://www.win2day.at/suche?faqId=331"
  },
  "wilobank.com": {},
  "wiggle.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.cn": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.co.nz": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.com": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.es": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wigglesport.de": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.dk": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.fr": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wigglesport.it": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.jp": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.ru": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wiggle.se": {
    methods: [
      "totp"
    ],
    documentation: "https://wiggle.egain.cloud/kb/Wiggle_EN/content/Prod-13378/"
  },
  "wikipedia.org": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://meta.wikimedia.org/wiki/Help:Two-factor_authentication",
    notes: "Currently limited to administrators (and users with admin-like permissions like interface editors), bureaucrats, checkusers, oversighters, stewards, edit filter managers and the OATH-testers global group."
  },
  "widiba.it": {},
  "whimsical.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.whimsical.com/article/664--"
  },
  "wheniwork.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.wheniwork.com/articles/log-in-with-two-step-verification-computer/"
  },
  "whois.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://manage.whois.com/kb/node/2690",
    notes: "TOTP 2FA is only available for resellers."
  },
  "whc.ca": {
    methods: [
      "totp"
    ],
    documentation: "https://clients.whc.ca/en/knowledgebase/1430"
  },
  "whatsapp.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.whatsapp.com/faq/en/general/26000021"
  },
  "wetransfer.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.wetransfer.com/hc/en-us/articles/360056666872",
    recovery: "https://help.wetransfer.com/hc/en-us/articles/360056666872#h_01EXEFX7G5DKD2GHYDGWH1S0C7"
  },
  "whalefin.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.whalefin.com/hc/en-us/articles/8911053323417",
    recovery: "https://support.whalefin.com/hc/en-us/articles/8939906306073"
  },
  "westjet.com": {},
  "westpac.com.au": {},
  "westernunion.com": {
    methods: [
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://business.westernunion.com/en-pl/product-documents/psd2-overview/Set-up-two-Factor",
    notes: "2FA is only available for business accounts."
  },
  "wescom.org": {},
  "weltsparen.de": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "wellfound.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.wellfound.com/article/1064--",
    recovery: "https://help.wellfound.com/article/817--"
  },
  "angel.co": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.wellfound.com/article/1064--",
    recovery: "https://help.wellfound.com/article/817--"
  },
  "wellsfargo.com": {
    methods: [
      "sms",
      "call",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Wells Fargo App"
    ],
    "custom-hardware": [
      "RSA SecurID Device"
    ],
    documentation: "https://www.wellsfargo.com/privacy-security/advanced-access"
  },
  "wf.com": {
    methods: [
      "sms",
      "call",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Wells Fargo App"
    ],
    "custom-hardware": [
      "RSA SecurID Device"
    ],
    documentation: "https://www.wellsfargo.com/privacy-security/advanced-access"
  },
  "wellsfargoadvisors.com": {
    methods: [
      "sms",
      "call",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Wells Fargo App"
    ],
    "custom-hardware": [
      "RSA SecurID Device"
    ],
    documentation: "https://www.wellsfargo.com/privacy-security/advanced-access"
  },
  "weibo.com": {},
  "wefunder.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.wefunder.com/getting-started-for-investors/how-secure-is-my-account",
    notes: "Setting up 2FA with TOTP or Security Key requires adding a phone number."
  },
  "wedos.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.wedos.com/cs/zakaznik/otp.html"
  },
  "weclapp.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://doc.weclapp.com/en/documentation/dein-start-mit-weclapp/2-my-weclapp-personal-master-and-contact-data/2-4-security/2-factor-authentication/"
  },
  "webmoney.ru": {},
  "webroot.com": {
    methods: [
      "totp"
    ],
    documentation: "https://answers.webroot.com/Webroot/ukp.aspx?vw=1&solid=3476",
    recovery: "https://answers.webroot.com/Webroot/ukp.aspx?vw=1&solid=3508"
  },
  "identity.webrootanywhere.com": {
    methods: [
      "totp"
    ],
    documentation: "https://answers.webroot.com/Webroot/ukp.aspx?vw=1&solid=3476",
    recovery: "https://answers.webroot.com/Webroot/ukp.aspx?vw=1&solid=3508"
  },
  "my.webrootanywhere.com": {
    methods: [
      "totp"
    ],
    documentation: "https://answers.webroot.com/Webroot/ukp.aspx?vw=1&solid=3476",
    recovery: "https://answers.webroot.com/Webroot/ukp.aspx?vw=1&solid=3508"
  },
  "webmd.com": {},
  "webmail.pt.lu": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.pt.lu/2fa-two-factor-authentication/"
  },
  "webgate.ec.europa.eu": {
    methods: [
      "sms",
      "u2f",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "EU Login mobile app"
    ],
    "custom-hardware": [
      "VASCO Token",
      "DigiPass Token"
    ],
    documentation: "https://webgate.ec.europa.eu/cas/manuals/EU_Login_Tutorial.pdf"
  },
  "webflow.com": {
    methods: [
      "totp"
    ],
    documentation: "https://university.webflow.com/lesson/two-factor-authentication-2fa"
  },
  "webcentral.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://support.webcentral.com.au/s/article/Multi-Factor-Authentication-Guide"
  },
  "web.mit.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://kb.mit.edu/confluence/display/istcontrib/Duo+Authentication+Landing+Page"
  },
  "web.iit.edu": {},
  "web.de": {
    methods: [
      "totp"
    ],
    documentation: "https://hilfe.web.de/sicherheit/2fa/index.html",
    notes: "Setup requires SMS verification."
  },
  "web.any.do": {},
  "wealthsimple.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.wealthsimple.com/hc/en-ca/articles/360056584134"
  },
  "simpletax.ca": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.wealthsimple.com/hc/en-ca/articles/360056584134"
  },
  "wealthify.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.wealthify.com/faq#security"
  },
  "wealthfront.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.wealthfront.com/hc/en-us/articles/211004563",
    recovery: "https://support.wealthfront.com/hc/en-us/articles/211004603"
  },
  "wazirx.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.wazirx.com/hc/en-us/articles/360014633494"
  },
  "waveapps.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.waveapps.com/hc/articles/26445936336660"
  },
  "wayfair.com": {},
  "wattpad.com": {},
  "waterstones.com": {},
  "watchguard.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "AuthPoint App"
    ],
    documentation: "https://www.watchguard.com/help/docs/help-center/en-US/Content/en-US/my_products/portal_users-manage-mfa.html"
  },
  "wasabi.com": {
    methods: [
      "totp"
    ],
    documentation: "https://wasabi-support.zendesk.com/hc/en-us/articles/360055164891"
  },
  "washington.edu": {
    methods: [
      "call",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token",
      "Yubico OTP"
    ],
    documentation: "https://itconnect.uw.edu/security/uw-netids/2fa/"
  },
  "warnerbrosgames.com": {
    methods: [
      "totp"
    ]
  },
  "wbgames.com": {
    methods: [
      "totp"
    ]
  },
  "wargaming.net": {
    methods: [
      "totp"
    ],
    documentation: "https://eu.wargaming.net/support/en/products/wot/article/10568/"
  },
  "warframe.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.warframe.com/2fa-faq"
  },
  "warbyparker.com": {},
  "walmart.com": {},
  "walmart.ca": {
    methods: [
      "sms"
    ],
    documentation: "https://www.walmart.ca/en/help/article/managing-profile/7942aa05313d4fcb9ca491a78d463349"
  },
  "walgreens.com": {},
  "wallapop.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://ayuda.wallapop.com/hc/articles/7727995450129"
  },
  "wakatime.com": {},
  "wageworks.com": {
    methods: [
      "sms",
      "email"
    ],
    notes: "Employer/plan sponsor may opt to not offer 2FA."
  },
  "w3schools.com": {},
  "vystarcu.org": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://vystarcu.org/Online-Services/Internet-Banking-Access/Internet-Mobile-Banking-New-User-Enrollment"
  },
  "vy.no": {},
  "vwfs.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "VW FS app"
    ],
    "custom-hardware": [
      "photoTAN reader"
    ],
    documentation: "https://www.vwfs.de/online-banking/phototan.html"
  },
  "vudu.com": {},
  "vultr.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.vultr.com/docs/using-two-factor-authentication-to-login-to-vultr-control-panel"
  },
  "vt.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token",
      "Yubico OTP"
    ],
    documentation: "https://www.tech.it.vt.edu/2factor/"
  },
  "vse.cz": {
    methods: [
      "totp",
      "sms",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://ci.vse.cz/english/support/procedures/multi-factor-authentication-in-microsoft-365/"
  },
  "vrbo.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://help.vrbo.com/articles/How-do-I-set-up-two-factor-authentication"
  },
  "vr.fi": {},
  "vr.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "VR-SecureGo"
    ],
    "custom-hardware": [
      "TAN generator"
    ],
    documentation: "https://www.vr.de/privatkunden/unsere-produkte/was-ist-ein-girokonto/tan-verfahren.html",
    notes: "Support for 2FA types depends on regional V&R banks."
  },
  "vpsserver.com": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/pull/2311#issuecomment-273424695"
  },
  "voidu.com": {},
  "voip.ms": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://wiki.voip.ms/article/TOTP_Authentication",
    notes: "Only one of the 2FA methods can be enabled at the same time."
  },
  "vodafone.nl": {
    methods: [
      "sms"
    ],
    documentation: "https://www.vodafone.nl/support/my-vodafone/tweestapsverificatie"
  },
  "vodafone.ie": {},
  "vodafone.de": {},
  "vodafone.com.au": {},
  "vodafone.it": {},
  "vodafone.co.uk": {
    methods: [
      "sms"
    ]
  },
  "vodafone.co.nz": {},
  "vk.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://vk.com/page-777107_53677752",
    notes: "SMS is required for TOTP"
  },
  "vivup.co.uk": {
    methods: [
      "email",
      "totp"
    ]
  },
  "vivaldi.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://help.vivaldi.com/services/account/two-factor-authentication/"
  },
  "vivaldi.net": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://help.vivaldi.com/services/account/two-factor-authentication/"
  },
  "visualstudio.microsoft.com": {
    methods: [
      "sms",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/"
  },
  "visa.com.ar": {},
  "vitality.co.uk": {},
  "virustotal.com": {
    methods: [
      "totp"
    ]
  },
  "virginplus.ca": {},
  "virginmoney.com": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Virgin Money Mobile Banking App"
    ],
    documentation: "https://uk.virginmoney.com/sca"
  },
  "virginpulse.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://virginpulse.zendesk.com/hc/en-us/articles/6667851174171",
    notes: "SMS 2FA is only available for US and Canada phone numbers."
  },
  "virginmedia.ie": {},
  "virginmedia.com": {},
  "virginatlantic.com": {},
  "vinted.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.at": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.be": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.cz": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.de": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.dk": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.es": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.fi": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.fr": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.gr": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.hr": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.hu": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.ie": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.it": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.lt": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.lu": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.nl": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.pl": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.ro": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.se": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.sk": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vinted.co.uk": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.vinted.com/help/15/537"
  },
  "vimla.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "vimeo.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://vimeo.zendesk.com/hc/en-us/articles/4856243815693"
  },
  "video.ibm.com": {},
  "vicroads.vic.gov.au": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.vicroads.vic.gov.au/online-services/help-centre/two-step-verification"
  },
  "viaplay.com": {},
  "viaplay.dk": {},
  "viaplay.ee": {},
  "viaplay.fi": {},
  "viaplay.is": {},
  "viaplay.lt": {},
  "viaplay.lv": {},
  "viaplay.nl": {},
  "viaplay.no": {},
  "viaplay.pl": {},
  "viaplay.se": {},
  "viber.com": {},
  "viabtc.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.viabtc.com/hc/en-us/articles/900001693343"
  },
  "viadeo.com": {},
  "versio.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.versio.nl/nieuws/twofactor-authenticatie-nu-beschikbaar-voor-uw-klantenaccount-205"
  },
  "verpex.com": {
    methods: [
      "totp"
    ]
  },
  "verizon.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "My Verizon App"
    ],
    documentation: "https://www.verizon.com/support/keeping-your-account-safe-faqs/"
  },
  "verkkokauppa.com": {},
  "verio.com": {},
  "veracode.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://help.veracode.com/r/t_configure_mfa"
  },
  "ventraip.com.au": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://ventraip.com.au/faq/article/two-factor-authentication-faq-vipcontrol/"
  },
  "venmo.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.venmo.com/hc/en-us/articles/217532397"
  },
  "vend.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "bilbasen.dk": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "blocket.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "bytbil.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "dba.dk": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "finn.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "oikotie.fi": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "tori.fi": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "vend.dk": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "vend.fi": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "vend.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "vend.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://account.vend.no/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "veem.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.veem.com/hc/en-us/articles/360033419474-two-factor-authentication-2fa-",
    notes: "2FA via sms is available for US only."
  },
  "veeam.com": {
    methods: [
      "totp"
    ],
    documentation: "https://helpcenter.veeam.com/docs/backup/vsphere/mfa.html"
  },
  "vcu.edu": {
    methods: [
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://ts.vcu.edu/askit/essential-computing/information-security/2factor/"
  },
  "vaultcord.com": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://docs.vaultcord.com/misc/multi-factor-authentication"
  },
  "novanode.win": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://docs.vaultcord.com/misc/multi-factor-authentication"
  },
  "vasttrafik.se": {},
  "vapor.laravel.com": {
    methods: [
      "totp"
    ]
  },
  "vanguardinvestor.co.uk": {},
  "vanguard.com": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Voice Verification"
    ],
    documentation: "https://investor.vanguard.com/security/security-keys",
    notes: "Security keys can not be used to log in to mobile app or mobile website."
  },
  "vancity.com": {
    methods: [
      "sms",
      "totp",
      "call"
    ],
    documentation: "https://support.vancity.com/what-is-multi-factor-authentication-and-how-does-it-work/"
  },
  "vanguard.com.au": {
    methods: [
      "sms"
    ],
    documentation: "https://www.vanguard.com.au/personal/en/faq-details/what-is-two-factor-authentication-2-fa"
  },
  "valr.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.valr.com/hc/en-us/articles/360013860012"
  },
  "vagaro.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.vagaro.com/hc/en-us/articles/115005413687"
  },
  "va.gov": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "ID.me Authenticator"
    ],
    documentation: "https://www.va.gov/resources/verifying-your-identity-on-vagov"
  },
  "uwcu.org": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.uwcu.org/kb/Help/content/Prod-3486/"
  },
  "uwaterloo.ca": {
    methods: [
      "u2f",
      "custom-software",
      "custom-hardware",
      "sms",
      "call"
    ],
    "custom-software": [
      "Duo Mobile"
    ],
    "custom-hardware": [
      "Duo token"
    ],
    documentation: "https://uwaterloo.ca/two-factor-authentication/"
  },
  "uvic.ca": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo Mobile"
    ],
    "custom-hardware": [
      "Duo token"
    ],
    documentation: "https://www.uvic.ca/systems/services/loginspasswords/uvicmfa/"
  },
  "uts.edu.au": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://www.uts.edu.au/current-students/managing-your-course/using-uts-systems/student-forms-apps-and-systems/multi-factor-authentication"
  },
  "uspto.gov": {
    methods: [
      "email",
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.uspto.gov/learning-and-resources/account-faqs#type-managing-my-account-two-step-authentication"
  },
  "utoronto.ca": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo Mobile"
    ],
    "custom-hardware": [
      "Duo token"
    ],
    documentation: "https://isea.utoronto.ca/services/utormfa/"
  },
  "usps.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://reg.usps.com/entreg/AccountRecoveryHelpAction_input"
  },
  "usmobile.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://usmobile.frontkb.com/en/articles/237760"
  },
  "usefathom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://usefathom.com/support/two-factor-authentication"
  },
  "userway.org": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.userway.org/articles/6661204"
  },
  "uscis.gov": {
    methods: [
      "sms",
      "email",
      "totp"
    ]
  },
  "usbank.com": {
    methods: [
      "sms"
    ]
  },
  "usabilla.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.usabilla.com/hc/en-us/articles/115003081611"
  },
  "usaa.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Symantec VIP"
    ],
    documentation: "https://www.usaa.com/inet/pages/security_token_logon_options"
  },
  "us.hsbc.com": {},
  "uq.edu.au": {
    methods: [
      "u2f",
      "totp",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://my.uq.edu.au/information-and-services/information-technology/uq-accounts-and-passwords/multi-factor-authentication-mfa"
  },
  "upwork.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.upwork.com/hc/en-us/articles/360009491414"
  },
  "uptimerobot.com": {
    methods: [
      "totp"
    ],
    documentation: "https://blog.uptimerobot.com/introducing-two-factor-authentication-2fa/"
  },
  "ups.com": {},
  "uphold.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.uphold.com/hc/en-us/articles/360023791072",
    recovery: "https://support.uphold.com/hc/en-us/articles/360043633751"
  },
  "upenn.edu": {
    methods: [
      "totp",
      "custom-software",
      "sms",
      "call",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "SafeID token"
    ],
    documentation: "https://www.isc.upenn.edu/how-to/two-step-verification-getting-started"
  },
  "updraftplus.com": {
    methods: [
      "totp"
    ],
    documentation: "https://updraftplus.com/my-account/two-factor-login-security-settings/"
  },
  "upcloud.com": {
    methods: [
      "totp"
    ],
    documentation: "https://upcloud.com/resources/tutorials/two-factor-authentication",
    notes: "SMS is required for password recovery."
  },
  "zooplus.com": {},
  "up.com.au": {
    methods: [
      "sms"
    ],
    recovery: "https://up.com.au/how-to/recover-your-account/"
  },
  "up.me": {
    methods: [
      "sms"
    ],
    recovery: "https://up.com.au/how-to/recover-your-account/"
  },
  "unsw.edu.au": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://www.myit.unsw.edu.au/cyber-security/multi-factor-authentication-mfa"
  },
  "uottawa.ca": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    "custom-hardware": [
      "SafeID token"
    ],
    documentation: "https://it.uottawa.ca/security/mfa"
  },
  "unstoppabledomains.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.unstoppabledomains.com/support/solutions/articles/48001185664"
  },
  "unsplash.com": {},
  "unleashedsoftware.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.unleashedsoftware.com/hc/en-us/articles/4402216271001"
  },
  "universe.com": {},
  "unity.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.unity.com/hc/en-us/articles/208764976",
    recovery: "https://support.unity.com/hc/en-us/articles/360034757251"
  },
  "unity3d.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.unity.com/hc/en-us/articles/208764976",
    recovery: "https://support.unity.com/hc/en-us/articles/360034757251"
  },
  "uniteddomains.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.uniteddomains.com/twofactorauth/"
  },
  "ud.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.uniteddomains.com/twofactorauth/"
  },
  "united.com": {
    methods: [
      "email",
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "United App"
    ]
  },
  "united-domains.de": {
    methods: [
      "totp"
    ],
    documentation: "https://help.united-domains.de/faq-article/wie-aktiviere-ich-die-zweistufige-verifizierung-und-mache-mein-portfolio-login-sicherer",
    notes: "A phone number is required to enable two-factor authentication."
  },
  "unisuper.com.au": {
    methods: [
      "sms",
      "email"
    ],
    recovery: "https://www.unisuper.com.au/contact-us/accessing-online-accounts"
  },
  "uniregistry.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.uniregistry.help/hc/en-us/articles/115001729308"
  },
  "unionbank.co.il": {},
  "unimelb.edu.au": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://studentit.unimelb.edu.au/cybersecurity/multifactor-authentication-mfa"
  },
  "unifyfcu.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.unifyfcu.com/multi-factor-authentication-keep-bad-guys-out"
  },
  "uni-marburg.de": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.uni-marburg.de/de/hrz/dienste/2fa"
  },
  "unfuddle.com": {
    methods: [
      "totp"
    ],
    documentation: "https://unfuddle.com/stack/docs/help/two-factor-authentication/"
  },
  "unbounce.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.unbounce.com/hc/en-us/articles/360001372503"
  },
  "ulule.com": {},
  "ukraine.com.ua": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Telegram Bot"
    ],
    documentation: "https://www.ukraine.com.ua/wiki/account/security/otp/"
  },
  "umpquabank.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.umpquabank.com/personal-banking/online-banking-and-billpay/security-faqs/"
  },
  "ukpostbox.com": {
    methods: [
      "email"
    ]
  },
  "ukfast.co.uk": {
    methods: [
      "sms",
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/pull/997#issuecomment-77708501"
  },
  "uk2.net": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.uk2.net/knowledgebase/display/UK2/Two+Factor+Authentication+Security+-+2FA"
  },
  "uidaho.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://support.uidaho.edu/TDClient/KB/ArticleDet?ID=109"
  },
  "ui.com": {
    methods: [
      "totp",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "UI Verify"
    ],
    documentation: "https://help.ui.com/hc/en-us/articles/115012986607"
  },
  "ubnt.com": {
    methods: [
      "totp",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "UI Verify"
    ],
    documentation: "https://help.ui.com/hc/en-us/articles/115012986607"
  },
  "ufcstore.com": {},
  "ufcfightpass.com": {},
  "udel.edu": {
    methods: [
      "totp",
      "call",
      "sms",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://www1.udel.edu/it/help/2fa/main.html"
  },
  "udemy.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.udemy.com/hc/en-us/articles/4420349685015"
  },
  "udacity.com": {},
  "ucsf.edu": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://it.ucsf.edu/service/multi-factor-authentication-duo"
  },
  "ucsc.edu": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://slughub.ucsc.edu/its?id=kb_article&sysparm_article=KB0021200"
  },
  "ucsd.edu": {
    methods: [
      "sms",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://blink.ucsd.edu/technology/security/services/two-step-login/"
  },
  "ucsb.edu": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://it.ucsb.edu/mfa"
  },
  "ucr.edu": {
    methods: [
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://its.ucr.edu/mfa"
  },
  "ucmerced.edu": {
    methods: [
      "sms",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://it.ucmerced.edu/2FA"
  },
  "uclahealth.org": {
    methods: [
      "email",
      "sms",
      "totp"
    ]
  },
  "ucla.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://dts.ucla.edu/products-services/security/multi-factor-authentication/activate-ucla-logon-mfa"
  },
  "uci.edu": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://www.oit.uci.edu/services/accounts-passwords/duo/"
  },
  "ucdavis.edu": {
    methods: [
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://movetoduo.ucdavis.edu"
  },
  "ucas.com": {},
  "ucalgary.ca": {
    methods: [
      "custom-software",
      "totp",
      "sms",
      "call"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://it.ucalgary.ca/mfa/gettingstarted"
  },
  "ubt.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.ubt.com/learning-center/blogs/multifactor-authentication-and-your-account"
  },
  "ubisoft.com": {
    methods: [
      "email",
      "totp",
      "sms"
    ],
    documentation: "https://www.ubisoft.com/help?article=000065723",
    recovery: "https://www.ubisoft.com/help?article=000063351",
    notes: "SMS and TOTP 2FA require adding a phone number as a fallback. SMS 2FA is not available in all regions."
  },
  "ubisoftconnect.com": {
    methods: [
      "email",
      "totp",
      "sms"
    ],
    documentation: "https://www.ubisoft.com/help?article=000065723",
    recovery: "https://www.ubisoft.com/help?article=000063351",
    notes: "SMS and TOTP 2FA require adding a phone number as a fallback. SMS 2FA is not available in all regions."
  },
  "ubi.com": {
    methods: [
      "email",
      "totp",
      "sms"
    ],
    documentation: "https://www.ubisoft.com/help?article=000065723",
    recovery: "https://www.ubisoft.com/help?article=000063351",
    notes: "SMS and TOTP 2FA require adding a phone number as a fallback. SMS 2FA is not available in all regions."
  },
  "ubs.com": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "UBS Access app"
    ],
    "custom-hardware": [
      "Card Reader",
      "Access Card display"
    ],
    documentation: "https://www.ubs.com/ch/en/help/e-banking/process.html"
  },
  "uber.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.uber.com/riders/article/turn-on-2-step-verification?nodeId=b8bb9152-8c91-4f49-83c4-35cf2e1dcf72",
    notes: "2FA can only be enabled via the app"
  },
  "ubc.ca": {
    methods: [
      "u2f",
      "custom-software",
      "custom-hardware",
      "sms",
      "call"
    ],
    "custom-software": [
      "Duo Mobile"
    ],
    "custom-hardware": [
      "Duo token"
    ],
    documentation: "https://it.ubc.ca/mfa",
    recovery: "https://ubc.service-now.com/kb_view.do?sysparm_article=KB0018759"
  },
  "ubank.com.au": {},
  "ub.edu": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.ub.edu/portal/web/iub/2fa",
    notes: "VPNT\xE8cnic only supports TOTP."
  },
  "typeracer.com": {},
  "typeform.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.typeform.com/help/a/4405277894548/"
  },
  "twitch.tv": {
    methods: [
      "sms",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://help.twitch.tv/s/article/two-factor-authentication",
    notes: "To activate two factor authentication, you must provide a mobile phone number."
  },
  "twingate.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://www.twingate.com/docs/two-factor-authentication-security-policies"
  },
  "twilio.com": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.twilio.com/hc/en-us/sections/360008377353"
  },
  "tweakers.net": {
    methods: [
      "totp"
    ],
    documentation: "https://tweakers.net/plan/3096/"
  },
  "tvtropes.org": {},
  "tvtime.com": {},
  "tuta.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://tuta.com/support/#2fa"
  },
  "tutanota.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://tuta.com/support/#2fa"
  },
  "turo.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "turnitin.com": {},
  "turbotax.intuit.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://ttlc.intuit.com/questions/2902682",
    notes: "Software 2FA requires enabling SMS or phone call as a back-up."
  },
  "turbosquid.com": {
    methods: [
      "email",
      "sms"
    ],
    notes: "2FA is only available with a verified email address"
  },
  "tunnelbear.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.tunnelbear.com/hc/articles/16123360922267"
  },
  "tunecore.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.co.uk": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.ca": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.com.au": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.in": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.de": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.fr": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tunecore.it": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.tunecore.com/hc/en-us/articles/360000650226"
  },
  "tumblr.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.tumblr.com/two-factor-authentication/"
  },
  "tu.berlin": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.campusmanagement.tu-berlin.de/menue/dienste/konto_karte/tan_verfahren/",
    notes: "2FA is only available for selected services"
  },
  "tu-berlin.de": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.campusmanagement.tu-berlin.de/menue/dienste/konto_karte/tan_verfahren/",
    notes: "2FA is only available for selected services"
  },
  "tsp.gov": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.tsp.gov/account-basics/protect-your-tsp-account/"
  },
  "tu-darmstadt.de": {
    methods: [
      "totp",
      "u2f",
      "custom-hardware"
    ],
    "custom-hardware": [
      "HOTP"
    ],
    documentation: "https://www.hrz.tu-darmstadt.de/tuid-2fa",
    notes: "Only protects services that use the Identity Provider"
  },
  "tsohost.com": {},
  "tsb.co.uk": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.tsb.co.uk/otp/"
  },
  "tryhackme.com": {
    methods: [
      "totp"
    ]
  },
  "trustpilot.com": {},
  "trustage.com": {
    methods: [
      "call",
      "sms",
      "email"
    ],
    documentation: "https://www.trustage.com/my-account/help/online-account-information-faqs"
  },
  "trumf.no": {
    methods: [
      "sms"
    ],
    documentation: "https://www.trumf.no/kundeservice/#innlogging"
  },
  "norgesgruppen.no": {
    methods: [
      "sms"
    ],
    documentation: "https://www.trumf.no/kundeservice/#innlogging"
  },
  "meny.no": {
    methods: [
      "sms"
    ],
    documentation: "https://www.trumf.no/kundeservice/#innlogging"
  },
  "spar.no": {
    methods: [
      "sms"
    ],
    documentation: "https://www.trumf.no/kundeservice/#innlogging"
  },
  "truist.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    notes: "They have a custom app, but users on both iOS and Android report that it doesn't work."
  },
  "truekey.com": {
    methods: [
      "email",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "True Key Push Notification"
    ],
    "custom-hardware": [
      "Biometrics"
    ],
    documentation: "https://service.mcafee.com/?page=shell&shell=article-view&articleId=TS102352"
  },
  "troweprice.com": {
    methods: [
      "totp",
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.troweprice.com/retirement-plan-services/en/our-advantage/cyber-security/multi-factor-authentication.html"
  },
  "trovo.live": {
    methods: [
      "totp",
      "sms"
    ]
  },
  "trovi.sk": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.trovi.sk/en/getting-started/5cCNz3dpcdtETyEamRFVuE/two-factor-authentication-2fa-in-trovi/5mA49v715DG4XwfYbpfzW9"
  },
  "tripit.com": {},
  "tripadvisor.com": {},
  "trionworlds.com": {
    methods: [
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Glyph Auth"
    ],
    documentation: "https://support.trionworlds.com/hc/en-us/articles/204183357"
  },
  "trimble.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.trimble.com/s/article/What-is-Multi-Factor-Authentication"
  },
  "tresorit.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://support.tresorit.com/hc/en-us/articles/216114527",
    notes: "Requires enabling at least two 2FA methods."
  },
  "trendmicro.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://helpcenter.trendmicro.com/en-us/article/tmka-21720"
  },
  "trello.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.atlassian.com/atlassian-account/docs/manage-two-step-verification-for-your-atlassian-account/"
  },
  "treasurydirect.gov": {
    methods: [
      "email"
    ],
    documentation: "https://www.treasurydirect.gov/indiv/help/TDHelp/help_ug_274-SecFeaturesProtectAcctLearnMore.htm"
  },
  "tre.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "travel.willer.co.jp": {},
  "willer-travel.com": {},
  "travelers.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.travelers.com/about-travelers/campaigns/multifactor-authentication"
  },
  "travala.com": {
    methods: [
      "totp"
    ],
    documentation: "https://blog.travala.com/explaining-how-the-travala-wallet-functions/"
  },
  "transunion.com": {},
  "transunion.co.uk": {},
  "transunionafrica.com": {},
  "transunion.com.br": {},
  "transunion.ca": {},
  "transunionchile.cl": {},
  "transunioncentralamerica.com": {},
  "transunion.hk": {},
  "transunioncibil.com": {},
  "transunion.com.do": {},
  "transunion.co": {},
  "transunion.ph": {},
  "transunion.co.za": {},
  "transunion.co.tt": {},
  "transperth.wa.gov.au": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Transperth app"
    ]
  },
  "transip.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.transip.nl/knowledgebase/artikel/162",
    notes: "While both the main control panel and STACK support 2FA, each system is separate and requires its own setup."
  },
  "tradingview.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.tradingview.com/support/solutions/43000572460/"
  },
  "transifex.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.transifex.com/en/articles/6984122"
  },
  "trading212.com": {
    methods: [
      "totp"
    ],
    documentation: "https://helpcentre.trading212.com/hc/en-us/articles/360012452237",
    recovery: "https://helpcentre.trading212.com/hc/en-us/articles/360012493998"
  },
  "trademe.co.nz": {},
  "tpg.com.au": {
    methods: [
      "sms"
    ],
    documentation: "https://support.tpg.com.au/multi-factor-authentication-tpg"
  },
  "toshl.com": {
    methods: [
      "totp"
    ],
    documentation: "https://toshl.com/blog/two-factor-authentication-and-how-to-use-it/"
  },
  "torontomu.ca": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://www.torontomu.ca/ccs/services/ITSecurity/protecting-your-identity/two-factor-authentication/"
  },
  "towerfcu.org": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "torguard.net": {
    methods: [
      "totp"
    ]
  },
  "topcashback.co.uk": {},
  "topcashback.com": {},
  "topcashback.cn": {},
  "topcashback.jp": {},
  "topcashback.de": {},
  "topcashback.fr": {},
  "toontownrewritten.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.toontownrewritten.com/help/faq/accounts--login#twostep"
  },
  "toodledo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.toodledo.com/info/help.php#168"
  },
  "tomorrow.io": {},
  "toneden.io": {},
  "toggl.com": {},
  "tokopedia.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.tokopedia.com/help/article/bagaimana-cara-mengaktifkan-fitur-keamanan-akun"
  },
  "todopago.com.ar": {},
  "todoist.com": {
    methods: [
      "totp"
    ],
    documentation: "https://todoist.com/help/articles/how-to-enable-two-factor-authentication"
  },
  "todo.microsoft.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "tmbank.com.au": {},
  "teachersmutualbank.com.au": {},
  "tk.de": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "TK-App"
    ],
    documentation: "https://www.tk.de/techniker/unternehmensseiten/unternehmen/die-tk-app/2023678"
  },
  "tixel.com": {},
  "tivo.com": {},
  "tinyurl.com": {
    methods: [
      "totp"
    ]
  },
  "ting.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.ting.com/hc/en-us/articles/209351258"
  },
  "timetastic.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://help.timetastic.co.uk/hc/en-us/articles/360015994257"
  },
  "timetastic.us": {
    methods: [
      "totp"
    ],
    documentation: "https://help.timetastic.co.uk/hc/en-us/articles/360015994257"
  },
  "time4vps.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.time4vps.com/knowledgebase/2-factor-authentication/"
  },
  "tim.it": {},
  "tilaa.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://support.tilaa.com/hc/en-us/articles/360020167352"
  },
  "tiktok.com": {
    methods: [
      "totp",
      "sms",
      "email"
    ],
    documentation: "https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-safety"
  },
  "tiketti.fi": {},
  "tidal.com": {},
  "tickspot.com": {},
  "tickpick.com": {},
  "ticketsource.co.uk": {
    methods: [
      "totp"
    ]
  },
  "ticketsource.eu": {
    methods: [
      "totp"
    ]
  },
  "ticketsource.us": {
    methods: [
      "totp"
    ]
  },
  "ticketmaster.com": {},
  "ticketek.com.au": {},
  "ticketek.com": {},
  "ticketek.co.nz": {},
  "ticketek.co.uk": {},
  "ticketek.com.sg": {},
  "ticketek.com.ph": {},
  "ticketek.com.my": {},
  "tibia.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.tibia.com/support/?subtopic=gethelp&topicid=21"
  },
  "tiaabank.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.tiaabank.com/security?solutions=security-tools"
  },
  "tiaa-cref.org": {
    methods: [
      "sms",
      "call"
    ]
  },
  "ti.to": {
    methods: [
      "totp"
    ],
    documentation: "https://help.tito.io/en/articles/3023132"
  },
  "thrivecart.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.thrivecart.com/help/where-do-i-get-my-6-digit-access-code-2-factor-authentication"
  },
  "thriva.co": {},
  "threatx.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.threatx.com/hc/en-us/articles/360022157591"
  },
  "three.co.uk": {
    methods: [
      "sms"
    ],
    documentation: "http://www.three.co.uk/hub/stay-safe-from-fraudsters/"
  },
  "threatconnect.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.threatconnect.com/customer/en/portal/articles/2214975"
  },
  "threatlocker.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://threatlocker.kb.help/login-settings/"
  },
  "theweathernetwork.com": {},
  "thetrainline.com": {},
  "theta.tv": {},
  "therapynotes.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.therapynotes.com/article/231--"
  },
  "theiconic.com.au": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://theiconicsupport.zendesk.com/hc/articles/34125099545241"
  },
  "theiconic.co.nz": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://theiconicsupport.zendesk.com/hc/articles/34125099545241"
  },
  "theiconic.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://theiconicsupport.zendesk.com/hc/articles/34125099545241"
  },
  "thebay.com": {},
  "tfl.gov.uk": {
    methods: [
      "sms"
    ],
    documentation: "https://tfl.gov.uk/corporate/privacy-and-cookies/protecting-your-account"
  },
  "thalia.de": {},
  "textmagic.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.textmagic.com/article/set-up-two-factor-authentication-and-security/"
  },
  "test.de": {
    methods: [
      "totp"
    ],
    documentation: "https://www.test.de/Hilfe-5836822-5225600/#id5935575"
  },
  "textlocal.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.textlocal.com/support/knowledge-base/two-factor-authentication/"
  },
  "teslafi.com": {
    methods: [
      "totp"
    ],
    documentation: "https://about.teslafi.com/security/"
  },
  "tesla.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.tesla.com/support/multi-factor-authentication"
  },
  "teslamotors.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.tesla.com/support/multi-factor-authentication"
  },
  "tescobank.com": {},
  "termly.io": {},
  "termsfeed.com": {},
  "termius.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.termius.com/hc/en-us/articles/4402191604505#2fa"
  },
  "telzio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://telzio.com/support/two-factor-authentication"
  },
  "telus.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "My TELUS App"
    ],
    documentation: "https://www.telus.com/en/support/article/my-telus-2-step-verification"
  },
  "temple.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://its.temple.edu/two-step-verification"
  },
  "telstra.com.au": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "My Telstra app"
    ],
    documentation: "https://www.telstra.com.au/mytelstra/my-telstra-security"
  },
  "telstra.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "My Telstra app"
    ],
    documentation: "https://www.telstra.com.au/mytelstra/my-telstra-security"
  },
  "bigpond.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "My Telstra app"
    ],
    documentation: "https://www.telstra.com.au/mytelstra/my-telstra-security"
  },
  "bigpond.com.au": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "My Telstra app"
    ],
    documentation: "https://www.telstra.com.au/mytelstra/my-telstra-security"
  },
  "telnyx.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.telnyx.com/en/articles/3739748"
  },
  "tello.com": {
    methods: [
      "totp"
    ],
    documentation: "https://tello.com/help_center/how-do-i-set-up-and-use-two-factor-authentication"
  },
  "tellonym.me": {},
  "telia.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.telia.se/privat/support/info/logga-in-med-bankid-och-eleg-pa-mitt-telia"
  },
  "telenor.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "telemach.hr": {},
  "telekom.de": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.telekom.de/hilfe/vertrag-rechnung/login-daten-passwoerter/mehr-faktor-authentifizierung",
    notes: "Software 2FA requires setting up SMS 2FA as a fallback."
  },
  "telegram.org": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://telegram.org/blog/sessions-and-2-step-verification"
  },
  "tele2.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "techsmith.com": {},
  "techsmith.co.jp": {},
  "techsmith.de": {},
  "techsmith.es": {},
  "techsmith.fr": {},
  "technicpack.net": {
    methods: [
      "totp"
    ],
    recovery: "https://www.technicpack.net/tfa/remove"
  },
  "tebex.io": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "SMS is only a backup for TOTP 2FA."
  },
  "teamwork.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.teamwork.com/projects/security/enabling-two-factor-authentication-on-your-profile"
  },
  "teamviewer.com": {
    methods: [
      "totp"
    ],
    documentation: "https://community.teamviewer.com/English/kb/articles/4711"
  },
  "teamspeak.com": {},
  "teamsnap.com": {},
  "teams.live.com": {
    methods: [
      "sms",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/help/12408",
    notes: "2FA phone calls may not be available in all regions."
  },
  "skype.com": {
    methods: [
      "sms",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/help/12408",
    notes: "2FA phone calls may not be available in all regions."
  },
  "teachable.com": {},
  "td.com": {
    methods: [
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "TD Authenticate"
    ],
    documentation: "https://www.td.com/privacy-and-security/privacy-and-security/how-we-protect-you/online-security/2fa.jsp"
  },
  "tbcbank.ge": {},
  "taxdome.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.taxdome.com/article/95--"
  },
  "taxbit.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.taxbit.com/hc/en-us/articles/4410674012311"
  },
  "taxact.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.taxact.com/support/24138/2019/how-is-a-verification-code-used?hideLayout=True"
  },
  "targobank.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "TARGOBANK Mobile Banking"
    ],
    "custom-hardware": [
      "photoTAN card reader"
    ],
    documentation: "https://www.targobank.de/de/service/tan-verfahren/index.html"
  },
  "target.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://security.target.com/two-factor-auth/"
  },
  "tangerinetelecom.com.au": {
    methods: [
      "sms"
    ],
    documentation: "https://www.tangerinetelecom.com.au/help/what-is-multi-factor-authentication"
  },
  "tangerine.ca": {
    methods: [
      "sms"
    ],
    documentation: "https://www.tangerine.ca/en/faq/answer?permaLink=how-register-mobile-number-log-with-step-authentication--generic-phone--en--0--1&responseId=219--"
  },
  "tamu.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://it.tamu.edu/duo/"
  },
  "talktalk.co.uk": {},
  "talkdesk.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.talkdesk.com/hc/en-us/articles/360015179592"
  },
  "taiga.io": {},
  "tableau.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Salesforce Authenticator"
    ],
    documentation: "https://help.tableau.com/current/online/en-us/to_signin.htm#register-for-multifactor-authentication"
  },
  "tacobell.com": {},
  "tacobell.ca": {},
  "tacobell.co.uk": {},
  "tacobell.com.au": {},
  "tacobell.cl": {},
  "tacobell.co.cr": {},
  "tacobell.com.cy": {},
  "tacobell.com.sv": {},
  "tacobell.fi": {},
  "tacobell.com.gt": {},
  "tacobell.co.in": {},
  "tacobell.co.jp": {},
  "tacobell.com.kw": {},
  "tacobell.co.nz": {},
  "tacobell.pt": {},
  "tacobellpr.com": {},
  "taco-bell.ro": {},
  "tacobell.es": {},
  "tacobell.co.th": {},
  "taboola.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.taboola.com/hc/en-us/articles/360053360873"
  },
  "tab.com.au": {},
  "t-online.de": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.telekom.de/hilfe/vertrag-rechnung/login-daten-passwoerter/mehr-faktor-authentifizierung",
    notes: "SMS 2FA is always required"
  },
  "t-mobile.com": {
    methods: [
      "sms",
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Biometrics via T-Mobile App"
    ],
    documentation: "https://www.t-mobile.com/support/account/set-up-and-manage-your-t-mobile-id#heading4",
    notes: "Backup methods of SMS or recovery questions can't be disabled."
  },
  "szkb.ch": {
    methods: [
      "sms"
    ],
    documentation: "https://www.szkb.ch/pub/ueber-die-szkb/servicezentrum/e-services/sicherheit-im-internet"
  },
  "system76.com": {
    methods: [
      "totp",
      "sms",
      "call"
    ]
  },
  "synology.com": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://kb.synology.com/en-us/DSM/help/DSM/SecureSignIn/2factor_authentication"
  },
  "synergywholesale.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://synergywholesale.com/faq/article/can-i-enable-two-factor-authentication-on-my-wholesale-system-account/"
  },
  "synchronybank.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.synchronybank.com/why-synchrony/secure-banking/"
  },
  "sync.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://www.sync.com/help/how-do-i-setup-two-factor-authentication/"
  },
  "sydney.edu.au": {
    methods: [
      "u2f",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://www.sydney.edu.au/students/log-in-to-university-systems.html"
  },
  "swyftx.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.swyftx.com/hc/articles/12807078449305",
    recovery: "https://support.swyftx.com/hc/articles/12836682944153"
  },
  "swyftx.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://support.swyftx.com/hc/articles/12807078449305",
    recovery: "https://support.swyftx.com/hc/articles/12836682944153"
  },
  "swtor.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "The Old Republic Security Key App"
    ],
    documentation: "https://www.swtor.com/info/security-key"
  },
  "switchplus.ch": {
    methods: [
      "sms"
    ],
    documentation: "https://switchie.ch/en/2-factor-authentication-2fa/"
  },
  "swissmedical.com.ar": {},
  "swisslife.ch": {
    methods: [
      "sms"
    ]
  },
  "swisscom.ch": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Mobile ID"
    ],
    documentation: "https://www.swisscom.ch/de/privatkunden/hilfe/daten-und-rechnungen/das-swisscom-login.html#Login_Methoden"
  },
  "swinburne.edu.au": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://www.swinburne.edu.au/privacy/cybersecurity-hub/"
  },
  "swile.co": {},
  "swedbank.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.swedbank.se/foretag/digitala-tjanster/mobilt-bankid/fragor-och-svar-om-mobilt-bankid.html"
  },
  "survicate.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.survicate.com/en/articles/5006684"
  },
  "surveymonkey.com": {},
  "surfshark.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.surfshark.com/hc/en-us/articles/360011448319"
  },
  "superloop.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "superloop.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "supabase.com": {
    methods: [
      "totp"
    ],
    documentation: "https://supabase.com/docs/guides/platform/multi-factor-authentication"
  },
  "suncorpbank.com.au": {},
  "suncorp.com.au": {},
  "sumologic.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.sumologic.com/docs/manage/security/about-two-step-verification/"
  },
  "summ.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.summ.com/articles/9126168"
  },
  "cryptotaxcalculator.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.summ.com/articles/9126168"
  },
  "sugarsync.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "SugarSync App"
    ],
    documentation: "https://support.sugarsync.com/hc/en-us/articles/1260802041509"
  },
  "sucuri.net": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.sucuri.net/billing/two-factor-authentication/"
  },
  "substack.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.substack.com/hc/en-us/articles/4785929336980",
    recovery: "https://support.substack.com/hc/en-us/articles/5742110666132"
  },
  "subscribestar.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://www.subscribestar.com/posts/1320999"
  },
  "subito.it": {
    methods: [
      "email"
    ],
    recovery: "https://assistenza.subito.it/hc/articles/11599185074077"
  },
  "studioninja.co": {
    methods: [
      "totp"
    ],
    documentation: "https://help.studioninja.co/en/articles/4481947"
  },
  "studentaid.gov": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://studentaid.gov/help-center/answers/topic/managing_your_account/article/choose-between-an-authenticator-app-text-email"
  },
  "stubhub.com": {
    methods: [
      "totp"
    ]
  },
  "strongvpn.com": {},
  "stripe.com": {
    methods: [
      "sms",
      "totp",
      "u2f",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Built-in Authenticator (Biometrics)"
    ],
    documentation: "https://support.stripe.com/questions/how-do-i-enable-two-step-verification",
    recovery: "https://support.stripe.com/questions/sign-in-to-your-stripe-account-without-a-2fa-device-and-or-backup-code"
  },
  "strava.com": {},
  "strato.de": {
    methods: [
      "totp"
    ],
    documentation: "https://www.strato.de/faq/sicherheit/zwei-faktor-authentifizierung-einstellen/"
  },
  "strato.fr": {
    methods: [
      "totp"
    ],
    documentation: "https://www.strato.de/faq/sicherheit/zwei-faktor-authentifizierung-einstellen/"
  },
  "strato-hosting.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://www.strato.de/faq/sicherheit/zwei-faktor-authentifizierung-einstellen/"
  },
  "strato.es": {
    methods: [
      "totp"
    ],
    documentation: "https://www.strato.de/faq/sicherheit/zwei-faktor-authentifizierung-einstellen/"
  },
  "strato.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.strato.de/faq/sicherheit/zwei-faktor-authentifizierung-einstellen/"
  },
  "storyblocks.com": {},
  "stormgain.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.stormgain.com/articles/two-factor-authentication-google-authenticator-and-sms"
  },
  "store.steampowered.com": {
    methods: [
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Steam Mobile"
    ],
    documentation: "https://help.steampowered.com/en/faqs/view/06B0-26E6-2CF8-254C",
    recovery: "https://help.steampowered.com/en/wizard/HelpWithSteamIssue/?issueid=809",
    notes: "A phone number is required as a fallback for Steam Mobile 2FA."
  },
  "stockx.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.stockx.com/s/article/What-is-Two-Step-Verification"
  },
  "stgeorge.com.au": {},
  "stessa.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.stessa.com/en/articles/4649760#enabling-two-factor-authentication"
  },
  "steg-electronics.ch": {},
  "steelseries.com": {},
  "statuspage.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.atlassian.com/atlassian-account/docs/manage-two-step-verification-for-your-atlassian-account/"
  },
  "status.io": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://kb.status.io/security/yubikey/"
  },
  "statuscake.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.statuscake.com/kb/knowledge-base/how-to-change-the-statuscake-password-for-login/"
  },
  "stash.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://ask.stash.com/ask/what-is-two-factor-authentication/"
  },
  "statefarm.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.statefarm.com/customer-care/privacy-security/security"
  },
  "starone.org": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "startmail.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.startmail.com/hc/en-us/articles/360006682158"
  },
  "starlink.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.starlink.com/support/article/52aff4ed-3167-ec24-d54c-249563df8f5e"
  },
  "star.link": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.starlink.com/support/article/52aff4ed-3167-ec24-d54c-249563df8f5e"
  },
  "starlingbank.com": {},
  "stardock.com": {},
  "starbucks.com.au": {},
  "starbucks.com": {
    methods: [
      "sms"
    ],
    documentation: "https://customerservice.starbucks.com/sbux?id=topics&article=KB0013186"
  },
  "starbucks.co.jp": {},
  "staples.com": {},
  "stanford.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Fortitoken"
    ],
    documentation: "https://uit.stanford.edu/service/webauth/twostep"
  },
  "standardnotes.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://standardnotes.com/help/25",
    recovery: "https://standardnotes.com/help/22",
    notes: "Professional Subscription required to use hardware security key."
  },
  "stan.com.au": {},
  "stacksocial.com": {},
  "stackpath.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.stackpath.com/hc/en-us/articles/5917362460059#h2_5"
  },
  "stackfield.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.stackfield.com/help/-2032"
  },
  "stackexchange.com": {},
  "stackoverflow.com": {},
  "serverfault.com": {},
  "superuser.com": {},
  "askubuntu.com": {},
  "stackapps.com": {},
  "mathoverflow.net": {},
  "ssl.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.ssl.com/guide/how-to-enable-two-factor-2fa-authentication-for-your-ssl-com-account/"
  },
  "ssltrust.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://www.ssltrust.com.au/help/account-management/enable-2factor"
  },
  "squareup.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://squareup.com/help/us/en/article/5593",
    recovery: "https://squareup.com/help/gb/en/article/5594",
    notes: "SMS only supported in US and Canada. Only Square-linked Weebly have 2FA."
  },
  "weebly.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://squareup.com/help/us/en/article/5593",
    recovery: "https://squareup.com/help/gb/en/article/5594",
    notes: "SMS only supported in US and Canada. Only Square-linked Weebly have 2FA."
  },
  "square.site": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://squareup.com/help/us/en/article/5593",
    recovery: "https://squareup.com/help/gb/en/article/5594",
    notes: "SMS only supported in US and Canada. Only Square-linked Weebly have 2FA."
  },
  "square.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://squareup.com/help/us/en/article/5593",
    recovery: "https://squareup.com/help/gb/en/article/5594",
    notes: "SMS only supported in US and Canada. Only Square-linked Weebly have 2FA."
  },
  "ssa.gov": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.ssa.gov/myaccount/MoreInformationAboutMFA.html"
  },
  "squarespace.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.squarespace.com/hc/en-us/articles/360000044827",
    recovery: "https://support.squarespace.com/hc/en-us/articles/360023033671"
  },
  "square-enix-games.com": {
    methods: [
      "totp",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "SQUARE ENIX Software Token"
    ],
    "custom-hardware": [
      "SQUARE ENIX Security Token"
    ],
    documentation: "https://square-enix-games.com/en_US/seaccount/otp",
    notes: "The proprietary software implementation requires you to have purchased either Final Fantasy XI or Final Fantasy XIV and registered the game. Only one method is allowed at a time."
  },
  "square-enix.com": {
    methods: [
      "totp",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "SQUARE ENIX Software Token"
    ],
    "custom-hardware": [
      "SQUARE ENIX Security Token"
    ],
    documentation: "https://square-enix-games.com/en_US/seaccount/otp",
    notes: "The proprietary software implementation requires you to have purchased either Final Fantasy XI or Final Fantasy XIV and registered the game. Only one method is allowed at a time."
  },
  "sproutsocial.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.sproutsocial.com/hc/en-us/articles/213938786"
  },
  "ubereats.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.uber.com/h/b8bb9152-8c91-4f49-83c4-35cf2e1dcf72",
    notes: "2FA must be enabled via the Uber app, not the Uber Eats app."
  },
  "umich.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://www.safecomputing.umich.edu/two-factor-authentication"
  },
  "spreedly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.spreedly.com/guides/multi-factor-authentication/"
  },
  "spotify.com": {},
  "split.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.split.io/hc/articles/360020825212"
  },
  "spirit.com": {},
  "splashtop.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support-splashtopbusiness.splashtop.com/hc/en-us/articles/212724923"
  },
  "speedway.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.speedway.com/about/faq/twofactorauthentication"
  },
  "speedrun.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.speedrun.com/the_site/thread/g7osi/1"
  },
  "spectrum.com": {},
  "spectrocoin.com": {
    methods: [
      "totp",
      "sms",
      "email"
    ],
    documentation: "https://blog.spectrocoin.com/en/how-to-enable-two-factor-authentication-at-spectrocoin/"
  },
  "sparkpost.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.sparkpost.com/docs/my-account-and-profile/enabling-two-factor-authentication/"
  },
  "sparkasse.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "S-pushTAN"
    ],
    "custom-hardware": [
      "chipTAN card reader"
    ],
    documentation: "https://www.sparkasse.de/service/sicherheit-im-internet/tan-verfahren.html"
  },
  "sparda.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "SpardaSecureApp"
    ],
    "custom-hardware": [
      "chipTAN card reader"
    ],
    documentation: "https://www.sparda.de/online-sicherheit-psd2/"
  },
  "spaceship.com": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "spacehey.com": {
    methods: [
      "totp"
    ]
  },
  "southxchange.com": {
    methods: [
      "totp"
    ]
  },
  "southwesternrailway.com": {},
  "sourceforge.net": {
    methods: [
      "totp"
    ],
    documentation: "https://sourceforge.net/p/forge/documentation/Multifactor%20Authentication/"
  },
  "southwest.com": {},
  "soundcloud.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.soundcloud.com/hc/en-us/articles/20707203094043"
  },
  "sonic.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.sonic.com/hc/en-us/articles/236079387"
  },
  "sosh.fr": {},
  "sonix.ai": {
    methods: [
      "totp"
    ],
    documentation: "https://help.sonix.ai/en/articles/4188823"
  },
  "solarwinds.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.solarwinds.com/en/success_center/pingdom/content/shared/mfa-users.htm"
  },
  "pingdom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.solarwinds.com/en/success_center/pingdom/content/shared/mfa-users.htm"
  },
  "papertrail.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.solarwinds.com/en/success_center/pingdom/content/shared/mfa-users.htm"
  },
  "appoptics.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.solarwinds.com/en/success_center/pingdom/content/shared/mfa-users.htm"
  },
  "loggly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.solarwinds.com/en/success_center/pingdom/content/shared/mfa-users.htm"
  },
  "solarwinds.cloud": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.solarwinds.com/en/success_center/pingdom/content/shared/mfa-users.htm"
  },
  "solarweb.com": {},
  "sogolytics.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.sogolytics.com/help/2-step-authentication/"
  },
  "softr.io": {},
  "sofi.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://support.sofi.com/hc/en-us/articles/9274826655757"
  },
  "socketlabs.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.socketlabs.com/docs/two-step-verification"
  },
  "socalgas.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.socalgas.com/help-center/2-factor-authentication"
  },
  "sncf-connect.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.sncf-connect.com/en-en/help/your-customer-account"
  },
  "oui.sncf": {
    methods: [
      "email"
    ],
    documentation: "https://www.sncf-connect.com/en-en/help/your-customer-account"
  },
  "snapdeal.com": {},
  "snapchat.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.snapchat.com/hc/sections/5685887734676"
  },
  "smythstoys.com": {},
  "smspool.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.smspool.net/article/eb7a182841"
  },
  "smugmug.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.smugmughelp.com/hc/articles/19399691642132"
  },
  "smoothcomp.com": {},
  "smbc.co.jp": {},
  "smarty.co.uk": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://help.smarty.co.uk/en/articles/5390803"
  },
  "smartvault.com": {
    methods: [
      "email",
      "sms",
      "call"
    ],
    documentation: "https://help.smartvault.com/hc/en-us/articles/360051275493"
  },
  "smartthings.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.samsung.com/membership/guide/setup-2step-verification"
  },
  "smartsurvey.co.uk": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.smartsurvey.co.uk/article/two-factor-authentication",
    notes: "SMS 2FA is only available for Enterprise users."
  },
  "smartsimple.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "RSA token"
    ],
    documentation: "https://wiki.smartsimple.com/wiki/Two-Factor_Authentication"
  },
  "smartrip.wmata.com": {},
  "smartly.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.smartly.io/hc/en-us/articles/360003493934"
  },
  "smarkets.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.smarkets.com/hc/en-gb/articles/115000822171"
  },
  "sling.com": {},
  "slack.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://get.slack.help/hc/en-us/articles/204509068"
  },
  "slideshare.net": {},
  "sl.se": {},
  "skrill.com": {
    methods: [
      "email",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Skrill App Push Notification"
    ],
    documentation: "https://skrill.com/en-us/support#/path/1753623122",
    notes: "Email method requires an additional PIN"
  },
  "skinport.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "sketchup.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.sketchup.com/admin/multi-factor-authentication"
  },
  "sketch.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.sketch.com/docs/workspaces/managing-your-sketch-account/",
    recovery: "https://help.sketch.com/manage-account/two-factor-auth"
  },
  "skandia.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.skandia.se/kontakta-skandia/kundservice/bankid-logga-in/"
  },
  "skanetrafiken.se": {},
  "sjsu.edu": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://sjsu.edu/it/security/multi-factor/duo-setup.php"
  },
  "sjsu.okta.com": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://sjsu.edu/it/security/multi-factor/duo-setup.php"
  },
  "sj.se": {
    methods: [
      "sms",
      "call"
    ]
  },
  "sixthcontinent.com": {},
  "sixt.com": {},
  "siteground.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.siteground.com/kb/enable-two-step-verification/"
  },
  "site123.com": {
    methods: [
      "sms"
    ]
  },
  "sisense.com": {
    methods: [
      "totp"
    ],
    documentation: "https://dtdocs.sisense.com/article/two-factor"
  },
  "sipgate.de": {
    methods: [
      "totp"
    ],
    documentation: "https://help.sipgate.de/hc/de/articles/4421549797649"
  },
  "singpass.gov.sg": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Singpass app"
    ],
    "custom-hardware": [
      "Biometrics"
    ],
    documentation: "https://www.singpass.gov.sg/main/html/faq.html"
  },
  "singlekey-id.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://singlekey-id.com/auth/en-us/frequently-asked-questions#two-step-authentication"
  },
  "sinch.com": {
    methods: [
      "sms"
    ],
    documentation: "https://community.sinch.com/t5/Account-Management/How-do-I-enable-2FA-in-the-Sinch-Customer-Dashboard/ta-p/7191"
  },
  "simyo.nl": {},
  "simplybook.me": {
    methods: [
      "totp"
    ],
    documentation: "https://help.simplybook.me/index.php/Google_Authenticator_custom_feature",
    notes: "2FA is only available as a 'custom feature' and must be enabled by an admin before use."
  },
  "simplisafe.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.simplisafe.com/articles/account-billing/multifactor-authentication-mfa-for-simplisafe-accounts/64beb488633e864d94307c2c"
  },
  "simplii.com": {
    methods: [
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "Simplii App Push Notification"
    ],
    documentation: "https://simplii.intelliresponse.com/index.jsp?requestType=NormalRequest&source=3&id=2453&sessionId=98d8d6f6-50df-11ed-bb3e-d1cbac750b11&question=Why+can+I+no+longer+receive+my+one-time+verification+code+%28OTVC%29+by+email"
  },
  "simplelogin.io": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "similarweb.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.similarweb.com/hc/en-us/articles/360016545238"
  },
  "signupgenius.com": {},
  "signnow.com": {
    methods: [
      "email"
    ]
  },
  "signrequest.com": {
    methods: [
      "totp",
      "sms",
      "call"
    ],
    documentation: "https://help.signrequest.com/hc/en-us/articles/360004932594"
  },
  "signal.org": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.signal.org/hc/articles/360007059792"
  },
  "sign.plus": {
    methods: [
      "totp"
    ],
    documentation: "https://help.alohi.com/hc/en-us/articles/10305460302876#h_01HQND8H36NDF3HTF1Y7WEBFGP"
  },
  "sigfig.com": {},
  "sierra.com": {},
  "sidequestvr.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "shy.gg": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.shy.gg/essentials/two-factor-auth"
  },
  "shu.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://tech-shu-edu.refined.site/space/PUBLICKBA/2096431118/Guide%20to%20Enrolling%20a%20Device%20in%20Duo"
  },
  "shrimpy.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.shrimpy.io/hc/en-us/articles/1260803097310"
  },
  "shortcut.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.shortcut.com/hc/en-us/articles/360044506931"
  },
  "clubhouse.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.shortcut.com/hc/en-us/articles/360044506931"
  },
  "short.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.short.io/en/articles/4065798"
  },
  "shopify.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.shopify.com/manual/your-account/account-security/two-step-authentication",
    notes: "U2F requires using a Shopify ID. U2F can't be used on the Shopify mobile app, the Shopify POS app, or the Shopify Inbox app."
  },
  "shophumm.com": {},
  "shoeboxed.com": {},
  "shopback.com": {},
  "shopback.com.au": {},
  "shopback.de": {},
  "shopback.com.hk": {},
  "shopback.co.id": {},
  "shopback.my": {},
  "shopback.ph": {},
  "shopback.sg": {},
  "shopback.co.kr": {},
  "shopback.tw": {},
  "shopback.co.th": {},
  "shopback.vn": {},
  "shipstation.com": {},
  "shift4shop.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.3dcart.com/knowledgebase/article/View/866/11/"
  },
  "shareworks.com": {
    methods: [
      "totp"
    ]
  },
  "solium.com": {
    methods: [
      "totp"
    ]
  },
  "shadow.tech": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.shadow.tech/hc/en-us/articles/8741331563676"
  },
  "sfu.ca": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "HyperOTP"
    ],
    documentation: "https://www.sfu.ca/information-systems/services/mfa/"
  },
  "sezzle.com": {
    methods: [
      "sms"
    ],
    documentation: "https://merchant-help.sezzle.com/hc/en-us/articles/16960335317908",
    notes: "MFA is available for merchants only."
  },
  "sffirecu.org": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://sffirecu.org/how-to-use-a-2fa-application"
  },
  "seznam.cz": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Seznam.cz mobile app"
    ],
    documentation: "https://napoveda.seznam.cz/cz/login/dvoufazove-overeni/"
  },
  "serviceportal.hamburg.de": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "National identity card"
    ],
    documentation: "https://serviceportal.hamburg.de/HamburgGateway/FVP/FV/BasisHilfe/HilfeA-Z.aspx#Wie_kann_ich_die_Funktion_%E2%80%9EAnmelden_mit_Online-Ausweisfunktion%E2%80%9C_einrichten?"
  },
  "servus.ca": {
    methods: [
      "totp"
    ],
    documentation: "https://www.servus.ca/security/protect-yourself/two-step-authentication"
  },
  "servicecu.org": {},
  "service.vic.gov.au": {},
  "service.nsw.gov.au": {
    methods: [
      "sms"
    ],
    documentation: "https://www.service.nsw.gov.au/services/myservicensw-account/turn-on-2-step-authentication"
  },
  "serverspace.io": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://serverspace.io/support/help/how-to-install-and-use-the-google-authenticator-application/"
  },
  "serverpilot.io": {
    methods: [
      "totp"
    ],
    documentation: "https://serverpilot.io/docs/how-to-enable-two-factor-authentication/"
  },
  "serverless.com": {},
  "server.pro": {
    methods: [
      "totp"
    ]
  },
  "server.nitrado.net": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://server.nitrado.net/en-US/guides/two-factor-authentication-en"
  },
  "serif.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://store.serif.com/help/two-step-verification/"
  },
  "sentry.rmu.edu": {},
  "senko.digital": {
    methods: [
      "totp"
    ],
    documentation: "https://wiki.senko.digital/personal-area/two-factor-authentication",
    notes: "While both the main client area and game panel support 2FA, each system is separate and requires its own setup."
  },
  "sentry.io": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://blog.sentry.io/2016/06/22/introducing-2fa"
  },
  "senecalearning.com": {},
  "sendsafely.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://blog.sendsafely.com/authenticator-app",
    notes: "TOTP 2FA requires SMS as a backup option"
  },
  "sendowl.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.sendowl.com/help/two-factor-authentication"
  },
  "sendgrid.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://sendgrid.com/docs/ui/account-and-settings/two-factor-authentication/"
  },
  "sendcloud.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.sendcloud.com/hc/en-gb/articles/4418777976212#1"
  },
  "semrush.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.semrush.com/kb/1130--"
  },
  "semaphoreci.com": {
    methods: [
      "totp"
    ],
    documentation: "https://semaphoreci.com/docs/two-step-verification.html"
  },
  "sellix.io": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.sellix.io/en/articles/4502811"
  },
  "selfwealth.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://www.selfwealth.com.au/two-factor-authentication-now-available/"
  },
  "sefcu.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://www.sefcu.com/node/11406/tutorial"
  },
  "segment.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://segment.com/docs/iam/mfa/",
    notes: "SMS 2FA is only available for US and Canada phone numbers."
  },
  "segment.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://segment.com/docs/iam/mfa/",
    notes: "SMS 2FA is only available for US and Canada phone numbers."
  },
  "securitytrails.com": {
    methods: [
      "totp"
    ],
    documentation: "https://securitytrails.com/support/knowledge-base/two-factor-authentication-2fa-2/"
  },
  "securesafe.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.securesafe.com/en/faq/general-questions/how-can-i-activate-2-factor-authentication/",
    notes: "2FA is only available on paid plans."
  },
  "secure.checkout.visa.com": {},
  "section.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.section.io/docs/how-to/user-management/enable-two-factor-authentication-on-your-account/"
  },
  "seb.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://seb.se/privat/digitala-tjanster"
  },
  "seatgeek.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.seatgeek.com/hc/en-us/articles/360007288013"
  },
  "seamless.com": {},
  "sdge.com": {},
  "se.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.se.com/ww/en/faqs/FAQ000220689/"
  },
  "schneider-electric.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.se.com/ww/en/faqs/FAQ000220689/"
  },
  "schneider-electric.cn": {
    methods: [
      "totp"
    ],
    documentation: "https://www.se.com/ww/en/faqs/FAQ000220689/"
  },
  "sdfcu.org": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.sdfcuib.org/dbank/live/static/help.html#update_security_options"
  },
  "sdfcuib.org": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.sdfcuib.org/dbank/live/static/help.html#update_security_options"
  },
  "sdccu.com": {},
  "scu.edu": {
    methods: [
      "sms",
      "custom-software",
      "u2f",
      "call"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://scu.edu/technology/get-connected/duo/learn-more-about-2fa/"
  },
  "scriptinghelpers.org": {
    methods: [
      "totp"
    ]
  },
  "scryfall.com": {
    methods: [
      "totp"
    ],
    documentation: "https://scryfall.com/docs/privacy#scryfall-accounts"
  },
  "scotrail.co.uk": {},
  "scotiabank.com": {
    methods: [
      "call",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Scotiabank App"
    ],
    documentation: "https://www.scotiabank.com/ca/en/personal/bank-your-way/digital-banking-guide/banking-basics/two-step-verification.html"
  },
  "scribd.com": {},
  "scorptec.com.au": {},
  "schwab.com": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Symantec VIP"
    ],
    "custom-hardware": [
      "Symantec VIP token"
    ],
    documentation: "https://www.schwab.com/help/two-factor-authentication"
  },
  "schwabplan.com": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Symantec VIP"
    ],
    "custom-hardware": [
      "Symantec VIP token"
    ],
    documentation: "https://www.schwab.com/help/two-factor-authentication"
  },
  "schoolsoft.se": {},
  "schoolsfirstfcu.org": {
    methods: [
      "sms",
      "call"
    ]
  },
  "sce.com": {},
  "schibsted.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "adressa.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "aftenbladet.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "aftenposten.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "aftonbladet.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "bt.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "e24.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "fvn.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "godt.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "klart.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "minmote.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "omni.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "pent.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "podme.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "schibsted.dk": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "schibsted.fi": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "schibsted.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "schibsted.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "svd.se": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "tek.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "tronderbladet.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "tv.nu": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "vg.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa",
    recovery: "https://payment.schibsted.no/profile-pages/faq#how-to-activate-and-deactivate-2fa:~:text=Mistet%20autentiseringsenhet%3F"
  },
  "scalr.com": {
    methods: [
      "totp"
    ],
    documentation: "https://scalr-wiki.atlassian.net/wiki/display/docs/Two-Factor+Authentication"
  },
  "scaleway.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.scaleway.com/docs/account/how-to/use-2fa/"
  },
  "scalegrid.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.scalegrid.io/docs/account-two-factor-authentication"
  },
  "scalefusion.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.mobilock.in/article/6j7ps7cw8x",
    notes: "Only account owners and co-account owners can enable 2FA."
  },
  "scalable.capital": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Scalable Capital app"
    ],
    documentation: "https://de.scalable.capital/faq#sicherheit-datenschutz"
  },
  "sbishinseibank.co.jp": {},
  "shinseibank.com": {},
  "saucelabs.com": {},
  "saturn.de": {},
  "satoshitango.com": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/pull/2321#issuecomment-273971890"
  },
  "sasktel.com": {},
  "santander.pt": {
    methods: [
      "sms"
    ],
    documentation: "https://www.santander.pt/pt_PT/Particulares/Informacoes/psd2-diretiva-servicos-pagamento.html"
  },
  "santander.pl": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Santander mobile app"
    ],
    documentation: "https://www.santander.pl/klient-indywidualny/kontakt/pytania-i-odpowiedzi-bankowosc-internetowa"
  },
  "santander.de": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "SantanderSign"
    ],
    documentation: "https://www.santander.de/privatkunden/service-kontakt/information/faq/psd2/"
  },
  "santander.com.ar": {},
  "santander.com.br": {},
  "santander.co.uk": {},
  "sans.org": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "sanebox.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.sanebox.com/help/127"
  },
  "sandbox.game": {},
  "samsung.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://account.samsung.com/membership/guide/2step/"
  },
  "sailthru.com": {
    methods: [
      "totp"
    ],
    documentation: "https://getstarted.sailthru.com/mfa/mfa-hub/login-mfa/",
    notes: "You must contact Sailthru support to enable 2FA."
  },
  "salesforce.com": {
    methods: [
      "sms",
      "email",
      "totp",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Salesforce Authenticator"
    ],
    documentation: "https://developer.salesforce.com/docs/atlas.en-us.securityImplGuide.meta/securityImplGuide/add_time-based_token.htm"
  },
  "sailpoint.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "RSA SecurID",
      "Symantec VIP"
    ],
    notes: "Applies to IdentityIQ and IdentityNow."
  },
  "safecu.org": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.safecu.org/personal/online-security/enhanced-login-security"
  },
  "ryver.com": {},
  "ryanair.com": {},
  "runtastic.com": {},
  "runpanther.io": {
    methods: [
      "totp"
    ]
  },
  "runsignup.com": {
    methods: [
      "totp"
    ],
    documentation: "https://runsignup.blog/2018/09/06/multi-factor-authentication/"
  },
  "runkeeper.com": {},
  "runescape.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.runescape.com/hc/en-gb/articles/206811835"
  },
  "runcloud.io": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://runcloud.io/docs/account/authentication.html"
  },
  "runbox.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.runbox.com/account-security/"
  },
  "rug.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.rug.nl/society-business/centre-for-information-technology/security/multi-factor-authentication"
  },
  "royalroads.ca": {},
  "rubygems.org": {
    methods: [
      "totp"
    ],
    documentation: "https://guides.rubygems.org/setting-up-multifactor-authentication/"
  },
  "rollbar.com": {
    methods: [
      "totp"
    ],
    documentation: "https://rollbar.com/docs/two-factor-authentication/"
  },
  "roku.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.roku.com/article/22482363662103"
  },
  "rogers.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.rogers.com/support/billing-accounts/understanding-multi-factor-authentication"
  },
  "shaw.ca": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.rogers.com/support/billing-accounts/understanding-multi-factor-authentication"
  },
  "rocketmortgage.com": {},
  "rockstargames.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.rockstargames.com/articles/360000031747"
  },
  "roborock.com": {},
  "rocket-league.com": {},
  "rocketbeans.tv": {
    methods: [
      "totp"
    ],
    documentation: "https://forum.rocketbeans.tv/t/35407/31"
  },
  "roboform.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.roboform.com/hc/en-us/articles/115002729512"
  },
  "roblox.com": {
    methods: [
      "totp",
      "email",
      "u2f"
    ],
    documentation: "https://en.help.roblox.com/hc/en-us/articles/212459863",
    notes: "U2F requires TOTP to be setup. U2F is currently only supported in web browsers."
  },
  "robinhood.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Robinhood app"
    ],
    documentation: "https://robinhood.com/support/articles/verifying-its-you/"
  },
  "robertsspaceindustries.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.robertsspaceindustries.com/hc/en-us/articles/115009965628"
  },
  "rmit.edu.au": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://www.rmit.edu.au/students/support-and-facilities/it-services-for-students/cyber-safety/multi-factor-authentication"
  },
  "rivian.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://rivian.com/support/article/what-is-two-factor-authentication"
  },
  "river.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://river.com/support/knowledge-base/articles/enable-multi-factor-authentication"
  },
  "risk.lexisnexis.com": {},
  "rippling.com": {
    methods: [
      "totp"
    ]
  },
  "ripio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://launchpad.ripio.com/blog/que-es-autenticacion-dos-factores-2fa"
  },
  "ripe.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.ripe.net/participate/member-support/ripe-ncc-access/two-step-verification"
  },
  "ringcentral.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://support.ringcentral.com/article/Enabling-or-disabling-Account-Validation.html"
  },
  "riotgames.com": {
    methods: [
      "email"
    ],
    documentation: "https://support-valorant.riotgames.com/hc/articles/4415709691667"
  },
  "leagueoflegends.com": {
    methods: [
      "email"
    ],
    documentation: "https://support-valorant.riotgames.com/hc/articles/4415709691667"
  },
  "playvalorant.com": {
    methods: [
      "email"
    ],
    documentation: "https://support-valorant.riotgames.com/hc/articles/4415709691667"
  },
  "playruneterra.com": {
    methods: [
      "email"
    ],
    documentation: "https://support-valorant.riotgames.com/hc/articles/4415709691667"
  },
  "lolesports.com": {
    methods: [
      "email"
    ],
    documentation: "https://support-valorant.riotgames.com/hc/articles/4415709691667"
  },
  "ring.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.ring.com/hc/en-us/articles/360039693891"
  },
  "rightcapital.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.rightcapital.com/article/40-two-step-verification"
  },
  "rge.com": {},
  "rewind.com": {
    methods: [
      "totp"
    ],
    documentation: "https://rewind.com/blog/how-to-set-up-a-2fa-for-rewind/"
  },
  "revolut.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Revolut App"
    ],
    documentation: "https://www.revolut.com/en-US/help/more/revolut-web-app/accessing-the-retail-web-app"
  },
  "revenuecat.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.revenuecat.com/docs/security"
  },
  "rev.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://support.rev.com/hc/en-us/articles/360035810851"
  },
  "retroachievements.org": {},
  "rest.com.au": {
    methods: [
      "sms"
    ]
  },
  "restream.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.restream.io/en/articles/870429"
  },
  "restorecord.com": {
    methods: [
      "totp"
    ]
  },
  "resend.com": {
    methods: [
      "totp"
    ]
  },
  "resolver.co.uk": {},
  "republic.com": {
    methods: [
      "totp"
    ],
    documentation: "https://republic.com/help/how-do-i-add-a-digital-asset-wallet-on-republic-1"
  },
  "republic.co": {
    methods: [
      "totp"
    ],
    documentation: "https://republic.com/help/how-do-i-add-a-digital-asset-wallet-on-republic-1"
  },
  "fig.co": {
    methods: [
      "totp"
    ],
    documentation: "https://republic.com/help/how-do-i-add-a-digital-asset-wallet-on-republic-1"
  },
  "report-uri.com": {
    methods: [
      "totp"
    ],
    documentation: "https://scotthelme.co.uk/dealing-with-account-recovery-and-2fa/"
  },
  "replicon.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://www.replicon.com/help/setting-up-your-multi-factor-2-step-authentication-method/"
  },
  "repairshopr.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://feedback.repairshopr.com/knowledgebase/articles/928266",
    notes: "SMS only available as a backup to Google Authenticator."
  },
  "replit.com": {},
  "repl.it": {},
  "render.com": {
    methods: [
      "totp"
    ]
  },
  "remotedesktopmanager.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.remotedesktopmanager.com/howto_googleauthenticator.htm",
    notes: "2FA is only available on the Enterprise Edition"
  },
  "remitly.com": {
    methods: [
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "Remitly app"
    ],
    documentation: "https://help.remitly.com/s/article/two-factor-authentication-verification"
  },
  "remitano.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.remitano.com/en/articles/781044"
  },
  "remind.com": {
    methods: [
      "email"
    ],
    documentation: "https://help.remind.com/hc/en-us/articles/360017140539"
  },
  "rejoiner.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.rejoiner.com/docs/user-account#managing-two-factor-authentication"
  },
  "rememberthemilk.com": {},
  "registro.br": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://registro.br/ajuda/gerenciamento-de-conta/token/"
  },
  "register365.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.register365.com/support/articles/enabling-two-factor-authentication-for-the-control-panel/"
  },
  "regions.com": {},
  "refersion.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.refersion.com/en/articles/2989703",
    notes: "SMS 2FA is not available in all regions."
  },
  "redshelf.com": {
    methods: [
      "totp"
    ],
    documentation: "https://solve.redshelf.com/hc/en-us/articles/1260802590609"
  },
  "redis.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://docs.redis.com/latest/rc/security/access-control/multi-factor-authentication/",
    notes: "SMS 2FA must be enabled before TOTP 2FA can be enabled. SMS 2FA cannot be disabled even when TOTP is enabled."
  },
  "redislabs.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://docs.redis.com/latest/rc/security/access-control/multi-factor-authentication/",
    notes: "SMS 2FA must be enabled before TOTP 2FA can be enabled. SMS 2FA cannot be disabled even when TOTP is enabled."
  },
  "redhat.com": {
    methods: [
      "totp"
    ],
    documentation: "https://access.redhat.com/documentation/en-us/red_hat_customer_portal/1/html-single/using_two-factor_authentication/index"
  },
  "reddit.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.reddithelp.com/hc/en-us/articles/360043470031"
  },
  "redenergy.com.au": {},
  "recurly.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://docs.recurly.com/docs/two-factor-authentication"
  },
  "redbus.in": {},
  "recruitee.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.recruitee.com/en/articles/5209837"
  },
  "rebrandly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.rebrandly.com/hc/en-us/articles/360007220373"
  },
  "realvnc.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.realvnc.com/hc/en-us/articles/360003110878"
  },
  "rebel.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.rebel.com/hc/en-us/articles/360039417613",
    notes: "You must contact customer support to enable 2FA."
  },
  "realme.govt.nz": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.realme.govt.nz/help/#second-factor-authentication"
  },
  "realestate.com.au": {},
  "realcommercial.com.au": {},
  "property.com.au": {},
  "readthedocs.org": {},
  "readme.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.readme.com/docs/two-factor-authentication"
  },
  "readme.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.readme.com/docs/two-factor-authentication"
  },
  "rbs.co.uk": {
    methods: [
      "sms"
    ],
    documentation: "https://personal.rbs.co.uk/personal/fraud-and-security/sca.html"
  },
  "rcwilley.com": {},
  "rbcroyalbank.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "RBC App Push Notification"
    ],
    documentation: "https://www.rbcroyalbank.com/ways-to-bank/tutorials/general/2-step-verification.html",
    notes: "2FA can only be enabled via the app"
  },
  "rbcdirectinvesting.com": {},
  "razer.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://mysupport.razer.com/app/answers/detail/a_id/1716"
  },
  "rb.cz": {},
  "raygun.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://raygun.com/documentation/privacy-security/two-factor-auth/"
  },
  "raycast.com": {
    methods: [
      "totp"
    ]
  },
  "ravelin.com": {
    methods: [
      "totp"
    ],
    documentation: "https://ravelin.zendesk.com/hc/en-us/articles/115001071665"
  },
  "rapidgator.net": {
    methods: [
      "totp"
    ]
  },
  "raspberrypi.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.raspberrypi.com/documentation/services/id.html"
  },
  "rapidapi.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.rapidapi.com/docs/account-creation-and-settings#two-factor-authentication-2fa"
  },
  "ramnode.com": {
    methods: [
      "totp"
    ],
    documentation: "https://clientarea.ramnode.com/knowledgebase.php?action=displayarticle&id=4129"
  },
  "rakuten.com": {},
  "rakuten.co.jp": {},
  "ramp.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.ramp.com/hc/en-us/articles/5775209997715"
  },
  "raizinvest.com.au": {
    methods: [
      "email"
    ],
    documentation: "https://raizinvest.com.au/blog/verifying-raiz-account-multifactor-authentication/"
  },
  "raisin.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "weltsparen.at": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "raisin.nl": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "raisin.es": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "raisin.fr": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "raisin.ie": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "raisin.co.uk": {
    methods: [
      "sms",
      "call",
      "totp"
    ]
  },
  "raindrop.io": {
    methods: [
      "totp"
    ],
    documentation: "https://raindropio.canny.io/feature-requests/p/two-factor-authentication-2fa"
  },
  "railway.app": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.railway.app/reference/accounts#two-factor-authentication"
  },
  "racv.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.racv.com.au/help-and-support/account-membership.html#Whatistwostepverification"
  },
  "racq.com.au": {},
  "rabobank.nl": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "Rabo Scanner"
    ],
    documentation: "https://www.rabobank.nl/bedrijven/betalen/zelf-betalingen-doen/rabo-scanner/"
  },
  "rackspace.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.rackspace.com/docs/multi-factor-authentication"
  },
  "rabobank.com.au": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "Digipass"
    ],
    documentation: "https://www.rabobank.com.au/help-and-support/digipass#how-to-set-up-your-digipass-for-the-first-time",
    recovery: "https://www.rabobank.com.au/help-and-support/digipass#i-have-lost-my-digipass-how-do-i-get-a-new-one"
  },
  "quora.com": {
    methods: [
      "email"
    ]
  },
  "quizlet.com": {},
  "quidax.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.quidax.com/hc/en-us/articles/360016734491"
  },
  "quidco.com": {},
  "quicken.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.quicken.com/support/secure-login-mfa-information"
  },
  "quickfile.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://community.quickfile.co.uk/t/2-factor-authentication/8892"
  },
  "quickbooks.intuit.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "email"
    ],
    documentation: "https://quickbooks.intuit.com/learn-support/en-us/manage-passwords/verify-your-account-with-multi-factor-authentication/00/186340",
    notes: "TOTP 2FA only available after enabling SMS or phone 2FA."
  },
  "questrade.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "email"
    ],
    documentation: "https://www.questrade.com/learning/questrade-basics/lesson/account-profile-and-security"
  },
  "questionpro.com": {
    methods: [
      "sms"
    ],
    documentation: "https://questionpro.com/help/two-factor-authentication.html"
  },
  "qtrade.ca": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://help.qtrade.ca/hc/en-ca/articles/4640357680283"
  },
  "qt.io": {},
  "qnap.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://www.qnap.com/en-us/how-to/tutorial/article/how-to-enhance-account-security-using-2-step-verification"
  },
  "qobuz.com": {},
  "qlik.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Introduction/qcs-MFA.htm"
  },
  "talend.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.qlik.com/en-US/cloud-services/Subsystems/Hub/Content/Sense_Hub/Introduction/qcs-MFA.htm"
  },
  "qiwi.com": {},
  "qantas.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://qantas.com/au/en/frequent-flyer/member-account-security.html#frequently-asked-questions"
  },
  "pz.gov.pl": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "mObywatel app"
    ],
    documentation: "https://pz.gov.pl/Instrukcja_Uzytkownika_PZ.pdf"
  },
  "pypi.org": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://pypi.org/help/#twofa"
  },
  "pythonanywhere.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.pythonanywhere.com/pages/SecuringYourAccount/"
  },
  "putler.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.putler.com/documentation/activate-2fa-on-your-putler-account/"
  },
  "puter.com": {
    methods: [
      "totp"
    ]
  },
  "put.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.put.io/en/articles/4783180-two-factor-authentication-2fa",
    recovery: "https://help.put.io/en/articles/4783180-two-factor-authentication-2fa#h_634b28a1c9"
  },
  "pushover.net": {
    methods: [
      "totp"
    ],
    documentation: "https://support.pushover.net/i49"
  },
  "pusher.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.pusher.com/hc/en-us/articles/4411997260049"
  },
  "purse.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.purse.io/en/article/2-factor-authentication-2fa-xa8jxn/"
  },
  "purolator.com": {},
  "purevpn.com": {},
  "purdue.edu": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "BoilerKey Hardware OTP"
    ],
    documentation: "https://www.it.purdue.edu/login/"
  },
  "ptv.vic.gov.au": {},
  "publishers.basicattentiontoken.org": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.brave.com/hc/en-us/articles/360021649491"
  },
  "psu.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://get2fa.psu.edu"
  },
  "psnprofiles.com": {
    methods: [
      "totp"
    ],
    notes: "2FA is configured via your linked PSNProfiles forum profile settings."
  },
  "prudential.com": {
    methods: [
      "sms"
    ]
  },
  "prowrestlingtees.com": {},
  "providentmetals.com": {},
  "proton.me": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://proton.me/support/two-factor-authentication-2fa",
    notes: "TOTP must be enabled to use a hardware token."
  },
  "pm.me": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://proton.me/support/two-factor-authentication-2fa",
    notes: "TOTP must be enabled to use a hardware token."
  },
  "protonmail.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://proton.me/support/two-factor-authentication-2fa",
    notes: "TOTP must be enabled to use a hardware token."
  },
  "protonvpn.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://proton.me/support/two-factor-authentication-2fa",
    notes: "TOTP must be enabled to use a hardware token."
  },
  "protolabs.com": {
    methods: [
      "totp"
    ]
  },
  "prostocash.com": {
    methods: [
      "totp"
    ]
  },
  "promoter.io": {},
  "progressive.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "profitwell.com": {
    methods: [
      "totp"
    ],
    documentation: "https://learn.profitwell.com/article/wsudrpi199-setting-up-2-factor-authentication"
  },
  "product.gree.net": {
    methods: [
      "totp"
    ]
  },
  "produbanco.com.ec": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Entrust Identity"
    ],
    documentation: "https://www.produbanco.com.ec/media/677613/manual-activaci%C3%B3n-token-digital2021.pdf"
  },
  "probit.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.probit.com/en-us/hc/360018127111"
  },
  "privateinternetaccess.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.privateinternetaccess.com/helpdesk/kb/articles/how-do-i-enable-and-use-two-factor-authentication"
  },
  "privacy.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.privacy.com/hc/en-us/articles/360012047174"
  },
  "printique.com": {},
  "principal.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://secure02.principal.com/publicvsupply/GetFile?fm=ww42&ty=VOP&EXT=.VOP"
  },
  "prezi.com": {},
  "practicebetter.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.practicebetter.io/hc/en-us/articles/360055519791"
  },
  "preyproject.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.preyproject.com/article/248--"
  },
  "practicepanther.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.practicepanther.com/en/articles/1658238"
  },
  "pozible.com": {},
  "powerschool.com": {},
  "powerreviews.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.powerreviews.com/hc/en-us/articles/7277746655771"
  },
  "povo.jp": {},
  "postype.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.postype.com/hc/ko/articles/21876052282009",
    recovery: "https://help.postype.com/hc/ko/articles/21876052282009#01H8NMJNY1KWFB5H5YZ49HBC0J"
  },
  "postnord.com": {},
  "postnl.nl": {},
  "postmates.com": {},
  "postmarkapp.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://postmarkapp.com/support/article/1081-how-do-i-use-two-factor-authentication-2fa",
    notes: "Setup requires SMS verification."
  },
  "postman.com": {
    methods: [
      "totp"
    ],
    documentation: "https://learning.postman.com/docs/getting-started/postman-account/#setting-up-two-factor-authentication",
    notes: "Can only be used with username/password accounts, not SSO or Google login accounts"
  },
  "posteo.de": {
    methods: [
      "totp"
    ],
    documentation: "https://posteo.de/en/help/what-is-two-factor-authentication-and-how-do-i-set-it-up"
  },
  "poste.it": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "PosteItaliane App"
    ],
    documentation: "https://www.poste.it/cosa-fare-sicurezza.html"
  },
  "postcrossing.com": {},
  "postbank.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Postbank BestSign"
    ],
    "custom-hardware": [
      "Seal One dongle"
    ],
    documentation: "https://www.postbank.de/privatkunden/sicherheitsverfahren.html"
  },
  "portu.cz": {
    methods: [
      "sms"
    ],
    documentation: "https://www.portu.cz/bezpecnost/"
  },
  "popmoney.com": {},
  "porkbun.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://kb.porkbun.com/article/19--"
  },
  "poloniex.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.poloniex.com/hc/en-us/articles/360040016513"
  },
  "polisystems.ch": {
    methods: [
      "totp"
    ],
    documentation: "https://wiki.polisystems.ch/English/Tutorials/Two-factor-authentification-on-Poli-Systems-Portal/"
  },
  "poeditor.com": {
    methods: [
      "totp"
    ],
    documentation: "https://poeditor.com/kb/how-to-enable-two-factor-authentication"
  },
  "podio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.podio.com/hc/en-us/articles/360017456279"
  },
  "pocketsmith.com": {
    methods: [
      "totp"
    ],
    documentation: "https://learn.pocketsmith.com/article/167--"
  },
  "pobox.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.pobox.help/hc/en-us/sections/1500000033741"
  },
  "pochta.ru": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "pnc.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.pnc.com/en/security-privacy/added-layer-security.html"
  },
  "plutus.it": {
    methods: [
      "totp"
    ],
    documentation: "https://support.plutus.it/hc/en-us/articles/7203346943517"
  },
  "plus500.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.at": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.bg": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.co.il": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.co.nz": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.co.uk": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.com.au": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.com.hr": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.com.mt": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.cz": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.es": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.de": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.dk": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.ee": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.fr": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.fi": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.gr": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.hu": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.is": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.it": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.lv": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.lt": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.nl": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.pt": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.pl": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.ru": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.ro": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.sk": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.si": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus500.se": {
    methods: [
      "sms",
      "call"
    ]
  },
  "plus.net": {},
  "plurk.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.plurk.com/p/mrcii5"
  },
  "pluralsight.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.pluralsight.com/help/multifactor-authentication"
  },
  "plugshare.com": {},
  "plivo.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.plivo.com/hc/en-us/articles/360041766411"
  },
  "plex.tv": {
    methods: [
      "totp"
    ],
    documentation: "https://support.plex.tv/articles/two-factor-authentication/"
  },
  "pleo.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.pleo.io/en/articles/5628169"
  },
  "playstation.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.playstation.com/support/account/2sv-psn-login/"
  },
  "sonyentertainmentnetwork.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.playstation.com/support/account/2sv-psn-login/"
  },
  "playblackdesert.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.naeu.playblackdesert.com/en-US/News/Detail?groupContentNo=164"
  },
  "play.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "plausible.io": {
    methods: [
      "totp"
    ],
    documentation: "https://plausible.io/docs/2fa"
  },
  "play.eslgaming.com": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "platform360.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.platform360.io/scp/dashboard/user-profile.html#multifactor-authentication"
  },
  "my.plesk.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.platform360.io/scp/dashboard/user-profile.html#multifactor-authentication"
  },
  "plastiq.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.plastiq.com/hc/en-us/articles/360006794893"
  },
  "planningcenter.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.planningcenteronline.com/hc/en-us/articles/6984288823579"
  },
  "planfix.com": {
    methods: [
      "totp"
    ],
    documentation: "https://planfix.com/help/Two-factor_authentication"
  },
  "planetscale.com": {
    methods: [
      "totp"
    ],
    documentation: "https://planetscale.com/docs/concepts/mfa"
  },
  "plan.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.plan.io/news/133"
  },
  "planethoster.com": {
    methods: [
      "totp"
    ],
    documentation: "https://blog.planethoster.com/securite-espace-client-planethoster/"
  },
  "pkobp.pl": {
    methods: [
      "sms",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "IKO App"
    ],
    documentation: "https://iko.pkobp.pl/funkcje/mobilna-autoryzacja/",
    notes: "You can only register one U2F security key to your bank account"
  },
  "ipko.pl": {
    methods: [
      "sms",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "IKO App"
    ],
    documentation: "https://iko.pkobp.pl/funkcje/mobilna-autoryzacja/",
    notes: "You can only register one U2F security key to your bank account"
  },
  "plaid.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://plaid.com/docs/account/security/#two-factor-authentication",
    notes: "Software token is only available for developer accounts. It is not available for the my.plaid.com user portal."
  },
  "pixiv.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.pixiv.help/hc/en-us/articles/20876082054553"
  },
  "pixieset.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.pixieset.com/hc/en-us/articles/360046803431"
  },
  "pivotaltracker.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.pivotaltracker.com/help/articles/two_factor_auth/",
    notes: "2FA only works on the web version. If enabled, you will not be able to use the mobile apps."
  },
  "piwik.pro": {
    methods: [
      "totp"
    ],
    documentation: "https://help.piwik.pro/support/getting-started/two-factor-authentication/",
    notes: "Contact customer support to enable 2FA."
  },
  "pirateship.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.pirateship.com/en/articles/9931109-what-is-two-factor-authentication-2fa-on-pirate-ship"
  },
  "pipedrive.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.pipedrive.com/hc/en-us/articles/360000808405"
  },
  "pipedream.com": {},
  "requestbin.com": {},
  "pinterest.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://help.pinterest.com/en/articles/two-factor-authentication",
    notes: "SMS-capable phone required for initial setup."
  },
  "pinboard.in": {},
  "pinata.cloud": {
    methods: [
      "totp"
    ]
  },
  "pichincha.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Pichincha Token"
    ],
    documentation: "https://www.pichincha.com/portal/Portals/0/manuales/InstructivoAutogestionToken.pdf"
  },
  "picarto.tv": {},
  "phrase.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.phrase.com/hc/en-us/articles/6999456070556"
  },
  "memsource.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.phrase.com/hc/en-us/articles/6999456070556"
  },
  "phemex.com": {
    methods: [
      "totp"
    ],
    documentation: "https://phemex.com/getting-started/how-do-i-enable-google-two-factor-authentication"
  },
  "philips-hue.com": {
    methods: [
      "totp",
      "email"
    ]
  },
  "account.meethue.com": {
    methods: [
      "totp",
      "email"
    ]
  },
  "auth.meethue.com": {
    methods: [
      "totp",
      "email"
    ]
  },
  "pexels.com": {},
  "pge.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "personalcapital.com": {
    methods: [
      "call",
      "email",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Personal Capital App"
    ],
    documentation: "https://support.personalcapital.com/hc/en-us/sections/200230560"
  },
  "personalsavings.americanexpress.com": {
    methods: [
      "email",
      "sms",
      "call"
    ],
    documentation: "https://www.americanexpress.com/en-us/banking/online-savings/login-security-and-help/"
  },
  "personal.com.ar": {},
  "perimeter81.com": {
    methods: [
      "sms",
      "totp",
      "custom-software",
      "u2f",
      "call"
    ],
    "custom-software": [
      "Perimeter 81 App Push Notification",
      "Duo"
    ],
    documentation: "https://support.perimeter81.com/docs/two-factor-authentication",
    notes: "Hardware 2FA is only available via Duo."
  },
  "perfect-privacy.com": {},
  "penpot.app": {},
  "penfed.org": {},
  "pepper.com": {},
  "chollometro.com": {},
  "dealabs.com": {},
  "desidime.com": {},
  "hotukdeals.com": {},
  "mydealz.de": {},
  "pelando.com.br": {},
  "pepper.it": {},
  "pepper.pl": {},
  "pepper.ru": {},
  "preisjaeger.at": {},
  "promodescuentos.com": {},
  "peets.com": {},
  "peacocktv.com": {},
  "pcpartpicker.com": {},
  "pcfinancial.ca": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.pcfinancial.ca/en/learning-hub/faqs/managing-your-account/what-is-a-2-step-verification/"
  },
  "pccasegear.com": {
    methods: [
      "totp"
    ]
  },
  "payworks.ca": {
    methods: [
      "totp"
    ]
  },
  "pcloud.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.pcloud.com/help/general-help-center/how-can-i-set-up-two-factor-authentication",
    recovery: "https://www.pcloud.com/help/general-help-center/troubleshooting-guide-for-two-factor-authentication"
  },
  "paytm.com": {
    methods: [
      "sms"
    ],
    documentation: "https://blog.paytm.com/secure-2-step-authentication-login-on-paytms-website-6dd5a20ae1b2"
  },
  "paysafecard.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "paysafecard app"
    ],
    recovery: "https://www.paysafecard.com/en/help/2-faktor-authentifizierung/"
  },
  "paypay.ne.jp": {
    methods: [
      "sms"
    ]
  },
  "paypal.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.paypal.com/us/cshelp/article/help167",
    notes: "2FA can only be setup in web browser and not through the PayPal App."
  },
  "paypal-search.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.paypal.com/us/cshelp/article/help167",
    notes: "2FA can only be setup in web browser and not through the PayPal App."
  },
  "payoneer.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://payoneer.custhelp.com/app/answers/detail/a_id/31268"
  },
  "payfit.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://support.payfit.com/en/articles/73141"
  },
  "paykassa.pro": {
    methods: [
      "totp"
    ],
    documentation: "https://paykassa.pro/en/news/s-paykassa-vashi-dannye-pod-nadejnoy-zashchitoy/"
  },
  "payeer.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Telegram"
    ],
    notes: "2FA via SMS costs 25\xA2 USD per message."
  },
  "paycor.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://support.paycor.com/s/article/Multi-Factor-Authentication-MFA-Requirements-and-Setup"
  },
  "paychex.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "payback.de": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Payback App"
    ],
    documentation: "https://www.payback.de/faq/2-schritt-verifizierung"
  },
  "pay.google.com": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "totp",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "paxos.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.paxos.com/hc/en-us/articles/360042320451"
  },
  "pay.amazon.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "paxful.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://paxful.com/support/en-us/articles/6469323062300",
    recovery: "https://paxful.com/support/en-us/articles/360024668994"
  },
  "patreon.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.patreon.com/hc/en-us/articles/206538086"
  },
  "patientaccess.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.patientaccess.com/signing-in/sign-in-or-register-using-two-factor-authentication"
  },
  "patient.labcorp.com": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://patient.labcorp.com/help-center/q-and-a/8000/1"
  },
  "patelco.org": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.patelco.org/member-support/digital-banking-services/online-banking#564171AC"
  },
  "pastebin.com": {},
  "partnersfcu.org": {},
  "particle.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.particle.io/tutorials/developer-tools/two-step-authentication/"
  },
  "passpack.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://passpack.com/support/getting-started/two-factor-authentication/",
    recovery: "https://passpack.com/support/faq/"
  },
  "parsec.app": {
    methods: [
      "totp"
    ],
    documentation: "https://support.parsec.app/hc/en-us/articles/4424732242445"
  },
  "parsecgaming.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.parsec.app/hc/en-us/articles/4424732242445"
  },
  "park.io": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://park.io/support"
  },
  "parimatch.com": {
    methods: [
      "totp"
    ],
    documentation: "https://faq.parimatch.com/en/account-access-and-security/"
  },
  "paramountplus.com": {},
  "parallels.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://kb.parallels.com/125441"
  },
  "paradoxinteractive.com": {},
  "panorama9.com": {
    methods: [
      "totp"
    ],
    documentation: "http://support.panorama9.com/articles/1859601"
  },
  "panic.com": {
    methods: [
      "totp"
    ],
    documentation: "https://library.panic.com/general/sync-2fa/"
  },
  "pandasecurity.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.pandasecurity.com/en/support/card?id=700088"
  },
  "pandora.com": {},
  "pandadoc.com": {},
  "pairdomains.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.pairdomains.com/kb/posts/345"
  },
  "pagerduty.com": {},
  "paddle.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.paddle.com/help/start/set-up-paddle/how-can-i-enable-two-factor-authentication-on-my-account"
  },
  "packagist.org": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/composer/packagist/pull/1031"
  },
  "pacificpower.net": {
    methods: [
      "sms"
    ]
  },
  "pachca.com": {
    methods: [
      "totp"
    ],
    documentation: "https://crm.pachca.com/know/articles/dvuhfaktornaya-autentifikaciya-(2fa)/"
  },
  "ox.ac.uk": {
    methods: [
      "totp",
      "sms",
      "custom-software",
      "call"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://help.it.ox.ac.uk/mfa"
  },
  "ozbargain.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://ozbargain.com.au/node/449886"
  },
  "ovoenergy.com": {},
  "ovoenergy.com.au": {},
  "ovoenergy.co.uk": {},
  "ovh.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://docs.ovh.com/gb/en/customer/secure-account-with-2FA/"
  },
  "overstock.com": {},
  "overdrive.com": {},
  "ov-chipkaart.nl": {},
  "outlook.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "outlook.live.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "hotmail.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "outbrain.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://www.outbrain.com/help/advertisers/two-factor-authentication/"
  },
  "otto.de": {},
  "otpbanka.hr": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "OTP token device"
    ],
    documentation: "https://www.otpbanka.hr/hr/upute/otp-token-upute-za-koristenje"
  },
  "osu.ppy.sh": {
    methods: [
      "email"
    ]
  },
  "otago.ac.nz": {
    methods: [
      "u2f",
      "totp",
      "call",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator push notification",
      "Authy"
    ],
    documentation: "https://otago.custhelp.com/app/answers/detail/a_id/3073",
    notes: "U2F is available to staff only"
  },
  "osu.edu": {
    methods: [
      "sms",
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://buckeyepass.osu.edu"
  },
  "osf.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.osf.io/article/239--"
  },
  "osde.com.ar": {},
  "originenergy.com.au": {},
  "oregonstate.edu": {
    methods: [
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://oregonstate.teamdynamix.com/TDClient/1935/Portal/KB/?CategoryID=8235"
  },
  "orcid.org": {
    methods: [
      "totp"
    ],
    documentation: "https://support.orcid.org/hc/en-us/articles/360006971673"
  },
  "orange.fr": {},
  "optus.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.optus.com.au/support/answer?id=20183"
  },
  "optumbank.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.optumbank.com/support/healthsafe-id-sign-in.html"
  },
  "optimizely.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.optimizely.com/Account_Settings/Protect_your_account_with_individual_2-step_verification"
  },
  "openweathermap.org": {},
  "openstreetmap.org": {},
  "opensrs.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.opensrs.com/hc/en-us/articles/360009702113-Using-two-factor-authentication-in-webmail"
  },
  "openshift.com": {},
  "opensea.io": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.opensea.io/articles/8866947",
    notes: "SMS texts sent to your mobile device if you reside in the U.S. or Canada."
  },
  "openprovider.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.openprovider.eu/hc/en-us/articles/360019461160#h_01EZ761VFJZEZ95SJN3EYWXAMG",
    recovery: "https://support.openprovider.eu/hc/en-us/articles/360001802288#h_01EHBRPT4STSYK9G5XFM7MFQ5Q"
  },
  "openprovider.eu": {
    methods: [
      "totp"
    ],
    documentation: "https://support.openprovider.eu/hc/en-us/articles/360019461160#h_01EZ761VFJZEZ95SJN3EYWXAMG",
    recovery: "https://support.openprovider.eu/hc/en-us/articles/360001802288#h_01EHBRPT4STSYK9G5XFM7MFQ5Q"
  },
  "opendns.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://umbrella.cisco.com/blog/2014/05/22/launching-two-step-verification/",
    notes: "Only available for enterprise accounts."
  },
  "openclassrooms.com": {},
  "opencollective.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://docs.opencollective.com/help/product/two-factor-authentication"
  },
  "openbank.es": {
    methods: [
      "sms"
    ],
    documentation: "https://www.openbank.es/en/security"
  },
  "openapply.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.openapply.com/hc/articles/9061135475865",
    notes: "2FA can only be enabled for Admin users"
  },
  "open.ac.uk": {},
  "openai.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.openai.com/articles/7967234"
  },
  "chatgpt.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.openai.com/articles/7967234"
  },
  "onvista-bank.de": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.onvista-bank.de/service/sicherheit/transaktionssicherheit.html#tab-1301-2"
  },
  "onstar.com": {},
  "onshape.com": {
    methods: [
      "totp"
    ],
    documentation: "https://cad.onshape.com/help/Content/managefreeaccount.htm"
  },
  "onnibus.com": {},
  "onnibus.fi": {},
  "onlydomains.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.onlydomains.com/hc/articles/15889679813789"
  },
  "onlinesbi.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "SBI Secure OTP"
    ],
    documentation: "https://www.onlinesbi.com/sbijava/mobile/sbsecure_otp_app_faq.html"
  },
  "oneview.malwarebytes.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.threatdown.com/hc/en-us/articles/8788574400531"
  },
  "onet.pl": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://pomoc.poczta.onet.pl/baza-wiedzy/czym-jest-weryfikacja-dwuetapowa/"
  },
  "onesignal.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.onesignal.com/docs/two-step-authentication"
  },
  "onelogin.com": {
    methods: [
      "custom-software",
      "sms",
      "totp",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "OneLogin Protect",
      "Duo",
      "RSA SecurID",
      "Symantec VIP"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://support.onelogin.com/kb/4266569"
  },
  "onehub.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.onehub.com/hc/en-us/articles/360039792571",
    notes: "Software 2FA requires adding a phone number as a fallback."
  },
  "onedrive.live.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/help/12408",
    notes: "2FA phone calls may not be available in all regions."
  },
  "one.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "one.com companion"
    ],
    documentation: "https://help.one.com/hc/en-us/articles/4404699986321"
  },
  "omny.info": {},
  "oncehub.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.oncehub.com/help/set-up-two-factor-authentication"
  },
  "omgserv.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.omgserv.com/fr/faq-site/comment_activer_la_double_authentification-103/"
  },
  "omg.lol": {
    methods: [
      "totp"
    ],
    documentation: "https://home.omg.lol/info/two-factor-authentication"
  },
  "olg.ca": {
    methods: [
      "totp"
    ],
    documentation: "https://www.olg.ca/en/frequently-asked-questions.html#mfa-faqs"
  },
  "olb.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "OLB appTAN",
      "OLB photoTAN"
    ],
    "custom-hardware": [
      "photoTAN reader"
    ],
    documentation: "https://www.olb.de/service/ihre-fragen/onlinebanking/psd2"
  },
  "okx.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.okx.com/help/how-do-i-link-an-authenticator-app",
    recovery: "https://www.okx.com/help/what-if-mobile-email-google-verification-cannot-be-used"
  },
  "okta.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp",
      "custom-hardware",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://help.okta.com/en-us/content/topics/security/mfa/mfa-factors.htm"
  },
  "okcupid.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.okcupid.com/hc/en-us/articles/5221247074701"
  },
  "odysee.com": {},
  "odysee.tv": {},
  "officedepot.com": {},
  "odoo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.odoo.com/documentation/latest/applications/general/auth/2fa.html"
  },
  "octopus.energy": {},
  "octopusenergy.de": {},
  "octopusenergy.es": {},
  "octopusenergy.fr": {},
  "octopusenergy.it": {},
  "octopusenergy.co.jp": {},
  "octopusenergy.nz": {},
  "octopusenergy.com": {},
  "obsidian.md": {
    methods: [
      "totp"
    ],
    documentation: "https://help.obsidian.md/Obsidian/2-factor+authentication"
  },
  "ocado.com": {},
  "o2switch.fr": {
    methods: [
      "email",
      "totp"
    ],
    notes: "Email 2FA is always enabled on the billing panel. On the cPanel, only TOTP is available, and using SSH/FTP won't prompt for 2FA"
  },
  "o2.pl": {
    methods: [
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "1login od WP"
    ],
    documentation: "https://pomoc.o2.pl/1login/jak-wlaczyc-i-wylaczyc-logowanie-dwustopniowe"
  },
  "nyu.edu": {
    methods: [
      "sms",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://www.nyu.edu/life/information-technology/accounts-and-access/access/mfa.html"
  },
  "nutmeg.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.nutmeg.com/?article=115000495111-How-to-set-up-and-manage-2-step-verification",
    recovery: "https://support.nutmeg.com/?article=115002025671-Troubleshooting-2-step-verification-issues"
  },
  "nulab.com": {
    methods: [
      "u2f",
      "totp",
      "sms"
    ],
    documentation: "https://support.nulab.com/hc/en-us/articles/7732936736537"
  },
  "nuget.org": {
    methods: [
      "sms",
      "custom-software",
      "totp",
      "u2f",
      "call"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://azure.microsoft.com/en-us/documentation/articles/multi-factor-authentication/"
  },
  "nubank.com.br": {},
  "nsandi.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.nsandi.com/get-to-know-us/security/improved-security"
  },
  "ns1.com": {
    methods: [
      "totp"
    ],
    documentation: "https://ns1.com/articles/enabling-2-factor-authentication"
  },
  "npmjs.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://docs.npmjs.com/configuring-two-factor-authentication",
    recovery: "https://docs.npmjs.com/recovering-your-2fa-enabled-account"
  },
  "nozbe.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://nozbe.help/management/settings/#settings_2fa"
  },
  "notion.so": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.notion.so/help/two-step-verification"
  },
  "notejoy.com": {
    methods: [
      "totp"
    ],
    documentation: "https://notejoy.com/help/two-factor-authentication",
    notes: "2FA is not available to Free plan users and is not available on the Android app."
  },
  "notesnook.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://blog.notesnook.com/improving-user-account-security-with-2fa"
  },
  "nostarch.com": {
    methods: [
      "totp"
    ]
  },
  "norwegian.com": {},
  "norton.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f"
    ],
    documentation: "https://support.norton.com/sp/en/us/home/current/solutions/v100023155_NortonM_Retail_1_en_us"
  },
  "northwesternmutual.com": {
    methods: [
      "totp",
      "call",
      "sms"
    ],
    documentation: "https://www.northwesternmutual.com/security-and-privacy/"
  },
  "northerntool.com": {},
  "norisbank.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "norisbank photoTAN"
    ],
    "custom-hardware": [
      "photoTAN card reader"
    ],
    documentation: "https://www.norisbank.de/service/zwei-faktor-authentifizierung.html"
  },
  "noridianmedicareportal.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://med.noridianmedicare.com/web/portalguide/registration/multi-factor-authentication"
  },
  "nordvpn.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.nordvpn.com/hc/en-us/articles/19442299167889",
    recovery: "https://support.nordvpn.com/hc/en-us/articles/20323778989969"
  },
  "nordaccount.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.nordpass.com/hc/en-us/articles/360002770497"
  },
  "nordstrom.com": {},
  "nordstrom.ca": {},
  "nordpass.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.nordpass.com/hc/en-us/articles/360002770497"
  },
  "nordnet.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "nordnet.fi": {},
  "nordlocker.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.nordpass.com/hc/en-us/articles/360002770497"
  },
  "nordlayer.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.nordlayer.com/docs/set-up-2fa"
  },
  "nordea.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.nordea.se/privat/vardagstjanster/internet-mobil-telefon/bank-id.html"
  },
  "nordea.fi": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Nordea ID"
    ],
    "custom-hardware": [
      "Code calculator"
    ],
    documentation: "https://www.nordea.fi/en/personal/our-services/online-mobile-services/access-codes.html"
  },
  "nominet.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://registrars.nominet.uk/gtlds/onboarding-account-management/your-account/account-security-2/two-factor-authentication-user-guide-2/"
  },
  "noke.com": {},
  "noip.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.noip.com/support/knowledgebase/two-factor-authentication-last-pass/"
  },
  "nitrotype.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.nitrotype.com/news/read/254/-"
  },
  "nimbusweb.me": {
    methods: [
      "totp"
    ],
    documentation: "https://nimbusweb.me/guides/settings/account-settings-2-step-verification-for-sign-in/",
    notes: "Available for Pro and Business users only."
  },
  "thefusebase.com": {
    methods: [
      "totp"
    ],
    documentation: "https://nimbusweb.me/guides/settings/account-settings-2-step-verification-for-sign-in/",
    notes: "Available for Pro and Business users only."
  },
  "niftypm.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.niftypm.com/en/articles/5356559"
  },
  "nicorgas.com": {},
  "nicovideo.jp": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://qa.nicovideo.jp/faq/show/4500"
  },
  "nicehash.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.nicehash.com/support/general-help/security/how-to-setup-2fa-security",
    recovery: "https://www.nicehash.com/support/general-help/security/lost-password-or-2fa-code"
  },
  "nic.ru": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.nic.ru/help/1529/"
  },
  "niagahoster.co.id": {
    methods: [
      "totp"
    ],
    documentation: "https://www.niagahoster.co.id/kb/fitur-keamanan-terbaru-member-area-niagahoster-two-factor-authentication-2fa"
  },
  "nhsapp.service.nhs.uk": {
    methods: [
      "sms"
    ],
    documentation: "https://www.nhs.uk/nhs-services/online-services/nhs-app/nhs-app-help-and-support/logging-in-to-the-nhs-app/"
  },
  "access.login.nhs.uk": {
    methods: [
      "sms"
    ],
    documentation: "https://www.nhs.uk/nhs-services/online-services/nhs-app/nhs-app-help-and-support/logging-in-to-the-nhs-app/"
  },
  "nh-hotels.com": {},
  "ngrok.com": {
    methods: [
      "totp"
    ]
  },
  "ngpvan.com": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "nexusmods.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.nexusmods.com/article/74--"
  },
  "nextdoor.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://help.nextdoor.com/s/article/About-2-Step-Verification"
  },
  "nextdoor.de": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://help.nextdoor.com/s/article/About-2-Step-Verification"
  },
  "nextdoor.co.uk": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://help.nextdoor.com/s/article/About-2-Step-Verification"
  },
  "nextdoor.nl": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://help.nextdoor.com/s/article/About-2-Step-Verification"
  },
  "nextdns.io": {
    methods: [
      "totp"
    ]
  },
  "next.co.uk": {},
  "nexonia.com": {},
  "nexcess.net": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.nexcess.net/client-portal/how-to-use-two-factor-authentication-in-the-client-portal"
  },
  "nexon.com": {
    methods: [
      "totp",
      "email",
      "sms"
    ],
    documentation: "https://support.nexon.net/hc/en-us/articles/360026634532"
  },
  "newrelic.com": {},
  "newgrounds.com": {
    methods: [
      "totp"
    ]
  },
  "newegg.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://kb.newegg.com/knowledge-base/2-step-verification/"
  },
  "networksolutions.com": {
    methods: [
      "sms"
    ],
    documentation: "https://customerservice.networksolutions.com/prweb/PRAuth/webkm/help/article/KC-344/networksolutions"
  },
  "network.mobile.rakuten.co.jp": {},
  "netsuite.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4410552915.html"
  },
  "netohq.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.netohq.com/support/s/article/multi-factor-authentication"
  },
  "neto.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://www.netohq.com/support/s/article/multi-factor-authentication"
  },
  "netlify.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.netlify.com/accounts-and-billing/user-settings/#two-factor-authentication-2fa"
  },
  "netflix.com": {},
  "netim.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.netim.com/en/wiki/2FA"
  },
  "netfirms.com": {},
  "neteller.com": {
    methods: [
      "sms",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "NETTELLER mobile"
    ],
    documentation: "https://www.neteller.com/en/support#/path/1362152022"
  },
  "netcup.eu": {
    methods: [
      "totp"
    ],
    documentation: "https://www.netcup-wiki.de/wiki/Stammdaten_CCP#Zwei-Faktor-Authentifizierung_.282FA.29"
  },
  "netcup.de": {
    methods: [
      "totp"
    ],
    documentation: "https://www.netcup-wiki.de/wiki/Stammdaten_CCP#Zwei-Faktor-Authentifizierung_.282FA.29"
  },
  "customercontrolpanel.de": {
    methods: [
      "totp"
    ],
    documentation: "https://www.netcup-wiki.de/wiki/Stammdaten_CCP#Zwei-Faktor-Authentifizierung_.282FA.29"
  },
  "netcorecloud.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://emaildocs.netcorecloud.com/docs/two-factor-authentication-2fa"
  },
  "pepipost.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://emaildocs.netcorecloud.com/docs/two-factor-authentication-2fa"
  },
  "netbk.co.jp": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Sumishin SBI Net Bank app"
    ],
    documentation: "https://www.netbk.co.jp/contents/lineup/smartauth-neo/"
  },
  "netatmo.com": {},
  "netacad.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://www.cisco.com/c/en/us/about/help/login-account-help.html#~change-password"
  },
  "nest.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://support.google.com/googlenest/answer/9295081",
    notes: "Non-migrated accounts only have SMS & Email 2FA available."
  },
  "nest.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://support.google.com/googlenest/answer/9295081",
    notes: "Non-migrated accounts only have SMS & Email 2FA available."
  },
  "nerdwallet.com": {},
  "neopets.com": {
    methods: [
      "totp"
    ],
    documentation: "https://neopass.support.neopets.com/hc/articles/25933646591501"
  },
  "neolo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://ar.neolo.com/knowledgebase/215/Autenticacion-de-2-factores.html"
  },
  "nelnet.studentaid.gov": {},
  "necu.org": {},
  "nebula.app": {},
  "ndax.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.ndax.io/en_us/categories/-B1hNr3zSi"
  },
  "nd.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "u2f",
      "totp"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://nd.service-now.com/nd_portal?id=kb_article_view&sysparm_article=KB0017218"
  },
  "ncsu.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "totp",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://oit.ncsu.edu/it-security/2fa/",
    recovery: "https://go.ncsu.edu/2fa-bypass"
  },
  "ncsecu.org": {
    methods: [
      "sms"
    ],
    documentation: "https://www.ncsecu.org/MobileServices/OneTimePasscode.html"
  },
  "nbc.ca": {},
  "bnc.ca": {},
  "nb.fidelity.com": {
    methods: [
      "call",
      "sms"
    ],
    documentation: "https://nb.fidelity.com/public/nb/default/resourceslibrary/articles/securityfaqlearnmore"
  },
  "navyfederal.org": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Navy Federal App"
    ],
    documentation: "https://www.navyfederal.org/services/security/two-step-verification.html"
  },
  "natwest.com": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "Card reader"
    ],
    documentation: "https://www.natwest.com/banking-with-natwest/how-to/card-reader.html"
  },
  "naver.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "NAVER app"
    ],
    documentation: "https://help.naver.com/service/5640/contents/21127?lang=en",
    recovery: "https://help.naver.com/service/5640/contents/21129?lang=en"
  },
  "nationwide.co.uk": {
    methods: [
      "sms",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Card reader"
    ],
    documentation: "https://www.nationwide.co.uk/support/security-centre/internet-banking-security/new-log-in-experience"
  },
  "nationbuilder.com": {},
  "nasafcu.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://www.nasafcu.com/img/newebranch/ebranch_new.html"
  },
  "nandos.com.au": {
    methods: [
      "sms"
    ]
  },
  "nandos.co.uk": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://help.nandos.co.uk/hc/articles/4417183221521"
  },
  "namesilo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.namesilo.com/Support/2~Factor-Authentication"
  },
  "names.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://www.names.co.uk/support/3011.html"
  },
  "namehero.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.namehero.com/knowledgebase/163"
  },
  "namecheap.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://www.namecheap.com/security/2fa-two-factor-authentication/",
    notes: "Only one 2FA method can be active at any given time"
  },
  "namebase.io": {
    methods: [
      "totp"
    ],
    recovery: "https://www.namebase.io/faq/#how-do-i-reset-my-2fa"
  },
  "name.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.name.com/support/articles/205934297-setting-up-two-step-verification-with-google-authenticator"
  },
  "nairaex.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.nairaex.com/support/solutions/articles/43000335554"
  },
  "naga.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.naga.com/en/articles/5057605",
    notes: "MFA can only be set up from the NAGA Web platform and not on iOS or Android Apps"
  },
  "nab.com.au": {},
  "nabtrade.com.au": {},
  "n8n.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.n8n.io/user-management/two-factor-auth/"
  },
  "n8n.cloud": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.n8n.io/user-management/two-factor-auth/"
  },
  "n26.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "N26 app"
    ],
    documentation: "https://support.n26.com/en-eu/security/passwords-and-codes/how-to-log-in-with-two-factor-authentication"
  },
  "n-able.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.n-able.com/covedataprotection/USERGUIDE/documentation/Content/service-management/console/sso_migration.htm"
  },
  "mytax.illinois.gov": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://tax.illinois.gov/programs/mytax/authenticationguide.html"
  },
  "mytotalconnectcomfort.com": {},
  "mystudylife.com": {},
  "mystate.com.au": {},
  "mysqa.org.uk": {},
  "myquest.questdiagnostics.com": {},
  "care360.com": {},
  "myprimobox.net": {
    methods: [
      "totp"
    ]
  },
  "myprimobox.com": {
    methods: [
      "totp"
    ]
  },
  "mypath.pa.gov": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://revenue-pa.custhelp.com/app/answers/detail/a_id/3939"
  },
  "myob.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.myob.com/wiki/x/bwfq",
    recovery: "https://help.myob.com/wiki/x/1ogHAQ",
    notes: "SMS available to selected new customers only."
  },
  "myob.com.au": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.myob.com/wiki/x/bwfq",
    recovery: "https://help.myob.com/wiki/x/1ogHAQ",
    notes: "SMS available to selected new customers only."
  },
  "myob.co.nz": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.myob.com/wiki/x/bwfq",
    recovery: "https://help.myob.com/wiki/x/1ogHAQ",
    notes: "SMS available to selected new customers only."
  },
  "myhermes.de": {},
  "myheritage.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.myheritage.com/help-center/en/article/how-do-i-set-up-two-factor-authentication-for-my-myheritage-account"
  },
  "myhealthone.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "mygovid.ie": {
    methods: [
      "sms"
    ],
    documentation: "https://www.mygovid.ie/en-IE/HelpAndSupport?section=pageButton-SecurityAndPrivacy&answer=show-answer32"
  },
  "myfritz.net": {
    methods: [
      "totp",
      "u2f",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Smartphone biometrics (fingerprint, face recognition)"
    ],
    documentation: "https://en.avm.de/myfritz/faqs/security-tips-for-using-myfritz/"
  },
  "myfitnesspal.com": {},
  "myfico.com": {
    methods: [
      "sms"
    ]
  },
  "myemma.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.e2ma.net/s/article/Two-factor-authentication"
  },
  "mydomain.com": {},
  "mydeal.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://help.mydeal.com.au/hc/en-us/articles/8901216981391"
  },
  "myanimelist.net": {
    methods: [
      "totp"
    ],
    documentation: "https://myanimelist.net/about.php?go=support"
  },
  "mychart.org": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.mychart.org/Help/two-factor-auth"
  },
  "my.ny.gov": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://dol.ny.gov/MFA"
  },
  "my.gov.au": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "myGov Code Generator"
    ],
    documentation: "https://my.gov.au/en/about/help/mygov-account/help-using-your-account/manage-sign-in-details"
  },
  "my.cigna.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "mxtoolbox.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://mxtoolbox.com/support/knowledgebase/?faq=455",
    notes: "2FA is only available on paid plans."
  },
  "musicmagpie.co.uk": {
    methods: [
      "email"
    ]
  },
  "mural.co": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mural.co/en/articles/5315716"
  },
  "muni.cz": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://it.muni.cz/en/services/muni-unified-login/multi-factor-authentication",
    recovery: "https://service.support.muni.cz/servicedesk/customer/portal/1/group/52/create/937"
  },
  "multcloud.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.multcloud.com/help/two-step-verification.html"
  },
  "mullvad.net": {},
  "mulesoft.com": {
    methods: [
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Salesforce Authenticator"
    ],
    documentation: "https://docs.mulesoft.com/access-management/multi-factor-authentication"
  },
  "mtb.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "M&T Mobile app"
    ],
    documentation: "https://www.mtb.com/help-center/banking-security/online-mobile-banking-security"
  },
  "mandtbank.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "M&T Mobile app"
    ],
    documentation: "https://www.mtb.com/help-center/banking-security/online-mobile-banking-security"
  },
  "msu.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://secureit.msu.edu/multi-factor/index.html"
  },
  "mos.ru": {
    methods: [
      "totp",
      "sms"
    ]
  },
  "morganstanley.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f"
    ],
    documentation: "https://www.morganstanley.com/what-we-do/wealth-management/online-security/authentication"
  },
  "more.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.more.com.au/help/multi-factor-authentication-what-is-it-and-why-it-s-important"
  },
  "mora.jp": {},
  "moqups.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.moqups.com/hc/en-us/articles/360019781980#account_2FA"
  },
  "monzo.com": {},
  "montclair.edu": {},
  "monster.com": {},
  "moniker.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://faq.moniker.com/login-into-moniker"
  },
  "mongodb.com": {
    methods: [
      "totp",
      "email",
      "custom-software",
      "sms",
      "u2f"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://docs.atlas.mongodb.com/security-multi-factor-authentication/"
  },
  "moneykit.net": {},
  "moneyguidepro.com": {},
  "moneybird.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.moneybird.nl/blog/twee-staps-verificatie/"
  },
  "moneybird.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.moneybird.nl/blog/twee-staps-verificatie/"
  },
  "monex.co.jp": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://info.monex.co.jp/help/security/mfa/index.html"
  },
  "monday.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.monday.com/hc/en-us/articles/360000787745",
    notes: "Team admins must enable 2FA before members can use it."
  },
  "monash.edu": {
    methods: [
      "u2f",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://www.monash.edu/esolutions/accounts-passwords/multi-factor-authentication"
  },
  "monash.edu.my": {
    methods: [
      "u2f",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://www.monash.edu/esolutions/accounts-passwords/multi-factor-authentication"
  },
  "monarchmoney.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.monarchmoney.com/hc/en-us/articles/360054392152"
  },
  "mojedatovaschranka.cz": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "eGovernment Mobile Key"
    ],
    documentation: "https://www.mojedatovaschranka.cz/static/ISDS/help/page1.html#1_5_4"
  },
  "modrinth.com": {
    methods: [
      "totp"
    ]
  },
  "mlp.de": {
    methods: [
      "custom-software",
      "custom-hardware",
      "sms"
    ],
    "custom-software": [
      "SecureGo"
    ],
    "custom-hardware": [
      "TAN generator"
    ],
    documentation: "https://mlp.de/banking/konto-und-karte/psd2/"
  },
  "mizuhobank.co.jp": {},
  "mobile.everyday.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://mobile.everyday.com.au/two-factor-authentication"
  },
  "mobile.woolworths.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://mobile.everyday.com.au/two-factor-authentication"
  },
  "mittwald.de": {},
  "mixpanel.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.mixpanel.com/hc/en-us/articles/115004485966"
  },
  "mist.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.mist.com/documentation/two-factor-authentication-mobile-authenticator/"
  },
  "missiveapp.com": {
    methods: [
      "totp"
    ],
    documentation: "https://missiveapp.com/faq/enable-2-factor-authentication"
  },
  "misshosting.com": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/issues/3634#issuecomment-454688629"
  },
  "misshosting.bg": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/issues/3634#issuecomment-454688629"
  },
  "misshosting.dk": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/issues/3634#issuecomment-454688629"
  },
  "misshosting.fi": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/issues/3634#issuecomment-454688629"
  },
  "misshosting.no": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/issues/3634#issuecomment-454688629"
  },
  "misshosting.se": {
    methods: [
      "totp"
    ],
    documentation: "https://github.com/2factorauth/twofactorauth/issues/3634#issuecomment-454688629"
  },
  "misfit.com": {},
  "miro.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.miro.com/hc/en-us/articles/7935469290002",
    notes: "Only available for Enterprise plan accounts and must be enabled by a Company Admin"
  },
  "mintos.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.mintos.com/hc/en-us/sections/360000373858"
  },
  "mint.intuit.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://accounts-help.intuit.com/app/intuit/1995176",
    notes: "Software 2FA requires enabling SMS or phone call as a back-up."
  },
  "minna-no-ginko.com": {},
  "mines.edu": {
    methods: [
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://its.mines.edu/mfa/"
  },
  "minecraft.net": {
    methods: [
      "sms",
      "call",
      "email",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "mojang.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/en-us/help/12408/",
    notes: "2FA phone calls may not be available in all regions"
  },
  "minds.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.minds.com/hc/minds/articles/1705423904-two_factor-authentication"
  },
  "mimecast.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://community.mimecast.com/docs/DOC-1915"
  },
  "migros.ch": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Migros Access app"
    ],
    documentation: "https://account.migros.ch/help#secureWhy2FactorPassword"
  },
  "migadu.com": {
    methods: [
      "totp"
    ]
  },
  "microworkers.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://www.microworkers.com/blog/whats-new-in-mw-implementation-of-two-factor-authentication-2fa/"
  },
  "michaels.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "mexc.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.mexc.com/learn/article/17827791509545"
  },
  "miamioh.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "u2f",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token"
    ],
    documentation: "https://www.miamioh.edu/it-services/special-groups/info-security/duo/"
  },
  "metrobankonline.co.uk": {},
  "metorik.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.metorik.com/article/22-how-can-i-enable-2fa-on-my-account"
  },
  "metamask.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.metamask.io/developer-tools/dashboard/how-to/two-factor-authentication"
  },
  "metal.equinix.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://metal.equinix.com/developers/docs/accounts/two-factor-authentication/"
  },
  "meta.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.meta.com/help/quest/articles/accounts/account-settings-and-management/two-factor-meta-account/"
  },
  "oculus.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.meta.com/help/quest/articles/accounts/account-settings-and-management/two-factor-meta-account/"
  },
  "messagebird.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://support.messagebird.com/hc/en-us/articles/12896784423057",
    notes: "Only one 2FA method can be active at any given time"
  },
  "meridiancu.ca": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.meridiancu.ca/bank-anywhere/online-banking/signing-in-for-the-first-time-online"
  },
  "merrilledge.com": {
    methods: [
      "sms",
      "u2f"
    ],
    documentation: "https://www.ml.com/privacy-and-security-center/usb-security-key.html"
  },
  "mymerrill.com": {
    methods: [
      "sms",
      "u2f"
    ],
    documentation: "https://www.ml.com/privacy-and-security-center/usb-security-key.html"
  },
  "ml.com": {
    methods: [
      "sms",
      "u2f"
    ],
    documentation: "https://www.ml.com/privacy-and-security-center/usb-security-key.html"
  },
  "mercury.cash": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mercury.cash/en/articles/3881123"
  },
  "mercury.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://help.mercury.com/t/m1h3d07"
  },
  "mercadolibre.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.bo": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolivre.com.br": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.cl": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.co": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.co.cr": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.do": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.ec": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.gt": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.hn": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.mx": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.ni": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.pa": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.py": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.pe": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.sv": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.uy": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.ve": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadolibre.com.ar": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.mercadolivre.com.br/ajuda/945"
  },
  "mercadopago.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ]
  },
  "mercadobitcoin.com.br": {
    methods: [
      "totp"
    ],
    documentation: "https://suporte.mercadobitcoin.com.br/hc/pt-br/articles/360039357491",
    recovery: "https://suporte.mercadobitcoin.com.br/hc/pt-br/articles/360059201631"
  },
  "meraki.cisco.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://documentation.meraki.com/General_Administration/Other_Topics/Two-Factor_Authentication"
  },
  "meraki.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://documentation.meraki.com/General_Administration/Other_Topics/Two-Factor_Authentication"
  },
  "mendeley.com": {},
  "melia.com": {},
  "mentimeter.com": {},
  "meltwater.com": {},
  "meister.co": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mindmeister.com/hc/en-us/articles/4408402251154"
  },
  "meisterlabs.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mindmeister.com/hc/en-us/articles/4408402251154"
  },
  "meistertask.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mindmeister.com/hc/en-us/articles/4408402251154"
  },
  "mindmeister.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mindmeister.com/hc/en-us/articles/4408402251154"
  },
  "meisternote.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mindmeister.com/hc/en-us/articles/4408402251154"
  },
  "meineschufa.de": {
    methods: [
      "sms"
    ],
    documentation: "https://www.meineschufa.de/de/faq/login"
  },
  "meetup.com": {},
  "mega.io": {
    methods: [
      "totp"
    ],
    documentation: "https://mega.io/help/client/webclient/security-and-privacy#5bb525f9f1b70989348b45de"
  },
  "medium.com": {},
  "meet.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "mediatemple.net": {},
  "mediamarkt.de": {},
  "medal.tv": {},
  "mebank.com.au": {},
  "mcgill.ca": {
    methods: [
      "totp",
      "custom-software",
      "sms",
      "call"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://mcgill.service-now.com/itportal?id=kb_article_view&sys_kb_id=b1508e941be04910591ca9b7624bcb85"
  },
  "mcdonalds.com": {},
  "mcdonalds.jp": {},
  "mbna.co.uk": {
    methods: [
      "custom-software",
      "sms",
      "call"
    ],
    "custom-software": [
      "MBNA Card Services App"
    ],
    documentation: "https://www.mbna.co.uk/credit-cards/help-and-support/changes-to-online-shopping.html"
  },
  "mcafee.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.mcafee.com/support/s/article/000002100"
  },
  "mbna.ca": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.mbna.ca/help-centre/credit-cards/two-step-verification-faq/"
  },
  "mbconnectline.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "http://www.cc-onlinehelp.com/en/#index/administrati/users/authenticati/authenticati.html"
  },
  "max.com": {},
  "hbomax.com": {},
  "max.se": {},
  "maxburgers.com": {},
  "maxhamburger.no": {},
  "max.dk": {},
  "maxpremiumburgers.pl": {},
  "matomo.org": {
    methods: [
      "totp"
    ],
    documentation: "https://matomo.org/faq/general/faq_27245/"
  },
  "mattermost.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.mattermost.com/onboard/multi-factor-authentication.html"
  },
  "matalan.co.uk": {},
  "masterconsultas.com.ar": {},
  "mathworks.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.mathworks.com/mw_account/two_step_verification/frequently-asked-questions.html"
  },
  "masterclass.com": {},
  "marriott.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://help.marriott.com/s/article/Article-34205"
  },
  "maropost.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.maropost.com/hc/en-us/articles/360015708033"
  },
  "marktplaats.nl": {
    methods: [
      "sms"
    ],
    documentation: "https://help.marktplaats.nl/s/article/bescherm-je-account-met-de-sms-beveiligingscontrole"
  },
  "markmonitor.com": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Symantec VIP"
    ],
    "custom-hardware": [
      "Symantec VIP Token"
    ]
  },
  "marketo.com": {},
  "mapbox.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.mapbox.com/accounts/guides/settings/#two-factor-authentication"
  },
  "manulife.ca": {},
  "manulife.com": {},
  "marcus.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "mangadex.org": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "malwarebytes.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.malwarebytes.com/hc/en-us/articles/4402158331411"
  },
  "mailo.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Mailo app"
    ],
    documentation: "https://faq.mailo.com/acces/activer-la-double-authentification.htm"
  },
  "make.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.make.com/en/help/access-management/two-factor-authentication"
  },
  "mailjet.com": {
    methods: [
      "totp"
    ],
    documentation: "https://documentation.mailjet.com/hc/articles/10553745110043"
  },
  "mailgun.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.mailgun.com/hc/en-us/articles/360011664433"
  },
  "mailerlite.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.mailerlite.com/help/how-to-turn-on-two-factor-authentication-2fa"
  },
  "mailfence.com": {
    methods: [
      "totp"
    ],
    documentation: "https://mailfence.com/en/two-factor-authentication.jsp"
  },
  "mailchimp.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://kb.mailchimp.com/accounts/login/set-up-a-two-factor-authentication-app-at-login"
  },
  "mailchi.mp": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://kb.mailchimp.com/accounts/login/set-up-a-two-factor-authentication-app-at-login"
  },
  "mail.yandex.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Yandex.Key"
    ],
    documentation: "https://yandex.com/support/id/authorization/twofa.html",
    recovery: "https://yandex.com/support/id/authorization/twofa-restore.html",
    notes: "SMS-capable phone required for initial setup."
  },
  "mailbox.org": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://kb.mailbox.org/de/privat/sicherheit-privatsphaere/die-zwei-faktor-authentifizierung-einrichten/"
  },
  "mail.yahoo.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f"
    ],
    documentation: "https://help.yahoo.com/kb/SLN5013.html",
    notes: "A recovery email or phone number is required for 2FA setup."
  },
  "mail.yahoo.co.jp": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://id.yahoo.co.jp/security/otp.html"
  },
  "mail.tim.it": {},
  "mail.sapo.pt": {
    methods: [
      "totp",
      "sms",
      "u2f"
    ],
    documentation: "https://ajuda.sapo.pt/id-67553"
  },
  "mail.ru": {
    methods: [
      "sms",
      "u2f"
    ],
    documentation: "https://help.mail.ru/mail/settings/2fa"
  },
  "mail.riseup.net": {},
  "mail.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "mail.de": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://mail.de/hilfe/u2f-authenticator"
  },
  "mail.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mail.com/security/2fa/index.html",
    notes: "A verified phone number is required to set up 2FA."
  },
  "mail.aol.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "email",
      "u2f"
    ],
    documentation: "https://help.aol.com/articles/2-step-verification-stronger-than-your-password-alone"
  },
  "maicoin.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://maicoin2.freshdesk.com/en/support/solutions/articles/32000016116"
  },
  "mail.163.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.mail.163.com/faq.do?m=list&categoryID=297",
    notes: "SMS is required as a backup method"
  },
  "126.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.mail.163.com/faq.do?m=list&categoryID=297",
    notes: "SMS is required as a backup method"
  },
  "yeah.net": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.mail.163.com/faq.do?m=list&categoryID=297",
    notes: "SMS is required as a backup method"
  },
  "magnet.me": {
    methods: [
      "totp"
    ]
  },
  "macu.com": {
    methods: [
      "totp",
      "sms",
      "email"
    ]
  },
  "macys.com": {},
  "macstadium.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.macstadium.com/docs/two-factor-authentication"
  },
  "macro.com.ar": {},
  "maccabi4u.co.il": {},
  "macquarie.com.au": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Macquarie Authenticator"
    ],
    documentation: "https://www.macquarie.com.au/help/personal/accessing-online-and-mobile-banking/macquarie-authenticator-and-multi-factor-authentication/set-up-macquarie-authenticator",
    notes: "An SMS-capable phone is required for initial setup."
  },
  "m365.cloud.microsoft": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "login.microsoftonline.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "office.microsoft.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "microsoft365.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "office365.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "office.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "yammer.com": {
    methods: [
      "sms",
      "call",
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://support.microsoft.com/account-billing/c7910146-672f-01e9-50a0-93b4585e7eb4"
  },
  "m1.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.m1.com/en/articles/9331936"
  },
  "lyft.com": {},
  "lyyti.com": {},
  "lyyti.fi": {},
  "luno.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.luno.com/help/en/articles/1000203420",
    notes: "A mobile phone number is required to set up two-factor authentication."
  },
  "lufthansa.com": {},
  "lucidchart.com": {},
  "lucid.app": {},
  "lucid.co": {},
  "lunchmoney.app": {
    methods: [
      "totp"
    ]
  },
  "lu.ma": {
    methods: [
      "totp"
    ],
    documentation: "https://help.lu.ma/p/two-factor-authentication"
  },
  "lpi.org": {},
  "lowes.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.lowes.com/l/help/contact-us#Multi-FactorAuthentication"
  },
  "lottiefiles.com": {},
  "loopia.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://blogg.loopia.se/2015/03/16/nu-kan-du-logga-in-med-tvafaktorsautentiering-hos-loopia-genom-bankid/"
  },
  "loom.com": {},
  "looker.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.looker.com/docs/admin/security/two-factor-authentication"
  },
  "lonestar.edu": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://www.lonestar.edu/OTS-MFA.htm"
  },
  "lokalise.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.lokalise.com/en/articles/2329387"
  },
  "logitech.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "astrogaming.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "logi.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "login.threatsim.com": {
    methods: [
      "sms"
    ]
  },
  "login.gov": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f",
      "custom-hardware"
    ],
    "custom-hardware": [
      "PIV/CAC"
    ],
    documentation: "https://www.login.gov/help/get-started/authentication-methods/"
  },
  "logicmonitor.com": {
    methods: [
      "call",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://www.logicmonitor.com/support/settings/users-and-roles/two-factor-authentication"
  },
  "log.wien": {},
  "localizejs.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.localizejs.com/docs/users-two-factor-authentication"
  },
  "lobste.rs": {
    methods: [
      "totp"
    ],
    documentation: "https://lobste.rs/s/1cyltz/two_factor_authentication_now_available"
  },
  "lnk.bio": {
    methods: [
      "totp"
    ],
    documentation: "https://help.lnk.bio/en/articles/8372705",
    recovery: "https://help.lnk.bio/en/articles/8377209"
  },
  "lner.co.uk": {},
  "lmcu.org": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Lake Michigan CU Mobile"
    ],
    documentation: "https://www.lmcu.org/personal/banking/services/mobile-authenticator/"
  },
  "lloydsbank.com": {
    methods: [
      "custom-software",
      "call",
      "sms"
    ],
    "custom-software": [
      "Lloyds Bank Mobile Banking"
    ],
    documentation: "https://www.lloydsbank.com/online-banking/changes-to-internet-banking.asp"
  },
  "livejournal.com": {},
  "litmus.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://help.litmus.com/article/128--"
  },
  "listrak.com": {
    methods: [
      "email"
    ],
    documentation: "https://help.listrak.com/en/articles/1505298"
  },
  "litebit.eu": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.litebit.eu/hc/en-us/articles/115000953504",
    recovery: "https://support.litebit.eu/hc/en-us/articles/360001555699"
  },
  "liquidweb.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.liquidweb.com/kb/how-to-enable-two-factor-authentication-2fa/"
  },
  "liquid.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.liquid.com/en/articles/4883860"
  },
  "lippu.fi": {},
  "linode.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.linode.com/docs/security/linode-manager-security-controls"
  },
  "linktr.ee": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://linktr.ee/help/articles/6108442"
  },
  "linkt.com.au": {},
  "linksyssmartwifi.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.linksys.com/us/support-article?articleNum=317753"
  },
  "linkedin.com": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "LinkedIn App"
    ],
    documentation: "https://www.linkedin.com/help/linkedin/answer/544"
  },
  "line6.com": {
    methods: [
      "totp"
    ]
  },
  "line.me": {},
  "lihkg.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.lihkg.com/privacy/account-security/"
  },
  "ligabank.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "VR SecureGo plus"
    ],
    "custom-hardware": [
      "Sm@rt-TAN card reader"
    ],
    documentation: "https://www.ligabank.de/liga-direkt/faq-zum-online-banking.html#parsys_faqliste_330836501"
  },
  "liftopia.com": {},
  "lifesum.com": {},
  "life360.com": {},
  "lieferando.de": {
    methods: [
      "email"
    ],
    documentation: "https://lieferando.de/kundenservice/artikel/warum-muss-ich-bei-der-anmeldung-einen-code-eingeben"
  },
  "lidl.de": {
    methods: [
      "sms",
      "email"
    ]
  },
  "accounts.lidl.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "lidentitenumerique.laposte.fr": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "L'Identit\xE9 Num\xE9rique La Poste app"
    ],
    documentation: "https://aide.lidentitenumerique.laposte.fr/kb/guide/fr/YapekkW4gf"
  },
  "lichess.org": {
    methods: [
      "totp"
    ]
  },
  "librarything.com": {},
  "lhv.ee": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "SmartID"
    ],
    "custom-hardware": [
      "ID-card",
      "mobile-ID",
      "Security token"
    ]
  },
  "lgeccu.org": {},
  "lexoffice.de": {
    methods: [
      "totp"
    ],
    documentation: "https://support.lexoffice.de/de-form/articles/4290490",
    recovery: "https://support.lexoffice.de/de-form/articles/5250370"
  },
  "leumi.co.il": {},
  "letterboxd.com": {
    methods: [
      "totp"
    ]
  },
  "ltrbxd.com": {
    methods: [
      "totp"
    ]
  },
  "letsgetchecked.com": {},
  "letsdothis.com": {
    methods: [
      "totp"
    ],
    documentation: "https://intercom.help/ldt-partner-help/en/articles/9423487"
  },
  "lenovo.com": {
    methods: [
      "email",
      "sms",
      "totp"
    ]
  },
  "lendingclub.com": {
    methods: [
      "email"
    ],
    documentation: "https://help.lendingclub.com/hc/en-us/articles/215562677#h_95bff530-80b8-43ec-9ae1-ffae87e563f5"
  },
  "lego.com": {
    methods: [
      "email"
    ]
  },
  "legalmail.it": {},
  "leaseweb.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://kb.leaseweb.com/customer-portal-api/account-management/managing-your-account/setup-two-factor-authentication"
  },
  "leetcode.com": {},
  "leetcode.cn": {},
  "lcn.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.lcn.com/support/articles/how-to-set-up-and-use-two-factor-authentication/"
  },
  "lcl.fr": {},
  "lazada.com": {},
  "launchdarkly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.launchdarkly.com/home/account-security/mfa"
  },
  "leboncoin.fr": {
    methods: [
      "sms",
      "email"
    ]
  },
  "launchpad.net": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Feitian OTP c100 Token",
      "HOTP Token",
      "OATH Token"
    ],
    documentation: "https://help.ubuntu.com/community/SSO/FAQs/2FA"
  },
  "latrobe.edu.au": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://www.latrobe.edu.au/students/support/it/mfa"
  },
  "ltu.edu.au": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://www.latrobe.edu.au/students/support/it/mfa"
  },
  "latoken.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://latoken.zendesk.com/hc/en-us/articles/360010034040"
  },
  "latitudefinancial.com": {},
  "latam.com": {},
  "last.fm": {},
  "lastpass.com": {
    methods: [
      "totp",
      "custom-hardware",
      "custom-software",
      "u2f",
      "sms"
    ],
    "custom-software": [
      "LastPass Authenticator",
      "Duo",
      "RSA SecurID",
      "Symantec VIP",
      "SecureAuth Authenticate"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Windows Fingerprint",
      "Smart Card"
    ],
    documentation: "https://support.logmeininc.com/lastpass/help/enable-multifactor-authentication-lp010002",
    recovery: "https://support.logmeininc.com/lastpass/help/i-lost-my-phone-ndash-how-do-i-disable-multifactor-authentication-for-lastpass",
    notes: "Availability of 2FA options depends on your account type. U2F is available through Duo integration on all plans. Yubico OTP is only available on paid plans."
  },
  "lansforsakringar.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.lansforsakringar.se/privat/att-vara-kund/digitala-tjanster-telefonbank/internetbanken/"
  },
  "larian.com": {
    methods: [
      "totp",
      "sms"
    ]
  },
  "labanquepostale.fr": {},
  "kuna.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.kuna.io/en/support/solutions/articles/17000083405"
  },
  "kth.se": {},
  "krystal.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://help.krystal.uk/getting-started/how-do-i-setup-two-factor-authentication-2-fa-on-my-krystal-account"
  },
  "kriptomat.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.kriptomat.io/en/articles/1986160",
    recovery: "https://help.kriptomat.io/en/articles/3650094"
  },
  "kraken.com": {
    methods: [
      "totp",
      "custom-hardware",
      "u2f",
      "email"
    ],
    "custom-hardware": [
      "OATH OTP keys"
    ],
    documentation: "https://support.kraken.com/hc/en-us/articles/360000426923",
    notes: "Email 2FA is mandatory for all users but only requested for unknown devices"
  },
  "korbit.co.kr": {
    methods: [
      "totp"
    ],
    documentation: "https://support.korbit.co.kr/customer/en/portal/articles/1717692"
  },
  "koofr.eu": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://koofr.eu/help/two-factor-authentication/does-koofr-offer-two-factor-authentication/"
  },
  "koodomobile.com": {},
  "koho.ca": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.koho.ca/articles/9401393"
  },
  "kohls.com": {},
  "kobo.com": {},
  "ko-fi.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.ko-fi.com/hc/en-us/articles/6355489342737",
    notes: "TOTP is only available with SMS as a backup"
  },
  "knowt.com": {},
  "knownhost.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.knownhost.com/wiki/my-knownhost/two-factor"
  },
  "knowbe4.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.knowbe4.com/hc/en-us/articles/225681448"
  },
  "knack.com": {
    methods: [
      "totp"
    ],
    documentation: "https://learn.knack.com/article/seuor9vxmw"
  },
  "kleinanzeigen.de": {
    methods: [
      "email"
    ],
    documentation: "https://themen.kleinanzeigen.de/hilfe/nutzerkonto/2FA/"
  },
  "ebay-kleinanzeigen.de": {
    methods: [
      "email"
    ],
    documentation: "https://themen.kleinanzeigen.de/hilfe/nutzerkonto/2FA/"
  },
  "klarna.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.klarna.com/se/kundservice/hur-loggar-jag-in/",
    recovery: "https://www.klarna.com/se/kundservice/jag-kan-inte-logga-in-vad-kan-jag-gora/"
  },
  "klaviyo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.klaviyo.com/hc/en-us/articles/360026617692"
  },
  "klarna.no": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.klarna.com/no/kundeservice/hvordan-logger-jeg-inn/",
    recovery: "https://www.klarna.com/no/kundeservice/jeg-kan-ikke-logge-inn-hva-kan-jeg-gjore/"
  },
  "klarna.com": {},
  "kiva.org": {},
  "kit.edu": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "KIT Token"
    ],
    documentation: "https://www.scc.kit.edu/dienste/2fa.php"
  },
  "kintone.com": {
    methods: [
      "totp"
    ],
    documentation: "https://get.kintone.help/general/en/user/list_2fa/enable_2fa.html",
    notes: "2FA must be enabled by an admin before use."
  },
  "kinsta.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kinsta.com/knowledgebase/two-factor-authentication/"
  },
  "kinguin.net": {
    methods: [
      "email"
    ]
  },
  "killstar.com": {},
  "kik.com": {},
  "kijiji.ca": {},
  "kickstarter.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.kickstarter.com/hc/en-us/articles/115005127094",
    notes: "Software 2FA requires setting up SMS 2FA as a fallback."
  },
  "kickex.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://support.kickex.com/hc/en-us/articles/360019513860",
    recovery: "https://support.kickex.com/hc/en-us/articles/360019525000"
  },
  "kick.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.kick.com/en/articles/7120898"
  },
  "khanacademy.org": {},
  "keycdn.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.keycdn.com/support/enabling-two-factor-authentication"
  },
  "keybase.io": {},
  "kerio.com": {},
  "key.com": {},
  "kerboodle.com": {},
  "keepsolid.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://www.keepsolid.com/passwarden/security/tfa"
  },
  "keepersecurity.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f"
    ],
    documentation: "https://www.keepersecurity.com/security#twoFactor"
  },
  "keepa.com": {},
  "kaspersky.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.kaspersky.com/KPC/1.0/en-US/152628.htm",
    notes: "SMS 2FA must be enabled before TOTP 2FA can be set up. SMS 2FA cannot be disabled even when TOTP is enabled."
  },
  "kayako.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.kayako.com/hc/en-us/articles/360006376420"
  },
  "karriere.at": {},
  "kanopy.com": {},
  "kakao.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "KakaoTalk app"
    ],
    documentation: "https://cs.kakao.com/helps?service=52&category=1095"
  },
  "kanka.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.kanka.io/en/latest/account/security/two-factor-authentication.html"
  },
  "kajabi.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.kajabi.com/hc/en-us/articles/8293506425115"
  },
  "kahoot.com": {},
  "kahoot.it": {},
  "kagi.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.kagi.com/kagi/privacy/two-factor-authentication.html"
  },
  "kaggle.com": {},
  "justworks.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.justworks.com/hc/en-us/articles/360004477492"
  },
  "justwatch.com": {},
  "justhost.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://my.justhost.com/hosting/help/two-factor-authentication"
  },
  "justgiving.com": {
    methods: [
      "email"
    ],
    documentation: "https://justgiving-charity-support.zendesk.com/hc/en-us/articles/360019687158"
  },
  "jumpcloud.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://jumpcloud.com/support/set-up-authenticator-app-for-user-account",
    recovery: "https://jumpcloud.com/support/reset-mfa-in-user-portal"
  },
  "jumbo.com.ar": {},
  "jp.mercari.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.mercari.com/jp/help_center/article/248/"
  },
  "jpc.de": {},
  "joyent.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.joyent.com/public-cloud/getting-started/2fa"
  },
  "jovia.org": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.jovia.org/knowledge-base/how-do-i-enable-authenticator-apps-within-online-and-mobile-banking"
  },
  "jottacloud.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.jottacloud.com/en/articles/1292931"
  },
  "jotform.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.jotform.com/help/how-to-enable-two-factor-authentication/"
  },
  "joinmastodon.org": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://github.com/McKael/mastodon-documentation/blob/master/Using-Mastodon/2FA.md",
    notes: "TOTP must be enabled to use a hardware token."
  },
  "mastodon.social": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://github.com/McKael/mastodon-documentation/blob/master/Using-Mastodon/2FA.md",
    notes: "TOTP must be enabled to use a hardware token."
  },
  "johnlewis.com": {},
  "joker.com": {
    methods: [
      "totp"
    ],
    documentation: "https://joker.com/faq/content/52/480/en/what-is-two_factor_authentication.html"
  },
  "join-lemmy.org": {
    methods: [
      "totp"
    ],
    notes: "2FA is only available on Lemmy instances using version 0.18 or later."
  },
  "johnhancock.com": {},
  "jmbullion.com": {},
  "jianguoyun.com": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "WeChat"
    ],
    documentation: "https://help.jianguoyun.com/?p=1251",
    notes: "SMS 2FA only available on certain pricing plans"
  },
  "jitbit.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.jitbit.com/helpdesk/KB/View/11048235"
  },
  "jetbrains.com": {
    methods: [
      "totp"
    ],
    documentation: "https://sales.jetbrains.com/hc/en-gb/articles/360013015240",
    recovery: "https://sales.jetbrains.com/hc/en-gb/articles/360013090420"
  },
  "jetstar.com": {},
  "jep.coop": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "JEP Token"
    ]
  },
  "jetblue.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.jetblue.com/help/trueblue-basics#what-is-2-step-authentication"
  },
  "jbhifi.com.au": {},
  "jamfnow.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.jamfnow.com/s/article/207717923-How-to-turn-on-Two-Factor-Authentication"
  },
  "iwantmyname.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://help.iwantmyname.com/hc/en-gb/articles/360014435197",
    recovery: "https://help.iwantmyname.com/hc/en-gb/articles/360014825318"
  },
  "ivpn.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.ivpn.net/knowledgebase/232/Do-you-offer-Two-Factor-Authentication.html"
  },
  "itslearning.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.itslearning.com/en/support/solutions/articles/7000066757",
    notes: "Only available to system administrators"
  },
  "iubenda.com": {},
  "iterable.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.iterable.com/hc/en-us/articles/115004821703"
  },
  "itglue.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.itglue.com/hc/en-us/articles/360004933757"
  },
  "itch.io": {
    methods: [
      "totp"
    ],
    documentation: "https://itch.io/docs/advanced/two-factor-authentication"
  },
  "islonline.com": {
    methods: [
      "totp",
      "sms",
      "email",
      "u2f"
    ],
    documentation: "https://help.islonline.com/35746/286527"
  },
  "isc2.org": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "isaca.org": {},
  "irs.gov": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "ID.me Authenticator"
    ],
    documentation: "https://www.irs.gov/privacy-disclosure/secure-access-how-to-register-for-certain-online-self-help-tools"
  },
  "irccloud.com": {},
  "ironvest.com": {
    methods: [
      "totp"
    ],
    documentation: "https://ironvest-kb.groovehq.com/help/how-can-i-enable-two-factor-authentication"
  },
  "ipvanish.com": {},
  "ipage.com": {},
  "ionos.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "IONOS Mobile App"
    ],
    documentation: "https://www.ionos.com/help/web-security/two-factor-authentication-two-factor-authentication/set-up-two-factor-authentication/"
  },
  "iozoom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.iozoom.com/client/announcements/6"
  },
  "ioi.dk": {},
  "inwx.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.inwx.com/en/offer/mobiletan"
  },
  "invoiced.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://docs.invoiced.com/faqs#wBTZz"
  },
  "invoiceberry.com": {},
  "invictuscapital.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    recovery: "https://help.invictuscapital.com/en/articles/3561870"
  },
  "invoice.2go.com": {
    methods: [
      "email"
    ],
    documentation: "https://support.2go.com/hc/en-au/articles/360049057751"
  },
  "investvoyager.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://investvoyager.zendesk.com/hc/en-us/articles/4407561324699"
  },
  "intuit.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://accounts-help.intuit.com/app/intuit/1995123"
  },
  "intigriti.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.intigriti.com/en/articles/5378980"
  },
  "intesasanpaolo.com": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Intesa Sanpaolo Mobile app"
    ],
    documentation: "https://www.intesasanpaolo.com/content/internetbanking/it/faq/common/faqHome/app-intesa-sanpaolo-mobile.privati.html"
  },
  "internetbs.net": {
    methods: [
      "totp"
    ],
    documentation: "https://2fa.directory/notes/internetbs/"
  },
  "interserver.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.interserver.net/tips/kb/enable-two-factor-authentication-in-a-cpanel-account/"
  },
  "interia.pl": {},
  "intercom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.intercom.com/help/en/articles/181"
  },
  "interactivebrokers.com": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.ca": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.co.in": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.co.jp": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.co.uk": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.com.au": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.com.hk": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.hu": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.ie": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "interactivebrokers.sg": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "IBKR Mobile"
    ],
    "custom-hardware": [
      "Digital Security Card+"
    ],
    documentation: "https://www.interactivebrokers.com/en/index.php?f=ibgStrength&p=log",
    notes: "SMS 2FA only works as long as no other method has been enabled. Hardware 2FA is only available for certain customers."
  },
  "intelli.zoolz.com": {
    methods: [
      "totp"
    ],
    documentation: "https://wiki.zoolz.com/how-do-i-enable-two-factor-authentication-on-my-zoolz-intelligent-account/",
    notes: "Only available for business accounts."
  },
  "insurance.everyday.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "insurance.woolworths.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "instructure.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://community.canvaslms.com/t5/Student-Guide/How-do-I-set-up-multi-factor-authentication-for-my-user-account/ta-p/524"
  },
  "instapaper.com": {},
  "instantscripts.com.au": {
    methods: [
      "sms"
    ]
  },
  "instant-gaming.com": {
    methods: [
      "totp"
    ]
  },
  "instagram.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.instagram.com/566810106808145"
  },
  "threads.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.instagram.com/566810106808145"
  },
  "threads.net": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.instagram.com/566810106808145"
  },
  "ig.me": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.instagram.com/566810106808145"
  },
  "instabox.io": {},
  "inmotionhosting.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.inmotionhosting.com/support/edu/cpanel/how-to-configure-and-use-two-factor-authentication/"
  },
  "ing.pl": {
    methods: [
      "sms",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Moje ING App"
    ],
    documentation: "https://www.ing.pl/indywidualni/bankowosc-internetowa/bezpieczenstwo/klucze-zabezpieczen-u2f",
    notes: "The first U2F key requires confirmation at a bank branch."
  },
  "ing.lu": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "LuxTrust Mobile App"
    ],
    "custom-hardware": [
      "LuxTrust Token"
    ],
    documentation: "https://www.ing.lu/webing/content/siteing/en/Individuals/Onlineproduct/Contact/frequently-asked-questions/faq-online-banking-.html#accordion-16b6eafd77-item-36c4e5a172"
  },
  "ing.it": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "ING Italia"
    ],
    documentation: "https://www.ing.it/faq/codici-e-dati-anagrafici/token-cos-e-come-funziona.html",
    recovery: "https://www.ing.it/faq/sicurezza-e-phishing/cosa-fare-perdita-furto-cellulare.html",
    notes: "The SMS One-Time Password service is available for a fee of \u20AC0.50/month."
  },
  "ing.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "ING Banking to go"
    ],
    "custom-hardware": [
      "photoTAN reader"
    ],
    documentation: "https://www.ing.de/hilfe/auftraege-freigeben/"
  },
  "ing.com.au": {
    methods: [
      "sms"
    ]
  },
  "infomaniak.com": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Infomaniak Auth"
    ],
    documentation: "https://www.infomaniak.com/en/support/faq/1940"
  },
  "infobip.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.infobip.com/news/increased-portal-account-security-with-2-factor-authentication"
  },
  "infinity.co": {
    methods: [
      "sms"
    ],
    documentation: "https://www.infinity.co/knowledge-base/article/2-factor-authentication"
  },
  "indiegogo.com": {},
  "indiegala.com": {},
  "independer.nl": {
    methods: [
      "email",
      "totp"
    ]
  },
  "independentreserve.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://blog.independentreserve.com/knowledge-base/setting-up-2fa-using-google-authenticator"
  },
  "indeed.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.indeed.com/lead/two-factor-authentication"
  },
  "inbox.lv": {
    methods: [
      "totp"
    ],
    documentation: "https://help.inbox.lv/category/10017/question/10713"
  },
  "improvmx.com": {
    methods: [
      "totp"
    ],
    documentation: "http://help.improvmx.com/en/articles/4892466"
  },
  "imperva.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://docs.imperva.com/bundle/cloud-application-security/page/settings/account-settings.htm"
  },
  "impots.gouv.fr": {
    methods: [
      "email"
    ],
    documentation: "https://www.impots.gouv.fr/actualite/la-securite-de-votre-espace-particulier-se-renforce"
  },
  "immobilienscout24.de": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://sicherheit.immobilienscout24.de/2-faktor-authentifizierung.html",
    notes: "SMS is only available to commercial real estate providers."
  },
  "immowelt.de": {
    methods: [
      "email"
    ],
    documentation: "https://support.immowelt.de/immoweltde/faq/gewerbliche-anbieter/meine-immowelt/sichere-anmeldung.html",
    notes: "2FA is only available for commercial partners."
  },
  "imdb.com": {},
  "imgur.com": {},
  "imb.com.au": {},
  "ikea.com": {},
  "iinet.net.au": {
    methods: [
      "sms"
    ],
    documentation: "https://help.iinet.net.au/multi-factor-authentication-iinet"
  },
  "iinet.com.au": {
    methods: [
      "sms"
    ],
    documentation: "https://help.iinet.net.au/multi-factor-authentication-iinet"
  },
  "iijmio.jp": {},
  "ihg.com": {},
  "ig.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "IG Authentication"
    ],
    documentation: "https://www.ig.com/uk/help-and-support/accounts-and-statements/my-accounts/how-do-i-set-up-two-factor-authentication"
  },
  "ieee.org": {},
  "ifttt.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.ifttt.com/hc/en-us/articles/115010193007"
  },
  "idrive.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.idrive.com/online-backup-web-faq#twostep"
  },
  "id.me": {
    methods: [
      "sms",
      "call",
      "totp",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "ID.me Authenticator"
    ],
    documentation: "https://help.id.me/hc/en-us/articles/360018113053"
  },
  "id.nintendo.net": {},
  "icloud.com": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Apple Device Push Notification"
    ],
    documentation: "https://support.apple.com/en-us/HT204915",
    notes: "U2F requires a minimum of two security keys to be registered."
  },
  "id.atlassian.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.atlassian.com/atlassian-account/docs/manage-two-step-verification-for-your-atlassian-account/"
  },
  "icicibank.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.icicibank.com/online-safe-banking/otp.page"
  },
  "icedrive.net": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://twitter.com/icedrivecloud/status/1412044506447364097"
  },
  "icdsoft.com": {
    methods: [
      "totp"
    ],
    documentation: "https://tickets.suresupport.com/faq/article-1700"
  },
  "icbc.com.ar": {},
  "icabanken.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.icabanken.se/kundservice/hjalp-med-att-logga-in/"
  },
  "hypovereinsbank.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "HVB Mobile Banking"
    ],
    "custom-hardware": [
      "photoTAN card reader"
    ],
    documentation: "https://www.hypovereinsbank.de/hvb/services/digitales-banking/psd2/tan-verfahren"
  },
  "hypop.com.au": {},
  "hypixel.net": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.hypixel.net/hc/en-us/articles/360019538060"
  },
  "hype.it": {
    methods: [
      "sms"
    ]
  },
  "hyatt.com": {},
  "hvv.de": {},
  "hva.nl": {
    methods: [
      "call",
      "totp"
    ],
    documentation: "https://student.hva.nl/az-lemmas/studenten/hva-breed/its-si/tweestapsverificatie/2-stapsverificatie.html"
  },
  "hushmail.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.hushmail.com/article/740--"
  },
  "huobi.com": {
    methods: [
      "email",
      "sms",
      "totp"
    ],
    documentation: "https://huobiglobal.zendesk.com/hc/en-us/articles/360000191282"
  },
  "huntington.com": {
    methods: [
      "call",
      "sms",
      "email"
    ]
  },
  "humblebundle.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.humblebundle.com/hc/en-us/articles/202421374"
  },
  "humana.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.humana.com/2-step-verification"
  },
  "hulu.com": {},
  "huk24.de": {
    methods: [
      "sms"
    ],
    documentation: "https://www.huk24.de/unsere-services/login-und-mehr#spr05"
  },
  "huk.de": {
    methods: [
      "sms",
      "call"
    ]
  },
  "huggingface.co": {
    methods: [
      "totp"
    ],
    documentation: "https://huggingface.co/docs/hub/en/security-2fa"
  },
  "hubspot.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://knowledge.hubspot.com/articles/kcs_article/account/how-can-i-set-up-two-factor-authentication-for-my-hubspot-login"
  },
  "hubbl.com.au": {},
  "binge.com.au": {},
  "kayosports.com.au": {},
  "flashnews.com.au": {},
  "lifestyle.com.au": {},
  "streamotion.com.au": {},
  "huaweicloud.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.huaweicloud.com/intl/en-us/usermanual-iam/iam_10_0002.html"
  },
  "hsl.fi": {},
  "hsbc.com.au": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "HSBC Australia"
    ],
    documentation: "https://www.hsbc.com.au/ways-to-bank/support/digital-secure-key/"
  },
  "hsbc.com.ar": {},
  "hsbc.co.uk": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "HSBC UK Mobile Banking"
    ],
    "custom-hardware": [
      "HSBC Physical Secure Key"
    ],
    documentation: "https://www.hsbc.co.uk/help/security-centre/secure-key/secure-key-help/"
  },
  "hsbc.ca": {},
  "hrblock.com": {
    methods: [
      "email",
      "totp",
      "sms"
    ]
  },
  "hpe.com": {
    methods: [
      "totp",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://support.hpe.com/hpesc/public/docDisplay?docId=sd00002926en_us&page=GUID-78722BEA-6517-4C6E-96F3-92E9D81903E2.html"
  },
  "hewlettpackardenterprise.com": {
    methods: [
      "totp",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://support.hpe.com/hpesc/public/docDisplay?docId=sd00002926en_us&page=GUID-78722BEA-6517-4C6E-96F3-92E9D81903E2.html"
  },
  "hp.com": {
    methods: [
      "totp"
    ]
  },
  "hover.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.hover.com/hc/en-us/articles/217282267"
  },
  "hotstar.com": {},
  "hotjar.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.hotjar.com/hc/en-us/articles/4406998019223",
    notes: "2FA is not available for SAML SSO logins"
  },
  "hotdoc.com.au": {
    methods: [
      "email"
    ],
    documentation: "https://help.hotdoc.com.au/hc/articles/9565844108175"
  },
  "hostwinds.com": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.co.uk": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.in": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.ng": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.cn": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.de": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.es": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.pt": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.fr": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.ru": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.nl": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.kr": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.it": {
    methods: [
      "totp"
    ]
  },
  "hostwinds.ae": {
    methods: [
      "totp"
    ]
  },
  "hostus.us": {
    methods: [
      "totp"
    ],
    documentation: "https://my.hostus.us/knowledgebase/106"
  },
  "hoststar.ch": {},
  "hostpoint.ch": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.hostpoint.ch/en/administrative/hostpoint-id/general-questions-about-two-factor-authentication"
  },
  "hostplus.com.au": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://hostplus.com.au/secure-your-account"
  },
  "hostiso.com": {
    methods: [
      "totp"
    ],
    notes: "While both the main client area and the shared hosting panel support 2FA, each system is separate and requires its own setup."
  },
  "hostmonster.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://my.hostmonster.com/cgi/help/two-factor-authentication"
  },
  "hostinger.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://support.hostinger.com/articles/4888148",
    notes: "You can only have one 2FA option enabled at a time."
  },
  "hosteurope.de": {
    methods: [
      "sms"
    ],
    documentation: "https://www.hosteurope.de/faq/kis/allgemeines0/wo-kann-ich-passworte-neu-vergeben/"
  },
  "hostens.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.hostens.com/knowledgebase/how-to-enhance-account-security/"
  },
  "hostelworld.com": {},
  "hostek.com": {
    methods: [
      "totp"
    ],
    documentation: "https://wiki.hostek.com/Client_Area_-_Two_Factor_Authentication"
  },
  "hostek.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://wiki.hostek.com/Client_Area_-_Two_Factor_Authentication"
  },
  "hootsuite.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://help.hootsuite.com/hc/en-us/articles/1260804307989",
    notes: "Email is always enabled as backup method for Software Token."
  },
  "honto.jp": {},
  "honeybadger.io": {
    methods: [
      "totp"
    ],
    documentation: "https://www.honeybadger.io/blog/account-security-updates/#how-to-enable"
  },
  "homedepot.com": {},
  "home.sophos.com": {
    methods: [
      "totp",
      "email",
      "sms"
    ],
    documentation: "https://support.home.sophos.com/hc/en-us/articles/360032204471",
    recovery: "https://support.home.sophos.com/hc/en-us/articles/360032204591",
    notes: "Email and SMS 2FA can only be enabled as backup methods."
  },
  "my.sophos.com": {
    methods: [
      "totp",
      "email",
      "sms"
    ],
    documentation: "https://support.home.sophos.com/hc/en-us/articles/360032204471",
    recovery: "https://support.home.sophos.com/hc/en-us/articles/360032204591",
    notes: "Email and SMS 2FA can only be enabled as backup methods."
  },
  "home.saxo": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Saxo app"
    ]
  },
  "saxotrader.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Saxo app"
    ]
  },
  "saxobank.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Saxo app"
    ]
  },
  "bgsaxo.it": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Saxo app"
    ]
  },
  "holvi.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Holvi app"
    ],
    documentation: "https://support.holvi.com/hc/en-gb/articles/360002711557",
    notes: "Setup requires SMS verification."
  },
  "home-assistant.io": {
    methods: [
      "totp"
    ],
    documentation: "https://www.home-assistant.io/docs/authentication/multi-factor-auth/"
  },
  "holded.com": {
    methods: [
      "sms"
    ],
    documentation: "https://academy.holded.com/hc/en-us/articles/4403375077265"
  },
  "hmrc.gov.uk": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.gov.uk/government/publications/genuine-hmrc-contact-and-recognising-phishing-emails/genuine-hmrc-contact-and-recognising-phishing-emails#hmrc-short-message-service-text-messages"
  },
  "hm.com": {},
  "hmc.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://www.hmc.edu/cis/duo-two-factor-authentication/"
  },
  "hl.co.uk": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.hl.co.uk/help/managing-your-online-account/passwords-and-security/passwords/how-do-i-log-in"
  },
  "hivehome.com": {
    methods: [
      "sms"
    ],
    documentation: "https://community.hivehome.com/s/article/What-is-Two-Factor-Authentication-and-how-do-I-set-it-up"
  },
  "hitbtc.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.hitbtc.com/en/support/solutions/articles/63000224976"
  },
  "hirezstudios.com": {
    methods: [
      "email",
      "sms"
    ]
  },
  "hint.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.hint.com/en/articles/2360627"
  },
  "hilton.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.hilton.com/en/help-center/your-account/enhanced-security-authentication/"
  },
  "hidrive.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.strato.de/faq/cloud-speicher/2-Faktor-Authentifizierung/"
  },
  "hide.me": {
    methods: [
      "totp"
    ],
    documentation: "https://hide.me/en/blog/hide-me-vpn-now-supports-2fa/"
  },
  "hexonet.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.hexonet.net/assets/pdf/2FA.pdf"
  },
  "hey.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://hey.com/security/"
  },
  "hevodata.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.hevodata.com/account-management/personal-settings/two-factor-authentication/"
  },
  "hetzner.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://docs.hetzner.com/accounts-panel/accounts/two-factor-authentication/"
  },
  "heroku.com": {
    methods: [
      "totp",
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Salesforce Authenticator"
    ],
    "custom-hardware": [
      "Built-in Authenticator (Biometrics)"
    ],
    documentation: "https://devcenter.heroku.com/articles/multi-factor-authentication",
    recovery: "https://devcenter.heroku.com/articles/recovery-codes"
  },
  "helpscout.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.helpscout.com/article/907--"
  },
  "hellostake.com": {
    methods: [
      "totp"
    ],
    documentation: "https://hellostake.com/au/support/wall-st/articles/35000152372"
  },
  "stake.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://hellostake.com/au/support/wall-st/articles/35000152372"
  },
  "hellosign.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://faq.hellosign.com/hc/en-us/articles/360025164091",
    notes: "SMS Two-factor authentication is only available to paid Business plan senders and above."
  },
  "hellobank.fr": {},
  "hellobonsai.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://headwayapp.co/bonsai-updates/254093"
  },
  "hello.vrchat.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.vrchat.com/docs/setup-2fa"
  },
  "heise.de": {},
  "heimdalsecurity.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.heimdalsecurity.com/hc/articles/212721589"
  },
  "heathrow.com": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "heartinternet.uk": {},
  "heap.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.heap.io/heap-administration/secure-access/2fa/",
    notes: "2FA is only available for users on the Business plan."
  },
  "healthequity.com": {},
  "healthcare.gov": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.healthcare.gov/how-can-i-protect-myself-from-fraud-in-the-health-insurance-marketplace/"
  },
  "headway.co": {
    methods: [
      "sms",
      "call",
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://help.headway.co/hc/articles/4428388155028#h_01J6CN885B50GFFC3QCXY51QT7"
  },
  "headspace.com": {},
  "he.net": {
    methods: [
      "totp"
    ]
  },
  "hcaptcha.com": {
    methods: [
      "u2f"
    ]
  },
  "hawaiianairlines.com": {},
  "hbf.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.hbf.com.au/support/guides/how-to/2-step-verification"
  },
  "hatena.ne.jp": {
    methods: [
      "totp"
    ],
    documentation: "https://hatena.zendesk.com/hc/ja/articles/29892170781209"
  },
  "hatchinvest.nz": {
    methods: [
      "totp"
    ],
    documentation: "https://help.hatchinvest.nz/en/articles/2996776"
  },
  "harvard.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "totp",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo",
      "Okta Verify"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://huit.harvard.edu/twostep"
  },
  "happyfox.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.happyfox.com/kb/article/709--"
  },
  "hanseaticbank.de": {
    methods: [
      "sms"
    ],
    documentation: "https://www.hanseaticbank.de/services/alle-faqs/psd2"
  },
  "handelsbanken.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.handelsbanken.se/shb/INeT/ICentSv.nsf/Default/qAE99695C4C1D033DC12579120036EB43?Opendocument"
  },
  "hallon.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "halifax.co.uk": {
    methods: [
      "call",
      "sms"
    ],
    documentation: "https://www.halifax.co.uk/aboutonline/changes-to-online-banking/"
  },
  "halifax-online.co.uk": {
    methods: [
      "call",
      "sms"
    ],
    documentation: "https://www.halifax.co.uk/aboutonline/changes-to-online-banking/"
  },
  "halebop.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "hackthebox.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.hackthebox.com/articles/5185265",
    recovery: "https://help.hackthebox.com/articles/5208737"
  },
  "hackthebox.eu": {
    methods: [
      "totp"
    ],
    documentation: "https://help.hackthebox.com/articles/5185265",
    recovery: "https://help.hackthebox.com/articles/5208737"
  },
  "hackster.io": {},
  "hackerrank.com": {},
  "hackerone.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.hackerone.com/hackers/two-factor-authentication.html",
    notes: "SMS-capable phone required for initial setup."
  },
  "gyazo.com": {
    methods: [
      "email"
    ],
    documentation: "https://help.gyazo.com/--5ed8969fc1eca80023e84383"
  },
  "gwu.edu": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://it.gwu.edu/two-step-authentication"
  },
  "gwr.com": {},
  "gusto.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://support.gusto.com/1066223171"
  },
  "gumtree.com": {},
  "gumroad.com": {
    methods: [
      "email"
    ],
    documentation: "https://help.gumroad.com/article/292--"
  },
  "gumlet.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.gumlet.com/docs/profile-overview#password-and-2fa"
  },
  "guildwars2.com": {
    methods: [
      "email",
      "sms",
      "totp"
    ],
    documentation: "https://help.guildwars2.com/hc/en-us/articles/230672927",
    recovery: "https://help.guildwars2.com/hc/en-us/articles/360000819168"
  },
  "arena.net": {
    methods: [
      "email",
      "sms",
      "totp"
    ],
    documentation: "https://help.guildwars2.com/hc/en-us/articles/230672927",
    recovery: "https://help.guildwars2.com/hc/en-us/articles/360000819168"
  },
  "guilded.gg": {
    methods: [
      "totp"
    ],
    documentation: "https://support.guilded.gg/hc/en-us/articles/1500008991902"
  },
  "grupobancolombia.com": {},
  "guideline.com": {
    methods: [
      "totp"
    ],
    documentation: "https://success.guideline.com/hc/articles/360034791412"
  },
  "grubhub.com": {},
  "growingio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.growingio.com/v3/product-manual/personal/security"
  },
  "groups.io": {
    methods: [
      "totp"
    ],
    documentation: "https://groups.io/helpcenter/membersmanual/1/understanding-groups-io-accounts/setting-account-preferences-and-viewing-account-information"
  },
  "groupon.com": {},
  "groupme.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.microsoft.com/en-us/office/30a7b8fd-5052-4b6f-aa10-85c1560cdf59"
  },
  "group.me": {
    methods: [
      "sms"
    ],
    documentation: "https://support.microsoft.com/en-us/office/30a7b8fd-5052-4b6f-aa10-85c1560cdf59"
  },
  "greyhound.com": {},
  "greenhost.net": {
    methods: [
      "totp"
    ],
    documentation: "https://greenhost.net/blog/2016/03/01/spring-news-2-factor-authentication-service-center-haproxy-plugin-for-let-s-encrypt-and-more/"
  },
  "greenmangaming.com": {
    methods: [
      "email"
    ],
    documentation: "https://greenmangaming.zendesk.com/hc/en-us/articles/360024393612"
  },
  "greengeeks.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.greengeeks.com/support/article/two-factor-authentication-greengeeks/"
  },
  "greatsouthernbank.com.au": {},
  "grammarly.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.grammarly.com/hc/en-us/articles/360032922091"
  },
  "grafana.com": {},
  "gradintel.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "goto.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goto.com/meeting/help/how-do-i-set-up-and-use-multi-factor-authentication-for-my-gotomeeting-account"
  },
  "logme.in": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goto.com/meeting/help/how-do-i-set-up-and-use-multi-factor-authentication-for-my-gotomeeting-account"
  },
  "logmein.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goto.com/meeting/help/how-do-i-set-up-and-use-multi-factor-authentication-for-my-gotomeeting-account"
  },
  "logmeininc.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goto.com/meeting/help/how-do-i-set-up-and-use-multi-factor-authentication-for-my-gotomeeting-account"
  },
  "goteleport.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://goteleport.com/docs/access-controls/guides/webauthn/"
  },
  "gosuslugi.ru": {
    methods: [
      "sms",
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Electronic Digital Signature (EDS) device"
    ],
    documentation: "https://www.gosuslugi.ru/help/faq/login/101923"
  },
  "gosquared.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.gosquared.com/support/articles/6493653"
  },
  "gopro.com": {
    methods: [
      "sms"
    ],
    documentation: "https://community.gopro.com/t5/en/Setting-Up-Two-Step-Verification/ta-p/395873",
    notes: "2FA only applies on the GoPro website, not the app."
  },
  "golem.de": {},
  "gogetssl.com": {},
  "goodreads.com": {},
  "gog.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.gog.com/hc/en-us/articles/115003660533",
    notes: "Only one method of authentication can be used at a time."
  },
  "gofundme.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.gofundme.com/hc/en-us/articles/360001980947",
    notes: "2FA only for North American customers that create Personal campaigns."
  },
  "godaddy.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.godaddy.com/help/enable-two-step-verification-7502",
    notes: "If hardware 2FA enabled, customer support by phone requires enabling back-up method."
  },
  "gocardless.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.gocardless.com/hc/en-gb/articles/360001164385"
  },
  "gobrightline.com": {},
  "goabode.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goabode.com/docs/two-factor-authentication"
  },
  "goabode.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goabode.com/docs/two-factor-authentication"
  },
  "abode.mx": {
    methods: [
      "totp"
    ],
    documentation: "https://support.goabode.com/docs/two-factor-authentication"
  },
  "go.wepay.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.wepay.com/hc/en-us/articles/203609693"
  },
  "gmx.net": {
    methods: [
      "totp"
    ],
    documentation: "https://hilfe.gmx.net/sicherheit/2fa/einrichten.html",
    notes: "Setup requires SMS verification."
  },
  "gmx.at": {
    methods: [
      "totp"
    ],
    documentation: "https://hilfe.gmx.net/sicherheit/2fa/einrichten.html",
    notes: "Setup requires SMS verification."
  },
  "gmu.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://its.gmu.edu/knowledge-base/list-of-2fa-authentication-options/",
    recovery: "https://its.gmu.edu/knowledge-base/how-to-request-a-bypass-code-emergency/"
  },
  "gmx.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.gmx.com/security/2fa/setup-twofactor.html#indexlink_help_security_2fa",
    notes: "Setup requires SMS verification."
  },
  "gmo-aozora.com": {},
  "gm.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "Automatically turned on for email. You are only allowed to have one method turned on at a time."
  },
  "chevrolet.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "Automatically turned on for email. You are only allowed to have one method turned on at a time."
  },
  "buick.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "Automatically turned on for email. You are only allowed to have one method turned on at a time."
  },
  "gmc.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "Automatically turned on for email. You are only allowed to have one method turned on at a time."
  },
  "cadillac.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "Automatically turned on for email. You are only allowed to have one method turned on at a time."
  },
  "gls.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "SecureGo plus"
    ],
    "custom-hardware": [
      "Sm@rtTAN"
    ],
    documentation: "https://www.gls.de/privatkunden/faq/onlinebanking/was-ist-die-zwei-faktor-authentifizierung-2fa-1/"
  },
  "gls-one.de": {},
  "glovoapp.com": {},
  "gloriousgaming.com": {},
  "glassdoor.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.glassdoor.com/article/Manage-Two-Factor-Authentication/"
  },
  "gleam.io": {
    methods: [
      "totp"
    ],
    documentation: "https://gleam.io/faq/accounts-and-billing/account/how-do-i-turn-on-2fa"
  },
  "gitlab.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://docs.gitlab.com/ee/user/profile/account/two_factor_authentication.html"
  },
  "github.com": {
    methods: [
      "sms",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "GitHub Mobile"
    ],
    documentation: "https://docs.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication",
    recovery: "https://docs.github.com/en/github/authenticating-to-github/securing-your-account-with-two-factor-authentication-2fa/recovering-your-account-if-you-lose-your-2fa-credentials",
    notes: "Hardware tokens must have a backup method, either SMS or software token."
  },
  "giphy.com": {},
  "gilt.com": {},
  "getscreen.me": {
    methods: [
      "email",
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Telegram"
    ],
    documentation: "https://getscreen.me/en/docs/dashboard#account-authentication"
  },
  "giac.org": {},
  "getresponse.com": {
    methods: [
      "sms",
      "email",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "GetResponse app"
    ],
    documentation: "https://www.getresponse.com/help/how-to-use-two-factor-authentication-in-getresponse.html"
  },
  "getpocket.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mozilla.org/en-US/kb/secure-firefox-account-two-step-authentication",
    recovery: "https://support.mozilla.org/en-US/kb/what-if-im-locked-out-two-step-authentication"
  },
  "gerberlife.com": {},
  "geotrust.com": {
    methods: [
      "email"
    ]
  },
  "getflywheel.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://getflywheel.com/wordpress-support/how-to-enable-two-factor-authentication-on-flywheel"
  },
  "georgiapower.com": {},
  "georgetown.edu": {
    methods: [
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://uis.georgetown.edu/security/duo/"
  },
  "gemini.com": {
    methods: [
      "sms",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.gemini.com/hc/en-us/articles/204732985"
  },
  "geico.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.geico.com/web-and-mobile/2SV/"
  },
  "geforce.com": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://login.nvgs.nvidia.com/v1/help/nfactor",
    notes: "Email 2FA is always enabled."
  },
  "nvidia.com": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://login.nvgs.nvidia.com/v1/help/nfactor",
    notes: "Email 2FA is always enabled."
  },
  "login.nvgs.nvidia.com": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://login.nvgs.nvidia.com/v1/help/nfactor",
    notes: "Email 2FA is always enabled."
  },
  "gatehub.net": {
    methods: [
      "totp"
    ],
    documentation: "https://support.gatehub.net/hc/en-us/articles/360021168234"
  },
  "gauthmath.com": {},
  "gatech.edu": {
    methods: [
      "call",
      "sms",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://oit.gatech.edu/two-factor-authentication"
  },
  "gate.io": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.gate.io/help/question/16445"
  },
  "garena.sg": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Garena Authenticator"
    ],
    notes: "A mobile phone is required for 2FA."
  },
  "garmin.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://support.garmin.com/en-GB/?faq=uGHS8ZqOIhA0usBzBMdJu7"
  },
  "gamesplanet.com": {},
  "gandi.net": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://docs.gandi.net/en/account_management/security/"
  },
  "gamersgate.com": {},
  "gamemaker.io": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.yoyogames.com/hc/en-us/articles/216757288"
  },
  "yoyogames.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.yoyogames.com/hc/en-us/articles/216757288"
  },
  "gamefly.com": {},
  "gamebanana.com": {
    methods: [
      "totp"
    ],
    documentation: "https://gamebanana.com/blogs/19253"
  },
  "galicia.ar": {},
  "galaxus.ch": {
    methods: [
      "totp"
    ],
    documentation: "https://www.galaxus.ch/en/page/6589"
  },
  "gaijin.net": {
    methods: [
      "sms",
      "email",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Gaijin Pass"
    ],
    documentation: "https://support.gaijin.net/hc/en-us/articles/203623622",
    notes: "Software 2FA requires linking a phone number."
  },
  "fxhome.com": {},
  "fundingcircle.com": {},
  "fubo.tv": {},
  "ftb.ca.gov": {
    methods: [
      "sms",
      "call"
    ]
  },
  "frontify.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.frontify.com/en/articles/3947094",
    notes: "2FA is only available for Enterprise users with a security package."
  },
  "frontier.com": {},
  "front.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.front.com/en/articles/2376"
  },
  "frontapp.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.front.com/en/articles/2376"
  },
  "freshworks.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.freshworks.com/support/solutions/articles/50000001025"
  },
  "freshbooks.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.freshbooks.com/blog/2fa-two-factor-authentication"
  },
  "freewallet.org": {
    methods: [
      "totp"
    ],
    documentation: "https://freewallet.org/blog/2fa-faq"
  },
  "freetrade.io": {},
  "freenet.de": {},
  "freetaxusa.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://www.freetaxusa.com/faqsearch?search_keyword=authentication"
  },
  "freelancer.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.freelancer.com/support/general/2-step-verification"
  },
  "freehostia.com": {
    methods: [
      "totp",
      "email"
    ]
  },
  "freee.co.jp": {
    methods: [
      "totp"
    ],
    documentation: "https://support.freee.co.jp/hc/ja/articles/360001200143"
  },
  "freedommobile.ca": {
    methods: [
      "sms",
      "email"
    ]
  },
  "freeagent.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.freeagent.com/support/kb/getting-started/two-step-verification"
  },
  "freedns.afraid.org": {},
  "frame.io": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.frame.io/en/articles/4766302",
    notes: "2FA is only available for Enterprise users with mandated 2FA."
  },
  "fragdenstaat.de": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://fragdenstaat.de/hilfe/ihr-konto-verwalten/zwei-faktor-login/"
  },
  "fpmarkets.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.youtube.com/watch?v=aEXDRisRtUs"
  },
  "fpmarkets.eu": {
    methods: [
      "sms"
    ],
    documentation: "https://www.youtube.com/watch?v=aEXDRisRtUs"
  },
  "foursquare.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://foursquare.atlassian.net/servicedesk/customer/portal/20/article/3355476115"
  },
  "fpl.com": {},
  "fortuneo.fr": {},
  "gov.uk": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "fortrabbit.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.fortrabbit.com/account#toc-setting-up-2fa"
  },
  "formula1.com": {},
  "formstack.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.formstack.com/s/article/Two-Factor-Authentication"
  },
  "formspree.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.formspree.io/hc/articles/4407875207187"
  },
  "formsite.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.formsite.com/hc/en-us/articles/360000686614",
    notes: "2FA is only available for Pro 3 accounts or higher."
  },
  "forge.laravel.com": {
    methods: [
      "totp"
    ],
    documentation: "https://forge.laravel.com/docs/1.0/accounts/your-account.html#securing-your-account-with-two-factor-authentication"
  },
  "foodora.se": {},
  "foodora.no": {},
  "foodora.fi": {},
  "followmyhealth.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.followmyhealth.com/2020/03/10/turning-on-two-factor-authentication-while-logged-into-your-account/"
  },
  "fogbugz.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.fogbugz.com/hc/en-us/articles/360011262434"
  },
  "flyxo.com": {},
  "flysas.com": {},
  "flyingblue.com": {},
  "airfrance.com": {},
  "klm.com": {},
  "flyingblue.am": {},
  "flyingblue.at": {},
  "flyingblue.be": {},
  "flyingblue.bz": {},
  "flyingblue.ca": {},
  "flyingblue.cn": {},
  "flyingblue.co.in": {},
  "flyingblue.co.nz": {},
  "flyingblue.co.uk": {},
  "flyingblue.co.za": {},
  "flyingblue.com.au": {},
  "flyingblue.com.co": {},
  "flyingblue.com.mx": {},
  "flyingblue.com.ph": {},
  "flyingblue.com.tw": {},
  "flyingblue.com.ve": {},
  "flyingblue.de": {},
  "flyingblue.es": {},
  "flyingblue.fr": {},
  "flyingblue.la": {},
  "flyingblue.nl": {},
  "flyingblue.pl": {},
  "flyingblue.us": {},
  "flyfrontier.com": {},
  "flybuys.com.au": {
    methods: [
      "sms"
    ]
  },
  "fly.io": {
    methods: [
      "totp"
    ]
  },
  "fly-metrics.net": {
    methods: [
      "totp"
    ]
  },
  "flybreeze.com": {},
  "flourish.studio": {
    methods: [
      "totp"
    ],
    documentation: "https://help.flourish.studio/article/362--"
  },
  "floatplane.com": {
    methods: [
      "totp"
    ]
  },
  "flipsnack.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.flipsnack.com/en/articles/6291629-how-to-set-up-the-two-factor-authentication-option"
  },
  "flipkart.com": {},
  "flipboard.com": {},
  "flightradar24.com": {},
  "flightaware.com": {},
  "flickr.com": {},
  "flexera.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.flexera.com/svm/Content/helplibrary/Configure_Two_Factor_Authentication__2FA_.htm",
    recovery: "https://docs.flexera.com/svm/Content/helplibrary/Two_Factor_Authentication_Recovery.htm"
  },
  "fleep.io": {},
  "flatex.de": {},
  "flaticon.com": {},
  "fiverr.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.fiverr.com/support/articles/360010239658"
  },
  "fit.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "fitbit.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.fitbit.com/articles/en_US/Help_article/2197"
  },
  "fisglobal.com": {},
  "firsttechfed.com": {
    methods: [
      "custom-software",
      "custom-hardware",
      "sms",
      "call",
      "email",
      "totp"
    ],
    "custom-software": [
      "Entrust Identity Guard"
    ],
    "custom-hardware": [
      "Entrust Hardware Token"
    ],
    documentation: "https://www.firsttechfed.com/help/security/prevent#multifunction"
  },
  "firsthorizon.com": {},
  "firstdirect.com": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Digital Secure Key (first direct app)"
    ],
    "custom-hardware": [
      "Physical Secure Key"
    ],
    documentation: "https://www1.firstdirect.com/help/secure-key/"
  },
  "firstcommunity.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.firstcommunityexpressnet.com/tob/live/usp-core/static/help.html#login_security"
  },
  "fio.cz": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Fio Smartbanking CZ"
    ],
    documentation: "https://www.fio.cz/bank-services/internetbanking/security"
  },
  "firmex.com": {
    methods: [
      "totp",
      "sms",
      "email"
    ],
    documentation: "https://support.firmex.com/hc/en-us/articles/204467648",
    notes: "2FA must be enabled by a site administrator before use."
  },
  "finnkino.fi": {},
  "finnair.com": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "finecobank.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Fineco app"
    ],
    documentation: "https://finecobank.com/it/online/sicurezza/"
  },
  "findmyshift.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.findmyshift.com/help/what-is-two-factor-authentication"
  },
  "finary.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.finary.com/en/articles/6518627",
    recovery: "https://help.finary.com/en/articles/6519234"
  },
  "filmweb.pl": {},
  "files.com": {
    methods: [
      "sms",
      "custom-hardware",
      "u2f",
      "totp"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.files.com/docs/features/twofactor-authentication-2fa"
  },
  "filen.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.filen.io/knowledgebase.php?article=20"
  },
  "figma.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.figma.com/hc/en-us/articles/360039817634"
  },
  "fidelity.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Fidelity Investments app"
    ],
    documentation: "https://www.fidelity.com/security/extra-security-login"
  },
  "fiber.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "fi.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "feedly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.feedly.com/article/747-how-to-enable-two-factor-authentication"
  },
  "fedex.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "fax.plus": {
    methods: [
      "totp"
    ],
    documentation: "https://help.alohi.com/hc/en-us/articles/10305460302876#h_01HQNATZ23QZDS1ZD727628RP7"
  },
  "favro.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.favro.com/en/articles/1019897"
  },
  "fauna.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.fauna.com/fauna/current/administration/multifactor_auth"
  },
  "faucetpay.io": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://faq.faucetpay.io/knowledge-base/what-is-2fa-and-how-do-i-enable-it-in-my-account/",
    recovery: "https://faq.faucetpay.io/knowledge-base/i-accidentally-removed-the-2fa-application-from-my-mobile-what-should-do-i-now/"
  },
  "fathomhq.com": {
    methods: [
      "totp",
      "email",
      "sms"
    ],
    documentation: "https://support.fathomhq.com/en/articles/4483786"
  },
  "faucetcrypto.com": {
    methods: [
      "totp"
    ]
  },
  "fastspring.com": {},
  "fastmail.com": {
    methods: [
      "sms",
      "totp",
      "custom-hardware",
      "u2f"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.fastmail.com/help/account/2fa.html",
    notes: "Setup requires SMS verification."
  },
  "fastly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.fastly.com/guides/account-management-and-security/enabling-and-disabling-two-factor-authentication"
  },
  "fasthosts.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://help.fasthosts.co.uk/app/answers/detail/a_id/3345"
  },
  "fastcomet.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.fastcomet.com/tutorials/getting-started/enabling-two-factor-authentication"
  },
  "fanfiction.net": {},
  "fanduel.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.fanduel.com/2fa-how-it-works"
  },
  "fandom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://community.fandom.com/wiki/Help:2FA"
  },
  "fanatics.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "fanatical.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.fanatical.com/hc/en-us/articles/360002761397"
  },
  "fakturoid.cz": {
    methods: [
      "totp"
    ],
    documentation: "https://www.fakturoid.cz/podpora/nastaveni/dvoufazove-overeni"
  },
  "fairwinds.org": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.fairwinds.org/inside/privacy/security_we.asp#multifactor-auth"
  },
  "fairphone.com": {},
  "fahren-lernen.de": {},
  "faceit.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.faceit.com/hc/en-us/articles/115000254670"
  },
  "facebook.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.facebook.com/help/148233965247823"
  },
  "messenger.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.facebook.com/help/148233965247823"
  },
  "f2pool.com": {
    methods: [
      "totp"
    ],
    documentation: "https://f2pool.zendesk.com/hc/articles/360058722731"
  },
  "f-secure.com": {
    methods: [
      "totp"
    ],
    documentation: "https://community.f-secure.com/common-home-en/kb/articles/9144"
  },
  "extremenetworks.com": {},
  "expressvpn.com": {
    methods: [
      "email"
    ]
  },
  "expo.dev": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.expo.dev/accounts/two-factor/"
  },
  "experian.co.uk": {
    methods: [
      "sms",
      "call"
    ]
  },
  "experian.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "freecreditreport.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "expensify.com": {
    methods: [
      "totp"
    ],
    documentation: "https://community.expensify.com/discussion/7385"
  },
  "exmo.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://info.exmo.com/en/education/how-to-enable-2fa/"
  },
  "exeloncorp.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "atlanticcityelectic.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "bge.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "comed.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.comed.com/MyAccount/CustomerSupport/pages/faqs.aspx#WebPartWPQ15"
  },
  "delmarva.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "peco.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "pepco.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "exact.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.exactonline.com/community/s/knowledge-base#All-All-HNO-Task-general-security-gen-auth-totpregphndsktpt"
  },
  "evgo.com": {},
  "everyday.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "woolworthsrewards.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "everydayrewards.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "everydayrewards.co.nz": {
    methods: [
      "sms",
      "email"
    ]
  },
  "eversource.com": {},
  "evernote.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.evernote.com/hc/en-us/articles/208314238",
    notes: "SMS and phone call are always enabled as backup methods for TOTP."
  },
  "eversign.com": {},
  "xodosign.com": {},
  "everlaw.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.everlaw.com/hc/en-us/articles/206312165"
  },
  "everlane.com": {},
  "eveonline.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://support.eveonline.com/hc/en-us/articles/203465601"
  },
  "eventim.de": {},
  "eventbrite.com": {},
  "eurowings.com": {},
  "eurodns.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.eurodns.com/s/article/how-do-i-activate-two-step-verification-on-my-account"
  },
  "eukhost.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.eukhost.com/kb/how-to-enable-two-factor-authentication-2fa/"
  },
  "eufylife.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://support.eufylife.com/s/article/Two-Step-Verification-for-eufySecurity-App"
  },
  "etsy.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.etsy.com/hc/en-us/articles/115015569567#h_01EZCBHFZHS7NBB4VA7NFE9YMX"
  },
  "etrade.com": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Symantec VIP Access"
    ],
    "custom-hardware": [
      "Symantec hardware token"
    ],
    documentation: "https://us.etrade.com/security-center/securityid"
  },
  "ets.org": {
    methods: [
      "sms",
      "call"
    ]
  },
  "etoro.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.etoro.com/en-us/customer-service/help/1281239912/-"
  },
  "etana.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.etana.com/hc/en-us/articles/360053109333"
  },
  "esri.com": {
    methods: [
      "totp"
    ],
    documentation: "https://doc.arcgis.com/en/arcgis-online/reference/multifactor.htm"
  },
  "espressohouse.com": {},
  "eset.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.eset.com/home_eset/en-US/two_factor_authentication.html"
  },
  "erstebank.hr": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "George App"
    ],
    "custom-hardware": [
      "Display card"
    ],
    documentation: "https://www.erstebank.hr/hr/sigurnost#/modalComponent/isOpen/true/url/%2Fhr%2Fconfiguration%2Fleads%2Fsigurnost0%2Fsigurno-online-bankarenje.modal"
  },
  "ergon.com.au": {},
  "erau.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ]
  },
  "equifax.com": {},
  "soluciones.equifax.com.ar": {},
  "equifax.com.au": {},
  "consumer.equifax.ca": {},
  "soluciones.equifax.cl": {},
  "equifax.co.cr": {},
  "equifax.ec": {},
  "equifax.sv": {},
  "equifax.hn": {},
  "equifax.co.in": {},
  "equifax.com.mx": {},
  "equifax.co.nz": {},
  "soluciones.equifax.com.py": {},
  "equifax.pe": {},
  "equifax.pt": {},
  "equifax.ru": {},
  "soluciones.equifax.es": {},
  "equifax.co.uk": {},
  "equifax.uy": {},
  "eprice.it": {},
  "epik.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.epik.com/hc/en-us/articles/10721574479771"
  },
  "epidemicsound.com": {},
  "epicgames.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.epicgames.com/help/en-US/c74/c112/a3218"
  },
  "fortnite.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.epicgames.com/help/en-US/c74/c112/a3218"
  },
  "fallguys.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.epicgames.com/help/en-US/c74/c112/a3218"
  },
  "epayslips.co.uk": {
    methods: [
      "u2f",
      "totp"
    ]
  },
  "eon.de": {
    methods: [
      "totp"
    ]
  },
  "envoyer.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.envoyer.io/1.0/accounts/your-account.html#securing-your-account-with-two-factor-authentication"
  },
  "envato.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.market.envato.com/hc/articles/115005592963"
  },
  "placeit.net": {
    methods: [
      "totp"
    ],
    documentation: "https://help.market.envato.com/hc/articles/115005592963"
  },
  "entrust.net": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Entrust IdentityGuard"
    ],
    "custom-hardware": [
      "eGrid"
    ],
    documentation: "https://www.entrust.com/knowledgebase/ssl/multifactor-authentication-faq"
  },
  "ente.io": {
    methods: [
      "totp"
    ]
  },
  "enom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://enom.help/2fa"
  },
  "enjin.io": {},
  "enjin.com": {},
  "engineyard.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.cloud.engineyard.com/hc/en-us/articles/4412829652507"
  },
  "engadget.com": {},
  "energyaustralia.com.au": {
    methods: [
      "email"
    ],
    documentation: "https://www.energyaustralia.com.au/home/help-and-support/faqs/multi-factor-authentication"
  },
  "emplifi.io": {
    methods: [
      "totp"
    ],
    documentation: "https://support.socialbakers.com/hc/en-us/articles/360015072719"
  },
  "eneba.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.eneba.com/hc/en-us/articles/360010216714"
  },
  "emp-online.com": {},
  "emp-shop.pl": {},
  "emp.fi": {},
  "emp-shop.dk": {},
  "large.be": {},
  "emp-online.fr": {},
  "emp-shop.cz": {},
  "emp.ie": {},
  "large.nl": {},
  "emp-online.es": {},
  "emp.de": {},
  "emp-shop.no": {},
  "emp.co.uk": {},
  "emp.at": {},
  "emp-online.it": {},
  "emp-online.ch": {},
  "emp-shop.se": {},
  "emp-shop.sk": {},
  "emma.ca": {},
  "emailmeform.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.emailmeform.com/hc/en-us/sections/360002042671"
  },
  "emich.edu": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://www.emich.edu/it/security/esp/duo.php"
  },
  "elv.com": {},
  "elster.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "ElsterSecure"
    ],
    "custom-hardware": [
      "National identity card",
      "G&D StarSign Crypto Key",
      "Signature card"
    ],
    documentation: "https://www.elster.de/eportal/helpGlobal?themaGlobal=help_eop"
  },
  "elmah.io": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.elmah.io/how-to-enable-two-factor-login/"
  },
  "ello.co": {},
  "elfster.com": {},
  "elevenlabs.io": {
    methods: [
      "sms"
    ],
    documentation: "https://help.elevenlabs.io/hc/articles/21636341747985"
  },
  "element.io": {
    methods: [
      "totp"
    ],
    documentation: "https://ems-docs.element.io/link/6#bkmrk-how-do-i-enable-2fa-"
  },
  "elderscrollsonline.com": {
    methods: [
      "email"
    ],
    documentation: "https://help.elderscrollsonline.com/app/answers/detail/a_id/8611"
  },
  "elationhealth.com": {},
  "elasticemail.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://help.elasticemail.com/en/articles/2783376"
  },
  "elastic.co": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.elastic.co/guide/en/cloud/current/ec-account-user-settings.html#ec-account-security-mfa"
  },
  "eki-net.com": {},
  "egnyte.com": {
    methods: [
      "totp",
      "custom-software",
      "sms",
      "call"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://helpdesk.egnyte.com/hc/en-us/articles/360028032991",
    notes: "Availability of 2FA options depends on your account type."
  },
  "efirstbank.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "FirstBank App"
    ],
    documentation: "https://www.efirstbank.com/internet-banking/login-options.htm"
  },
  "ee.co.uk": {
    methods: [
      "sms"
    ],
    documentation: "https://ee.co.uk/help/profile/registration-setup/account-authentication",
    notes: "Once enabled you cannot disable it again. You can only change the phone number you receive the code on."
  },
  "edx.org": {},
  "edwardjones.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.edwardjones.com/sites/default/files/acquiadam/2020-10/online-access-user-guide-MKT-11935A-A.pdf"
  },
  "edwardjones.ca": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.edwardjones.com/sites/default/files/acquiadam/2020-10/online-access-user-guide-MKT-11935A-A.pdf"
  },
  "eduonix.com": {},
  "eduid.ch": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.switch.ch/eduid/faqs/?lang=en#mfa",
    recovery: "https://help.switch.ch/eduid/faqs/?lang=en#mfa-lost-mobile"
  },
  "ecu.edu": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://ecu.teamdynamix.com/TDClient/1409/Portal/Requests/ServiceDet?ID=31556"
  },
  "educative.io": {
    methods: [
      "email"
    ]
  },
  "edabit.com": {},
  "ecobee.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.ecobee.com/hc/en-us/articles/360040957212"
  },
  "eclincher.com": {
    methods: [
      "totp"
    ]
  },
  "eccouncil.org": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://aspen.eccouncil.org/aspen/Help/2FactorAuthentication-User_Manual.pdf"
  },
  "ebgames.com.au": {},
  "ebay.com": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.com.au": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.at": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.be": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.ca": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.cn": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.fr": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.de": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.com.hk": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.in": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.ie": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.it": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.co.jp": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "gmarket.co.kr": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.com.my": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.nl": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.ph": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.pl": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.com.sg": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.es": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.ch": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.com.tw": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "ebay.co.uk": {
    methods: [
      "sms",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "eBay app"
    ],
    documentation: "https://www.ebay.com/help/account/protecting-account/tips-keeping-ebay-account-secure?id=4872#section2"
  },
  "eb.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "SecureGo plus"
    ],
    "custom-hardware": [
      "photoTAN generator"
    ],
    documentation: "https://www.eb.de/institutionen_cf/zahlungsverkehr/online-banking.html"
  },
  "easysendy.com": {
    methods: [
      "totp"
    ],
    documentation: "https://easysendy.com/sendy/sendy-version-2-1-0-two-factor-authentication-released"
  },
  "easyjet.com": {},
  "easydns.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://kb.easydns.com/knowledge/account-security/"
  },
  "easydmarc.com": {
    methods: [
      "totp"
    ],
    documentation: "https://easydmarc.com/blog/two-factor-authentication/"
  },
  "easybank.at": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "easybank Security App"
    ],
    documentation: "https://www.easybank.at/easybank/faq#Zeichnungsverfahren"
  },
  "easternbank.com": {},
  "earthclassmail.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.earthclassmail.com/hc/en-us/articles/4410499059351"
  },
  "ea.com": {
    methods: [
      "sms",
      "email",
      "call",
      "totp"
    ],
    documentation: "https://help.ea.com/en-us/help/account/origin-login-verification-information/"
  },
  "origin.com": {
    methods: [
      "sms",
      "email",
      "call",
      "totp"
    ],
    documentation: "https://help.ea.com/en-us/help/account/origin-login-verification-information/"
  },
  "e-hon.ne.jp": {},
  "dynu.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.dynu.com/en-US/Blog/Article?Article=It-is-time-to-enable-two-factor-authentication"
  },
  "dynadot.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.dynadot.com/community/help/question/2-step-verification"
  },
  "dyn.com": {},
  "dwolla.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.dwolla.com/updates/introducing-two-factor-authentication-for-dwolla/"
  },
  "dutchbros.com": {},
  "dutchbanglabank.com": {},
  "duolingo.com": {},
  "duke.edu": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://idms-mfa.oit.duke.edu/mfa/help"
  },
  "duke-energy.com": {},
  "drupal.org": {
    methods: [
      "totp"
    ],
    documentation: "https://www.drupal.org/drupalorg/docs/user-accounts/setting-up-two-factor-authentication"
  },
  "dteenergy.com": {},
  "druide.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.antidote.info/en/druide-account/client-portal-user-guide/druide-account/safeguarding-your-account"
  },
  "drugs.com": {},
  "dropbox.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.dropbox.com/security/enable-two-step-verification",
    recovery: "https://help.dropbox.com/accounts-billing/security/issues-two-step-verification",
    notes: "Hardware 2FA requires also enabling Software or SMS 2FA as a back-up."
  },
  "getdropbox.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.dropbox.com/security/enable-two-step-verification",
    recovery: "https://help.dropbox.com/accounts-billing/security/issues-two-step-verification",
    notes: "Hardware 2FA requires also enabling Software or SMS 2FA as a back-up."
  },
  "drop.com": {},
  "drive.google.com": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "totp",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "drift.com": {
    methods: [
      "totp"
    ]
  },
  "dreamstime.com": {},
  "dreamhost.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://help.dreamhost.com/hc/en-us/articles/216013897"
  },
  "drchrono.com": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.drchrono.com/hc/en-us/articles/200030385"
  },
  "draftkings.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.draftkings.com/hc/en-us/articles/4409699580691"
  },
  "dotloop.com": {
    methods: [
      "call",
      "sms",
      "totp"
    ],
    documentation: "https://support.dotloop.com/s/article/Two-Factor-Authentication"
  },
  "dpd.de": {},
  "dotdigital.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.dotdigital.com/hc/en-gb/articles/212212678"
  },
  "doppler.com": {
    methods: [
      "email",
      "totp",
      "u2f"
    ],
    documentation: "https://docs.doppler.com/docs/multi-factor-authentication"
  },
  "doordash.com": {},
  "doodrive.com": {},
  "donateblood.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "doodle.com": {},
  "dominodatalab.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.dominodatalab.com/hc/en-us/articles/115000998406"
  },
  "dominionenergy.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "domeneshop.no": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://domeneshop.no/faq?id=344",
    notes: "SMS available only to customers in Norway, Sweden and Denmark."
  },
  "domaintools.com": {},
  "domain.com": {},
  "domain.com.au": {
    methods: [
      "sms"
    ],
    documentation: "https://help.domain.com.au/hc/en-us/articles/360012412713",
    notes: "2FA is not available on the app."
  },
  "dollargeneral.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "dodo.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.dodo.com/protecting-your-account"
  },
  "dodo.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.dodo.com/protecting-your-account"
  },
  "docusign.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://support.docusign.com/en/guides/ndse-user-guide-two-step-verification"
  },
  "docusign.net": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://support.docusign.com/en/guides/ndse-user-guide-two-step-verification"
  },
  "doctolib.it": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://doctolibpatient.zendesk.com/hc/articles/360021300860"
  },
  "doctolib.de": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://doctolibpatient.zendesk.com/hc/articles/360021300860"
  },
  "doctolib.fr": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://doctolibpatient.zendesk.com/hc/articles/360021300860"
  },
  "doctolib.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://doctolibpatient.zendesk.com/hc/articles/360021300860"
  },
  "docker.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.docker.com/docker-hub/2fa/",
    recovery: "https://docs.docker.com/docker-hub/2fa/recover-hub-account/"
  },
  "dnsimple.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.dnsimple.com/articles/two-factor-authentication/"
  },
  "umbrella.com": {
    methods: [
      "sms"
    ],
    documentation: "https://docs.umbrella.com/deployment-umbrella/docs/enable-two-step-verification"
  },
  "dnsfilter.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.dnsfilter.com/hc/en-us/articles/4419435706003"
  },
  "dnb.no": {
    methods: [
      "custom-software",
      "custom-hardware",
      "sms"
    ],
    "custom-software": [
      "BankID app"
    ],
    "custom-hardware": [
      "BankID card reader"
    ],
    documentation: "https://www.dnb.no/privat/kundeservice/innlogging-nettbank.html"
  },
  "dmoj.ca": {
    methods: [
      "totp"
    ],
    documentation: "https://dmoj.ca/post/144-2-factor-authentication"
  },
  "dmm.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.dmm.com/accounts/article/46818",
    recovery: "https://support.dmm.com/accounts/article/46834"
  },
  "dmarcian.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://dmarcian.com/secure-dmarcian-2fa/"
  },
  "dmarcanalyzer.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.dmarcanalyzer.com/set-two-factor-authentication-additional-security/"
  },
  "dkb.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "DKB app",
      "DKB-Banking",
      "DKB-TAN2go"
    ],
    "custom-hardware": [
      "chipTAN card reader"
    ],
    documentation: "https://www.dkb.de/info/neue-anmeldung"
  },
  "disqus.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.disqus.com/articles/9768685"
  },
  "displate.com": {},
  "disneyplus.com": {},
  "dish.com": {},
  "disk.yandex.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Yandex.Key"
    ],
    documentation: "https://yandex.com/support/id/authorization/twofa.html",
    recovery: "https://yandex.com/support/id/authorization/twofa-restore.html",
    notes: "SMS-capable phone required for initial setup."
  },
  "discoveryplus.com": {},
  "discover.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.discover.com/credit-cards/member-benefits/security-center/protect-account/account-verification.html"
  },
  "discovercard.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.discover.com/credit-cards/member-benefits/security-center/protect-account/account-verification.html"
  },
  "discord.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://support.discord.com/hc/en-us/articles/219576828"
  },
  "discordapp.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://support.discord.com/hc/en-us/articles/219576828"
  },
  "discountbank.co.il": {},
  "discogs.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.discogs.com/hc/en-us/articles/4403461442317"
  },
  "directv.com": {},
  "directnic.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://directnic.com/knowledge/article/137"
  },
  "directadmin.com": {
    methods: [
      "totp"
    ],
    documentation: "https://directadmin.com/features.php?id=1754"
  },
  "dinero.dk": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://dinero.dk/support/to-faktor-login"
  },
  "dinahosting.com": {
    methods: [
      "totp"
    ],
    documentation: "https://dinahosting.com/ayuda/activar-autenticacion-dos-pasos-en-panel/"
  },
  "digitec.ch": {
    methods: [
      "totp"
    ],
    documentation: "https://www.digitec.ch/en/page/6589"
  },
  "digitalsurge.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://help.digitalsurge.com.au/en/articles/5573002",
    notes: "A mobile phone number is required to set up two-factor authentication."
  },
  "digitalriver.com": {
    methods: [
      "sms"
    ],
    documentation: "https://docs.digitalriver.com/digital-river-api/administration/dashboard/profile-settings/enabling-two-factor-authentication"
  },
  "digitalocean.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.digitalocean.com/docs/accounts/security/2fa/"
  },
  "digitalcombatsimulator.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.digitalcombatsimulator.com/en/support/faq/User_profile/#3319486"
  },
  "eagle.ru": {
    methods: [
      "totp"
    ],
    documentation: "https://www.digitalcombatsimulator.com/en/support/faq/User_profile/#3319486"
  },
  "digid.nl": {
    methods: [
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "DigiD"
    ],
    documentation: "https://www.digid.nl/nl/vraag-en-antwoord/hoe-kan-ik-de-sms-controle-toevoegen/"
  },
  "digicert.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.digicert.com/two-factor-authentication.htm"
  },
  "didiglobal.com": {
    methods: [
      "sms"
    ],
    notes: "DiDi decides when 2FA is required; user cannot enable 2FA for every login."
  },
  "99app.com": {
    methods: [
      "sms"
    ],
    notes: "DiDi decides when 2FA is required; user cannot enable 2FA for every login."
  },
  "didimobility.co.jp": {
    methods: [
      "sms"
    ],
    notes: "DiDi decides when 2FA is required; user cannot enable 2FA for every login."
  },
  "dhl.de": {
    methods: [
      "email"
    ],
    documentation: "https://www.dhl.de/de/toolbar/footer/datenschutz.html#kundenkontoundempfaengerservices"
  },
  "df.eu": {},
  "deviantart.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.deviantartsupport.com/kb/en/article/what-is-two-factor-authentication-and-how-do-i-enable-or-disable-it",
    notes: "2FA can only be setup if you have a Core membership. 2FA setup is required in order to withdraw earnings regardless of membership status"
  },
  "dext.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.receipt-bank.com/hc/articles/360002530177"
  },
  "developer.nexmo.com": {
    methods: [
      "sms",
      "call"
    ]
  },
  "deutschepost.de": {
    methods: [
      "totp",
      "email"
    ]
  },
  "deutsche-rentenversicherung.de": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "National identity card",
      "Signature card"
    ],
    documentation: "https://www.deutsche-rentenversicherung.de/DRV/DE/Online-Dienste/unsere_online-dienste.html"
  },
  "deutsche-bank.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Deutsche Bank Mobile"
    ],
    "custom-hardware": [
      "photoTAN card reader"
    ],
    documentation: "https://www.deutsche-bank.de/pk/lp/psd2.html"
  },
  "detectify.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.detectify.com/support/solutions/articles/48001061904"
  },
  "despegar.com": {},
  "desmos.com": {},
  "desjardins.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Desjardins Mobile Services App"
    ],
    documentation: "https://www.desjardins.com/securite/validation-2-etapes/"
  },
  "desertfinancial.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.desertfinancial.com/faq/online-solutions-faqs/security"
  },
  "deputy.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.deputy.com/hc/en-au/articles/4621532398351",
    recovery: "https://help.deputy.com/hc/en-us/articles/5082880153615"
  },
  "depop.com": {
    methods: [
      "sms"
    ],
    documentation: "https://depophelp.zendesk.com/hc/en-gb/articles/360017103878",
    recovery: "https://depophelp.zendesk.com/hc/en-gb/articles/360017003737",
    notes: "2FA can only be enabled via the app. Recovery codes can only be used via the app."
  },
  "deployhq.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.deployhq.com/support/managing-your-account/personal-profile/two-factor-authentication"
  },
  "deploybot.com": {},
  "demio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.demio.com/en/articles/4794494"
  },
  "delta.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Fly Delta app"
    ]
  },
  "deltadental.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalcoversme.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalar.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalks.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalok.org": {
    methods: [
      "sms"
    ]
  },
  "deltadentalpr.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalaz.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalco.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalct.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalia.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalid.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalil.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalin.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalins.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalma.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalmi.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalmn.org": {
    methods: [
      "sms"
    ]
  },
  "deltadentalmo.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalne.org": {
    methods: [
      "sms"
    ]
  },
  "deltadentalnj.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalnm.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentaloh.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalri.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalsc.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalsd.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalva.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalwa.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalwi.com": {
    methods: [
      "sms"
    ]
  },
  "deltadentalwy.org": {
    methods: [
      "sms"
    ]
  },
  "hawaiidentalservice.com": {
    methods: [
      "sms"
    ]
  },
  "modahealth.com": {
    methods: [
      "sms"
    ]
  },
  "nedelta.com": {
    methods: [
      "sms"
    ]
  },
  "dell.com": {},
  "deliverr.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.deliverr.com/hc/en-us/articles/4575365498519"
  },
  "deliveroo.com": {},
  "deliveroo.co.uk": {},
  "deliveroo.fr": {},
  "deliveroo.nl": {},
  "deliveroo.be": {},
  "deliveroo.ie": {},
  "deliveroo.es": {},
  "deliveroo.it": {},
  "deliveroo.com.sg": {},
  "deliveroo.hk": {},
  "deliveroo.ae": {},
  "deliveroo.com.kw": {},
  "deliveroo.de": {},
  "deliveroo.tw": {},
  "delinea.com": {
    methods: [
      "call",
      "sms",
      "totp",
      "email",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Duo Push"
    ],
    documentation: "https://docs.delinea.com/ss/10.8.0/authentication/two-factor-authentication"
  },
  "delighted.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.delighted.com/article/526--#2-step"
  },
  "delightedapp.com": {
    methods: [
      "sms"
    ],
    documentation: "https://help.delighted.com/article/526--#2-step"
  },
  "delaware.gov": {
    methods: [
      "call",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://webfiles.dti.delaware.gov/pdfs/Setting-Up-Your-MFA.pdf"
  },
  "deka.de": {},
  "degussa-bank.de": {
    methods: [
      "custom-hardware",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Degussa Bank Banking+Brokerage"
    ],
    "custom-hardware": [
      "Biometrics (via app)"
    ],
    documentation: "https://www.degussa-bank.de/apptan-verfahren"
  },
  "degoo.com": {},
  "degiro.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.cz": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.ch": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.dk": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.de": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.es": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.gr": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.fr": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.ie": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.it": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.co.no": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.hu": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.at": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.pl": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.pt": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.fi": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.se": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "degiro.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://www.degiro.nl/helpdesk/account-en-persoonlijke-gegevens/toegang-tot-uw-degiro-account/hoe-kan-ik-twee-stapsverificatie"
  },
  "deezer.com": {},
  "deepl.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.deepl.com/hc/articles/17764808297628",
    recovery: "https://support.deepl.com/hc/articles/17765746756636"
  },
  "deel.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.letsdeel.com/hc/en-gb/articles/4407737656465"
  },
  "letsdeel.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.letsdeel.com/hc/en-gb/articles/4407737656465"
  },
  "deakin.edu.au": {
    methods: [
      "sms",
      "call",
      "u2f",
      "totp",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://help.deakin.edu.au/ithelp?id=kb_article&sysparm_article=KB0013804"
  },
  "dcu.org": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.dcu.org/online-banking/online-banking-enhancements.html"
  },
  "dbs.com.sg": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "DBS iB Secure Device"
    ],
    documentation: "https://www.dbs.com.sg/personal/deposits/security-and-you/we-protect-you.page#slideToN10051"
  },
  "datto.com": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://help.workplace.datto.com/managerhelp/Content/3_ONLINE/Settings/2Factor_Authentication.htm"
  },
  "datev.de": {
    methods: [
      "totp",
      "sms",
      "custom-hardware"
    ],
    "custom-hardware": [
      "National identity card"
    ],
    documentation: "https://apps.datev.de/help-center/documents/1022726",
    notes: "2FA only available for DATEV Arbeitnehmer online"
  },
  "datarobot.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.datarobot.com/en/docs/platform/authentication/2fa.html"
  },
  "datadoghq.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.datadoghq.com/account_management/multi-factor_authentication/",
    recovery: "https://docs.datadoghq.com/account_management/multi-factor_authentication/#mfa-recovery"
  },
  "databox.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.databox.com/overview-two-factor-authentication-2fa"
  },
  "danskebank.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://danskebank.se/privat/digitala-tjanster/ovriga-tjanster/bankid"
  },
  "dashlane.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.dashlane.com/hc/en-us/articles/202625042"
  },
  "danskebank.dk": {
    methods: [
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "NemID app"
    ],
    "custom-hardware": [
      "NemID code token"
    ],
    documentation: "https://www.nemid.nu/dk-en/get_started/"
  },
  "dan.com": {
    methods: [
      "totp"
    ],
    documentation: "https://news.dan.com/214543-"
  },
  "dab-bank.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "DAB SecurePlus app"
    ],
    "custom-hardware": [
      "QR TAN reader"
    ],
    documentation: "https://b2b.dab-bank.de/Tradingcenter/Service-Infos/SecurePlus/"
  },
  "cyon.ch": {
    methods: [
      "totp"
    ],
    documentation: "https://www.cyon.ch/support/a/zwei-schritt-verifizierung-aktivieren"
  },
  "cyberghostvpn.com": {},
  "customer.io": {
    methods: [
      "totp"
    ],
    documentation: "https://customer.io/docs/two-factor-auth"
  },
  "current-rms.com": {
    methods: [
      "totp",
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://help.current-rms.com/en/articles/1767596"
  },
  "currencycloud.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.currencycloud.com/hc/en-gb/articles/360018656420"
  },
  "culturedcode.com": {},
  "curiositystream.com": {},
  "csob.cz": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "\u010CSOB Smart key"
    ],
    documentation: "https://www.csob.cz/portal/people/accounts/internet-and-mobile-banking/csob-smart-key"
  },
  "csn.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://tjanster.csn.se/bas/vanligaFragor.do"
  },
  "csas.cz": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "George Ceska Sporitelna"
    ],
    documentation: "https://www.csas.cz/cs/mobilni-aplikace/george-klic"
  },
  "cryptopanic.com": {},
  "cryptonator.com": {
    methods: [
      "totp",
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Telegram"
    ],
    documentation: "https://cryptonator.zendesk.com/hc/en-us/articles/201715352"
  },
  "crypto.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.crypto.com/en/articles/3511439"
  },
  "crunchyroll.com": {},
  "crowdsupply.com": {
    methods: [
      "totp",
      "u2f"
    ]
  },
  "crowdin.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.crowdin.com/account-settings/#two-factor-authentication"
  },
  "cronometer.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.cronometer.com/hc/en-us/articles/360042096672"
  },
  "crowdcube.com": {
    methods: [
      "totp"
    ]
  },
  "crowdcube.eu": {
    methods: [
      "totp"
    ]
  },
  "cron-job.org": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ]
  },
  "creditkarma.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.creditkarma.com/s/article/Can-I-use-Two-Factor-Authentication-on-Credit-Karma"
  },
  "credly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.credly.com/hc/articles/10479287806107",
    recovery: "https://support.credly.com/hc/articles/360039330612",
    notes: "Password reset also disables 2FA."
  },
  "creditkarma.co.uk": {},
  "creditkarma.ca": {},
  "crazydomains.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.crazydomains.co.uk/help/how-to-enable-or-disable-two-step-verification-system/"
  },
  "crashplan.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.crashplan.com/hc/en-us/articles/8724455295245",
    notes: "2FA is not available on the CrashPlan/Code42 desktop application."
  },
  "crashplanpro.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.crashplan.com/hc/en-us/articles/8724455295245",
    notes: "2FA is not available on the CrashPlan/Code42 desktop application."
  },
  "console.us2.crashplanpro.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.crashplan.com/hc/en-us/articles/8724455295245",
    notes: "2FA is not available on the CrashPlan/Code42 desktop application."
  },
  "cqu.edu.au": {
    methods: [
      "totp",
      "sms",
      "call",
      "custom-software"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ]
  },
  "cpoms.co.uk": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://raptor.my.site.com/CPOMS/s/article/CPOMS-Login-Help-Guide-4cb23e40"
  },
  "cpoms.net": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://raptor.my.site.com/CPOMS/s/article/CPOMS-Login-Help-Guide-4cb23e40"
  },
  "cpp.edu": {
    methods: [
      "sms",
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://cpp.service-now.com/ehelp?id=kb_article&sys_id=ed4dcbc3dbeb1f449bba68461b96198e"
  },
  "cox.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.cox.com/residential/support/enrolling-in-multifactor-authentication-in-my-account.html"
  },
  "coursera.org": {
    methods: [
      "totp"
    ],
    documentation: "https://www.coursera.support/s/article/learner-000002204-Update-your-login-settings#set_up_2FA"
  },
  "couchsurfing.com": {},
  "costplusdrugs.com": {},
  "costco.com": {},
  "cospaces.io": {},
  "cosmolex.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.cosmolex.com/knowledge-base/how-to-enable-two-factor-authentication/"
  },
  "cornell.edu": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware",
      "u2f",
      "call"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://it.cornell.edu/twostep"
  },
  "corporatefinanceinstitute.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.corporatefinanceinstitute.com/article/728--"
  },
  "copaair.com": {},
  "cordial.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.cordial.com/hc/en-us/articles/360004846512"
  },
  "spri.ng": {
    methods: [
      "totp"
    ],
    documentation: "https://www.spri.ng/blog/two-factor-authentication-guide"
  },
  "teespring.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.spri.ng/blog/two-factor-authentication-guide"
  },
  "cookieyes.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.cookieyes.com/documentation/two-factor-authentication/"
  },
  "convertkit.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.convertkit.com/en/articles/3925724"
  },
  "contentstack.com": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://www.contentstack.com/docs/developers/two-factor-authentication/"
  },
  "contentful.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.contentful.com/faq/two-factor-authentication/"
  },
  "contabo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://contabo.com/en/customer-support/faq/#2fa-questions"
  },
  "consumercellular.com": {},
  "constellix.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.constellix.com/support/solutions/articles/47001012279"
  },
  "consorsbank.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Consorsbank SecurePlus"
    ],
    "custom-hardware": [
      "SecurePlus card reader"
    ],
    documentation: "https://www.consorsbank.de/ev/Service-Beratung/secureplus"
  },
  "consentmanager.net": {
    methods: [
      "totp"
    ],
    documentation: "https://help.consentmanager.net/books/cmp/page/working-with-two-factor-authentication"
  },
  "conrad.com": {},
  "conrad.at": {},
  "conrad.be": {},
  "conrad.ch": {},
  "conrad.cz": {},
  "conrad.de": {},
  "conradelektronik.dk": {},
  "conrad.fr": {},
  "conrad.hr": {},
  "conrad.hu": {},
  "conrad.it": {},
  "conrad.nl": {},
  "conrad.pl": {},
  "conrad.se": {},
  "conrad.si": {},
  "conrad.sk": {},
  "connectwise.com": {
    methods: [
      "sms",
      "email",
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://docs.connectwise.com/ConnectWise_Control_Documentation/Get_started/Administration_page/Security_page/Enable_two-factor_authentication_for_host_accounts"
  },
  "coned.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify"
    ],
    documentation: "https://www.coned.com/-/media/files/coned/documents/small-medium-large-businesses/building-project-center/contractor-resources/user-registration-guide.pdf?la=en",
    notes: "Requires phone number to set up. Can be bypassed by customer support."
  },
  "concur.com": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.com.mx": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.ca": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.com.br": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.com.ar": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.co": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.cl": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.pe": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.co.za": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.ae": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.co.uk": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.fr": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.de": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.it": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.nl": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.se": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.dk": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.fi": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.be": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.es": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.no": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.com.au": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.cn": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.com.hk": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.co.in": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.co.jp": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.kr": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.com.sg": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concur.tw": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "concursolutions.com": {
    methods: [
      "totp"
    ],
    documentation: "https://dam.sap.com/mac/app/p/pdf/asset/preview/kA9GcJq?ltr=a&rc=10"
  },
  "compose.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.compose.com/articles/introducing-fido-universal-2nd-factor-authentication/"
  },
  "comviq.se": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ]
  },
  "comodo.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.comodo.com/topic-289-1-716-11276-.html",
    notes: "SMS is only available for accounts with more than 50 devices."
  },
  "communityamerica.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.cacuonlinebanking.com/tob/live/usp-core/static/help.html#login_security"
  },
  "commsec.com.au": {},
  "commonapp.org": {},
  "commercial.metrobankonline.co.uk": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Metro Bank Authenticator app"
    ],
    "custom-hardware": [
      "Security device"
    ],
    documentation: "https://www.metrobankonline.co.uk/help-and-support/what-is-sca/#item17066",
    notes: "Only available for Business Online Plus and Commercial Banking customers. Setup for authenticator app requires SMS verification. Only UK phone numbers can be used."
  },
  "commerzbank.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Commerzbank photoTAN"
    ],
    "custom-hardware": [
      "photoTAN card reader"
    ],
    documentation: "https://www.commerzbank.de/konten-zahlungsverkehr/service/tan-verfahren/"
  },
  "comet.it": {},
  "commbank.com.au": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "CommBank app"
    ],
    documentation: "https://www.commbank.com.au/digital-banking/netbank/multi-factor-authentication.html",
    notes: "SMS is only available when setting up CommBank app."
  },
  "netbank.com.au": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "CommBank app"
    ],
    documentation: "https://www.commbank.com.au/digital-banking/netbank/multi-factor-authentication.html",
    notes: "SMS is only available when setting up CommBank app."
  },
  "comdirect.de": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "comdirect photoTAN"
    ],
    "custom-hardware": [
      "photoTAN card reader"
    ],
    documentation: "https://www.comdirect.de/konto/psd2-phototan.html"
  },
  "combell.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.combell.com/en/help/kb/how-do-i-enable-two-factor-authentication/"
  },
  "columbia.edu": {
    methods: [
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://www.cuit.columbia.edu/mfa"
  },
  "collegeboard.org": {
    methods: [
      "email"
    ]
  },
  "colorado.edu": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://oit.colorado.edu/services/identity-access-management/duo-multi-factor-authentication",
    notes: "SMS required to setup TOTP 2FA."
  },
  "colfinancial.com": {},
  "coles.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "coinzilla.com": {
    methods: [
      "totp",
      "email"
    ]
  },
  "coinut.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.coinut.com/hc/en-us/articles/360005061354"
  },
  "cointraffic.io": {
    methods: [
      "totp"
    ]
  },
  "cointracking.info": {
    methods: [
      "totp"
    ],
    recovery: "https://cointracking.freshdesk.com/en/support/solutions/articles/29000021946"
  },
  "cointracker.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.cointracker.io/en/articles/2641553"
  },
  "cointiger.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://cointiger.zendesk.com/hc/en-us/articles/360009805534"
  },
  "coinspot.com.au": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://coinspot.zendesk.com/hc/en-us/sections/115000049254"
  },
  "coinsmart.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.coinsmart.com/hc/en-us/articles/360014948893"
  },
  "coins.ph": {
    methods: [
      "totp"
    ],
    documentation: "https://support.coins.ph/hc/en-us/articles/202604924"
  },
  "coinremitter.com": {
    methods: [
      "totp"
    ]
  },
  "coinpayu.com": {
    methods: [
      "totp"
    ],
    notes: "You need to verify email address before enable 2FA."
  },
  "coinpayments.net": {
    methods: [
      "totp",
      "sms",
      "email"
    ],
    recovery: "https://www.coinpayments.net/supwiz-login-tfa"
  },
  "coinone.co.kr": {
    methods: [
      "totp"
    ]
  },
  "coinloan.io": {
    methods: [
      "totp"
    ],
    documentation: "https://blog.coinloan.io/securing-your-accounts-with-two-factor-authentication-2fa/"
  },
  "coinmarketcap.com": {
    methods: [
      "totp",
      "email"
    ]
  },
  "coinjar.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.coinjar.com/hc/en-us/articles/202910075"
  },
  "coinigy.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.coinigy.com/hc/en-us/articles/360001134694"
  },
  "coinify.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.coinify.com/hc/en-us/articles/360014173320",
    notes: "2FA is only available for merchant accounts. myCoinify trading accounts do not support 2FA."
  },
  "coingecko.com": {},
  "coingate.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.coingate.com/hc/en-us/articles/4402503798034",
    recovery: "https://support.coingate.com/hc/en-us/articles/4402503851026"
  },
  "coinfalcon.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.coinfalcon.com/en-us/article/-nkjppd/"
  },
  "coindcx.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://support.coindcx.com/hc/en-gb/articles/360003181855"
  },
  "coindeal.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://coindeal.com/security"
  },
  "coincheck.com": {
    methods: [
      "totp"
    ],
    documentation: "https://faq.coincheck.com/s/article/20204?language=en_US"
  },
  "coinberry.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.coinberry.com/hc/en-us/articles/4505782775569",
    recovery: "https://help.coinberry.com/hc/en-us/articles/4506298382993"
  },
  "coinbase.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/how-do-i-set-up-2-factor-authentication",
    recovery: "https://help.coinbase.com/en/coinbase/managing-my-account/get-back-into-my-account/2-step-verification-troubleshooting"
  },
  "cognitoforms.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://www.cognitoforms.com/product/two-factor-authentication"
  },
  "codesignal.com": {},
  "codepen.io": {},
  "codeclimate.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://docs.codeclimate.com/docs/enabling-two-factor-authentication"
  },
  "codecademy.com": {},
  "codebasehq.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.codebasehq.com/articles/tips-tricks/how-do-i-setup-two-factor-authentication"
  },
  "codeanywhere.com": {
    methods: [
      "sms"
    ],
    documentation: "https://docs.codeanywhere.com/#two-factor-authentication"
  },
  "codeberg.org": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://docs.codeberg.org/security/2fa/"
  },
  "coda.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.coda.io/en/articles/3833338"
  },
  "cod.edu": {},
  "cobalt.io": {
    methods: [
      "totp"
    ],
    documentation: "https://cobaltio.zendesk.com/hc/en-us/articles/4408918977940"
  },
  "co-operativebank.co.uk": {},
  "cnn.com": {},
  "cmu.edu": {
    methods: [
      "custom-software",
      "custom-hardware",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://www.cmu.edu/computing/services/security/identity-access/authentication/how-to/use2fa-weblogin.html"
  },
  "cmore.se": {},
  "cmore.no": {},
  "cmore.dk": {},
  "cmore.fi": {},
  "clubhouse.com": {},
  "cm.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "CM Authenticator"
    ],
    documentation: "https://www.cm.com/customer-service/#36-69/Account/652/How%20do%20I%20enable%20Two-Factor%20Authentication?"
  },
  "cloze.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.cloze.com/knowledge_base/topics/how-do-i-enable-2-step-authentication"
  },
  "clover.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.clover.com/help/two-factor-authentication"
  },
  "cloudways.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.cloudways.com/enabling-two-factor-authentication-for-your-cloudways-account/"
  },
  "cloudns.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.cloudns.net/wiki/article/201/"
  },
  "cloudinary.com": {
    methods: [
      "totp"
    ]
  },
  "cloudhq.net": {
    methods: [
      "totp"
    ],
    documentation: "https://support.cloudhq.net/how-to-set-up-and-enable-two-factor-authentication-2fa/"
  },
  "cloudflare.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://developers.cloudflare.com/fundamentals/setup/account/account-security/2fa/"
  },
  "cloudconvert.com": {
    methods: [
      "totp"
    ]
  },
  "cloudbet.com": {
    methods: [
      "totp"
    ],
    documentation: "https://cloudbet.zendesk.com/hc/en-us/articles/223120088/"
  },
  "cloudbees.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/security/two-factor-authentication"
  },
  "cloudamqp.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.cloudamqp.com/blog/two-factor-authentication.html",
    notes: "SMS is required as a backup method"
  },
  "cloud66.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://help.cloud66.com/node/account/two-factor-authentication.html"
  },
  "cloud.oracle.com": {
    methods: [
      "totp",
      "custom-software",
      "sms",
      "call",
      "email",
      "u2f"
    ],
    "custom-software": [
      "Duo",
      "Oracle Mobile Authenticator"
    ],
    documentation: "https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/configure-authentication-factors.html"
  },
  "oraclecloud.com": {
    methods: [
      "totp",
      "custom-software",
      "sms",
      "call",
      "email",
      "u2f"
    ],
    "custom-software": [
      "Duo",
      "Oracle Mobile Authenticator"
    ],
    documentation: "https://docs.oracle.com/en/cloud/paas/identity-cloud/uaids/configure-authentication-factors.html"
  },
  "cloud.malwarebytes.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.threatdown.com/hc/en-us/articles/8787932508307"
  },
  "cloud.ibm.com": {
    methods: [
      "email",
      "u2f",
      "totp"
    ],
    documentation: "https://cloud.ibm.com/docs/account?topic=account-enablemfa"
  },
  "cloud.hashicorp.com": {
    methods: [
      "totp"
    ],
    documentation: "https://developer.hashicorp.com/hcp/docs/hcp/admin/iam/mfa"
  },
  "auth.hashicorp.com": {
    methods: [
      "totp"
    ],
    documentation: "https://developer.hashicorp.com/hcp/docs/hcp/admin/iam/mfa"
  },
  "cloud.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "cloud.baidu.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://intl.cloud.baidu.com/doc/IAM/s/2jwvyc50i-en"
  },
  "login.bce.baidu.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://intl.cloud.baidu.com/doc/IAM/s/2jwvyc50i-en"
  },
  "close.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.close.com/docs/enabling-2fa"
  },
  "clippercard.com": {},
  "cliniko.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.cliniko.com/en/articles/1023989",
    notes: "Setting up 2FA requires adding a phone number."
  },
  "clio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.clio.com/hc/en-us/articles/9284706542619",
    recovery: "https://help.clio.com/hc/en-us/articles/9284748707739"
  },
  "clickworker.com": {},
  "clickup.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.clickup.com/hc/en-us/articles/6327741965591",
    notes: "SMS only available on Business and Enterprise price plans."
  },
  "clickpay.com": {},
  "clevertap.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.clevertap.com/docs/account-security"
  },
  "clever.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.clever.com/hc/en-us/articles/202062333",
    notes: "2FA is only available for district admins"
  },
  "clemson.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://2fa.app.clemson.edu/"
  },
  "clearscore.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.clearscore.com/hc/en-us/sections/360003360940"
  },
  "clearme.com": {},
  "classlink.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.classlink.com/solutions/multi-factor-authentication"
  },
  "citizensbank.com": {},
  "citi.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://online.citi.com/JRS/pands/detail.do?ID=SecurityCenter&section=security_tools"
  },
  "accountonline.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://online.citi.com/JRS/pands/detail.do?ID=SecurityCenter&section=security_tools"
  },
  "citibank.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://online.citi.com/JRS/pands/detail.do?ID=SecurityCenter&section=security_tools"
  },
  "citicards.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://online.citi.com/JRS/pands/detail.do?ID=SecurityCenter&section=security_tools"
  },
  "citibankonline.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://online.citi.com/JRS/pands/detail.do?ID=SecurityCenter&section=security_tools"
  },
  "citibank.com.au": {},
  "citationsy.com": {},
  "cisco.com": {
    methods: [
      "totp"
    ]
  },
  "circle.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.circle.com/hc/en-us/articles/213560483"
  },
  "citadelbanking.com": {
    methods: [
      "totp",
      "custom-software",
      "sms",
      "call",
      "email"
    ],
    "custom-software": [
      "Citadel App"
    ]
  },
  "cinemark.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.cinemark.com/faqs/two-factor-authentication-2fa-faqs"
  },
  "cineplex.com": {
    methods: [
      "call",
      "sms"
    ],
    documentation: "https://cineplex.service-now.com/gsc?id=kb_article&sysparm_article=KB0011023"
  },
  "choko.link": {
    methods: [
      "totp"
    ],
    documentation: "https://support.choko.link/hc/choko/articles/1751036302-2fa"
  },
  "chocolatey.org": {},
  "cibc.com": {
    methods: [
      "call",
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "CIBC app"
    ],
    documentation: "https://www.cibc.com/en/privacy-security/two-step-verification.html"
  },
  "chime.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.chime.com/security-and-control/"
  },
  "chess.com": {},
  "chegg.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.chegg.com/contactus?a=How-does-multi-factor-authentication-work---id--HhfxSshaSpKIqQW-Er4qfA"
  },
  "checkfront.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.checkfront.com/hc/en-us/articles/115003849053"
  },
  "checkmategaming.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.checkmategaming.com/article/more-secure-to-serve-you-better--473.htm"
  },
  "chatwork.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support-en.chatwork.com/hc/en-us/articles/360023097632",
    notes: "SMS 2FA is only available to users on paid plans"
  },
  "chat.google.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Google Prompts",
      "Google Smart Lock"
    ],
    documentation: "https://safety.google/authentication/",
    recovery: "https://support.google.com/accounts/answer/185834"
  },
  "chase.com": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Chase app"
    ],
    "custom-hardware": [
      "RSA SecurID"
    ],
    documentation: "https://2fa.directory/notes/chase/",
    notes: "Hardware tokens can be obtained through Chase support for high-risk accounts"
  },
  "chartbeat.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.chartbeat.com/hc/en-us/articles/209531888"
  },
  "cookiebot.com": {},
  "charliehr.com": {
    methods: [
      "totp"
    ],
    documentation: "https://intercom.help/charliehr/en/articles/1037152"
  },
  "chargebee.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.chargebee.com/docs/2fa.html"
  },
  "changelly.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://support.changelly.com/en/support/solutions/articles/14000111533",
    recovery: "https://support.changelly.com/en/support/solutions/articles/14000111548"
  },
  "cex.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.cex.io/en/articles/4814825",
    recovery: "https://support.cex.io/en/articles/5029000"
  },
  "cgd.pt": {
    methods: [
      "sms"
    ],
    documentation: "https://www.cgd.pt/Ajuda/Seguranca/Pages/Autenticacao-Dupla-SMS-Token.aspx"
  },
  "centurylink.com": {},
  "certification.comptia.org": {},
  "central.sophos.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://docs.sophos.com/central/customer/help/en-us/ManageYourProducts/GlobalSettings/MultiFactorAuthentication/index.html"
  },
  "login.sophos.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://docs.sophos.com/central/customer/help/en-us/ManageYourProducts/GlobalSettings/MultiFactorAuthentication/index.html"
  },
  "cengage.com": {},
  "webassign.net": {},
  "cembra.ch": {
    methods: [
      "sms"
    ],
    documentation: "https://faq.cembra.ch/de/videos/login-mit-mtan/"
  },
  "cdnsun.com": {
    methods: [
      "totp"
    ],
    documentation: "https://cdnsun.com/knowledgebase/billing/two-factor-authentication"
  },
  "cdn77.com": {
    methods: [
      "totp"
    ],
    documentation: "https://client.cdn77.com/support/knowledgebase/billing/cdn77-two-step-authentication"
  },
  "cdkeys.com": {},
  "cdbaby.com": {},
  "cbtnuggets.com": {},
  "cbq.qa": {
    methods: [
      "sms"
    ],
    documentation: "https://cbonline.cbq.qa/RIB/Common/FAQContent",
    notes: "An SMS capable phone with a Qatar phone number is required."
  },
  "cathaypacific.com": {},
  "cat.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://catcrm.my.site.com/HelpCenter/s/article/How-do-I-enable-make-changes-or-disable-Multi-Factor-Authentication-MFA-for-my-account"
  },
  "caspio.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://howto.caspio.com/caspio-id/managing-caspio-id/#Enable2FA"
  },
  "cashrewards.com.au": {
    methods: [
      "sms"
    ],
    documentation: "https://help.cashrewards.com.au/support/solutions/articles/1000304169",
    notes: "Enabling 2FA requires email confirmation"
  },
  "cash.app": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://cash.app/help/en/en-us/3127"
  },
  "carta.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.carta.com/s/article/2-factor-authentication"
  },
  "carrd.co": {
    methods: [
      "totp"
    ],
    documentation: "https://carrd.co/docs/account/enabling-google-authenticator"
  },
  "carleton.ca": {
    methods: [
      "custom-software",
      "custom-hardware",
      "sms",
      "call"
    ],
    "custom-software": [
      "Duo Mobile"
    ],
    "custom-hardware": [
      "Duo token"
    ],
    documentation: "https://carleton.ca/its/duo/config/"
  },
  "carilionclinic.org": {},
  "caribbean.rbcroyalbank.com": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "RBC Caribbean app",
      "Entrust Identity Guard"
    ],
    "custom-hardware": [
      "RSA SecurID"
    ],
    documentation: "https://www.rbcroyalbank.com/caribbean/digital-hub/security-two-factor.html",
    notes: "Hardware 2FA methods are only available for business customers."
  },
  "caremark.com": {},
  "cardmarket.com": {
    methods: [
      "totp"
    ],
    recovery: "https://cardmarket.com/en/Login/LostDevice"
  },
  "capitalone.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Capital One App"
    ],
    documentation: "https://www.capitalone.com/digital/mobile-app-verification/"
  },
  "carbonite.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://support.carbonite.com/articles/Personal-Pro-Mac-Windows-Introduction-to-2-Step-Verification"
  },
  "capsulecrm.com": {
    methods: [
      "totp"
    ],
    documentation: "https://capsulecrm.com/support/user-preferences/#enabling-two-factor-authentication"
  },
  "capcom.com": {
    methods: [
      "totp"
    ],
    documentation: "https://cid.capcom.com/en/support/"
  },
  "capcom.co.jp": {
    methods: [
      "totp"
    ],
    documentation: "https://cid.capcom.com/en/support/"
  },
  "capcomusa.com": {
    methods: [
      "totp"
    ],
    documentation: "https://cid.capcom.com/en/support/"
  },
  "capcom-europe.com": {
    methods: [
      "totp"
    ],
    documentation: "https://cid.capcom.com/en/support/"
  },
  "capcom.com.tw": {
    methods: [
      "totp"
    ],
    documentation: "https://cid.capcom.com/en/support/"
  },
  "canva.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.canva.com/help/login-verification/",
    notes: "SMS 2FA only available to users from Australia, Philippines, UK, and USA."
  },
  "capitalgroup.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.capitalgroup.com/individual/security/how-we-protect-your-account.html"
  },
  "canary.is": {
    methods: [
      "sms"
    ],
    documentation: "https://help.canary.is/hc/en-us/articles/360043987254"
  },
  "canadiantire.ca": {},
  "canadapost.ca": {},
  "canadacomputers.com": {},
  "cc.ca": {},
  "canada.ca": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services/multi-factor-authentication-access-cra-login-services.html"
  },
  "cra-arc.gc.ca": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services/multi-factor-authentication-access-cra-login-services.html"
  },
  "campaignmonitor.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.campaignmonitor.com/two-factor-authentication"
  },
  "cam.ac.uk": {
    methods: [
      "totp",
      "sms",
      "custom-software",
      "custom-hardware",
      "call"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    "custom-hardware": [
      "SafeID token"
    ],
    documentation: "https://help.uis.cam.ac.uk/service/accounts-passwords/set-multi-factor-authentication-your-university-microsoft-account"
  },
  "caltech.edu": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.imss.caltech.edu/services/security/mfa/self-enrollment",
    notes: "SMS-capable phone required for initial setup."
  },
  "calpoly.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://calpoly.atlassian.net/wiki/spaces/CPKB/pages/3539066"
  },
  "callcentric.com": {
    methods: [
      "email"
    ],
    documentation: "https://www.callcentric.com/features/two_point_authentication"
  },
  "calendly.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.calendly.com/hc/articles/26682031653399"
  },
  "cal.com": {
    methods: [
      "totp"
    ]
  },
  "cacoo.com": {},
  "caisse-epargne.fr": {},
  "byu.edu": {
    methods: [
      "call",
      "sms",
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token",
      "Yubico OTP"
    ],
    documentation: "https://duo.byu.edu/"
  },
  "bybit.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://help.bybit.com/hc/en-us/articles/360039748653"
  },
  "bw-bank.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "BW-pushTAN"
    ],
    "custom-hardware": [
      "chipTAN-QR card reader"
    ],
    documentation: "https://meine.bw-bank.de/articles/am-14-september-tritt-psd2-in-kraft-was-bedeutet-das-fuer-sie"
  },
  "buymeacoffee.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://help.buymeacoffee.com/en/articles/8693915"
  },
  "buyee.jp": {},
  "business.trustpilot.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.trustpilot.com/hc/en-us/articles/360017418299"
  },
  "bupa.com.au": {
    methods: [
      "email"
    ],
    documentation: "https://www.bupa.com.au/help/privacy-and-security-trust-centre/mybupa-and-digital-security"
  },
  "bunny.net": {
    methods: [
      "totp"
    ]
  },
  "bullionvault.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.bullionvault.com/help/two_factor_auth.html"
  },
  "bunnings.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "bunnings.co.nz": {
    methods: [
      "sms",
      "email"
    ]
  },
  "bullionstar.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.bullionstar.com/help/2-factor-authentication"
  },
  "bullionexchanges.com": {},
  "bulb.co.uk": {},
  "builtwith.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.builtwith.com/account-management/how-to-enable-2fa-on-builtwith/"
  },
  "buildkite.com": {
    methods: [
      "totp"
    ],
    documentation: "https://buildkite.com/docs/tutorials/2fa"
  },
  "buildium.com": {
    methods: [
      "sms",
      "totp",
      "call"
    ],
    documentation: "https://www.buildium.com/two-factor-authentication/"
  },
  "managebuilding.com": {
    methods: [
      "sms",
      "totp",
      "call"
    ],
    documentation: "https://www.buildium.com/two-factor-authentication/"
  },
  "buhl.de": {
    methods: [
      "totp"
    ],
    documentation: "https://www.buhl.de/shop/faqs?category=325"
  },
  "bugzilla.mozilla.org": {
    methods: [
      "custom-software",
      "totp"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://wiki.mozilla.org/BMO/UserGuide/Two-Factor_Authentication",
    notes: "Proprietary 2FA methods are only available for Mozilla employees."
  },
  "bugcrowd.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.bugcrowd.com/customers/role-and-account-management/security/using-two-factor-authentication/"
  },
  "bugsnag.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.bugsnag.com/product/account-and-security/#security"
  },
  "buffer.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.buffer.com/hc/en-us/articles/360038349434"
  },
  "buddy.works": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://buddy.works/docs/account/security#two-factor-authentication-2fa",
    notes: "2FA is only available to users on paid plans."
  },
  "buda.com": {
    methods: [
      "totp"
    ],
    documentation: "https://soporte.buda.com/es/articles/2379080"
  },
  "bubble.io": {
    methods: [
      "totp"
    ],
    documentation: "https://bubble.io/support/en/articles/8520687"
  },
  "bu.edu": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://www.bu.edu/tech/support/duo/"
  },
  "btcturk.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.btcturk.com/kolay/yardim/guvenlik"
  },
  "btcpop.co": {
    methods: [
      "totp"
    ],
    documentation: "https://blog.btcpop.co/2017/04/27/signing-security-btcpop-co-account/"
  },
  "btcmarkets.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.btcmarkets.net/frequently-asked-questions",
    notes: "A mobile phone number is required to reset two-factor authentication."
  },
  "bt.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.bt.com/help/security/two-step-authentication",
    notes: "2FA can only be enabled via the website."
  },
  "btcbox.co.jp": {
    methods: [
      "totp"
    ],
    documentation: "https://support.btcbox.co.jp/hc/en-us/articles/360001886053"
  },
  "bsag.de": {},
  "bsky.app": {
    methods: [
      "email"
    ]
  },
  "bsky.social": {
    methods: [
      "email"
    ]
  },
  "blueskyweb.xyz": {
    methods: [
      "email"
    ]
  },
  "browserstack.com": {},
  "broadcom.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify",
      "Symantec VIP"
    ],
    documentation: "https://knowledge.broadcom.com/external/article?articleId=216428",
    recovery: "https://knowledge.broadcom.com/external/article/213025"
  },
  "vmware.com": {
    methods: [
      "sms",
      "call",
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Okta Verify",
      "Symantec VIP"
    ],
    documentation: "https://knowledge.broadcom.com/external/article?articleId=216428",
    recovery: "https://knowledge.broadcom.com/external/article/213025"
  },
  "britishairways.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    notes: "Set-up requires linking one of the following services with your BA account: Qatar, Iberia, Uber"
  },
  "brilliant.org": {},
  "brevo.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.brevo.com/hc/articles/360021203440"
  },
  "sendinblue.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.brevo.com/hc/articles/360021203440"
  },
  "brex.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.brex.com/support/two-factor-authentication"
  },
  "breeze.pm": {},
  "braze.com": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://www.braze.com/docs/user_guide/administrative/app_settings/company_settings/security_settings/"
  },
  "brandwatch.com": {
    methods: [
      "totp"
    ],
    documentation: "https://social-media-management-help.brandwatch.com/hc/en-us/articles/4499676228765"
  },
  "falcon.io": {
    methods: [
      "totp"
    ],
    documentation: "https://social-media-management-help.brandwatch.com/hc/en-us/articles/4499676228765"
  },
  "paladinsoftware.com": {
    methods: [
      "totp"
    ],
    documentation: "https://social-media-management-help.brandwatch.com/hc/en-us/articles/4499676228765"
  },
  "braintreepayments.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://developer.paypal.com/braintree/articles/risk-and-security/control-panel-security/two-factor-authentication"
  },
  "brack.ch": {},
  "boxed.com": {},
  "box.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.box.com/hc/en-us/articles/360043697154"
  },
  "bowens.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "boursorama.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.boursorama.com/aide-en-ligne/mon-espace-client/la-directive-europeenne-relative-aux-services-de-paiement-dsp2/question/64587956"
  },
  "boursorama-banque.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.boursorama.com/aide-en-ligne/mon-espace-client/la-directive-europeenne-relative-aux-services-de-paiement-dsp2/question/64587956"
  },
  "boursedirect.fr": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.boursedirect.fr/fr/support/faq/connexion"
  },
  "boost.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://boost.com.au/pages/two-step-verification"
  },
  "boostmobile.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://boost.com.au/pages/two-step-verification"
  },
  "booking.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    notes: "Setup requires SMS verification. Email is available via 'other options' at login."
  },
  "bookbeat.com": {},
  "bookbeat.at": {},
  "bookbeat.be": {},
  "bookbeat.fi": {},
  "bookbeat.dk": {},
  "bookbeat.fr": {},
  "bookbeat.de": {},
  "bookbeat.it": {},
  "bookbeat.nl": {},
  "bookbeat.no": {},
  "bookbeat.pl": {},
  "bookbeat.es": {},
  "bookbeat.se": {},
  "bookbeat.ch": {},
  "bookbeat.co.uk": {},
  "boots.com": {
    methods: [
      "call",
      "sms"
    ]
  },
  "bonus.ly": {
    methods: [
      "totp"
    ],
    documentation: "https://help.bonus.ly/en/articles/2817280"
  },
  "bonobos.com": {},
  "bolt.eu": {
    methods: [
      "email"
    ]
  },
  "bol.com": {},
  "bokio.se": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.bokio.se/hjalp/bokio-medlemskap/ditt-bokiokonto/tvafaktor-autentisering-med-bokio/",
    notes: "BankID only available for users using banking features"
  },
  "bohemia.net": {
    methods: [
      "totp"
    ]
  },
  "bochk.com": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "BOCHK Mobile Banking app"
    ],
    documentation: "https://www.bochk.com/en/security/2factorauthentication.html"
  },
  "bnktothefuture.com": {
    methods: [
      "totp"
    ],
    documentation: "https://bnktothefuture.freshdesk.com/support/solutions/articles/9000068450"
  },
  "bna.com.ar": {},
  "bmoinvestorline.com": {
    methods: [
      "sms",
      "email",
      "call"
    ],
    documentation: "https://www.bmoinvestorline.com/General_Info/MFA_preEnroll_SD_EN.html"
  },
  "bmoharris.com": {
    methods: [
      "sms",
      "email",
      "call"
    ]
  },
  "bmo.com": {
    methods: [
      "sms",
      "email",
      "call"
    ],
    documentation: "https://www.bmoinvestorline.com/General_Info/MFA_preEnroll_SD_EN.html"
  },
  "bmedonline.it": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Mediolanum app"
    ],
    documentation: "https://www.bancamediolanum.it/static-assets/documents/Codice_BMed_regole_e_funzionamento.pdf"
  },
  "bluesnap.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.bluesnap.com/docs/two-factor_authentication",
    notes: "2FA must be enabled by an admin before use."
  },
  "bluehost.com": {
    methods: [
      "email",
      "sms",
      "totp"
    ],
    documentation: "https://www.bluehost.com/help/article/two-factor-authentication"
  },
  "blossom88.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.blossom88.com/docs/setup/two-factor/"
  },
  "blockfi.com": {
    methods: [
      "totp"
    ]
  },
  "blockchain.com": {
    methods: [
      "sms",
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://support.blockchain.com/hc/en-us/articles/4417080375316"
  },
  "blockchain.info": {
    methods: [
      "sms",
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://support.blockchain.com/hc/en-us/articles/4417080375316"
  },
  "blizzard.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Battle.net app"
    ],
    documentation: "https://battle.net/support/article/24520"
  },
  "battle.net": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Battle.net app"
    ],
    documentation: "https://battle.net/support/article/24520"
  },
  "blau.de": {},
  "bladeandsoul.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.bladeandsoul.com/hc/en-us/articles/207578553"
  },
  "blacknight.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.blacknight.com/hc/en-us/articles/360001358517"
  },
  "blackbaud.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://docs.blackbaud.com/bbid-docs/get-started/multi-factor-auth",
    recovery: "https://docs.blackbaud.com/bbid-docs/faq/multi-factor-auth"
  },
  "bkex.com": {
    methods: [
      "totp"
    ],
    documentation: "https://bkex.zendesk.com/hc/en-us/articles/360021899473"
  },
  "bk.mufg.jp": {},
  "bitwarden.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://help.bitwarden.com/article/setup-two-step-login/",
    notes: "2FA methods vary depending on price plan. SMS & Call requires Duo integration"
  },
  "bitvavo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.bitvavo.com/hc/en-us/articles/4405125367057"
  },
  "bittrex.com": {
    methods: [
      "totp"
    ],
    documentation: "https://bittrex.zendesk.com/hc/en-us/articles/5873174805531"
  },
  "bitstamp.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.bitstamp.net/faq/what-is-two-factor-authentication"
  },
  "bitso.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.bitso.com/en/support/solutions/articles/1000166781"
  },
  "bitski.com": {
    methods: [
      "email",
      "sms"
    ],
    recovery: "https://bitski.zendesk.com/hc/en-us/articles/4415800939028"
  },
  "bitskins.com": {
    methods: [
      "totp"
    ],
    notes: "You need to verify your email address before enabling 2FA."
  },
  "bitrix24.com": {
    methods: [
      "totp"
    ],
    documentation: "https://helpdesk.bitrix24.com/open/9800171/"
  },
  "bitrix24.ru": {
    methods: [
      "totp"
    ],
    documentation: "https://helpdesk.bitrix24.com/open/9800171/"
  },
  "bitrix24.eu": {
    methods: [
      "totp"
    ],
    documentation: "https://helpdesk.bitrix24.com/open/9800171/"
  },
  "bitrix24.net": {
    methods: [
      "totp"
    ],
    documentation: "https://helpdesk.bitrix24.com/open/9800171/"
  },
  "bitrise.io": {
    methods: [
      "totp"
    ],
    documentation: "https://devcenter.bitrise.io/getting-started/account-security/"
  },
  "bitpay.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.bitpay.com/hc/en-us/articles/360006612692"
  },
  "bitpanda.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.bitpanda.com/hc/en-us/articles/360002015220"
  },
  "bitnami.com": {},
  "bitmex.com": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://blog.bitmex.com/use-two-factor-authentication-and-dont-reuse-passwords/",
    notes: "At most one 2FA method can be enabled at any time."
  },
  "bitly.com": {
    methods: [
      "sms"
    ],
    documentation: "https://support.bitly.com/hc/en-us/articles/230650187"
  },
  "bithumb.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://en.bithumb.com/customer_support/info_guide?seq=510"
  },
  "bitgo.com": {
    methods: [
      "totp",
      "custom-hardware",
      "u2f"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ]
  },
  "bitget.com": {
    methods: [
      "call",
      "sms",
      "totp"
    ],
    documentation: "https://www.bitget.com/support/articles/12560603808391",
    recovery: "https://www.bitget.com/support/articles/12560603808511"
  },
  "bitforex.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://support.bitforex.com/hc/en-us/articles/360006825152"
  },
  "bitflyer.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://bitflyer.com/en-jp/faq/2-10"
  },
  "bitfinex.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.bitfinex.com/hc/en-us/sections/900000097443",
    recovery: "https://support.bitfinex.com/hc/en-us/articles/360021325054"
  },
  "bitdefender.com": {
    methods: [
      "email",
      "totp"
    ],
    documentation: "https://www.bitdefender.com/consumer/support/answer/1581/"
  },
  "bitcoin.de": {
    methods: [
      "totp",
      "custom-hardware"
    ],
    "custom-hardware": [
      "Yubico OTP"
    ],
    documentation: "https://www.bitcoin.de/de/faq/was-ist-die-2-step-verification-2-faktor-authentifizierung/46.html"
  },
  "bitbuy.ca": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.bitbuy.ca/hc/en-us/articles/360059151172",
    notes: "SMS 2FA is only available for country code +1 (North America)"
  },
  "bitbns.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://bitbns.freshdesk.com/support/solutions/articles/35000047047",
    recovery: "https://bitbns.freshdesk.com/support/solutions/articles/35000046996",
    notes: "SMS 2FA must be enabled before TOTP 2FA."
  },
  "bitbucket.org": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://support.atlassian.com/bitbucket-cloud/docs/enable-two-step-verification/",
    notes: "An SSH key must be associated with your account to enable 2FA."
  },
  "bitbar.com": {
    methods: [
      "totp"
    ],
    documentation: "https://bitbar.com/blog/multi-factor-authentication/"
  },
  "binance.com": {
    methods: [
      "totp",
      "u2f",
      "sms"
    ],
    documentation: "https://www.binance.com/en/support/faq/c-1?navId=1#11"
  },
  "bill.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://help.bill.com/hc/en-us/articles/360000023843",
    notes: "2FA via phone call is available for US and CA only."
  },
  "bilibili.com": {},
  "biggerpockets.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.biggerpockets.com/forums/25/topics/232201-new-biggerpockets-security-improvements"
  },
  "bigw.com.au": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "bibox.com": {
    methods: [
      "sms",
      "totp",
      "email"
    ],
    documentation: "https://support.bibox.jp/hc/en-us/articles/900006744823"
  },
  "bigcommerce.com": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.ca": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.co.uk": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.com.au": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.de": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.es": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.fr": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.it": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bigcommerce.nl": {
    methods: [
      "custom-software",
      "email"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://support.bigcommerce.com/s/article/Setting-Up-2FA"
  },
  "bglcorp.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.sf360.com.au/hc/en-au/articles/360020963051",
    notes: "2FA covers Simple Fund 360, CAS 360, BGL API and BGL Account. It doesn't cover BGL Client Centre."
  },
  "bhfcu.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.bhfcu.com/Landing/Online-Banking-FAQs"
  },
  "beyondbank.com.au": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Symantec VIP"
    ],
    documentation: "https://www.beyondbank.com.au/need-help/how-do-i-register-for-secure-sms-on-internet-banking"
  },
  "betvictor.com": {
    methods: [
      "sms",
      "totp"
    ]
  },
  "betterment.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.betterment.com/resources/understanding-account-security/#3"
  },
  "bethesda.net": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.bethesda.net/app/answers/detail/a_id/48931",
    notes: "SMS requires TOTP to be set up"
  },
  "bethpagefcu.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "betfair.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://support.betfair.com/app/answers/detail/a_id/126"
  },
  "bestbuy.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.bestbuy.com/site/help-topics/2-step-verification/pcmcat1561056149844.c"
  },
  "bestbuy.ca": {},
  "berkeley.edu": {
    methods: [
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token",
      "Feitian OTP c100 Token"
    ],
    documentation: "https://calnetweb.berkeley.edu/calnet-2-step"
  },
  "bereal.com": {},
  "bere.al": {},
  "benefitscal.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.calsaws.org/wp-content/uploads/2024/02/BenefitsCal-Quick-Guide-Two-Step-Verification-1.pdf"
  },
  "belong.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.belong.com.au/support/internet/getting-started/two-step-verification"
  },
  "bendigobank.com.au": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Bendigo Bank app"
    ],
    documentation: "https://www.bendigobank.com.au/support/e-banking/multi-factor-authentication",
    notes: "If the app hasn't been setup, only SMS and email tokens will work. If the app has been setup, only the app will work."
  },
  "bell.ca": {},
  "beget.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://beget.com/ru/kb/manual/nastrojki-akkaunta#security"
  },
  "beeper.com": {},
  "becu.org": {
    methods: [
      "sms"
    ]
  },
  "beacons.ai": {},
  "bcit.ca": {},
  "bca.co.id": {
    methods: [
      "custom-hardware"
    ],
    "custom-hardware": [
      "KeyBCA token"
    ],
    documentation: "https://www.bca.co.id/en/Individu/Produk/E-Banking/Klik-BCA"
  },
  "bbbank.de": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "BBBank SecureGo+"
    ],
    "custom-hardware": [
      "Sm@rt-TAN card reader"
    ],
    documentation: "https://www.bbbank.de/produkte/konten-und-karten/online-banking/tan-verfahren.html"
  },
  "batch.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.batch.com/en/articles/2721053"
  },
  "bbva.com.ar": {},
  "basecamp.com": {
    methods: [
      "totp",
      "u2f"
    ],
    documentation: "https://3.basecamp-help.com/article/443--"
  },
  "barnesandnoble.com": {},
  "barmenia.de": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.barmenia.de/deu/bde_privat/bde_service/bde_selfservice/bde_meine_barmenia/erstanmeldung.xhtml"
  },
  "meine-barmenia.de": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.barmenia.de/deu/bde_privat/bde_service/bde_selfservice/bde_meine_barmenia/erstanmeldung.xhtml"
  },
  "baremetrics.com": {
    methods: [
      "totp"
    ],
    recovery: "https://help.baremetrics.com/en/articles/5380609"
  },
  "barclays.co.uk": {
    methods: [
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Barclays App PINsentry"
    ],
    "custom-hardware": [
      "PINsentry card reader"
    ],
    documentation: "https://www.barclays.co.uk/ways-to-bank/online-banking/pinsentry-guide/"
  },
  "bankwest.com.au": {},
  "banksa.com.au": {},
  "bankrate.com": {},
  "bankofscotland.co.uk": {
    methods: [
      "custom-software",
      "call",
      "sms"
    ],
    "custom-software": [
      "Bank of Scotland Mobile App"
    ],
    documentation: "https://www.bankofscotland.co.uk/aboutonline/changes-to-internet-banking.html"
  },
  "bankofmelbourne.com.au": {},
  "banking.barclaysus.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.barclaycardus.com/servicing/security-center?howWeProtectYou=#loginProcess"
  },
  "bankofamerica.com": {
    methods: [
      "sms",
      "email",
      "u2f"
    ],
    documentation: "https://www.bankofamerica.com/security-center/online-banking/",
    notes: "Mobile apps only use SMS 2FA"
  },
  "bofa.com": {
    methods: [
      "sms",
      "email",
      "u2f"
    ],
    documentation: "https://www.bankofamerica.com/security-center/online-banking/",
    notes: "Mobile apps only use SMS 2FA"
  },
  "mbna.com": {
    methods: [
      "sms",
      "email",
      "u2f"
    ],
    documentation: "https://www.bankofamerica.com/security-center/online-banking/",
    notes: "Mobile apps only use SMS 2FA"
  },
  "bankhapoalim.co.il": {},
  "bankera.com": {
    methods: [
      "sms"
    ],
    documentation: "https://bankera.com/faq/how-to-enable-second-factor-authentication/"
  },
  "bankaust.com.au": {},
  "bank99.at": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "okay99"
    ],
    documentation: "https://bank99.at/blog/okay99-app-sicher-im-online-banking"
  },
  "bank.lendingclub.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://radiusbank.custhelp.com/app/answers/detail/a_id/86"
  },
  "banking.lendingclub.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://radiusbank.custhelp.com/app/answers/detail/a_id/86"
  },
  "radiusbank.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://radiusbank.custhelp.com/app/answers/detail/a_id/86"
  },
  "bandcamp.com": {},
  "bancoprovincia.com.ar": {},
  "bancointernacional.com.ec": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Entrust Identity"
    ],
    documentation: "https://www.bancointernacional.com.ec/storage/2020/11/BI-NBOE-TutorialPDF-12Softoken.pdf"
  },
  "bancoguayaquil.com": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "Entrust Identity"
    ],
    documentation: "https://www.bancoguayaquil.com/documents/files/Manual%20de%20uso%20de%20token%20de%20seguridad.pdf"
  },
  "bancociudad.com.ar": {},
  "bamboohr.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.bamboohr.com/hc/en-us/articles/360052655731"
  },
  "balsamiq.com": {},
  "baloise.ch": {
    methods: [
      "sms"
    ]
  },
  "balena.io": {
    methods: [
      "totp"
    ],
    documentation: "https://www.balena.io/docs/learn/manage/account/#two-factor-authentication"
  },
  "bahn.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.bahn.de/hilfe/kundenkonto/kundenkonto-2fa"
  },
  "bahn.de": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://www.bahn.de/hilfe/kundenkonto/kundenkonto-2fa"
  },
  "backblaze.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.backblaze.com/hc/en-us/articles/217666588",
    recovery: "https://help.backblaze.com/hc/en-us/articles/114094512533"
  },
  "badoo.com": {},
  "back4app.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.back4app.com/docs/security/multi-factor-authentication"
  },
  "babbel.com": {},
  "azure.microsoft.com": {
    methods: [
      "sms",
      "custom-software",
      "totp",
      "call"
    ],
    "custom-software": [
      "Microsoft Authenticator"
    ],
    documentation: "https://azure.microsoft.com/en-us/documentation/articles/multi-factor-authentication/"
  },
  "axosbank.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "axos.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "axios.com": {},
  "aws.amazon.com": {
    methods: [
      "totp",
      "custom-hardware",
      "u2f"
    ],
    "custom-hardware": [
      "SafeNet IDProve 110 6-digit OTP Token",
      "SafeNet IDProve 700 OTP Card"
    ],
    documentation: "https://aws.amazon.com/iam/features/mfa/"
  },
  "awin.com": {
    methods: [
      "totp"
    ],
    documentation: "https://success.awin.com/s/article/How-to-activate-and-deactivate-the-Two-Step-Verification"
  },
  "aware.com.au": {},
  "awardwallet.com": {
    methods: [
      "totp"
    ],
    documentation: "https://awardwallet.com/faqs#44"
  },
  "avg.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.avg.com/SupportArticleView?l=en&urlname=AVG-Account-2-step-verification"
  },
  "avast.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.avast.com/en-gb/article/Account-2-Step-Verification/"
  },
  "avanza.se": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "BankID"
    ],
    documentation: "https://www.avanza.se/kundservice.html/1335/tvafaktorsinloggning/d264248e-bea3-48a0-bf2d-157309734649"
  },
  "availity.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://apps.availity.com/availity/Demos/QRG_AP_2step_Providers.pdf#%5B%7B%22num%22%3A38%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C72%2C724.504%2Cnull%5D",
    notes: "Availity decides when 2FA is required; users cannot enable 2FA for every login."
  },
  "autotask.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.autotask.net/help/Content/2_Getting_Started/Profile/Preferences/GoogleAuthenticator.htm"
  },
  "automater.pl": {
    methods: [
      "totp"
    ],
    documentation: "https://help.automater.com/help/two-factor-authentication-2fa"
  },
  "autodesk.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://knowledge.autodesk.com/customer-service/account-management/account-profile/account-security/two-step-verification"
  },
  "tinkercad.com": {
    methods: [
      "sms",
      "call",
      "email",
      "totp"
    ],
    documentation: "https://knowledge.autodesk.com/customer-service/account-management/account-profile/account-security/two-step-verification"
  },
  "autocode.com": {
    methods: [
      "sms"
    ],
    documentation: "https://autocode.com/autocode/threads/two-factor-authentication-announcements-6bfe5f55/"
  },
  "auth0.com": {
    methods: [
      "custom-software",
      "sms",
      "totp",
      "u2f"
    ],
    "custom-software": [
      "Auth0 Guardian"
    ],
    documentation: "https://auth0.com/docs/secure/multi-factor-authentication/enable-mfa",
    recovery: "https://auth0.com/docs/secure/multi-factor-authentication/reset-user-mfa"
  },
  "auth.opera.com": {
    methods: [
      "totp"
    ]
  },
  "australiansuper.com": {},
  "australianretirementtrust.com.au": {
    methods: [
      "sms",
      "email"
    ],
    notes: "Requires contacting customer service to activate"
  },
  "sunsuper.com.au": {
    methods: [
      "sms",
      "email"
    ],
    notes: "Requires contacting customer service to activate"
  },
  "qsuper.qld.gov.au": {
    methods: [
      "sms",
      "email"
    ],
    notes: "Requires contacting customer service to activate"
  },
  "aussiebroadband.com.au": {},
  "aussiebb.com.au": {},
  "aura.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.aura.com/help/how-do-i-enable-my-2-factor-authentication"
  },
  "auspost.com.au": {},
  "audiofanzine.com": {
    methods: [
      "totp"
    ],
    documentation: "https://fr.audiofanzine.com/login/a.faq2fa.html"
  },
  "audiense.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.audiense.com/knowledge/two-factor-authentication"
  },
  "au.com": {
    methods: [
      "sms"
    ],
    documentation: "https://id.auone.jp/id/pc/content/note/devauth/pc_login/index.html"
  },
  "auone.jp": {
    methods: [
      "sms"
    ],
    documentation: "https://id.auone.jp/id/pc/content/note/devauth/pc_login/index.html"
  },
  "atu.edu": {
    methods: [
      "sms",
      "custom-software",
      "custom-hardware"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Duo D100 Token"
    ],
    documentation: "https://support.atu.edu/support/solutions/folders/7000078509"
  },
  "attentive.com": {
    methods: [
      "call",
      "sms"
    ],
    documentation: "https://help.attentivemobile.com/hc/articles/14208870889876"
  },
  "attentivemobile.com": {
    methods: [
      "call",
      "sms"
    ],
    documentation: "https://help.attentivemobile.com/hc/articles/14208870889876"
  },
  "att.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.att.com/support/article/my-account/KM1249672/"
  },
  "atriumhealth.org": {
    methods: [
      "email"
    ]
  },
  "atlas-myrmv.massdot.state.ma.us": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.mass.gov/doc/online-registration-renewal-instructions/download",
    recovery: "https://www.mass.gov/how-to/update-your-myrmv-account"
  },
  "aternos.org": {
    methods: [
      "totp"
    ]
  },
  "atera.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.atera.com/hc/en-us/articles/360022522253",
    notes: "2FA must be enabled by an admin before use."
  },
  "asu.edu": {
    methods: [
      "custom-software",
      "call",
      "sms",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://getprotected.asu.edu/services/identity-and-access-management/duo-two-factor-authentication"
  },
  "astound.com": {},
  "assembla.com": {
    methods: [
      "totp"
    ],
    documentation: "https://articles.assembla.com/en/articles/1914077"
  },
  "aspiration.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "asos.com": {},
  "ashesofcreation.com": {
    methods: [
      "totp"
    ],
    documentation: "https://ashesofcreation.zendesk.com/hc/en-us/articles/360022983234"
  },
  "asb.co.nz": {},
  "asana.com": {
    methods: [
      "totp"
    ],
    documentation: "https://asana.com/guide/help/fundamentals/two-factor-authentication"
  },
  "arubainstanton.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.arubainstanton.com/techdocs/en/content/get-started/mobile/security.htm"
  },
  "arubacloud.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Aruba OTP"
    ],
    documentation: "https://kb.cloud.it/computing/uso-e-tecnologie/accesso-al-pannello-di-controllo-con-otp.aspx",
    notes: "Only the control panel supports 2FA (the main client area does not)."
  },
  "artists.spotify.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://artists.spotify.com/en/help/article/2-step-verification"
  },
  "artstation.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "ArtStation app"
    ],
    documentation: "https://help.artstation.com/hc/en-us/articles/360057111771",
    notes: "2FA must be enabled from the app and requires email confirmation to setup."
  },
  "artifacthub.io": {
    methods: [
      "totp"
    ]
  },
  "arlo.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Arlo Secure App"
    ],
    documentation: "https://kb.arlo.com/000062288",
    notes: "Email 2FA is always available as a backup."
  },
  "arin.net": {
    methods: [
      "totp"
    ],
    documentation: "https://www.arin.net/reference/materials/security/twofactor/"
  },
  "arduino.cc": {
    methods: [
      "totp"
    ],
    documentation: "https://support.arduino.cc/hc/en-us/articles/360018131120"
  },
  "argentina.gob.ar": {},
  "archive.org": {},
  "arcaplanet.it": {},
  "arcadia.com": {},
  "aqara.com": {
    methods: [
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Aqara Home App"
    ],
    notes: "Email 2FA is always available as a backup."
  },
  "appwrite.io": {
    methods: [
      "totp"
    ],
    documentation: "https://appwrite.io/docs/advanced/security/2fa"
  },
  "appveyor.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.appveyor.com/blog/2018/11/07/2FA-implementation/"
  },
  "appsignal.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.appsignal.com/user-account/two-factor-authentication.html"
  },
  "appodeal.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "appleid.apple.com": {
    methods: [
      "sms",
      "call",
      "u2f",
      "custom-software"
    ],
    "custom-software": [
      "Apple Device Push Notification"
    ],
    documentation: "https://support.apple.com/en-us/HT204915",
    notes: "U2F requires a minimum of two security keys to be registered."
  },
  "appfolio.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.appfolio.com/help/online-portal"
  },
  "appfigures.com": {},
  "app.vagrantup.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.vagrantup.com/docs/vagrant-cloud/users/authentication.html#two-factor-authentication"
  },
  "app.terraform.io": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://www.terraform.io/docs/enterprise/users-teams-organizations/2fa.html"
  },
  "app.sendloop.com": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://www.notion.so/aa9e468f24cb4efab3cfef4e7ca4e41d"
  },
  "app.azendoo.com": {},
  "app.flexera.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.flexera.com/svr/ug/Content/helplibrary/Configure_Two_Factor_Authentication__2FA_.htm"
  },
  "apobank.de": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "apoTAN"
    ],
    documentation: "https://www.apobank.de/unsere-leistungen/konto-karte/mobile-banking/apotan"
  },
  "apnic.net": {
    methods: [
      "totp"
    ],
    documentation: "https://help.apnic.net/s/article/How-do-I-enable-disable-two-factor-authentication"
  },
  "apmex.com": {},
  "aozorabank.co.jp": {},
  "anz.com.au": {},
  "aok.de": {
    methods: [
      "sms"
    ],
    documentation: "https://meine.aok.de/landingpage/faq"
  },
  "anycoindirect.eu": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://anycoindirect.eu/en/support/anycoin-direct/security#what-is-two-factor-authentication-2fa"
  },
  "anydesk.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.anydesk.com/Two-Factor_Authentication"
  },
  "any.run": {
    methods: [
      "totp"
    ]
  },
  "anthem.com": {
    methods: [
      "sms",
      "call",
      "email"
    ]
  },
  "antagning.se": {},
  "anses.gob.ar": {},
  "ankama.com": {
    methods: [
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Ankama Authenticator"
    ],
    documentation: "https://support.ankama.com/hc/en-us/articles/360019984217"
  },
  "andrewsfcu.org": {
    methods: [
      "call",
      "sms",
      "email"
    ],
    documentation: "https://www.andrewsfcu.org/Support/Security#Prevention_Tips"
  },
  "ancestry.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://support.ancestry.com/s/article/MFA",
    notes: "SMS 2FA is currently only available for customers with a U.S. based phone number."
  },
  "amundi-ee.com": {},
  "amtrak.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "amp.com.au": {},
  "amp.co.nz": {},
  "ameriprise.com": {
    methods: [
      "sms"
    ],
    documentation: "https://www.ameriprise.com/privacy-security-fraud/how-we-protect-information/#02"
  },
  "americanexpress.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.americanexpress.com/uk/benefits/service-security/safety-fraud/authentication.html#tabs-759524196_3"
  },
  "americancentury.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.americancentury.com/support-center/privacy-security/security-center/#account-security-log-in-for-required-changes"
  },
  "americafirst.com": {
    methods: [
      "sms",
      "email",
      "totp"
    ],
    documentation: "https://www.americafirst.com/online_banking.html"
  },
  "amazon.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.ae": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.ca": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.cn": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.co.jp": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.co.uk": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.com.au": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.com.br": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.com.mx": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.com.tr": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.de": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.es": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.fr": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.in": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.it": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.nl": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.sa": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.se": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazon.sg": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://www.amazon.com/gp/help/customer/display.html?nodeId=G3PWZPU52FKN7PW4",
    notes: "SMS or phone call required to enable 2FA. Enabling on Amazon.com activates 2FA on other regional Amazon sites, such as UK and DE."
  },
  "amazingmarvin.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.amazingmarvin.com/en/articles/5019430"
  },
  "amaysim.com.au": {},
  "altra.org": {
    methods: [
      "sms",
      "email"
    ]
  },
  "altoira.com": {
    methods: [
      "totp"
    ]
  },
  "alterdice.com": {
    methods: [
      "email",
      "totp"
    ]
  },
  "altcointrader.co.za": {
    methods: [
      "totp"
    ],
    documentation: "https://altcointrader.zendesk.com/hc/en-gb/articles/360007179680",
    recovery: "https://altcointrader.zendesk.com/hc/en-gb/articles/360007225480"
  },
  "alltrails.com": {},
  "ally.com": {
    methods: [
      "sms",
      "call"
    ],
    documentation: "https://www.ally.com/messages/sms/"
  },
  "allmylinks.com": {
    methods: [
      "totp"
    ]
  },
  "allianz.de": {
    methods: [
      "sms"
    ],
    documentation: "https://www.allianz.de/service/meine-allianz/#faq"
  },
  "allegro.pl": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://allegro.pl/pomoc/dla-kupujacych/logowanie-i-haslo/dwustopniowe-logowanie-najczesciej-zadawane-pytania-dykqg9nMKSZ",
    notes: "SMS 2FA cannot be disabled even when TOTP is enabled."
  },
  "alliantcreditunion.org": {
    methods: [
      "sms"
    ],
    documentation: "https://www.alliantcreditunion.org/help/how-does-alliant-two-factor-authentication-work"
  },
  "allegiantair.com": {},
  "all-inkl.com": {
    methods: [
      "totp"
    ],
    documentation: "https://all-inkl.com/wichtig/faq/#2fa"
  },
  "aliexpress.com": {},
  "alibabacloud.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.alibabacloud.com/help/en/cloud-migration-guide-for-beginners/latest/configure-security-settings-for-an-alibaba-cloud-account"
  },
  "aliyun.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.alibabacloud.com/help/en/cloud-migration-guide-for-beginners/latest/configure-security-settings-for-an-alibaba-cloud-account"
  },
  "algolia.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.algolia.com/doc/security/best-security-practices/#two-factor-authentication",
    recovery: "https://support.algolia.com/hc/en-us/articles/4406975223569"
  },
  "alectrautilities.com": {},
  "alchemy.com": {},
  "aldimobile.com.au": {},
  "alchemer.com": {
    methods: [
      "totp",
      "sms"
    ],
    documentation: "https://help.alchemer.com/help/multi-factor-authentication#user",
    notes: "SMS 2FA is only available for Enterprise accounts with an SMS 2FA provision."
  },
  "alaskaair.com": {},
  "ajax.systems": {
    methods: [
      "totp"
    ],
    documentation: "https://support.ajax.systems/en/how-secure-ajax-account/"
  },
  "akc.org": {
    methods: [
      "email"
    ],
    documentation: "https://www.akc.org/about/site/two-factor-authentication/"
  },
  "aiven.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.aiven.io/en/articles/947120"
  },
  "airtable.com": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://support.airtable.com/docs/enabling-two-factor-authentication",
    recovery: "https://support.airtable.com/docs/enabling-two-factor-authentication#faqs",
    notes: "SMS must be enabled first and software 2FA can be bypassed by SMS."
  },
  "airship.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.airship.com/tutorials/security/2fa/",
    notes: "2FA is only available upon request for customers on their Essential and Comprehensive plans."
  },
  "airmee.com": {},
  "airdroid.com": {},
  "aircanada.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.aircanada.com/ca/en/aco/home/customer-profile/frequently-asked-questions.html#/tab_tfa-faq-tabs_title_2"
  },
  "airbrake.io": {
    methods: [
      "totp"
    ],
    documentation: "https://airbrake.io/docs/features/two-factor-authentication/"
  },
  "airbnb.com": {
    methods: [
      "email",
      "sms"
    ],
    documentation: "https://www.airbnb.com/help/article/501",
    notes: "Airbnb decides when 2FA is required; user cannot enable 2FA for every login."
  },
  "airbank.cz": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "My Air"
    ],
    documentation: "https://www.airbank.cz/co-vas-nejvic-zajima/jake-bezpecnostni-prvky-u-nas-mame"
  },
  "airasia.com": {
    methods: [
      "email"
    ]
  },
  "aidvantage.studentaid.gov": {},
  "aha.io": {
    methods: [
      "sms",
      "call",
      "custom-software",
      "u2f"
    ],
    "custom-software": [
      "Duo"
    ],
    documentation: "https://www.aha.io/support/ideas/ideas/settings/account-settings#security-and-single-sign-on",
    notes: "2FA is only available through Duo."
  },
  "agl.com.au": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.agl.com.au/help-support/energy/manage-your-account/account-registration-and-logins/log-in-and-create-passwords"
  },
  "agenziaentrate.gov.it": {},
  "afterpay.com": {
    methods: [
      "sms",
      "email"
    ]
  },
  "afterpay.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "secure-afterpay.com.au": {
    methods: [
      "sms",
      "email"
    ]
  },
  "afterpay.co.nz": {
    methods: [
      "sms",
      "email"
    ]
  },
  "clearpay.co.uk": {
    methods: [
      "sms",
      "email"
    ]
  },
  "afternic.com": {
    methods: [
      "totp",
      "sms",
      "u2f"
    ],
    documentation: "https://help.afternic.com/s/article/How-can-I-set-up-Two-Factor-Authentication-for-my-account"
  },
  "afip.gob.ar": {
    methods: [
      "custom-software"
    ],
    "custom-software": [
      "Token AFIP",
      "AFIP OTP"
    ],
    documentation: "https://www.afip.gob.ar/claveFiscal/informacion-basica/solicitud.asp"
  },
  "affinityfcu.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.affinityfcu.com/Privacy-Disclosures/Business-Banking-User-Guide.pdf"
  },
  "aeza.net": {
    methods: [
      "totp"
    ]
  },
  "aetna.com": {},
  "aesop.com": {},
  "aerolineas.com.ar": {},
  "aep.com": {},
  "adyen.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.adyen.com/account/multi-factor-authentication"
  },
  "adt.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.adt.com/help/pulse/mfa"
  },
  "portal.adtpulse.com": {
    methods: [
      "sms",
      "call",
      "email"
    ],
    documentation: "https://www.adt.com/help/pulse/mfa"
  },
  "adp.com": {},
  "admiral.com": {},
  "adobe.com": {
    methods: [
      "sms",
      "email",
      "custom-software"
    ],
    "custom-software": [
      "Adobe Account Access"
    ],
    documentation: "https://helpx.adobe.com/manage-account/using/secure-your-adobe-account.html",
    recovery: "https://helpx.adobe.com/x-productkb/global/2-step-verification-account-security.html"
  },
  "adguard.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.adguard.com/en/general/2fa"
  },
  "adguard-vpn.com": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.adguard.com/en/general/2fa"
  },
  "adguard-dns.io": {
    methods: [
      "totp"
    ],
    documentation: "https://kb.adguard.com/en/general/2fa"
  },
  "adelaidebank.com.au": {},
  "addiko.hr": {
    methods: [
      "totp",
      "custom-software"
    ],
    "custom-software": [
      "Addiko Mobile App"
    ],
    documentation: "https://www.addiko.hr/static/uploads/mtoken-uputa-za-koristenje.pdf"
  },
  "adafruit.com": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://learn.adafruit.com/how-to-set-up-2-factor-authentication-on-adafruit"
  },
  "activision.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.activision.com/articles/using-two-factor-authentication-with-an-activision-account"
  },
  "callofduty.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.activision.com/articles/using-two-factor-authentication-with-an-activision-account"
  },
  "activestate.com": {
    methods: [
      "totp"
    ],
    documentation: "https://docs.activestate.com/platform/user/prefs/twofactor/"
  },
  "activecollab.com": {},
  "active24.com": {
    methods: [
      "totp"
    ],
    documentation: "https://faq.active24.com/cz/183996-"
  },
  "activecampaign.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://help.activecampaign.com/hc/en-us/articles/360008574740",
    recovery: "https://help.activecampaign.com/hc/en-us/articles/360019871579"
  },
  "actionstep.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.actionstep.com/support/solutions/articles/150000019975"
  },
  "actionnetwork.org": {
    methods: [
      "custom-software",
      "sms"
    ],
    "custom-software": [
      "Authy"
    ],
    documentation: "https://help.actionnetwork.org/hc/en-us/articles/217206826"
  },
  "acorns.com": {
    methods: [
      "sms",
      "email"
    ],
    documentation: "https://www.acorns.com/support/how-do-i-turn-on-two-factor-authentication-on-my-account/",
    notes: "You will need to verify email or phone in order to activate 2FA."
  },
  "accounts.nintendo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://en-americas-support.nintendo.com/app/answers/detail/a_id/27496",
    notes: "2FA not available for child accounts (users 12 years of age or younger) or supervised accounts (users 13 years of age or older attached to a parent account)."
  },
  "acquia.com": {
    methods: [
      "sms",
      "totp"
    ],
    documentation: "https://docs.acquia.com/cloud-platform/access/signin/",
    notes: "SMS 2FA is only available for US or Canada phone numbers."
  },
  "accounts.firefox.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.mozilla.org/en-US/kb/secure-firefox-account-two-step-authentication",
    recovery: "https://support.mozilla.org/en-US/kb/what-if-im-locked-out-two-step-authentication"
  },
  "accountable.eu": {
    methods: [
      "totp"
    ],
    documentation: "https://help.accountable.eu/en/articles/6976966"
  },
  "accelo.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.accelo.com/resources/help/faq/user-permissions-and-settings/two-factor-authentication/"
  },
  "academicearth.org": {},
  "above.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.above.com/manual/my-account-manual-two-step-auth.html"
  },
  "about.me": {},
  "aami.com.au": {},
  "aaiedu.hr": {},
  "aa.com": {},
  "a2hosting.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.a2hosting.com/kb/a2-hosting-customer-portal/account-management/enabling-two-factor-authentication-for-your-a2-hosting-account"
  },
  "7pass.de": {},
  "53.com": {
    methods: [
      "sms"
    ]
  },
  "500px.com": {
    methods: [
      "totp"
    ],
    documentation: "https://support.500px.com/hc/en-us/articles/205115877"
  },
  "4cd.edu": {
    methods: [
      "sms",
      "call",
      "totp"
    ],
    documentation: "https://4cd-doit.atlassian.net/wiki/spaces/ITPU/pages/2320465929"
  },
  "3commas.io": {
    methods: [
      "totp"
    ],
    documentation: "https://help.3commas.io/en/articles/3424452",
    recovery: "https://help.3commas.io/en/articles/3108967"
  },
  "2checkout.com": {
    methods: [
      "totp",
      "email"
    ],
    documentation: "https://knowledgecenter.2checkout.com/Onboarding/Activate-and-set-up-your-2Checkout-account/Two-factor-authentication"
  },
  "2k.com": {},
  "23andme.com": {
    methods: [
      "totp"
    ],
    documentation: "https://customercare.23andme.com/hc/en-us/articles/360034119874"
  },
  "20i.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.20i.com/support/my-services/two-factor-authentication-my20i"
  },
  "1password.com": {
    methods: [
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://support.1password.com/two-factor-authentication/",
    recovery: "https://support.1password.com/recovery/",
    notes: "Teams using Duo with 1Password can't enable other 2FA methods. Non-U2F Hardware tokens and custom software methods are only available through Duo."
  },
  "1password.ca": {
    methods: [
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://support.1password.com/two-factor-authentication/",
    recovery: "https://support.1password.com/recovery/",
    notes: "Teams using Duo with 1Password can't enable other 2FA methods. Non-U2F Hardware tokens and custom software methods are only available through Duo."
  },
  "1password.eu": {
    methods: [
      "totp",
      "u2f",
      "custom-hardware",
      "custom-software"
    ],
    "custom-software": [
      "Duo"
    ],
    "custom-hardware": [
      "Yubico OTP",
      "Duo D100 Token"
    ],
    documentation: "https://support.1password.com/two-factor-authentication/",
    recovery: "https://support.1password.com/recovery/",
    notes: "Teams using Duo with 1Password can't enable other 2FA methods. Non-U2F Hardware tokens and custom software methods are only available through Duo."
  },
  "1822direkt.de": {
    methods: [
      "sms",
      "custom-software"
    ],
    "custom-software": [
      "1822TAN+"
    ],
    documentation: "https://www.1822direkt.de/service/sicherheitsportal/sicheres-online-banking/"
  },
  "15five.com": {
    methods: [
      "totp"
    ],
    documentation: "https://success.15five.com/hc/en-us/articles/360002698811#h_01G1GXTSKCGMSC3ECKRFSC8NWM"
  },
  "123formbuilder.com": {
    methods: [
      "totp"
    ],
    documentation: "https://www.123formbuilder.com/docs/multi-factor-authentication-login"
  },
  "123-reg.co.uk": {
    methods: [
      "sms",
      "totp",
      "u2f"
    ],
    documentation: "https://www.123-reg.co.uk/support/my-account/how-do-i-enable-2-step-verification-on-my-account/"
  },
  "101domain.com": {
    methods: [
      "totp"
    ],
    documentation: "https://help.101domain.com/kb/setup-two-factor-authentication"
  },
  "chargepoint.com": {},
  "coop.ch": {}
};

// faq/tips-faq.json
var tips_faq_default = {
  faqs: [
    {
      id: "what-is-2fa",
      category: "basics",
      question: "What is two-factor authentication (2FA)?",
      answer: "Two-factor authentication (2FA) adds an extra layer of security to your accounts. Instead of just entering your password, you also need to provide a second proof of identity - usually a code from your phone. Think of it like needing both a key and a security code to enter a building. Even if someone steals your password, they can't access your account without that second factor.",
      tags: ["beginner", "definition"],
      relatedQuestions: ["why-need-2fa", "how-2fa-works"]
    },
    {
      id: "why-need-2fa",
      category: "basics",
      question: "Why do I need 2FA?",
      answer: "Passwords alone aren't enough anymore. They can be guessed, stolen in data breaches, or phished. With 2FA enabled, even if someone gets your password, they still can't access your account without the second factor (your phone or security key). Studies show that 2FA blocks 99.9% of automated attacks. It's one of the single most effective things you can do to protect yourself online.",
      tags: ["beginner", "security"],
      relatedQuestions: ["what-is-2fa", "most-secure-method"]
    },
    {
      id: "how-2fa-works",
      category: "basics",
      question: "How does 2FA work?",
      answer: "When you log into an account with 2FA enabled, you first enter your password as usual. Then, you provide a second piece of proof - typically a 6-digit code. This code comes from an authenticator app on your phone, via text message, or from a hardware security key. The code changes every 30 seconds, so even if someone sees it, they can't reuse it. Only someone with both your password AND access to your second factor can log in.",
      tags: ["beginner", "how-to"],
      relatedQuestions: ["what-is-2fa", "authenticator-app-choice"]
    },
    {
      id: "which-accounts-first",
      category: "getting-started",
      question: "Which accounts should I secure with 2FA first?",
      answer: "Start with your email account - it's the master key to everything else. Most services use email for password resets, so if someone compromises your email, they can access your other accounts. After email, prioritize financial accounts (banking, PayPal, investment accounts), then social media and cloud storage. Focus on accounts that contain sensitive information, financial data, or could be used to impersonate you.",
      tags: ["beginner", "priority"],
      relatedQuestions: ["how-setup-2fa", "why-need-2fa"]
    },
    {
      id: "how-setup-2fa",
      category: "getting-started",
      question: "How do I set up 2FA on my accounts?",
      answer: "The process varies slightly by website, but generally: 1) Go to your account's security or privacy settings, 2) Look for 'Two-Factor Authentication', 'Two-Step Verification', or '2FA', 3) Choose your preferred method (authenticator app recommended), 4) Follow the setup wizard - usually scanning a QR code with your authenticator app, 5) Save your backup codes in a safe place. 2Step provides direct links to each site's 2FA setup page to make this easier.",
      tags: ["beginner", "how-to", "setup"],
      relatedQuestions: ["authenticator-app-choice", "backup-codes"]
    },
    {
      id: "authenticator-app-choice",
      category: "getting-started",
      question: "Which authenticator app should I use?",
      answer: "Popular, reliable options include Authy, Google Authenticator, Microsoft Authenticator, and 1Password. All work similarly - they generate time-based codes for your accounts. Authy offers cloud backup and multi-device support. Google Authenticator is simple and widely trusted. Microsoft Authenticator integrates well with Microsoft services. Choose one that's available for your phone's operating system and has good reviews. The most important thing is to use one - they're all significantly more secure than SMS.",
      tags: ["beginner", "tools", "apps"],
      relatedQuestions: ["how-setup-2fa", "sms-vs-app"]
    },
    {
      id: "backup-codes",
      category: "getting-started",
      question: "What are backup codes and why do I need them?",
      answer: "Backup codes are one-time-use codes provided when you enable 2FA. They let you access your account if you lose your phone or can't get your regular 2FA codes. Most services give you 8-10 backup codes when you set up 2FA. Save them somewhere secure but separate from your password manager - like printed on paper in a safe place, or in an encrypted note. Each code typically works only once, so you'll want to generate new ones after using a few.",
      tags: ["important", "troubleshooting"],
      relatedQuestions: ["lost-phone", "where-store-backup-codes"]
    },
    {
      id: "where-store-backup-codes",
      category: "getting-started",
      question: "Where should I store my backup codes?",
      answer: "Store backup codes somewhere secure but accessible if you lose your phone. Good options include: printing them and keeping them in a safe or locked drawer, saving them in an encrypted password manager (separate from the accounts they protect), or storing them in secure cloud storage. Don't save them in plain text files on your computer or in photos on your phone - if someone gets access to those, they defeat the purpose of 2FA. The key is: secure, offline, and separate from your primary devices.",
      tags: ["important", "security"],
      relatedQuestions: ["backup-codes", "lost-phone"]
    },
    {
      id: "lost-phone",
      category: "troubleshooting",
      question: "What if I lose my phone with my authenticator app?",
      answer: "This is exactly why backup codes are critical. If you lose your phone, use one of your saved backup codes to log into your account. Once you're in, you can disable and re-enable 2FA with your new phone. If you don't have backup codes, you'll need to contact the service's support team to verify your identity and regain access - which can take days. Some authenticator apps like Authy offer cloud backup, which makes recovery easier. This is also why having 2FA on multiple devices can be helpful.",
      tags: ["troubleshooting", "emergency"],
      relatedQuestions: ["backup-codes", "multiple-devices", "where-store-backup-codes"]
    },
    {
      id: "multiple-devices",
      category: "troubleshooting",
      question: "Can I use 2FA on multiple devices?",
      answer: "Yes! When you set up 2FA by scanning a QR code, you can scan the same code with multiple devices. This gives you backup access if you lose one device. Alternatively, some authenticator apps like Authy support syncing across devices. If you've already set up 2FA on one device, you'll typically need to disable and re-enable it to add another device (which is why you should do this while you still have access). Having 2FA on multiple devices is smart - just keep all devices secure.",
      tags: ["advanced", "setup"],
      relatedQuestions: ["lost-phone", "authenticator-app-choice"]
    },
    {
      id: "sms-vs-app",
      category: "methods",
      question: "Is SMS 2FA as secure as an authenticator app?",
      answer: "SMS 2FA is better than no 2FA, but authenticator apps are more secure. SMS codes can be intercepted through SIM swapping (where attackers convince your phone carrier to transfer your number to their device) or through network vulnerabilities. Authenticator apps generate codes locally on your device and don't rely on cellular networks, making them much harder to intercept. If a service offers app-based 2FA, choose that over SMS. But if SMS is the only option, it's still worth enabling.",
      tags: ["security", "comparison"],
      relatedQuestions: ["most-secure-method", "authenticator-app-choice"]
    },
    {
      id: "most-secure-method",
      category: "methods",
      question: "What's the most secure 2FA method?",
      answer: "Hardware security keys (like YubiKey or Google Titan) are the most secure 2FA method. They're physical devices you plug into your computer or tap on your phone. They're immune to phishing, can't be remotely hacked, and don't rely on codes that could be intercepted. However, they cost money and require carrying the device with you. For most people, authenticator apps offer excellent security and convenience. The security ranking is: Hardware keys (most secure) > Authenticator apps > SMS (least secure, but still much better than passwords alone).",
      tags: ["security", "advanced"],
      relatedQuestions: ["hardware-key", "sms-vs-app"]
    },
    {
      id: "hardware-key",
      category: "methods",
      question: "What is a hardware security key?",
      answer: "A hardware security key is a small physical device (like a USB stick) that provides 2FA. Instead of typing a code, you insert the key into your computer or tap it on your phone. Popular brands include YubiKey, Google Titan, and Thetis. They're the gold standard for security because they can't be phished or hacked remotely. They're ideal for high-value accounts like email, banking, or work accounts. The downside is they cost $25-50, and you should buy two (one as a backup) in case you lose one.",
      tags: ["advanced", "hardware"],
      relatedQuestions: ["most-secure-method", "sms-vs-app"]
    },
    {
      id: "cant-scan-qr",
      category: "troubleshooting",
      question: "What if I can't scan the QR code?",
      answer: "Most services offer an alternative to QR codes. Look for a link that says 'Can't scan?' or 'Enter key manually.' This will show you a long string of letters and numbers that you can type into your authenticator app instead of scanning. In your authenticator app, look for an option like 'Enter a setup key' or 'Manual entry.' Type in the code exactly as shown (spaces usually don't matter). This achieves the same result as scanning the QR code.",
      tags: ["troubleshooting", "setup"],
      relatedQuestions: ["how-setup-2fa", "authenticator-app-choice"]
    },
    {
      id: "traveling-internationally",
      category: "advanced",
      question: "Will 2FA work when I'm traveling internationally?",
      answer: "Authenticator apps work perfectly anywhere in the world because they don't need internet or cellular service - the codes are generated locally on your device. SMS-based 2FA can be problematic abroad if you don't have cell service or if you get a temporary local SIM card. This is another reason to prefer authenticator apps. If you must use SMS 2FA and travel frequently, make sure your backup codes are saved securely before you leave. Some services also let you add multiple phone numbers for SMS backup.",
      tags: ["advanced", "travel"],
      relatedQuestions: ["sms-vs-app", "backup-codes"]
    },
    {
      id: "privacy-concerns",
      category: "advanced",
      question: "Does 2FA compromise my privacy?",
      answer: "2FA actually enhances your privacy by making your accounts harder to hack. Authenticator apps work entirely offline and don't share your data with anyone. SMS 2FA does tie your phone number to your account, which some people consider a privacy trade-off, but the security benefit usually outweighs this. If privacy is a major concern, use authenticator apps or hardware keys instead of SMS. They provide strong security without requiring you to share your phone number.",
      tags: ["advanced", "privacy"],
      relatedQuestions: ["sms-vs-app", "hardware-key"]
    },
    {
      id: "does-2step-collect-data",
      category: "privacy",
      question: "Does 2Step collect any of my data?",
      answer: "No. 2Step is completely local and private. Everything is stored only on your device - we never see which websites you visit, which accounts you've secured, or any other information about your browsing. There are no analytics, no tracking, and no data sent to any servers. The extension works entirely offline using a database of sites bundled with the extension. Your privacy is a core principle of this tool.",
      tags: ["privacy", "important"],
      relatedQuestions: ["privacy-concerns"]
    },
    {
      id: "remove-2fa",
      category: "troubleshooting",
      question: "How do I turn off 2FA if I need to?",
      answer: "You can disable 2FA at any time through the same security settings where you enabled it. Log into your account (using your current 2FA method), go to security settings, and look for an option to disable or turn off two-factor authentication. The site will usually ask you to confirm this decision since it reduces your security. We strongly recommend keeping 2FA enabled, but if you need to disable it temporarily (like when switching phones), just make sure to re-enable it as soon as possible.",
      tags: ["troubleshooting"],
      relatedQuestions: ["how-setup-2fa"]
    },
    {
      id: "new-phone",
      category: "troubleshooting",
      question: "I got a new phone - how do I transfer my 2FA?",
      answer: "The process depends on your authenticator app. Some apps like Authy offer cloud backup and will automatically sync to your new phone when you log in. For apps like Google Authenticator, you'll need to either: 1) Use the app's export/transfer feature (if available) before switching phones, or 2) Disable and re-enable 2FA on each account with your new phone. The second option is more tedious but works for all apps. This is why backup codes are essential - they let you log in while you're switching devices.",
      tags: ["troubleshooting", "setup"],
      relatedQuestions: ["lost-phone", "backup-codes", "multiple-devices"]
    },
    {
      id: "too-much-hassle",
      category: "basics",
      question: "Isn't 2FA too much hassle?",
      answer: "2FA adds about 5-10 seconds to your login process - a small price for dramatically better security. Most sites remember your device for 30 days, so you won't need to enter codes every time. And modern authenticator apps make it very quick - just open the app, see the code, done. Compare that to the hassle of having your account hacked: changing all your passwords, dealing with identity theft, recovering compromised accounts, and the stress of knowing someone accessed your private information. Those 5 seconds are worth it.",
      tags: ["beginner"],
      relatedQuestions: ["why-need-2fa", "how-2fa-works"]
    }
  ],
  tips: [
    {
      id: "tip-email-first",
      text: "Enable 2FA on your email first - it's the gateway to all your other accounts",
      category: "priority",
      priority: "high",
      showAfter: 0
    },
    {
      id: "tip-backup-codes",
      text: "Save your backup codes in a secure place, separate from your password manager",
      category: "security",
      priority: "high",
      showAfter: 1
    },
    {
      id: "tip-app-over-sms",
      text: "Authenticator apps are more secure than SMS - they can't be intercepted",
      category: "security",
      priority: "medium",
      showAfter: 0
    },
    {
      id: "tip-99-percent",
      text: "Accounts with 2FA are 99.9% less likely to be compromised",
      category: "motivation",
      priority: "medium",
      showAfter: 0
    },
    {
      id: "tip-hardware-keys",
      text: "Hardware keys like YubiKey offer the strongest 2FA protection for your most important accounts",
      category: "advanced",
      priority: "low",
      showAfter: 5
    },
    {
      id: "tip-multiple-devices",
      text: "Set up your authenticator on multiple devices in case you lose one",
      category: "security",
      priority: "medium",
      showAfter: 3
    },
    {
      id: "tip-privacy",
      text: "2Step keeps all your data local - we never see which sites you visit",
      category: "privacy",
      priority: "medium",
      showAfter: 0
    },
    {
      id: "tip-unique-passwords",
      text: "Use unique passwords for each site - 2FA protects you if one password leaks",
      category: "security",
      priority: "medium",
      showAfter: 2
    },
    {
      id: "tip-financial-accounts",
      text: "After email, prioritize 2FA on banking and financial accounts",
      category: "priority",
      priority: "high",
      showAfter: 1
    },
    {
      id: "tip-no-hassle",
      text: "Most sites remember your device for 30 days - you won't need codes every time",
      category: "motivation",
      priority: "low",
      showAfter: 0
    },
    {
      id: "tip-codes-expire",
      text: "Authenticator codes change every 30 seconds - even if someone sees one, they can't reuse it",
      category: "education",
      priority: "low",
      showAfter: 1
    },
    {
      id: "tip-password-not-enough",
      text: "Passwords can be guessed or stolen - 2FA adds a layer that hackers can't easily bypass",
      category: "motivation",
      priority: "medium",
      showAfter: 0
    }
  ],
  categories: {
    basics: {
      name: "Basics",
      description: "New to 2FA? Start here",
      icon: "\u{1F4DA}"
    },
    "getting-started": {
      name: "Getting Started",
      description: "How to set up and use 2FA",
      icon: "\u{1F680}"
    },
    methods: {
      name: "2FA Methods",
      description: "Understanding different types of 2FA",
      icon: "\u{1F510}"
    },
    troubleshooting: {
      name: "Troubleshooting",
      description: "Common problems and solutions",
      icon: "\u{1F527}"
    },
    advanced: {
      name: "Advanced",
      description: "For experienced users",
      icon: "\u26A1"
    },
    privacy: {
      name: "Privacy",
      description: "How 2Step protects your privacy",
      icon: "\u{1F512}"
    }
  }
};

// sfc-script:/private/var/www/apps/2Step/src/App.vue?type=script
var App_default = {
  __name: "App",
  setup(__props, { expose: __expose }) {
    __expose();
    const tabs = [
      { id: "currentSite", label: "Current" },
      { id: "allSites", label: "Directory" },
      { id: "faqs", label: "FAQ" },
      { id: "tips", label: "Tips" }
    ];
    const currentTab = ref("currentSite");
    const settings = ref({ search: "" });
    const selectedDirectorySite = ref(null);
    const currentSite = ref({
      domain: "",
      has2FA: false,
      methods: [],
      documentation: "",
      loading: true
    });
    const faqs = ref({
      loading: false,
      ...tips_faq_default
    });
    const selectedCategory = ref("basics");
    const itemsOpen = ref({});
    const toggleAccordion = (id) => {
      itemsOpen.value[id] = !itemsOpen.value[id];
    };
    const orderedTips = computed2(() => {
      const priorityMap = { "high": 1, "medium": 2, "low": 3 };
      return [...faqs.value.tips].sort((a, b) => {
        return (priorityMap[a.priority] || 99) - (priorityMap[b.priority] || 99);
      });
    });
    const filteredFaqs = computed2(() => {
      if (!selectedCategory.value) return faqs.value.faqs;
      return faqs.value.faqs.filter((f) => f.category === selectedCategory.value);
    });
    const filteredSites = computed2(() => {
      const query = settings.value.search.toLowerCase();
      if (!query) return [];
      return Object.entries(sites_default).filter(([domain]) => domain.includes(query)).slice(0, 50).map(([domain, data]) => ({
        domain,
        has2FA: !!(data.methods?.length || data.documentation),
        methods: data.methods || []
      }));
    });
    const getSiteData = (domain) => {
      const cleanDomain = domain.toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
      const siteData = sites_default[cleanDomain];
      const has2FA = !!(siteData && (siteData.methods?.length || siteData.documentation));
      return {
        domain: cleanDomain,
        has2FA,
        methods: siteData?.methods || [],
        documentation: siteData?.documentation || "",
        loading: false
      };
    };
    const checkSite = (domain) => {
      currentSite.value = getSiteData(domain);
    };
    const urlParams = new URL(window.location.href).searchParams;
    const extensionOrigin = urlParams.get("origin");
    onMounted(() => {
      window.addEventListener("message", (event) => {
        if (extensionOrigin && event.origin !== extensionOrigin) {
          return;
        }
        if (event.data.type === "TAB_URL") {
          try {
            const url = new URL(event.data.url);
            checkSite(url.hostname);
          } catch (e) {
            currentSite.value.loading = false;
          }
        }
      });
      window.parent.postMessage({ type: "GET_TAB_URL" }, extensionOrigin || "*");
      setTimeout(() => {
        if (currentSite.value.loading) {
          checkSite("github.com");
        }
      }, 500);
    });
    const __returned__ = { tabs, currentTab, settings, selectedDirectorySite, currentSite, faqs, selectedCategory, itemsOpen, toggleAccordion, orderedTips, filteredFaqs, filteredSites, getSiteData, checkSite, urlParams, extensionOrigin, ref, onMounted, computed: computed2, Input: Input_default2, TabBar: TabBar_default2, SiteDetails: SiteDetails_default2, MethodBadge: MethodBadge_default2, get sitesData() {
      return sites_default;
    }, get faqData() {
      return tips_faq_default;
    } };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};

// sfc-template:/private/var/www/apps/2Step/src/App.vue?type=template
var _hoisted_15 = { class: "h-full bg-gray-50 flex flex-col" };
var _hoisted_25 = { class: "bg-blue-600 text-white shadow-md z-10" };
var _hoisted_34 = { class: "flex-grow overflow-y-auto p-4" };
var _hoisted_43 = { class: "space-y-4" };
var _hoisted_53 = {
  key: 0,
  class: "space-y-4"
};
var _hoisted_62 = {
  key: 1,
  class: "bg-white rounded-xl shadow-sm p-6 border border-gray-100"
};
var _hoisted_72 = { class: "text-center mb-6" };
var _hoisted_82 = { class: "text-xs text-gray-500 mt-1 mb-4" };
var _hoisted_92 = {
  key: 0,
  class: "space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar"
};
var _hoisted_102 = ["onClick"];
var _hoisted_112 = { class: "flex items-center gap-4" };
var _hoisted_122 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var _hoisted_132 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var _hoisted_142 = { class: "text-[15px] font-extrabold text-gray-900 tracking-tight" };
var _hoisted_152 = {
  key: 0,
  class: "flex gap-1.5 mt-1"
};
var _hoisted_16 = {
  key: 0,
  class: "text-[10px] px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 rounded-lg font-bold"
};
var _hoisted_17 = {
  key: 1,
  class: "text-center py-8"
};
var _hoisted_18 = { class: "text-sm text-gray-400" };
var _hoisted_19 = { class: "space-y-4" };
var _hoisted_20 = {
  key: 0,
  class: "flex flex-col items-center justify-center p-12 space-y-4"
};
var _hoisted_21 = { class: "space-y-6" };
var _hoisted_222 = {
  key: 0,
  class: "flex flex-col items-center justify-center p-12 space-y-4"
};
var _hoisted_232 = {
  key: 1,
  class: "space-y-8"
};
var _hoisted_242 = { class: "flex items-center gap-2 px-1" };
var _hoisted_252 = { class: "text-lg" };
var _hoisted_26 = { class: "text-xs font-bold text-gray-400 uppercase tracking-widest" };
var _hoisted_27 = { class: "space-y-2" };
var _hoisted_28 = ["onClick"];
var _hoisted_29 = { class: "text-[14px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-snug pr-4" };
var _hoisted_30 = { class: "px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-200" };
var _hoisted_31 = { class: "space-y-3" };
var _hoisted_322 = { class: "space-y-4" };
var _hoisted_332 = { class: "grid gap-3" };
var _hoisted_342 = { class: "flex gap-4" };
var _hoisted_35 = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var _hoisted_36 = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-5 h-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
var _hoisted_37 = { class: "flex-grow" };
var _hoisted_38 = { class: "flex items-center justify-between mb-1" };
var _hoisted_39 = { class: "text-[13px] text-gray-800 font-bold leading-snug group-hover:text-gray-900 transition-colors" };
function render5(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_15, [
    createCommentVNode(" Header "),
    createBaseVNode("header", _hoisted_25, [
      _cache[3] || (_cache[3] = createBaseVNode(
        "div",
        { class: "flex items-center justify-between px-4 py-3" },
        [
          createBaseVNode("h1", { class: "text-lg font-bold" }, "2Step - 2FA Checker")
        ],
        -1
        /* CACHED */
      )),
      createVNode($setup["TabBar"], {
        tabs: $setup.tabs,
        modelValue: $setup.currentTab,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.currentTab = $event),
        has2FA: $setup.currentSite.loading ? null : $setup.currentSite.has2FA
      }, null, 8, ["modelValue", "has2FA"])
    ]),
    createCommentVNode(" Main Content "),
    createBaseVNode("main", _hoisted_34, [
      withDirectives(createBaseVNode(
        "div",
        _hoisted_43,
        [
          $setup.selectedDirectorySite ? (openBlock(), createElementBlock("div", _hoisted_53, [
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.selectedDirectorySite = null),
              class: "flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 transition-colors group mb-2"
            }, [..._cache[4] || (_cache[4] = [
              createBaseVNode(
                "div",
                { class: "w-8 h-8 rounded-md bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200 group-hover:shadow-md transition-all" },
                [
                  createBaseVNode("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "w-4 h-4",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createBaseVNode("line", {
                      x1: "19",
                      y1: "12",
                      x2: "5",
                      y2: "12"
                    }),
                    createBaseVNode("polyline", { points: "12 19 5 12 12 5" })
                  ])
                ],
                -1
                /* CACHED */
              ),
              createTextVNode(
                " Back to list ",
                -1
                /* CACHED */
              )
            ])]),
            createVNode($setup["SiteDetails"], { site: $setup.selectedDirectorySite }, null, 8, ["site"])
          ])) : (openBlock(), createElementBlock("div", _hoisted_62, [
            createBaseVNode("div", _hoisted_72, [
              _cache[5] || (_cache[5] = createStaticVNode('<div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3" data-v-ea994a51><svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-ea994a51><circle cx="11" cy="11" r="8" data-v-ea994a51></circle><line x1="21" y1="21" x2="16.65" y2="16.65" data-v-ea994a51></line></svg></div><h3 class="text-sm font-bold text-gray-900" data-v-ea994a51>Directory Search</h3>', 2)),
              createBaseVNode(
                "p",
                _hoisted_82,
                "Search through " + toDisplayString(Object.keys($setup.sitesData).length) + " sites in our database.",
                1
                /* TEXT */
              ),
              createVNode($setup["Input"], {
                modelValue: $setup.settings.search,
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.settings.search = $event),
                placeholder: "Search domains (e.g. google.com)..."
              }, null, 8, ["modelValue"])
            ]),
            $setup.filteredSites.length ? (openBlock(), createElementBlock("div", _hoisted_92, [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList($setup.filteredSites, (site) => {
                  return openBlock(), createElementBlock("div", {
                    key: site.domain,
                    onClick: ($event) => $setup.selectedDirectorySite = $setup.getSiteData(site.domain),
                    class: "flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/20 transition-all cursor-pointer group shadow-sm hover:shadow-md"
                  }, [
                    createBaseVNode("div", _hoisted_112, [
                      createBaseVNode(
                        "div",
                        {
                          class: normalizeClass([
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                            site.has2FA ? "bg-emerald-100/50 text-emerald-600" : "bg-gray-100 text-gray-400"
                          ])
                        },
                        [
                          site.has2FA ? (openBlock(), createElementBlock("svg", _hoisted_122, [..._cache[6] || (_cache[6] = [
                            createBaseVNode(
                              "path",
                              { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                              null,
                              -1
                              /* CACHED */
                            ),
                            createBaseVNode(
                              "polyline",
                              { points: "9 11 11 13 15 9" },
                              null,
                              -1
                              /* CACHED */
                            )
                          ])])) : (openBlock(), createElementBlock("svg", _hoisted_132, [..._cache[7] || (_cache[7] = [
                            createBaseVNode(
                              "path",
                              { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
                              null,
                              -1
                              /* CACHED */
                            ),
                            createBaseVNode(
                              "line",
                              {
                                x1: "15",
                                y1: "9",
                                x2: "9",
                                y2: "15"
                              },
                              null,
                              -1
                              /* CACHED */
                            ),
                            createBaseVNode(
                              "line",
                              {
                                x1: "9",
                                y1: "9",
                                x2: "15",
                                y2: "15"
                              },
                              null,
                              -1
                              /* CACHED */
                            )
                          ])]))
                        ],
                        2
                        /* CLASS */
                      ),
                      createBaseVNode("div", null, [
                        createBaseVNode(
                          "div",
                          _hoisted_142,
                          toDisplayString(site.domain),
                          1
                          /* TEXT */
                        ),
                        site.has2FA ? (openBlock(), createElementBlock("div", _hoisted_152, [
                          (openBlock(true), createElementBlock(
                            Fragment,
                            null,
                            renderList(site.methods.slice(0, 2), (m) => {
                              return openBlock(), createBlock($setup["MethodBadge"], {
                                key: m,
                                method: m,
                                compact: "",
                                side: "bottom"
                              }, null, 8, ["method"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          )),
                          site.methods.length > 2 ? (openBlock(), createElementBlock(
                            "span",
                            _hoisted_16,
                            " +" + toDisplayString(site.methods.length - 2),
                            1
                            /* TEXT */
                          )) : createCommentVNode("v-if", true)
                        ])) : createCommentVNode("v-if", true)
                      ])
                    ]),
                    _cache[8] || (_cache[8] = createBaseVNode(
                      "div",
                      { class: "opacity-0 group-hover:opacity-100 p-2.5 text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-blue-100" },
                      [
                        createBaseVNode("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          class: "w-5 h-5",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          stroke: "currentColor",
                          "stroke-width": "2.5",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round"
                        }, [
                          createBaseVNode("path", { d: "M5 12h14M12 5l7 7-7 7" })
                        ])
                      ],
                      -1
                      /* CACHED */
                    ))
                  ], 8, _hoisted_102);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])) : $setup.settings.search ? (openBlock(), createElementBlock("div", _hoisted_17, [
              createBaseVNode(
                "p",
                _hoisted_18,
                'No sites found matching "' + toDisplayString($setup.settings.search) + '"',
                1
                /* TEXT */
              )
            ])) : createCommentVNode("v-if", true)
          ]))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vShow, $setup.currentTab === "allSites"]
      ]),
      withDirectives(createBaseVNode(
        "div",
        _hoisted_19,
        [
          $setup.currentSite.loading ? (openBlock(), createElementBlock("div", _hoisted_20, [..._cache[9] || (_cache[9] = [
            createBaseVNode(
              "div",
              { class: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" },
              null,
              -1
              /* CACHED */
            ),
            createBaseVNode(
              "p",
              { class: "text-sm text-gray-500 font-medium" },
              "Checking security...",
              -1
              /* CACHED */
            )
          ])])) : (openBlock(), createBlock($setup["SiteDetails"], {
            key: 1,
            site: $setup.currentSite
          }, null, 8, ["site"]))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vShow, $setup.currentTab === "currentSite"]
      ]),
      withDirectives(createBaseVNode(
        "div",
        _hoisted_21,
        [
          $setup.faqs.loading ? (openBlock(), createElementBlock("div", _hoisted_222, [..._cache[10] || (_cache[10] = [
            createBaseVNode(
              "div",
              { class: "w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" },
              null,
              -1
              /* CACHED */
            ),
            createBaseVNode(
              "p",
              { class: "text-sm text-gray-500 font-medium" },
              "Loading FAQs...",
              -1
              /* CACHED */
            )
          ])])) : (openBlock(), createElementBlock("div", _hoisted_232, [
            createCommentVNode(" Intro "),
            _cache[13] || (_cache[13] = createBaseVNode(
              "div",
              { class: "bg-white rounded-xl p-6 border border-gray-100 text-center mb-2" },
              [
                createBaseVNode("h3", { class: "text-sm font-bold text-gray-900" }, "How can we help?"),
                createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Common questions and simple answers.")
              ],
              -1
              /* CACHED */
            )),
            createCommentVNode(" FAQ Groups "),
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList($setup.faqs.categories, (cat, catId) => {
                return openBlock(), createElementBlock("div", {
                  key: catId,
                  class: "space-y-3"
                }, [
                  createBaseVNode("div", _hoisted_242, [
                    createBaseVNode(
                      "span",
                      _hoisted_252,
                      toDisplayString(cat.icon),
                      1
                      /* TEXT */
                    ),
                    createBaseVNode(
                      "h4",
                      _hoisted_26,
                      toDisplayString(cat.name),
                      1
                      /* TEXT */
                    )
                  ]),
                  createBaseVNode("div", _hoisted_27, [
                    (openBlock(true), createElementBlock(
                      Fragment,
                      null,
                      renderList($setup.faqs.faqs.filter((f) => f.category === catId), (faq) => {
                        return openBlock(), createElementBlock("div", {
                          key: faq.id,
                          class: "bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                        }, [
                          createBaseVNode("button", {
                            onClick: ($event) => $setup.toggleAccordion(faq.id),
                            class: "w-full flex items-center justify-between p-4 text-left group"
                          }, [
                            createBaseVNode(
                              "span",
                              _hoisted_29,
                              toDisplayString(faq.question),
                              1
                              /* TEXT */
                            ),
                            createBaseVNode(
                              "div",
                              {
                                class: normalizeClass([
                                  "w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0",
                                  $setup.itemsOpen[faq.id] ? "bg-blue-50 text-blue-600 rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                                ])
                              },
                              [..._cache[11] || (_cache[11] = [
                                createBaseVNode(
                                  "svg",
                                  {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "w-4 h-4",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    "stroke-width": "2.5",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  },
                                  [
                                    createBaseVNode("polyline", { points: "6 9 12 15 18 9" })
                                  ],
                                  -1
                                  /* CACHED */
                                )
                              ])],
                              2
                              /* CLASS */
                            )
                          ], 8, _hoisted_28),
                          withDirectives(createBaseVNode(
                            "div",
                            _hoisted_30,
                            [
                              _cache[12] || (_cache[12] = createBaseVNode(
                                "div",
                                { class: "h-px bg-gray-50 mb-3" },
                                null,
                                -1
                                /* CACHED */
                              )),
                              createBaseVNode("div", _hoisted_31, [
                                (openBlock(true), createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(faq.answer.split(". ").filter((s) => s.trim()), (p2, i) => {
                                    return openBlock(), createElementBlock(
                                      "p",
                                      {
                                        key: i,
                                        class: "text-sm text-gray-500 leading-relaxed font-normal"
                                      },
                                      toDisplayString(p2.endsWith(".") ? p2 : p2 + "."),
                                      1
                                      /* TEXT */
                                    );
                                  }),
                                  128
                                  /* KEYED_FRAGMENT */
                                ))
                              ])
                            ],
                            512
                            /* NEED_PATCH */
                          ), [
                            [vShow, $setup.itemsOpen[faq.id]]
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ]))
        ],
        512
        /* NEED_PATCH */
      ), [
        [vShow, $setup.currentTab === "faqs"]
      ]),
      createCommentVNode(" Tips Tab "),
      withDirectives(createBaseVNode(
        "div",
        _hoisted_322,
        [
          _cache[16] || (_cache[16] = createBaseVNode(
            "div",
            { class: "bg-white rounded-xl p-6 border border-gray-100 text-center mb-2" },
            [
              createBaseVNode("h3", { class: "text-sm font-bold text-gray-900" }, "Security Tips"),
              createBaseVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Quick wins to level up your digital security.")
            ],
            -1
            /* CACHED */
          )),
          createBaseVNode("div", _hoisted_332, [
            (openBlock(true), createElementBlock(
              Fragment,
              null,
              renderList($setup.orderedTips, (tip) => {
                return openBlock(), createElementBlock("div", {
                  key: tip.id,
                  class: "bg-white p-4 rounded-xl border border-gray-100 hover:border-emerald-100 transition-all group shadow-sm"
                }, [
                  createBaseVNode("div", _hoisted_342, [
                    createBaseVNode(
                      "div",
                      {
                        class: normalizeClass([
                          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                          tip.priority === "high" ? "bg-orange-50 text-orange-600" : "bg-emerald-50 text-emerald-600"
                        ])
                      },
                      [
                        tip.priority === "high" ? (openBlock(), createElementBlock("svg", _hoisted_35, [..._cache[14] || (_cache[14] = [
                          createBaseVNode(
                            "path",
                            { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
                            null,
                            -1
                            /* CACHED */
                          ),
                          createBaseVNode(
                            "line",
                            {
                              x1: "12",
                              y1: "9",
                              x2: "12",
                              y2: "13"
                            },
                            null,
                            -1
                            /* CACHED */
                          ),
                          createBaseVNode(
                            "line",
                            {
                              x1: "12",
                              y1: "17",
                              x2: "12.01",
                              y2: "17"
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])])) : (openBlock(), createElementBlock("svg", _hoisted_36, [..._cache[15] || (_cache[15] = [
                          createBaseVNode(
                            "circle",
                            {
                              cx: "12",
                              cy: "12",
                              r: "10"
                            },
                            null,
                            -1
                            /* CACHED */
                          ),
                          createBaseVNode(
                            "line",
                            {
                              x1: "12",
                              y1: "16",
                              x2: "12",
                              y2: "12"
                            },
                            null,
                            -1
                            /* CACHED */
                          ),
                          createBaseVNode(
                            "line",
                            {
                              x1: "12",
                              y1: "8",
                              x2: "12.01",
                              y2: "8"
                            },
                            null,
                            -1
                            /* CACHED */
                          )
                        ])]))
                      ],
                      2
                      /* CLASS */
                    ),
                    createBaseVNode("div", _hoisted_37, [
                      createBaseVNode("div", _hoisted_38, [
                        createBaseVNode(
                          "span",
                          {
                            class: normalizeClass([
                              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                              tip.priority === "high" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
                            ])
                          },
                          toDisplayString(tip.priority) + " priority ",
                          3
                          /* TEXT, CLASS */
                        )
                      ]),
                      createBaseVNode(
                        "p",
                        _hoisted_39,
                        toDisplayString(tip.text),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ],
        512
        /* NEED_PATCH */
      ), [
        [vShow, $setup.currentTab === "tips"]
      ])
    ]),
    _cache[17] || (_cache[17] = createStaticVNode('<footer class="px-4 py-4 text-center text-[10px] text-gray-400 bg-gray-50/80 backdrop-blur-sm border-t border-gray-100/50" data-v-ea994a51><p class="pb-1.5 font-medium" data-v-ea994a51>Made with \u2764\uFE0F by <a class="text-blue-500 hover:text-blue-600 transition-colors" href="https://nickcotterill.co.uk" target="_blank" data-v-ea994a51>Nick Cotterill</a></p><p data-v-ea994a51>Data sourced from <a class="text-blue-500 hover:text-blue-600 transition-colors" href="https://2fa.directory/gb/" target="_blank" data-v-ea994a51>2FA Directory</a> by <a class="text-blue-500 hover:text-blue-600 transition-colors" href="https://2factorauth-org.pages.dev/" target="_blank" data-v-ea994a51>2factorauth</a></p></footer>', 1))
  ]);
}

// src/App.vue
App_default.render = render5;
App_default.__file = "src/App.vue";
App_default.__scopeId = "data-v-ea994a51";
var App_default2 = App_default;

// src/ui.js
var app = createApp(App_default2);
app.mount("#app");
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.5.25
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/reactivity/dist/reactivity.esm-bundler.js:
  (**
  * @vue/reactivity v3.5.25
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/runtime-core/dist/runtime-core.esm-bundler.js:
  (**
  * @vue/runtime-core v3.5.25
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

@vue/runtime-dom/dist/runtime-dom.esm-bundler.js:
  (**
  * @vue/runtime-dom v3.5.25
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)

vue/dist/vue.runtime.esm-bundler.js:
  (**
  * vue v3.5.25
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
