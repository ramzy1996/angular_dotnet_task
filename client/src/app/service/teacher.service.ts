import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher.model';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TeacherService {
    list: Teacher[] = []
    loading = false
    readonly baseURL = 'http://localhost:5134/api/teacher'
    constructor(private fb: FormBuilder, private http: HttpClient) { }
    teacherForm = this.fb.group({
        id: [null],
        teacherName: ['', Validators.required]
    })
    fetchTeacherList() {
        this.loading = true
        return this.http.get(this.baseURL)
            .pipe(catchError(this.handleError))
            .subscribe(data => {
                this.list = data as Teacher[]
                this.loading = false
                console.log(data)
            })
    }
    postTeacher() {
        debugger
        return this.http.post(this.baseURL, this.teacherForm.value)
            .pipe(catchError(this.handleError))
    }
    putTeacher() {
        return this.http.put(this.baseURL + '/' + this.teacherForm.get('id')?.value, this.teacherForm.value)
            .pipe(catchError(this.handleError))
    }

    deleteTeacher(id: string) {
        return this.http.delete(this.baseURL + '/' + id)
            .pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something happened; please try again later...'));
    }
}
