import { enumGrade } from './enumGrade';

export class StudentMarksGetDTO {      
          firstName: String;
          grades: [
            {
              description: String;
              enumGrade: enumGrade;
              id: Number;
              lastChange: String;
            }
          ];
          id: Number;
          lastName: String;
          login: String;   
}
export class StudentMarksGetDTODisplay {      
    firstName: String;
    grades: [
      {
        description: String;
        enumGrade: enumGrade;
        grade:string;
        id: Number;
        lastChange: String;
      }
    ];
    gradesDisplay:String
    id: Number;
    lastName: String;
    login: String;   
}