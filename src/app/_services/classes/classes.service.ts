import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/_models/class/class.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class ClassesService{

    constructor(private http: HttpClient) {

    }

    getClasses():Observable<ClassModel[]>{
        return this.http.get<ClassModel[]>('https://uni-school-system.herokuapp.com/api/classes')
    }

    public addClasses(model:ClassModel) : Observable<ClassModel>
    {
        return this.http.post<ClassModel>('https://uni-school-system.herokuapp.com/api/classes',model);
    }
}
