import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  listPost: any = [];
  constructor(
    private serviceStudent: StudentService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getDataPost();
  }

  getDataPost() {
      this.serviceStudent.getStudents().subscribe(res => {
        this.listPost = res;
        console.log(this.listPost);
        
      })
  }
  onDelete(id: number|string) {
    this.serviceStudent.deleteStudent(id).subscribe((data) => {
      this.getDataPost();
    });
  }
  onUpdate(item: any) {
    console.log(item);
    this.router.navigate(['/posts/form', item.id]);
  }
}
