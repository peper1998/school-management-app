import { User } from '../user';
import { EducationStage } from 'src/app/_enums/EducationStageEnum';

export class ClassModel{
    enumEducationStage: EducationStage;
    id: number;
    name: string;
    supervisor: User;
}
