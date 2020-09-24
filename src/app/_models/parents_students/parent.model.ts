import { User } from "../user";


export class ParentModel extends User{

}

export class ParentCreationModel{
    id: number;
    firstName: string;
    lastName: string;
    login: string;
    birthDate: string;
    password: string;
    email:string;
    phoneNumber:string;
}
