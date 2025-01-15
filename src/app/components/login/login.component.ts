import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logInForm: any = FormGroup;
  resUserData: any;

  constructor(private formBuilder: FormBuilder,private userService: UserService,private router: Router,private cookieService: CookieService,private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
     this.logInForm = this.formBuilder.group({
      email: ['',Validators.email],
      password: ['']
    });
  }

  get f() { return this.logInForm.controls; }

  onSubmit() {
    

    if (this.logInForm.invalid) {
      return;
    }

    this.resUserData = {
      email: this.logInForm.value.email,
      password: this.logInForm.value.password
    }
    console.log(this.resUserData);
   

    this.userService.login(this.resUserData).subscribe((res: any) => {
      console.log(res);
      if (res.token) {
        // this.resUserData = res;
        this.cookieService.set('email', res.email);
        this.cookieService.set('token', res.token);
        this.router.navigate(['/admin']);
      }
    },(error)=>{
      alert('Invalid email or password');
      console.log(error);
    })
  };
}
