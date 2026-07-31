import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-android-app",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./android-app.html",
  styleUrl: "./android-app.css",
})
export class AndroidAppComponent {

  downloadApp() {

    Swal.fire({
      title: "Download QuickServe",
      html: `
        <p><b>Version:</b> 1.0</p>
        <p><b>Android:</b> 7.0+</p>
        <p><b>Size:</b> 57 MB</p>
        <br>
        <p>Do you want to download the latest QuickServe Android App?</p>
      `,
      icon: "question",
      confirmButtonColor: "#1d9e75",
      cancelButtonColor: "#d33",
      confirmButtonText: "Download",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        const link = document.createElement("a");

        link.href = "https://quick-serve.in/quick-serve-v1.0.apk";

        link.download = "QuickServe-v1.0.apk";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

      }

    });

  }

}