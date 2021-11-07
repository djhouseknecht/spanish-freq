import { Component, Input } from '@angular/core';
import { IWord } from '../interfaces';

@Component({
  selector: 'sf-anchor-list',
  templateUrl: './anchor-list.component.html',
  styleUrls: ['./anchor-list.component.scss']
})
export class AnchorListComponent {

  @Input()
  words!: IWord[];

  @Input()
  type: 'lemma' | 'word' = 'lemma';

  addComma (word: IWord): string {
    return this.words.indexOf(word) < this.words.length - 1
      ? ', ' : '';
  }
}
