import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  form!: FormGroup;
  editMode: boolean | false;
  userId: string;
  
  constructor(
    private route: ActivatedRoute,
    private router:Router, 
    private userService: UserService, 
    private fb: FormBuilder,
    private alertService: AlertService
  ){}

  initForm():void{
    this.form = this.fb.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      status: ['Active']
    })
  }
  ngOnInit(): void{
    this.initForm();

    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id){
        this.userId = id;
        this.editMode = true;
        this.getuserById(id);
      }
    })
  }

  getuserById(id: string){
    this.userService.getUserById(id).subscribe({
      next:(user:User)=>{
        this.form.patchValue({
          name: user.name,
          email: user.email,
          status: user.status
        })
      }, error:()=>{
        console.log("An error occurred");
      }
    })
  }
  saveUserInfo(){
    if(this.form.invalid){
      this.form.markAllAsTouched()
      alert("An error occurred, please check the fields");
      return;
    }

    const userData: User = this.form.value;

    if(this.editMode && this.userId){
      this.userService.updateUser(this.userId, userData).subscribe({
        next:(user:User)=>{
          this.alertService.AlertSuccess("Success", "User was edited correctly.").then((result) =>{
            if(result.isConfirmed)
              this.router.navigate(["/users"])
          });
        }, error:()=>{
          console.log("An error occurred");
        }
      })
    }
  }
}
