import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';


import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AddBookComponent } from './add-book/add-book.component';
import { environment } from '../environments/environment';
import { BookComponent } from './book/book.component';
import { AudioComponent } from './audio/audio.component';
import { UpdateAudioComponent } from './update-audio/update-audio.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    AddBookComponent,
    BookComponent,
    AudioComponent,
    UpdateAudioComponent,
    UpdateBookComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class AdminModule { }
