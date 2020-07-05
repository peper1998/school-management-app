import { EducationStage } from 'src/app/_enums/EducationStageEnum';
import { supervisor } from './supervisor';

export class entityClass
{
    id:number;
    name: string;
    enumEducationStage: EducationStage
    supervisor: supervisor;
}