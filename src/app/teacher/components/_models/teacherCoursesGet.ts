import { course } from './course'
import { UserType } from 'src/app/_enums/UserType';

export class teachersCoursesGet {
    
       course:course;
          id: Number;
          teacher: {
            birthDate: String;
            classId: Number;
            firstName: String;
            id: Number;
            lastName: String;
            login: String,
            userType: UserType
          }   
}