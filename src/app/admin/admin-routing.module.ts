import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './book/book.component';
import { AudioComponent } from './audio/audio.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { UpdateAudioComponent } from './update-audio/update-audio.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-book', component: UpdateBookComponent },
      { path: 'update-book/:book-id', component: UpdateBookComponent },
      { path: 'update-audio/:audio-id', component: UpdateAudioComponent },
      { path: 'add-audio/:book-id', component: UpdateAudioComponent },
      { path: 'add-audio', component: UpdateAudioComponent },
      { path: 'book', component: BookComponent },
      { path: 'audio-of-book/:book-id', component: AudioComponent },
      { path: 'audio', component: AudioComponent },
      { path: 'active-users', component: UserComponent },
      {path: 'all-users',component: UserListComponent},
      {path: 'profile',component: ProfileComponent},

      { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
