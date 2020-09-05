export class lessonAttendaceDTO
{
    
        courseName: String;
        lessonId:Number;
        students: [
          {
            isPresent: Boolean;
            studentFirstName: String;
            studentId: Number;
            studentLastName: String;
          }
        ]
}
