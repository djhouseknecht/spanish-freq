import { Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IWordSchema } from '../interfaces';

@Component({
  selector: 'sf-words-lemma-forms-table',
  templateUrl: './words-lemma-forms-table.component.html',
  styleUrls: ['./words-lemma-forms-table.component.scss']
})
export class WordsLemmaFormsTableComponent implements AfterViewInit {
  private _words!: IWordSchema[];

  @Input()
  set words (words: IWordSchema[]) {
    this._words = words;
    this.ngAfterViewInit();
  }

  get words (): IWordSchema[] {
    return this._words;
  }

  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<IWordSchema>;
  displayedColumns = ['rank', 'word', 'occurrences', 'lists'];

  ngAfterViewInit () {
    if (!this.dataSource){
      this.dataSource = new MatTableDataSource();
      this.dataSource.sort = this.sort;
    }

    this.dataSource.data = this.words;
  }
}
