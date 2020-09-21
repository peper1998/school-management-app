import { Component, OnInit } from '@angular/core';
import { TeacherCompetitionsService } from '../_services/teacher-competitions.service';
import { CompetitionGetDTO } from '../_models/CompetitionGetDTO';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompetitionPostDTO } from '../_models/CompetitionPostDTO';
import { CompetitionParticipationGetDTO } from '../_models/CompetitionParticipationGetDTO';
import { StudentGet } from 'src/app/_models/students/student-get';
import { CompetitionParticipationPostDTO } from '../_models/CompetitionParticipationPostDTO';
const createFormGroup = dataItem => new FormGroup({
  'name': new FormControl(dataItem.name, Validators.required),
  'description': new FormControl(dataItem.description, Validators.compose([Validators.required]))
});
const createFormGroupAssignment = dataItem => new FormGroup({
  'id': new FormControl(dataItem.userId),
  'description': new FormControl(dataItem.descriptionCompetition)
});
@Component({
  selector: 'app-teacher-competitions',
  templateUrl: './teacher-competitions.component.html',
  styleUrls: ['./teacher-competitions.component.scss']
})
export class TeacherCompetitionsComponent implements OnInit {

  constructor(private teacherCompetitionsService:TeacherCompetitionsService) {
    this.formGroupAssignment = new FormGroup({
      'id': new FormControl(),
      'descriptionCompetition': new FormControl()});
   }
  public editedRowIndex: number;
  public formGroupCompetition: FormGroup;
  public formGroupAssignment: FormGroup;
  competitionGetDTO:CompetitionGetDTO[];
  competitionParticipationGetDTO:CompetitionParticipationGetDTO[];
  studentsAssignedToCompetition:CompetitionParticipationGetDTO[];
  currentlyEditing:boolean;
  currentlyEditingCompetitionId:number;
  selectedCompetition:CompetitionGetDTO;
  srudentsList:StudentGet[];
  ngOnInit() {
    this.currentlyEditing= false;
    this.getAllSrudents();
    this.getAllCompetitions();
  }
  getAllSrudents() {
    this.teacherCompetitionsService.getSrudents().subscribe(res=> { 
      console.log(res);
      this.srudentsList = res;
      this.srudentsList.forEach(e=> e.displayName = e.firstName + " " + e.lastName);
    }, error=> { alert("couldnt fetch students list")});
  }
  getAllCompetitions() {
    this.teacherCompetitionsService.getTeacherCompetitions().subscribe(res=>{
      this.competitionGetDTO=res;
      this.teacherCompetitionsService.getAllStudentAssignmentsToCompetitions().subscribe(res=>{
        this.competitionParticipationGetDTO = res;
        this.competitionGetDTO.forEach(e=> {
          e.amountOfStudentsAssigned = 0;
          this.competitionParticipationGetDTO.forEach(a=> {
            if(a.competitionId == e.id) e.amountOfStudentsAssigned++;
          })
        })
      })
    }, error=> alert("Couldnt fetch all competitions"));
  }
  selectCompetition(event:any){
    if(event.selectedRows?.length>0&&!this.currentlyEditing) {
      this.selectedCompetition = event.selectedRows[0].dataItem;
      this.teacherCompetitionsService.getStudentsAssignedToCompetition(this.selectedCompetition.id).subscribe(res=> {
        this.studentsAssignedToCompetition = res;  
        this.studentsAssignedToCompetition.forEach(e=> { 
          e.displayName = e.studentFirstName + " " + e.studentLastName
             })     
      }, error=>alert("Couldnt fetch student competition assignement"))
      console.log(this.selectedCompetition);
    }
    else {  
      this.selectedCompetition = null;
    }
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
    console.log(dataItem.id);
    this.teacherCompetitionsService.deleteCompetition(dataItem.id).subscribe(res => {
        console.log(res);
        this.reflesh();
    }, error=>{ alert("xDDD")})
  }
  public editHandlerCompetition({ sender, rowIndex, dataItem }) {
    this.currentlyEditing = true;
    this.closeEditorCompetition(sender);
    this.formGroupCompetition = new FormGroup({
      'name': new FormControl(dataItem.name, [Validators.required, Validators.minLength(3)]),
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
    if(this.selectedCompetition){
    this.teacherCompetitionsService.getStudentsAssignedToCompetition(this.selectedCompetition.id).subscribe(res=> {
      this.studentsAssignedToCompetition = res;   
      this.studentsAssignedToCompetition.forEach(e=> { 
        e.displayName = e.studentFirstName + " " + e.studentLastName
           })         
    }, error=>alert("Couldnt fetch student competition assignement"))}
    console.log(this.selectedCompetition);
  }
  public cancelHandlerCompetition({ sender, rowIndex }) {
    this.currentlyEditing = false;
    this.closeEditorCompetition(sender, rowIndex);
  }
  public saveHandlerCompetition({ sender, rowIndex, formGroup, isNew, dataItem }) {
    this.currentlyEditing = false;
    var competitionPostDTO = new CompetitionPostDTO();
    competitionPostDTO.description = formGroup.get("description").value;
    competitionPostDTO.name = formGroup.get("name").value;
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


  public removeHandler({ dataItem, rowIndex }) {
    console.log(dataItem.id);
    this.teacherCompetitionsService.deassignStudentToComptetition(dataItem.id).subscribe(res => {
        console.log(res);
        this.reflesh();
    }, error=>{ alert("xDDD")})
  }
  public addHandler({ sender }) {
    console.log("tutaj sie wywoluje, a przynajmniej staram");
    this.currentlyEditing = true;
    this.closeEditor(sender);
    this.formGroupAssignment = createFormGroupAssignment({
      'id': '',
      'description': '',
    })
    sender.addRow(this.formGroupAssignment);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew, dataItem }) {
    this.currentlyEditing = false;
    var competitionPostDTO = new CompetitionParticipationPostDTO();
    competitionPostDTO.competitionId =this.selectedCompetition.id;
    competitionPostDTO.description = formGroup.get("description").value;
    competitionPostDTO.studentId = formGroup.get("id").value;
    console.log(competitionPostDTO);
    if (isNew) {
      this.teacherCompetitionsService.assignStudentToComptetition(competitionPostDTO).subscribe(comp => {
        console.log(comp);
        this.reflesh();
      });
    }
    this.closeEditor(sender);
    sender.closeRow(rowIndex);
  }
  
  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    console.log(this.editedRowIndex);
    this.editedRowIndex = undefined;
    //this.formGroupAssignment = undefined;
  }

  public cancelHandler({ sender, rowIndex }) {
    this.currentlyEditing = false;
    this.closeEditor(sender, rowIndex);
  }
}
