import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

import { CommonModule } from "@angular/common";
import { AdminService } from "../../../core/services/admin";

@Component({
  selector: "app-providers",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./providers.html",
  styleUrl: "./providers.css",
})
export class ProvidersComponent implements OnInit {
  providers: any[] = [];

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.adminService.getProviders().subscribe({
      next: (data) => {
        console.log(data);

        this.providers = data;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error(err);
      },
    });
  }
}
