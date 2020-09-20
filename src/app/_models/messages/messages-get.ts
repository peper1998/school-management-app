import { UserType } from 'src/app/_enums/UserType';

export class MessagesGet {
    
        id: number;
        lastAnswerDate: {
          date: Date;
          day: number;
          hours: number;
          minutes: number;
          month: number;
          nanos: number;
          seconds: number;
          time: number;
          timezoneOffset: number;
          year: number;
        };
        topicName: string
        topicText: string;
        userFirst: {
          firstName: string;
          id: number;
          lastName: string;
          userType: UserType;
        };
        userSecond: {
          firstName: string;
          id: number;
          lastName: string;
          userType: UserType;
        };
}
