import { Component, Input, OnInit } from '@angular/core';
import { Teacher } from 'src/app/_models/teachers/teacher.model';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {

  constructor() { }
  @Input() gridData: Teacher[];
  ngOnInit(): void {
    console.log("XDDD")
  }

}
