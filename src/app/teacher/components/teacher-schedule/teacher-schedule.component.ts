import { Component, OnInit } from '@angular/core';
import { sampleData, displayDate,sampleDataWithResources} from './events-utc';
import { SchedulerEvent, SchedulerModule, CreateFormGroupArgs, MonthDaySlotTemplateDirective } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { DayOfWeek } from 'src/app/_enums/DayOfWeek';
import { Day } from '@progress/kendo-date-math/dist/npm/day.enum';
@Component({
  selector: 'app-teacher-schedule',
  // templateUrl: './teacher-schedule.component.html',
  // [kendoSchedulerReactiveEditing]="createFormGroup"
  //workWeekStart="1" //workWeekEnd="5"
  template: `
    <kendo-scheduler [kendoSchedulerBinding]="events" 
                     [kendoSchedulerReactiveEditing]="createFormGroup" 
                     [selectedDate]="selectedDate"
                     scrollTime="08:00"
                     [resources]="resources"
                     [group]="group"
                     style="height: 600px;"
                     editable="true"

                     >
            <!-- <kendo-scheduler-day-view showWorkHours="true"                      startTime="08:00"
                     endTime="18:00" slotDuration="45">
            </kendo-scheduler-day-view> -->
            <kendo-scheduler-work-week-view showWorkHours="true"     slotDuration="60"   slotDivisions=4 startTime="08:00" 
                     endTime="18:00">
            </kendo-scheduler-work-week-view>
            <!-- <kendo-scheduler-work-week-view 
                     >

            </kendo-scheduler-work-week-view> -->
            
            <!-- <kendo-scheduler-month-view>
            </kendo-scheduler-month-view>

            <kendo-scheduler-timeline-view>
            </kendo-scheduler-timeline-view>

            <kendo-scheduler-agenda-view>
            </kendo-scheduler-agenda-view> -->
        </kendo-scheduler>
    `,
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent implements OnInit {
 // public selectedDate: Date = displayDate;
public selectedDate: Date;
// public events: SchedulerEvent[] = sampleDataWithResources;
 public formGroup: FormGroup;
  public events: SchedulerEvent[] =[
    {
      id:1,
      title: "xD",
      start: new Date('2020-07-07T16:00:00'),
      end: new Date('2020-07-07T17:00:00')
    }];
  constructor(private formBuilder: FormBuilder) { 
    this.createFormGroup = this.createFormGroup.bind(this);
  }
  // "TaskID": 119,
  // "OwnerID": 3,
  // "Title": "Helpdesk weekly meeting",
  // "Description": "",
  // "StartTimezone": null,
  // "Start": "2013-06-05T15:00:00.000Z",
  // "End": "2013-06-05T16:00:00.000Z",
  // "EndTimezone": null,
  // "RecurrenceRule": "FREQ=WEEKLY;BYDAY=WE",
  // "RecurrenceID": null,
  // "RecurrenceException": null,
  // "IsAllDay": false
  ngOnInit() {
     this.selectedDate = new Date('2020-07-06T17:03:00');
    
  }
  funkcyjka()
  {
    console.log("AHA!")
  }
  public resources: any[] = [{
    name: 'Rooms',
    data: [
        { text: 'Meeting Room 101', value: 1, color: '#6eb3fa' },
        { text: 'Meeting Room 201', value: 2, color: '#f58a8a' }
    ],
    field: 'roomId',
    valueField: 'value',
    textField: 'text',
    colorField: 'color'
}, {
    name: 'Attendees',
    data: [
        { text: 'Alex', value: 1, color: '#f8a398' },
        { text: 'Bob', value: 2, color: '#51a0ed' },
        { text: 'Charlie', value: 3, color: '#56ca85' }
    ],
   // multiple: true,
    field: 'attendees',
    valueField: 'value',
    textField: 'text',
    colorField: 'color'
}];
public group: any = {
  //resources: ['Attendees','Rooms'],
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
      'attendees': [ dataItem.attendees ]
  }, {
      validator: this.startEndValidator
  });

  return this.formGroup;
}

public getNextId(): number {
  const len = this.events.length;

  return (len === 0) ? 1 : this.events[this.events.length - 1].id + 1;
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
