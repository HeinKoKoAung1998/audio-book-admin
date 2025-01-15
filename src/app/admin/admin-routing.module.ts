import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AddBookComponent } from './add-book/add-book.component';
import { BookComponent } from './book/book.component';
import { AudioComponent } from './audio/audio.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateAudioComponent } from './update-audio/update-audio.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '',
    component: HomeComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      // {path: 'add-book',component: AddBookComponent},
      {path: 'update-book',component: UpdateBookComponent},
      {path: 'update-book/:book-id',component: UpdateBookComponent},
      {path: 'add-audio/:book-id',component: UpdateAudioComponent},
      {path: 'book',component: BookComponent},
      {path: 'audio-of-book/:book-id',component: AudioComponent},
      {path: 'edit-audio/:audio-id',component: UpdateAudioComponent},
      {path: 'user',component: UserComponent},
      // {path: 'edit-audio/:id',component: UpdateAudioComponent},
      {path: '',redirectTo: '/admin/dashboard',pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
