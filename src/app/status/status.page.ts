import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-status',
  templateUrl: './status.page.html',
  styleUrls: ['./status.page.scss'],
  standalone: false
})
export class StatusPage {
  bookings: any[] = [];

  constructor(private http: HttpClient) {}

  ionViewWillEnter() {
    // Ambil data status booking
    this.http.get<any[]>('https://tian.ti-zone.io/get_booking.php').subscribe(data => {
      this.bookings = data;
    });

    // Panggil auto-cancel saat buka halaman
    this.http.get('https://tian.ti-zone.io/auto_cancel.php').subscribe();
  }

  getColor(status: string) {
    if (status === 'Menunggu') return 'warning';
    if (status === 'Dibatalkan') return 'danger';
    if (status === 'Diproses') return 'success';
    return '';
  }
}
