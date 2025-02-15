import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

import { ToastrModule } from 'ngx-toastr';

import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { BookComponent } from './book/book.component';
import { AudioComponent } from './audio/audio.component';
import { UpdateAudioComponent } from './update-audio/update-audio.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    BookComponent,
    AudioComponent,
    UpdateAudioComponent,
    UpdateBookComponent,
    UserComponent,
    ProfileComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class AdminModule { }
