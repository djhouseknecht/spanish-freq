import { Component, Input } from '@angular/core';
import { IWord } from '../interfaces';

@Component({
  selector: 'sf-word-links',
  styles:  [`
    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 6px;
    }
    a {
      margin-bottom: 6px;
    }
  `],
  template: `
    <div *ngIf="word" class="definitions">
      <h3>Definitions</h3>
      <a href="{{word.spanish_dict_href}}" target="_blank" rel="noopener noreferrer" style="margin-right: 24px;">SpanishDict.com</a>
      <a href="{{word.wiktionary_href}}" target="_blank" rel="noopener noreferrer">Wiktionary.org</a>
    </div>
  `,
})
export class WordLinksComponent {
  @Input() word!: IWord;
}
