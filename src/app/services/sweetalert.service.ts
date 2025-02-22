import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  confirmDelete(callback: () => void) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        callback(); // Call the delete function
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      }
    });
  }

  confirmUpdateUserRole(callback: () => void) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this user to Admin role?',
      icon: 'question', // Use a question icon instead of a warning
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Use a primary color for confirmation
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        callback(); // Call the update function
        Swal.fire('Updated!', 'The user role has been updated.', 'success');
      }
    });
  }

  confirmLogOut(callback: () => void) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be signed out of your account.',
      icon: 'question', // Use 'question' icon for logout confirmation
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red color for the confirm button
      cancelButtonColor: '#3085d6', // Blue color for the cancel button
      confirmButtonText: 'Yes, log out!', // Change the confirm button text
      cancelButtonText: 'Cancel' // Change the cancel button text
    }).then((result) => {
      if (result.isConfirmed) {
        callback(); // Call the logout function
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
      }
    });
  }


}
