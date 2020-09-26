import { UserType } from '../_enums/UserType';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    birthDate: Date;
    userType: UserType;
    userId: number;
    classId: number;
}
export class UserPutDTO {
    birthDate: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
}