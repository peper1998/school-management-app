import { DayOfWeek } from 'src/app/_enums/DayOfWeek';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { AttendanceGet } from './attendance-get';

export class AttendanceClassGet {
        attendanceList:AttendanceGet[];
        studentFirstName: string;
        studentId: number;
        studentLastName: string;
        displayName:string;
}