import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  fpForm! : FormGroup;
  constructor( private userService: UserService,private formBuilder: FormBuilder,private toastr: ToastrService) {
    this.fpForm = this.formBuilder.group({
      email: '',
    });
   }

  onSubmit() {  
      this.userService.forgotPassword(this.fpForm.value.email).subscribe((response) => {
        this.toastr.success('An email has been sent to you.');
      },(error)=>{
        this.toastr.error('An error occurred. Please try again.');
        console.log(error);

      });
}
}
