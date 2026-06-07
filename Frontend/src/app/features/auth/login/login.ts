import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

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
  ) {}

  onSubmit() {
    console.log('Login button clicked');

    if (!this.loginData.userEmail || !this.loginData.password) {
      alert('Please fill all fields');
      return;
    }

    this.authService.loginUser(this.loginData).subscribe({
      next: (response: string) => {
        if (response === 'SUCCESS') {
          alert('Login Successful 🎉');

          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid Email or Password');
        }
      },

      error: (error) => {
        console.error(error);

        alert('Login Failed ❌');
      },
    });
  }
}
