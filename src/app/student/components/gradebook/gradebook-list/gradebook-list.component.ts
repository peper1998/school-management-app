import { Component, OnInit, Input } from '@angular/core';
import { MarkCourse } from 'src/app/_models/mark/mark-course';

@Component({
  selector: 'app-gradebook-list',
  templateUrl: './gradebook-list.component.html',
  styleUrls: ['./gradebook-list.component.scss']
})
export class GradebookComponent implements OnInit {

  @Input() gridData: MarkCourse[];
  public gridView: any[];

  constructor() { }

  ngOnInit() {
    this.gridView = this.gridData;
  }

}
