import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  loginData = {
    userEmail: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onSubmit() {
    console.log('Login button clicked');

    if (!this.loginData.userEmail || !this.loginData.password) {
      alert('Please fill all fields');
      return;
    }

    this.authService.loginUser(this.loginData).subscribe({
      next: (response: string) => {
        sessionStorage.setItem('user', response);
        if (response === 'CUSTOMER') {

          this.router.navigate(['/dashboard']);

        } else if (response === 'PROVIDER') {

          this.router.navigate(['/provider-dashboard']);

        } else if (response === 'ADMIN') {

          this.router.navigate(['/admin-dashboard']);

        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Invalid Email or Password',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      },

      error: (error) => {
        console.error(error);

        Swal.fire({
          title: 'Error!',
          text: 'Login Failed',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      },
    });
  }
}
