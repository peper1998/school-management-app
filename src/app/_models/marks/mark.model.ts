export interface CourseMarks{
  course:string;
  grades:MarkModel[];
}
export interface MarkModel{
  id: number;
  enumGrade: string;
  description: string;
  lastChange: Date;
}
