import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage {
  currentView: string = 'layanan'; // default tampilan
  newLayanan: string = '';
  layananList: any[] = [];
  bookingList: any[] = [];

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user?.role !== 'admin') {
      this.toastCtrl.create({
        message: 'Akses hanya untuk admin!',
        duration: 2000,
        color: 'danger'
      }).then(t => t.present());
      this.navCtrl.navigateRoot('/tabs/tab1');
      return;
    }

    this.loadLayanan();
    this.loadBooking();
  }

  // ================= LAYANAN =================

  loadLayanan() {
    this.http.get<any[]>('https://tian.ti-zone.io/get_layanan.php').subscribe(data => {
      this.layananList = data;
    });
  }

  tambahLayanan() {
    if (!this.newLayanan.trim()) return;
    this.http.post('https://tian.ti-zone.io/tambah_layanan.php', { nama: this.newLayanan }).subscribe(() => {
      this.newLayanan = '';
      this.loadLayanan();
      this.showToast('Layanan ditambahkan!');
    });
  }

  hapusLayanan(id: number) {
    this.http.post('https://tian.ti-zone.io/hapus_layanan.php', { id }).subscribe(() => {
      this.loadLayanan();
      this.showToast('Layanan dihapus!');
    });
  }

  // ================= BOOKING =================

  loadBooking() {
  this.http.get<any[]>('https://tian.ti-zone.io/get_booking.php').subscribe(data => {
    this.bookingList = data;
    console.log('Data Booking:', data); // 👈 tampilkan data ke Console
  });
}


  ubahStatus(id: number, status: string) {
    this.http.post('https://tian.ti-zone.io/update_status_booking.php', { id, status }).subscribe(() => {
      this.showToast('Status booking diperbarui');
    });
  }

  hapusBooking(id: number) {
    this.http.post('https://tian.ti-zone.io/hapus_booking.php', { id }).subscribe(() => {
      this.loadBooking();
      this.showToast('Booking dihapus!');
    });
  }

  // ================= UTIL =================

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'top',
      color: 'success'
    });
    toast.present();
  }
}
