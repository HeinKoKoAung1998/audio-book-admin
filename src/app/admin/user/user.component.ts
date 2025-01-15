import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
   constructor(private userService: UserService){ }

   users: any ;
   
   ngOnInit(): void {
     this.getAllUsers();
   }

   getAllUsers(){
    this.userService.getAllUsers().subscribe((users: any)=>{
      this.users = users;
    })
   };

   deleteUserById(id: any){
    this.userService.deleteUserById(id).subscribe((res: any)=>{
      console.log(res);
    });
   }

}
