import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInForm: any = FormGroup;
  resUserData: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private cookieService: CookieService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.minLength(6)]
    });
  }

  get f() { return this.logInForm.controls; }

  onSubmit() {

    this.submitted = true;
    if (this.logInForm.invalid) {
      return;
    }

    this.resUserData = {
      email: this.logInForm.value.email,
      password: this.logInForm.value.password
    }



    this.userService.login(this.resUserData).subscribe((res: any) => {

      if (res.token) {


        this.cookieService.set('token', res.token);
        this.userService.getMe().subscribe((res: any) => {
          this.cookieService.set('role', res.role);

          this.router.navigate(['/admin']);
        })
      }
    }, (error) => {
      this.toastr.error('Invalid email or password');
    })
  };
};
