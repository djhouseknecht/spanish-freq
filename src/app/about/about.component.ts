import { Component } from '@angular/core';

@Component({
  selector: 'sf-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  today = new Date();
}