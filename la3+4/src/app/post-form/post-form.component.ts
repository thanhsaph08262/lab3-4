import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  id: string|undefined;
  post: any;
  constructor(
    private studentService: StudentService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.postForm = new FormGroup({
      name: new FormControl('', Validators.required),
      class: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      status: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    console.log(this.id);
    
    if (this.id) {
      this.studentService.getStudent(this.id).subscribe(data => {
        
        this.post = JSON.parse(JSON.stringify(data));
        console.log(this.post.name);
        this.postForm.get('name')?.setValue(this.post.name);
        this.postForm.get('class')?.setValue(this.post.class);
      })
    } else {
      this.post = {
        name: '',
        class: ''
      }
  }}

  onSubmit(obj : {name: string, class: string}) {
    console.log(obj);
    
    if (this.id) {
  
      return this.studentService.updateStudent(this.id, obj).subscribe(data => {
        this.router.navigate(['/posts', this.id]);
      });
    }

    return this.studentService.createStudent(obj).subscribe(data => {
      this.router.navigate(['/posts']);
    });
  }
  

}
