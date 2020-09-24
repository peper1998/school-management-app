import { EducationStage } from "src/app/_enums/EducationStageEnum";
import { UserType } from "src/app/_enums/UserType";

export class StudentGet {

        birthDate: string;
        firstName: string;
        id: number;
        lastName: string;
        displayName:string
        login: string;
        studentClass: {
          enumEducationStage: EducationStage,
          id: number;
          name: string;
          supervisor: {
            birthDate: string;
            classId: number;
            firstName: string;
            id: 0;
            lastName: string;
            login: string;
            userId: number;
            userType: UserType;
          };
        };
        userId: number
        userType: UserType;
        amountOfMessages:number;
        email:string;
        phoneNumber:string;
}
