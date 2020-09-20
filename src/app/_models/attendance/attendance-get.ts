import { DayOfWeek } from 'src/app/_enums/DayOfWeek';
import { LessonNumber } from 'src/app/_enums/LessonNumber';

export class AttendanceGet {
    
        courseName: string;
        date: string;
        dayOfWeek: DayOfWeek;
        lessonNumber: LessonNumber;
        wasPresent: boolean;
      
}