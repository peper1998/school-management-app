import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { sampleData, displayDate, sampleDataWithResources } from 'src/app/teacher/components/teacher-schedule/events-utc'
import { teacherLessonsGet } from 'src/app/teacher/components/_models/teacherLessonsGet';
import { TeacherScheduleServiceService } from 'src/app/teacher/components/_services/teacher-schedule-service.service';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { AttendanceGet } from 'src/app/_models/attendance/attendance-get';
import { User } from 'src/app/_models/user';

class parseData {
  id:number;
  start:Date;
  end:Date;
  title:string;
  RecurrenceRule:string;
  attendance:string;
  description:string;
}
@Component({
  selector: 'app-attendance',
  template: `
  <kendo-scheduler [kendoSchedulerBinding]="events" 
                   [kendoSchedulerReactiveEditing]="createFormGroup" 
                   [selectedDate]="selectedDate"
                   scrollTime="08:00"
                   [resources]="resources"
                   [group]="group"
                   style="height: 1000px;"
                   [editable]="false"
                   >
          <kendo-scheduler-work-week-view showWorkHours="true"     slotDuration="60"   slotDivisions=4 startTime="08:00" 
                   endTime="18:00">
          </kendo-scheduler-work-week-view>
      </kendo-scheduler>
  `,
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  public selectedDate: Date = displayDate;
  public events: SchedulerEvent[];
  public formGroup: FormGroup;
  baseData: parseData[] = new Array();
  lessonsGet: AttendanceGet[];
  idTeacher: User;
  randomId:number = 1;
  constructor(private formBuilder: FormBuilder, private teacherServiceGet: TeacherScheduleServiceService, private route: ActivatedRoute) {
    this.createFormGroup = this.createFormGroup.bind(this);   
  }
  ngOnInit() {
    this.selectedDate = new Date();
    this.selectedDate.setDate(this.selectedDate.getDate()+1);
    this.getCurrentUserId();  
    console.log(this.events);
  }
  getLessons(id: number) {
    this.teacherServiceGet.getMyAttendance().subscribe(
      (value) => {
        this.lessonsGet = value;
        console.log(this.lessonsGet);
        this.pupulateSchedulerEvents();
      },
      (error: any) => {
        alert("Nie udalo sie pobrac lekcji nauczyciela");
      }
    )
  }

  // tslint:disable-next-line: variable-name
  random_hex_color_code = () => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  };

  getIndexesAndSetColours(set:Set<String>){
    return { 
      true:1,
      false:0
    }
  }
  forEachKeyInSetDifferentColor(){

  }
  pupulateSchedulerEvents()
  { 
    var i =0;
    var a = this.lessonsGet.map(e=>{
      return e.courseName + " " + e.wasPresent;
    });
    console.log(a);
    var set = new Set(a);
    var setAndNumber = this.getIndexesAndSetColours(set);
    console.log(setAndNumber);
      for(let item of this.lessonsGet )
      {
        var lul = new parseData();
        var tmp =  item.wasPresent === true ? "Obecny":"Nieobecny" ;
        lul.title = item.courseName +" "+ tmp;
        lul.id = this.getNextId();
        var tmp = this.convertFromDayOfWeekToDate()[item.dayOfWeek];
        var tmp1 = item.lessonNumber;
        lul.attendance = item.wasPresent? 'true':'false';
        lul.start = new Date(item.date);
        lul.start.setHours(this.convertFromLessonsToHours(tmp1.toString()).hours,
        this.convertFromLessonsToHours(tmp1.toString()).StartMinutes);
        lul.end = new Date(item.date);
        lul.end.setHours(this.convertFromLessonsToHours(tmp1.toString()).hours,this.convertFromLessonsToHours(tmp1.toString()).endMinutes);
        lul.RecurrenceRule = "FREQ=WEEKLY;BYDAY=WE";
        lul.description = item.wasPresent === true ? "Obecny":"Nieobecny" ;
        this.baseData.push(lul);
      }
      this.events = this.baseData.map(dataItem=> (
        <SchedulerEvent> {
            id: dataItem.id,
            start: dataItem.start,
            end: dataItem.end,
            title: dataItem.title,
            RecurrenceRule: dataItem.RecurrenceRule,
            description: dataItem.description,
            roomId: setAndNumber[dataItem.attendance]
      }));
      console.log(this.baseData);
  }
  randomInt = (min, max): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  // FIRST = 1, SECOND = 2, THIRD = 3, FOURTH= 4, FIFTH=5, SIXTH=6, SEVENTH=7, EIGHTH=8, NINTH=9
  convertFromLessonsToHours(i: String) {
    var start = 0;
    var end = 45;
    var tmp = i as keyof typeof LessonNumber;
    var hours = 7 + LessonNumber[tmp];
    return { hours: hours, StartMinutes: start, endMinutes:end};
  }

  convertFromDayOfWeekToDate() {
    var date = new Date();
    var dayOfWeek = date.getDay();
      return {
        MONDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - dayOfWeek),
        TUESDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2 - dayOfWeek),
        WEDNESDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 3 - dayOfWeek),
        THURSDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 4 - dayOfWeek),
        FRIDAY: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5 - dayOfWeek)
      }

  }

  getCurrentUserId() {
    this.teacherServiceGet.getCurrentTeacherId().subscribe(
      (value) => {
        this.idTeacher = value;
        this.getLessons(this.idTeacher.userId);
      },
      (error) => {
        alert("Nie udalo sie pobrac id nauczyciela");
      }
    )
  }

  generateResourceData(){
    var tab= [];
    for(var i =0;i<100;i++) 
    {
      tab.push({ text: 'Klasa'+i, value: i, color: this.random_hex_color_code() });
    }
    console.log(tab);
    return tab;
  }
  public resources: any[] = [{
    name: 'Rooms',
    data: [
      { text: 'Nieobecnosc', value: 0, color: '#cc2222'},
      { text: 'Obecnosc', value: 1, color: '#5ef733' }
    ],
    field: 'roomId',
    valueField: 'value',
    textField: 'text',
    colorField: 'color'
  }
];
  public group: any = {
    orientation: 'horizontal'
  };
  public createFormGroup(args: CreateFormGroupArgs): FormGroup {
    const dataItem = args.dataItem;
    this.formGroup = this.formBuilder.group({
      'id': args.isNew ? this.getNextId() : dataItem.id,
      'start': [dataItem.start, Validators.required],
      'end': [dataItem.end, Validators.required],
      'startTimezone': [dataItem.startTimezone],
      'endTimezone': [dataItem.endTimezone],
      // 'isAllDay': dataItem.isAllDay,
      'title': dataItem.title,
      'description': dataItem.description,
      // 'recurrenceRule': dataItem.recurrenceRule,
      // 'recurrenceId': dataItem.recurrenceId,
      'roomId': dataItem.roomId,
      'attendees': [dataItem.attendees]
    }, {
      validator: this.startEndValidator
    });

    return this.formGroup;
  }
  public getNextId(): number {
    return ++this.randomId;
  }
  public startEndValidator: ValidatorFn = (fg: FormGroup) => {
    const start = fg.get('start').value;
    const end = fg.get('end').value;

    if (start !== null && end !== null && start.getTime() < end.getTime()) {
      return null;
    } else {
      return { range: 'End date must be greater than Start date' };
    }
  }

}
