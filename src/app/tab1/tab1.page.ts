import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ✅ Ganti NavController


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {

  constructor(private router: Router) {}


  goToBooking(service: string) {
  this.router.navigate(['/tabs/booking'], {
    queryParams: { service }
  });
}


  toggleDarkMode(event: any) {
    document.body.classList.toggle('dark', event.detail.checked);
  }
}
