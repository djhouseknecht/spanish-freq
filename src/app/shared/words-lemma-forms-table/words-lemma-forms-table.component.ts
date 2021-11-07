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

  @Input()
  set words (words: IWordSchema[]) {
    this._words = words;
    console.log('setting words inside ')
    this.ngAfterViewInit();
  }

  get words(): IWordSchema[] {
    return this._words;
  }

  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<IWordSchema>;
  displayedColumns: Array<keyof IWordSchema> = ['rank', 'word', 'occurrences', 'lemma_forms'];

  private _words!: IWordSchema[];
  ngAfterViewInit () {
    this.dataSource = new MatTableDataSource(this.words);
    this.dataSource.sort = this.sort;
  }
}
