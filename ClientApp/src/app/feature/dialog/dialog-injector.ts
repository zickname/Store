import {
  InjectFlags,
  InjectionToken,
  InjectOptions,
  Injector, ProviderToken,
  Type
} from "@angular/core";

export class DialogInjector implements Injector {
  constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) {}

  get<T>(token: ProviderToken<T>, notFoundValue?: T, options?: InjectOptions | InjectFlags): T {
    const value = this._additionalTokens.get(token);

    if (value) return value;

    return this._parentInjector.get<any>(token, notFoundValue);
  }
}
