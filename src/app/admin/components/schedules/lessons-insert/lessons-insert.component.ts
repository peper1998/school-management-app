import { WeekDay } from "@angular/common";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { ClassModel } from "src/app/_models/class/class.model";
import { TeacherCourseLinkingModel } from "src/app/_models/courses/teacher-course-linking.model";
import { Lesson } from "src/app/_models/lessons/lesson.model";
import { LessonPostDTO } from "src/app/_models/lessons/lessonPost.model";
import { LessonsService } from "src/app/_services/lessons/lessons.service";

@Component({
  selector: 'app-lessons-insert',
  templateUrl: './lessons-insert.component.html',
  styleUrls: ['./lessons-insert.component.scss']
})
export class LessonsInsertComponent {

  @Input() classesList: ClassModel[];
  @Input() teacherCoursesList: TeacherCourseLinkingModel[];

  selectedClassId: number;

  weekDays: Array<{ text: string, value: WeekDay }> = [
    { text: 'Poniedziałek', value: WeekDay.Monday },
    { text: 'Wtorek', value: WeekDay.Tuesday },
    { text: 'Środa', value: WeekDay.Wednesday },
    { text: 'Czwartek', value: WeekDay.Thursday },
    { text: 'Piątek', value: WeekDay.Friday }
  ];

  lessonNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  classLessons: Lesson[];
  classLessonsInDay: Lesson[];
  currentClassId: number;
  currentDayOfWeek: string;
  currentLessonNumber: string;
  currentTeacherCourse: number;

  dropdownValueChanged(schoolClass: ClassModel) {
    this.currentClassId = schoolClass.id;
    this.lessonsService.getClassLessons(schoolClass.id).subscribe(lessons => {
      this.classLessons = lessons;
    });
    this.selectedClassId = schoolClass.id;
  }

  teacherCourseDropdownValueChanged(teacherCourse: any) {
    this.currentTeacherCourse = teacherCourse.id;
  }

  lessonNumberValueChanged(lessonNumber: number) {
    this.currentLessonNumber = this.getLessonNumberText(lessonNumber);
  }

  weekDayValueChanged(day: any) {
    const weekDay = this.getDayOfWeekEnumText(day.value);
    this.currentDayOfWeek = weekDay;
    if (this.classLessons) {
      this.classLessonsInDay = this.classLessons.filter(lesson => lesson.dayOfWeek.toString() === weekDay);
    }
  }
  removeHandler({ dataItem }) {
    console.log(dataItem);
    this.lessonsService.deleteLesson(dataItem.id).subscribe(res => {
      this.lessonsService.getClassLessons(this.currentClassId).subscribe(response => {
        this.classLessons = null;
        this.classLessons = response;
        this.classLessonsInDay = this.classLessons.filter(lesson => lesson.dayOfWeek.toString() === this.currentDayOfWeek);
        this.cdr.detectChanges();
      })
    }), error => {
      console.log(error);
      this.lessonsService.getClassLessons(this.currentClassId).subscribe(response => {
        this.classLessons = null;
        this.classLessons = response;
        this.classLessonsInDay = this.classLessons.filter(lesson => lesson.dayOfWeek.toString() === this.currentDayOfWeek);
        this.cdr.detectChanges();
      })
    };
  }

  addLesson() {
    const postModel = new LessonPostDTO();
    postModel.dayOfWeek = this.currentDayOfWeek;
    postModel.entityClassId = this.currentClassId;
    postModel.lessonNumber = this.currentLessonNumber;
    postModel.teacherCourseId = this.currentTeacherCourse;
    this.lessonsService.addLesson(postModel).subscribe(res => {
      this.lessonsService.getClassLessons(this.currentClassId).subscribe(resp => {
        this.classLessons = null;
        this.classLessons = resp;
        this.classLessonsInDay = this.classLessons.filter(lesson => lesson.dayOfWeek.toString() === this.currentDayOfWeek);
      })
    },err=>{
      const error = err.error as string;
      if(error.includes('is already lesson at this time'))
      {
        alert('Lekcja w tym czasie już istnieje');
      }else if(error.includes('is not available in given day and lesson'))
      {
        alert('Nauczyciel jest zajęty o tej porze');
      }else{
        alert('Nastąpił niespodziewany błąd');
      }
      console.log(err);
    });
  }
  invalid(){
    if(this.currentDayOfWeek && this.currentClassId && this.currentLessonNumber && this.currentTeacherCourse)
    {
      return false;
    }
    return true;
  }

  private getLessonNumberText(lessonNumber: number): string {
    switch (lessonNumber) {
      case 1: {
        return 'FIRST';
      }
      case 2: {
        return 'SECOND';
      }
      case 3: {
        return 'THIRD';
      }
      case 4: {
        return 'FOURTH';
      }
      case 5: {
        return 'FIFTH';
      }
      case 6: {
        return 'SIXTH';
      }
      case 7: {
        return 'SEVENTH';
      }
      case 8: {
        return 'EIGHTH';
      }
      case 9: {
        return 'NINTH';
      }
      default: {
        return 'ERROR';
      }
    }
  }

  private getLessonNumber(lesson:string){
    switch (lesson) {
      case 'FIRST': {
        return 1;
      }
      case 'SECOND': {
        return 2;
      }
      case 'THIRD': {
        return 3;
      }
      case 'FOURTH': {
        return 4;
      }
      case 'FIFTH': {
        return 5;
      }
      case 'SIXTH': {
        return 6;
      }
      case 'SEVENTH': {
        return 7;
      }
      case 'EIGHTH': {
        return 8;
      }
      case 'NINTH': {
        return 9;
      }
      default: {
        return 'ERROR';
      }
    }
  }

  private getDayOfWeekEnumText(day: number): string {
    switch (day) {
      case 1: {
        return 'MONDAY';
      }
      case 2: {
        return 'TUESDAY';
      }
      case 3: {
        return 'WEDNESDAY';
      }
      case 4: {
        return 'THURSDAY';
      }
      case 1: {
        return 'FRIDAY';
      }
      default: {
        return 'empty'
      }
    }
  }

  constructor(private lessonsService: LessonsService,
              private cdr:ChangeDetectorRef) { }


}
