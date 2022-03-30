import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  id: any;
  posst: any;

  constructor(  
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService) {
  
   }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.studentService.getStudent(this.id).subscribe(data => {
      this.posst = data;
    });
  }

}
