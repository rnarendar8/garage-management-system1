import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService.login(this.username, this.password)
      .subscribe({

        next: (response) => {

          // Save JWT token
          localStorage.setItem("token", response.token);

          console.log("Login successful");
          console.log("JWT Token:", response.token);

          // Go to dashboard
          this.router.navigate(['/app/dashboard']);
        },

        error: () => {

          this.errorMessage = "Invalid username or password";

          console.log("Login failed");
        }

      });
  }
}
