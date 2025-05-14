import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList: User[] = [];

  constructor(private userService: UserService, private router: Router){

  }

  ngOnInit(){
    this.getUser();
  }

  changeUserStatus(objUser: User){
    const userId = objUser.id;
    const status = objUser.status === "Active" ? "Inactive" : "Active";
    this.userService.changeUserStatus(userId, status).subscribe({
      next: () =>{
        alert("Status updated successfully");
        this.getUser()
      }, error: ()=>{
        alert("Error updating status");
      }
    })
  }

  goToUserForm(id?: string){
    if(id){
        this.router.navigate(['users/user', id])
    }
  }

  getUser(){
    this.userService.getUsers().subscribe(
      {
        next: (res) =>{
          this.userList = res;
        },
        error: (err)=>{
          if(err.status === 403){
            localStorage.removeItem('AuthToken');
          }
        }
      }
    )
  }
}
