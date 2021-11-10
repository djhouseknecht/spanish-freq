import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, pipe, tap, BehaviorSubject, distinctUntilChanged, switchMap, timer, mapTo, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading$ = new BehaviorSubject(false);
  private _loadingComps = new Map<string, string>();

  private get pendingRequests (): boolean {
    return !!this._loadingComps.size
  }

  isLoading$ = this._isLoading$.asObservable().pipe(
    distinctUntilChanged(),
    switchMap(loading => {
      if (loading) {
        return of(loading);
      } else {
        return timer(850).pipe(mapTo(false));
      }
    }),
  );

  constructor () { }

  startLoading<T> (comp: string): MonoTypeOperatorFunction<T> {
    return pipe(
      tap(() => this._start(comp))
    );
  }

  stopLoading<T> (comp: string): MonoTypeOperatorFunction<T> {
    return pipe(
      tap({
        next: () => this._stop(comp),
        error: () => this._stop(comp),
        complete: () => this._stop(comp)
      })
    );
  }

  private _start (comp: string) {
    this._loadingComps.set(this._random(), comp);
    this._emit();
  }

  private _stop (comp: string) {
    const compKey = [...this._loadingComps.entries()].find(([_key, value]) => {
      return value === comp
    })?.[0];

    if (!compKey) {
      return;
    }

    this._loadingComps.delete(compKey);
    this._emit();
  }

  private _emit () {
    this._isLoading$.next(this.pendingRequests);
  }

  private _random (): string {
    return `${Math.random()}`.split('.')[1];
  }
}
