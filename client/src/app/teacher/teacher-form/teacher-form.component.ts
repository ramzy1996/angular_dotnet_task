import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/service/teacher.service';

@Component({
    selector: 'app-teacher-form',
    templateUrl: './teacher-form.component.html',
    styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent {
    submitted: boolean = false
    constructor(public service: TeacherService, private toaster: ToastrService) { }

    onSubmit() {
        this.submitted = true
        if (this.service.teacherForm.valid) {
            if (this.service.teacherForm.get('id')?.value == null) {
                this.service.postTeacher().subscribe(res => {
                    console.log(res)
                    this.service.fetchTeacherList()
                    this.toaster.success("Teacher created successfully", "Create Teacher")
                    this.resetForm()
                })
            } else {
                this.service.putTeacher().subscribe(res => {
                    this.service.fetchTeacherList()
                    this.toaster.info("Teacher updated successfully", "Update Teacher")
                    this.resetForm()
                })
            }
        }
    }
    resetForm() {
        this.service.teacherForm.reset()
        this.submitted = false
    }
}
