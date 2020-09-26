import { Component, Input, OnInit } from '@angular/core';
import { ParentGet } from 'src/app/_models/parents/parent-get';

@Component({
  selector: 'app-parents-list',
  templateUrl: './parents-list.component.html',
  styleUrls: ['./parents-list.component.scss']
})
export class ParentsListComponent implements OnInit {

  constructor() { }
  @Input() gridData: ParentGet[];
  ngOnInit(): void {
  }

}
