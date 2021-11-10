import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/loading.service';

@Component({
  selector: 'sf-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [
    trigger('loadingNotLoading', [
      state('loading', style({
        opacity: 1,
      })),
      state('no-loading', style({
        opacity: 0.2,
        display: 'none',
      })),
      transition('loading => no-loading', [
        animate('.3s')
      ]),
      transition('no-loading => loading', [
        animate('.1s')
      ]),
    ]),
  ],
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor (private loadingService: LoadingService) { }

  ngOnInit (): void {
    this.loadingService.isLoading$
      .subscribe(loading => this.isLoading = loading);

    // timer(900).pipe(
    //   this.loadingService.startLoading('haya'),
    //   switchMap(() => timer(3000)),
    //   this.loadingService.stopLoading('haya'),
    // ).subscribe()
  }
}
