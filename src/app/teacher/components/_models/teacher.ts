import { UserType } from 'src/app/_enums/UserType';

export class teacher
{
    id: number;
    login: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    userType: UserType
}