// see: https://github.com/Microsoft/TypeScript/issues/3402#issuecomment-385975990
export type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};

export type PopArray<T> = T extends unknown[] ? T : never;

export type RemoveNull<T> = T extends null ? never : T;

export type RemoveUndefined<T> = T extends undefined ? never : T;
