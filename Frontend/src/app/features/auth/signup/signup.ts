import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  user = {
    fullName: '',
    userEmail: '',
    userPhone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    address: '',
    pincode: '',
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit() {
    // Required field validation
    if (
      !this.user.fullName ||
      !this.user.userEmail ||
      !this.user.userPhone ||
      !this.user.password ||
      !this.user.confirmPassword ||
      !this.user.gender ||
      !this.user.address ||
      !this.user.pincode
    ) {
      alert('Please fill all fields');
      return;
    }

    // Password validation
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.isLoading = true;

    this.authService.registerUser(this.user).subscribe({
      next: (response) => {
        this.isLoading = false;

        Swal.fire({
          title: 'Success!',
          text: 'Registration Successful',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.router.navigate(['/login']);
      },

      error: (error) => {
        this.isLoading = false;

        console.error(error);

        Swal.fire({
          title: 'Error!',
          text: 'Registration Failed',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      },
    });
  }
}
