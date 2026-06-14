import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  logout() {

    // Remove JWT token
    localStorage.removeItem('token');

    // Redirect to login
    this.router.navigate(['/login']);
  }
}
