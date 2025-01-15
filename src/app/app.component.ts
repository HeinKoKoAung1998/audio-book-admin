import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  signupForm: any = FormGroup;

  constructor(private formBuilder: FormBuilder, private afAuth: AngularFireAuth) {
    
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: '',
      password: ''
    })
  }
  

  // login() {
  //   this.afAuth.signInWithEmailAndPassword(this.signUpForm.value.email, this.signUpForm.value.password)
  //   .then((userCredential) => {
  //     console.log(userCredential);
  //   })}

  onSubmit() {
    this.afAuth.createUserWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password)
      .then((userCredential) => {
        console.log(userCredential.user);

      }).then(() => {
        this.SendVerificationEmail();

      })
  };

  SendVerificationEmail() {
    this.afAuth.currentUser.then((user) => {
      user?.sendEmailVerification().then(() => {
        console.log('Verification email sent');
        console.log(user);
      })
    })
  }


}
