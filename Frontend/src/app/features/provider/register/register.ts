import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  provider = {
    fullName: '',
    password: '',
    gender: '',
    userEmail: '',
    address: '',
    pincode: '',
    userPhone: '',

    skills: '',
    experience: '',
    description: '',

    documentType: '',

    documentURL: null as File | null,
    certificate: null as File | null,
    extraCertificate: null as File | null,
  };

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onDocumentChange(event: any) {
    this.provider.documentURL = event.target.files[0];
    console.log('Document:', this.provider.documentURL);
  }

  onCertificateChange(event: any) {
    this.provider.certificate = event.target.files[0];
    console.log('Certificate:', this.provider.certificate);
  }

  onExtraCertificateChange(event: any) {
    this.provider.extraCertificate = event.target.files[0];
    console.log('Extra:', this.provider.extraCertificate);
  }

  onSubmit() {
    console.log('Provider Object:', this.provider);

    if (
      !this.provider.fullName ||
      !this.provider.userEmail ||
      !this.provider.password ||
      !this.provider.skills
    ) {
      alert('Please fill all required fields');
      return;
    }

    this.authService.registerProvider(this.provider).subscribe({
      next: () => {
        alert('Provider Registration Submitted Successfully 🎉');

        this.router.navigate(['/login']);
      },

      error: (error) => {
        console.error(error);

        alert(JSON.stringify(error));
        // alert('Provider Registration Failed ❌');
      },
    });
  }
}
