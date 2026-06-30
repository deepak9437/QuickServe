import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.css",
})
export class RegisterComponent {
  provider = {
    fullName: "",
    password: "",
    gender: "",
    userEmail: "",
    address: "",
    pincode: "",
    userPhone: "",

    skills: "",
    experience: "",
    description: "",

    documentType: "",

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
    console.log("Document:", this.provider.documentURL);
  }

  onCertificateChange(event: any) {
    this.provider.certificate = event.target.files[0];
    console.log("Certificate:", this.provider.certificate);
  }

  onExtraCertificateChange(event: any) {
    this.provider.extraCertificate = event.target.files[0];
    console.log("Extra:", this.provider.extraCertificate);
  }

  onSubmit() {
    console.log("Provider Object:", this.provider);

    if (
      !this.provider.fullName ||
      !this.provider.userEmail ||
      !this.provider.password ||
      !this.provider.skills ||
      !this.provider.userPhone ||
      !this.provider.address ||
      !this.provider.experience ||
      !this.provider.documentType
    ) {
      alert("Please fill all required fields");
      return;
    }
    Swal.fire({
      title: "Submitting Registration...",
      text: "Please wait while we upload your documents.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.authService.registerProvider(this.provider).subscribe({
      next: () => {
        Swal.close();
        //alert("Provider Registration Submitted Successfully 🎉");
        Swal.fire({
          title: "Success!",
          text: "Provider Registration Submitted Successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        this.router.navigate(["/login"]);
      },

      error: (error) => {
        Swal.close();
        console.error(error);

        //alert(JSON.stringify(error));
        Swal.fire({
          title: "Error!",
          text: error.error || "Provider Registration Failed",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      },
    });
  }
}
