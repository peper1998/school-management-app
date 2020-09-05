import { Component, OnInit } from '@angular/core';
import { TeacherCompetitionsService } from '../_services/teacher-competitions.service';
import { CompetitionGetDTO } from '../_models/CompetitionGetDTO';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompetitionPostDTO } from '../_models/CompetitionPostDTO';
const createFormGroup = dataItem => new FormGroup({
  'name': new FormControl(dataItem.name, Validators.required),
  'description': new FormControl(dataItem.description, Validators.compose([Validators.required]))
});
@Component({
  selector: 'app-teacher-competitions',
  templateUrl: './teacher-competitions.component.html',
  styleUrls: ['./teacher-competitions.component.scss']
})
export class TeacherCompetitionsComponent implements OnInit {

  constructor(private teacherCompetitionsService:TeacherCompetitionsService) { }
  public editedRowIndex: number;
  public formGroupCompetition: FormGroup;
  competitionGetDTO:CompetitionGetDTO[];
  selectedCompetition:number;
  currentlyEditing:boolean;
  currentlyEditingCompetitionId:number;
  ngOnInit() {
    this.currentlyEditing= false;
    this.getAllCompetitions();
  }
  getAllCompetitions() {
    this.teacherCompetitionsService.getTeacherCompetitions().subscribe(res=>{
      this.competitionGetDTO=res;
    }, error=> alert("Couldnt fetch all competitions"));
  }
  selectCompetition(value: any){
  }
  addNewCompetition(){
  }

  private closeEditorCompetition(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    console.log(this.editedRowIndex);
    this.editedRowIndex = undefined;
    this.formGroupCompetition = undefined;
  }
  public removeHandlerCompetition({ dataItem, rowIndex }) {
    // this.teacherMarksService.deleteMark(dataItem.id).subscribe(resp => {
    //   console.log(resp);
    // });
    // this.reflesh();
  }
  public editHandlerCompetition({ sender, rowIndex, dataItem }) {
    this.currentlyEditing = true;
    this.closeEditorCompetition(sender);
    this.formGroupCompetition = new FormGroup({
      'name': new FormControl(dataItem.grade),
      'description': new FormControl(dataItem.description, [Validators.required, Validators.minLength(3)]),
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroupCompetition);
  }
  public addHandlerCompetition({ sender }) {
    this.currentlyEditing = true;
    this.closeEditorCompetition(sender);
    this.formGroupCompetition = createFormGroup({
      'name': '',
      'description': '',
    })
    sender.addRow(this.formGroupCompetition);
  }
  reflesh(){
    this.getAllCompetitions();
  }
  public cancelHandlerCompetition({ sender, rowIndex }) {
    this.currentlyEditing = false;
    this.closeEditorCompetition(sender, rowIndex);
  }
  public saveHandlerCompetition({ sender, rowIndex, formGroup, isNew, dataItem }) {
    this.currentlyEditing = false;
    var competitionPostDTO = new CompetitionPostDTO();
    competitionPostDTO.description = formGroup.get("description").value;
    competitionPostDTO.name = formGroup.get("description").value;
    if (isNew) {
      this.teacherCompetitionsService.postNewCompetition(competitionPostDTO).subscribe(comp => {
        console.log(comp);
        this.reflesh();
      });
    } else {
      this.teacherCompetitionsService.editCompetition(competitionPostDTO, dataItem.id).subscribe(course => {  
        console.log(course);
        this.reflesh();
      });;
    }
    
    this.closeEditorCompetition(sender);
    sender.closeRow(rowIndex);
  }
}
