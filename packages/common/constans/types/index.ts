type Override<S, O, SK extends keyof S = keyof S, OK extends keyof O = keyof O> = { [k in SK]: k extends OK ? O[k] : S[k] };

export type MatchingVoid<TRecord, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends void ? K : never) ? K : never;

interface OverriddenMethods<
  TEventRecord,
  EventVK extends MatchingVoid<TEventRecord> = MatchingVoid<TEventRecord>,
  EventNVK extends Exclude<keyof TEventRecord, EventVK> = Exclude<keyof TEventRecord, EventVK>,
> {
  addListener: (<P extends EventVK, T>(this: T, event: P, listener: () => boolean | void) => T) &
    (<P extends EventNVK, T>(this: T, event: P, listener: (data: TEventRecord[P]) => boolean | void) => T);

  addListeners: <P extends keyof TEventRecord, T>(
    this: T,
    record: {
      [k in P]: k extends EventVK ? (() => boolean | void) | undefined : ((data: TEventRecord[k]) => boolean | void | Promise<void>) | undefined;
    },
  ) => T;

  emit: (<P extends EventNVK, T>(this: T, event: P, payload: TEventRecord[P]) => T) &
    (<P extends EventVK, T>(this: T, event: P) => T) &
    (<P extends keyof TEventRecord, T>(this: T, event: P, payload: TEventRecord[P]) => T);
}

export type TypedEventEmitter<Emitter, Record> = Override<Emitter, OverriddenMethods<Record>>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends string | boolean | number | symbol ? T[P] : DeepPartial<T[P]>;
};
export type EmptyObject = Record<string | number | symbol, never>;

/**
 * ArrayItem<number[] | string> => number | string
 */
export type ArrayItem<T> = T extends unknown[] ? (T extends (infer R)[] ? R : never) : T;

export type TypeEqual<T, S> = [T] extends [S] ? ([S] extends [T] ? true : false) : false;

export type SomeKeysRequired<O, RequiredKeys extends keyof O = keyof O> = O extends {}
  ? Pick<O, Exclude<keyof O, RequiredKeys>> & Required<Pick<O, RequiredKeys>>
  : never;

// 匹配 T 中 Value === V 的 Key
export type MatchingKey<T, V> = keyof { [K in keyof T as T[K] extends V ? K : never]: unknown };

// 将对象的某些属性设定为可选
export type PartPartial<ObjectType extends {}, PropKeys extends keyof ObjectType> = Partial<ObjectType> &
  Pick<ObjectType, Exclude<keyof ObjectType, PropKeys>>;
