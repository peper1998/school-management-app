import { Component, OnInit } from '@angular/core';
import { Attendance  } from 'src/app/_models/attendance/attendance.model';
import { AttendanceService } from 'src/app/_services/attendance/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  headElements = ['Nr', 'Lekcja', 'Data', 'Obecność'];

  attendanceList: Attendance[];

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit() {
    this.attendanceService.getAttendance().subscribe(attendance => {
      this.attendanceList = attendance;
    });
  }


  getAttendance(bool: boolean): string {
    if(bool){
      return 'Obecny';
    } else{
      return 'Nieobecny';
    }
  }

}
