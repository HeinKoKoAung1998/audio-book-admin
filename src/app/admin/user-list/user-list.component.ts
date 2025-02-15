import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersList: any = [];
  searchQuery: string = '';

  constructor(private userService: UserService,private toastr: ToastrService,private sweetService: SweetalertService) { }

  ngOnInit(): void {
    this.getAllUsers();
    console.log(this.usersList)
  } 

  getAllUsers() {
    this.userService.getAllUsers().subscribe((users: any) => {
      this.usersList = users;
      console.log(users);
    })
  };

  deleteUserById(id: any) {
    this.userService.deleteUserById(id).subscribe((res: any) => {
      console.log(res);
    });
    this.getAllUsers();
  };

  deleteItem(id: any){
    this.sweetService.confirmDelete(()=>{
      this.deleteUserById(id);
    })
  }

  updateRole(user_id: any){
    this.userService.updateUserRole({user_id: user_id,role : 'Admin'}).subscribe((res)=>{
      this.toastr.success('This user is updated Successfully');
      console.log(res)
      this.getAllUsers();
    })
    
    
  };

  searchUsers() {
    this.usersList = this.usersList.filter((user: any) => 
      user.name.toLowerCase().includes(this.searchQuery.toLowerCase().trim()) || 
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase().trim())
    );
  }
  
};
