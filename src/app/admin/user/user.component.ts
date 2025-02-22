import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}

  activeUsers: User[] = [];
  activeUsersInfoList: User[] = [];

  ngOnInit(): void {
    this.getAllActiveUsers();
  }

  getAllActiveUsers() {
    this.userService.getActiveUsers().subscribe((res: any) => {
      this.activeUsers = res;
      console.log('Active Users:', this.activeUsers);
      this.getActiveUsersInfo(); // Call getActiveUsersInfo after activeUsers is populated
    });
  }

  getActiveUsersInfo(){
    if (this.activeUsers && this.activeUsers.length > 0) {
      this.activeUsers.forEach((user: any) => {
        const userId = user.user_id; 
        this.userService.getUserById(userId).subscribe((res: any) => {
          this.activeUsersInfoList = [ ...this.activeUsersInfoList, ...res];
          console.log('Active Users Info List:', this.activeUsersInfoList);
        });
      });
    }
    
  }
}