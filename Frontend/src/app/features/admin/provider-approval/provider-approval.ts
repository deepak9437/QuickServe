import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth";

@Component({
  selector: "app-provider-approval",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./provider-approval.html",
  styleUrl: "./provider-approval.css",
})
export class ProviderApprovalComponent {
  providers: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllProviders().subscribe({
      next: (response: any) => {
        this.providers = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  approveProvider(id: number) {
    console.log("Approve:", id);
  }

  rejectProvider(id: number) {
    console.log("Reject:", id);
  }
}
