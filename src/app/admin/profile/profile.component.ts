import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo! : User ;
  constructor(private userService: UserService, private sweetService: SweetalertService) { }

  ngOnInit(): void {
    this.getMe();
  }

  getMe() {
    this.userService.getMe().subscribe((res) => {
      this.userInfo = res;
    })
  };

  onChangePassword() {
    this.userService
  }

  onDeleteAccount() {
    this.sweetService.confirmDelete(() => {
      this.userService.deleteUserById(this.userInfo.user_id);
    });
  };

  logOut(){
    this.userService.logout();
  }

  logOutConfirm(){
    this.sweetService.confirmLogOut(()=>{
      this.logOut();
    })
  }
}
