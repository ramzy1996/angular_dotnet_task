import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../service/teacher.service';
import { ToastrService } from 'ngx-toastr';
import { Teacher } from '../model/teacher.model';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
    constructor(public service: TeacherService, private toaster: ToastrService) { }
    ngOnInit(): void {
        this.service.fetchTeacherList()
    }
    onDelete(id: any) {
        if (confirm('Are you sure to delete?')) {
            debugger
            this.service.deleteTeacher(id).subscribe(res => {
                this.service.fetchTeacherList()
                this.toaster.error("Teacher deleted successfully", "Delete Teacher")
            })
        }
    }
    getTableData(data: Teacher) {
        this.service.teacherForm.setValue({
            id: data.id,
            teacherName: data.teacherName,
        })
    }
}
