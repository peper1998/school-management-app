import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { entityClass } from '../../_models/entityClass';
import { TeacherMarksService } from '../../_services/teacher-marks.service';
import { teachersCoursesGet } from '../../_models/teacherCoursesGet';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { studentDisplayGradesModel } from '../../_models/studentDisplayGradesModel';
import { StudentMarksGetDTO, StudentMarksGetDTODisplay } from '../../_models/StudentMarksGetDTO';
import { MarkPostDTO } from '../../_models/MarkPostDTO';
import { enumGrade } from '../../_models/enumGrade';
const createFormGroup = dataItem => new FormGroup({
  'description': new FormControl(dataItem.description, Validators.required),
  'grade': new FormControl(dataItem.grade, Validators.compose([Validators.required, Validators.pattern('[1-6]{1}')])),
  'lastChange': new FormControl(dataItem.lastChange)
});
@Component({
  selector: 'app-teacher-marks',
  templateUrl: './teacher-marks.component.html',
  styleUrls: ['./teacher-marks.component.scss']
})
export class TeacherMarksComponent implements OnInit {

  constructor(private teacherMarksService: TeacherMarksService) { }
  srudentSelected: boolean = false;
  selectedStudentObject: StudentMarksGetDTODisplay;
  ngOnInit(): void {
    this.teacherMarksService.getTeacherClasses().subscribe(res => {
      this.classesList = res;
      console.log(this.classesList);
    },
      () => { alert("couldnt fetch teacher classes") })
  }
  @Input() classesList: entityClass[];
  @Input() teacherCoursesList: teachersCoursesGet[];
  @Input() studentsList: studentDisplayGradesModel[];
  @Input() studentsMarkGet: StudentMarksGetDTO[];
  @Output() dataStateChanged: EventEmitter<any> = new EventEmitter()

  public formGroup: FormGroup;
  public editedRowIndex: number;
  selectedStudentRowNumber:number;
  selectedClassId: Number;
  selectedTeacherCourseId: Number;

  dropdownValueChanged(value: any) {
    this.studentsList = null;
    this.selectedStudentObject = null;
    this.selectedClassId = value.id;
    this.teacherMarksService.getTeacherCoursesOfGivenClassById(value.id).subscribe(res => {
      this.teacherCoursesList = res;
      this.teacherCoursesList.forEach(e => e.displayName = e.course.name);
    }, () => { alert("Couldnt fectch teacher courses ") })
  }

  teacherCourseDropdownValueChanged(value: any) {
    this.studentsList = null;
    this.selectedStudentObject = null;
    this.selectedTeacherCourseId = value.id;
    console.log(this.selectedTeacherCourseId);
    console.log(this.selectedClassId);
    this.teacherMarksService.getStudentsOfGivenClassById(this.selectedClassId).subscribe(res => {
      this.studentsList = res;
      this.teacherMarksService.getStudentsGrades(this.selectedClassId, this.selectedTeacherCourseId).subscribe(res => {
        this.studentsMarkGet = res;
        console.log(this.studentsMarkGet);
        this.mapGradesToString();
        this.studentsList.forEach(e => console.log(e.grades));
      }, () => { alert("Couldnt fetch student marks") })
    }, () => { alert("Couldnt fetch stundents") })
  }
  private mapGradeToStr = {
    NONE: "0",
    ONE: "1",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6"
  }
  private mapStrToGrade = {
    "0": enumGrade.NONE,
    "1": enumGrade.ONE,
    "2": enumGrade.TWO,
    "3": enumGrade.THREE,
    "4": enumGrade.FOUR,
    "5": enumGrade.FIVE,
    "6": enumGrade.SIX
  }

  selectStudent(value: any) {
    this.selectedStudentRowNumber = value.rowIndex;
    this.selectedStudentObject = <StudentMarksGetDTODisplay>this.studentsMarkGet[value.rowIndex];
    this.selectedStudentObject.grades.forEach(e => {
      e.grade = this.mapGradeToStr[e.enumGrade];
      console.log(e.grade);
    });
    console.log(this.studentsMarkGet[value.rowIndex]);
  }
  mapGradesToString() {
    let i = 0;
    var firstIteration = true;
    this.studentsMarkGet.forEach(m => {
      let gradeIndex = 0;
      m.grades.forEach(() => {
        if(firstIteration) {
          firstIteration = false;
          this.studentsList[i].grades = this.mapGradeToStr[this.studentsMarkGet[i].grades[gradeIndex].enumGrade] + ', ';
        }
        else {
          this.studentsList[i].grades += this.mapGradeToStr[this.studentsMarkGet[i].grades[gradeIndex].enumGrade] + ', ';
        }
        gradeIndex++;
      })
      firstIteration=true;
      i++;
    })
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = new FormGroup({
      'grade': new FormControl(dataItem.grade, Validators.compose([Validators.required, Validators.pattern('[1-6]{1}')])),
      'description': new FormControl(dataItem.description, [Validators.required, Validators.minLength(3)]),
    });

    this.editedRowIndex = rowIndex;
    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);

    this.formGroup = createFormGroup({
      'description': '',
      'grade': 1,
      'lastChange': new Date()
    })
    sender.addRow(this.formGroup);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew, dataItem }) {
    var markPostDTO = new MarkPostDTO();
    markPostDTO.description = formGroup.get("description").value;
    markPostDTO.enumGrade = this.mapStrToGrade[formGroup.get("grade").value];
    markPostDTO.studentId = this.selectedStudentObject.id;
    markPostDTO.teacherCourseId = this.selectedTeacherCourseId;
    if (isNew) {
      this.teacherMarksService.postNewMark(markPostDTO).subscribe(course => {
        console.log(course);
        this.dataStateChanged.emit();
      },error=>{alert("Nie mozesz dodawac ocen do przedmiotu ktorego nie uczysz")});
    } else {
      this.teacherMarksService.editMark(markPostDTO, dataItem.id).subscribe(course => {
        this.dataStateChanged.emit();
        console.log(course);
      },error=>{alert("Nie mozesz edytowac ocen do przedmiotu ktorego nie uczysz")});;
    }
    this.reflesh();
    this.closeEditor(sender);
    sender.closeRow(rowIndex);
  }
  reflesh() {
    this.teacherMarksService.getStudentsOfGivenClassById(this.selectedClassId).subscribe(res => {
      this.studentsList = res;
      this.teacherMarksService.getStudentsGrades(this.selectedClassId, this.selectedTeacherCourseId).subscribe(res => {
        this.studentsMarkGet = res;
        console.log(this.studentsMarkGet);
        this.mapGradesToString();
        this.studentsList.forEach(e => console.log(e.grades));
        this.selectedStudentObject = <StudentMarksGetDTODisplay>this.studentsMarkGet[this.selectedStudentRowNumber];
        this.selectedStudentObject.grades.forEach(e => {
          e.grade = this.mapGradeToStr[e.enumGrade];
          console.log(e.grade);
        });
      }, () => { alert("Couldnt fetch student marks") })
    }, () => { alert("Couldnt fetch stundents") })

  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    console.log(this.editedRowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public removeHandler({ dataItem, rowIndex }) {
    this.teacherMarksService.deleteMark(dataItem.id).subscribe(resp => {
      console.log(resp);
    }, error => { alert("Nie mozesz usuwac ocen przedmiotu ktorego nie uczysz")});
    this.reflesh();
  }
}
