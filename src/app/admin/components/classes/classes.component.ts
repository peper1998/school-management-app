import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/_services/classes/classes.service';
import { ClassModel } from 'src/app/_models/class/class.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  classesList:ClassModel[];

  constructor(private classesService: ClassesService) { }

  ngOnInit() {
    this.classesService.getClasses().subscribe(classes=>{
      console.log(classes);
      this.classesList=classes;
    })
  }

}
