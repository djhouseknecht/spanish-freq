import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/loading.service';

@Component({
  selector: 'sf-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  isLoading = false;

  constructor (private loadingService: LoadingService) { }

  ngOnInit (): void {
    this.loadingService.isLoading$
      .subscribe(loading => this.isLoading = loading);
  }
}
