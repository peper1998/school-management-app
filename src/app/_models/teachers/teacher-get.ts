import { UserType } from 'src/app/_enums/UserType';

export class TeacherGet {
    birthDate: string;
    firstName: string;
    id: number;
    lastName: string;
    displayName:string
    login: string;
    userId: number
    userType: UserType;
    amountOfMessages:number;
}