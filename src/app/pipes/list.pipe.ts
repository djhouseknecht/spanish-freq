import { Pipe, PipeTransform } from '@angular/core';
import { IWord } from '../shared/interfaces';

@Pipe({ name: 'list' })
export class ListPipe implements PipeTransform {

  transform (words: IWord[], amount: 'all' | number = 2, ...args: unknown[]): string {
    const count = words.length;

    if (count === 0) {
      return '';
    } else if (amount === 'all') {
      return `${words.map(w => `"${w.word}"`).join(', ')}`
    } else if (count < 3) {
      return `${words.map(w => w.word).join(', ')}`;
    } else {
      return `[${count}]`;
    }
  }

}
