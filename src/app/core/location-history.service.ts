import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { NavigationEnd, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LocationHistoryService {
  private history: string[] = [];
  constructor (private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
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
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
