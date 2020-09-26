import { Component, OnInit } from "@angular/core";
import { ClassModel } from "src/app/_models/class/class.model";
import { ClassesService } from "src/app/_services/classes/classes.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classesList:ClassModel[];

  constructor(private classesService: ClassesService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData()
  {
    this.classesService.getClasses().subscribe(classes => {
      console.log(classes);
      this.classesList = classes;
    });
  }

}
