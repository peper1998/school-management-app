import { UserType } from 'src/app/_enums/UserType';

export class ConversationGet {
    
          answerText: string;
          owner: owner;
}
export class owner { 
        firstName: string
        id: number;
        lastName: string;
        userType: UserType;
}