import { Component } from '@angular/core';
import { LocationHistoryService } from '../../core/location-history.service';

@Component({
  selector: 'sf-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  constructor (private locationHistoryService: LocationHistoryService) { }

  back () {
    this.locationHistoryService.back();
  }

}
