import { DayOfWeek } from 'src/app/_enums/DayOfWeek';
import { LessonNumber } from 'src/app/_enums/LessonNumber';
import { Teacher } from 'src/app/_models/teachers/teacher.model';
import { teacher } from './teacher';
import { teacherCourse } from './teacherCourse';
import { entityClass } from './entityClass';

export class teacherLessonsGet
{
    id:number;
    dayOfWeek: DayOfWeek;
    lessonNumber:LessonNumber;
    teacherCourse:teacherCourse;
    entityClass:entityClass;
}