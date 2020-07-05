import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/_models/class/class.model';
import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/_models/attendance/attendance.model';

@Injectable({
    providedIn: 'root'
  })

export class AttendanceService{

    constructor(private http: HttpClient) {

    }

    getAttendance():Observable<Attendance[]>{
        return this.http.get<Attendance[]>('https://uni-school-system.herokuapp.com/api/myAttendance')
    }
}
