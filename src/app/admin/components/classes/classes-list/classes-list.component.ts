import { Component, OnInit, Input } from '@angular/core';
import { ClassModel } from 'src/app/_models/class/class.model';

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.scss']
})
export class ClassesListComponent implements OnInit {

  @Input() gridData: ClassModel[];
  public gridView: any[];

  public mySelection: string[] = [];

  public ngOnInit(): void {
    this.gridView = this.gridData;
  }

}
