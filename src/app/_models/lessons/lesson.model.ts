import { DayOfWeek } from 'src/app/_enums/DayOfWeek';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { ClassModel } from '../class/class.model';
import { TeacherCourseLinkingModel } from '../courses/teacher-course-linking.model';

 export class Lesson
 {
     id:number;
     dayOfWeek:DayOfWeek;
     lessonNumber: LessonNumber;
     entityClass: ClassModel;
     teacherCourse:TeacherCourseLinkingModel;
 }