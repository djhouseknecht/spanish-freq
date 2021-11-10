import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationHistoryService {
  private history: string[] = [];
  private _hasBack$ = new BehaviorSubject(false);

  hasBack$ = this._hasBack$.asObservable().pipe(distinctUntilChanged());

  constructor (private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
        this.emit();
      }
    });
  }

  back (): void {
    /* this top route will always be the current route */
    this.history.pop();
    if (this.history?.length > 0) {
      this.location.back();
      /* once we routed again, we need to reduce the list because we just went back */
      this.history.pop();
      this.emit();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  emit () {
    this._hasBack$.next(this.history.length > 1);
  }
}
