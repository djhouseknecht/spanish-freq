import { Component, OnInit } from '@angular/core';
import { LocationHistoryService } from '../../core/location-history.service';

@Component({
  selector: 'sf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  hasBack = false;
  constructor (private locationHistoryService: LocationHistoryService) { }

  ngOnInit () {
    this.locationHistoryService.hasBack$
      .subscribe(hasBack => this.hasBack = hasBack);
  }

  back () {
    this.locationHistoryService.back();
  }
}
