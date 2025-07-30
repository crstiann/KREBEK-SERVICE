import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: false
})
export class BookingPage implements OnInit {

  Object = Object;

  // Batas waktu booking (hari ini jam 09.00 - 17.00)
  minDateTime = '';
  maxDateTime = '';

  // Properties untuk form
  service = '';
  detail_service = '';
  merk = '';
  nopol = '';
  nama = '';
  alamat = '';
  nohp = '';
  jadwal = '';
  notes ='';

  // Opsi layanan dan detailnya
  serviceOptions: any = {
    'Ban': ['Ban Tubeless', 'Ban Biasa', 'Balancing Roda'],
    'Ganti Oli': ['Oli Mesin', 'Oli Gardan'],
    'Tune Up': ['Ringan', 'Lengkap'],
    'Servis CVT': ['CVT Kering', 'CVT Basah'],
    'Aki & Kelistrikan': ['Cek Aki', 'Ganti Aki', 'Lampu / Kelistrikan']
  };

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {
    // Ambil parameter dari URL jika ada (misalnya ?service=Ban)
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.service = params['service'];
      }

      // Isi otomatis nama user jika disimpan
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      this.nama = user?.name || '';
    });
  }

 ngOnInit() {
  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);

  // Min booking: Sekarang atau hari ini jam 09:00
  const min = new Date(now);
  if (min.getHours() < 9) {
    min.setHours(9, 0, 0, 0);
  } else if (min.getHours() >= 17) {
    min.setDate(min.getDate() + 1);
    min.setHours(9, 0, 0, 0);
  }

  // Max booking: 29 hari ke depan jam 17:00
  const max = new Date(min);
  max.setDate(max.getDate() + 29);
  max.setHours(17, 0, 0, 0);

  this.minDateTime = min.toISOString();
  this.maxDateTime = max.toISOString();
}
  isValidBookingTime(jadwal: string): boolean {
  const jam = new Date(jadwal).getHours();
  return jam >= 9 && jam < 17;
}


  async submitBooking() {
  if (!this.service || !this.detail_service || !this.merk || !this.nopol || !this.nama || !this.alamat || !this.nohp || !this.jadwal) {
    const toast = await this.toastCtrl.create({
      message: 'Semua kolom harus diisi!',
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }

  if (!this.isValidBookingTime(this.jadwal)) {
    const toast = await this.toastCtrl.create({
      message: 'Waktu booking harus antara jam 09:00 - 17:00!',
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }

    const loading = await this.loadingCtrl.create({
      message: 'Menyimpan booking...',
    });
    await loading.present();

    const data = {
      service: this.service,
      detail_service: this.detail_service,
      merk: this.merk,
      nopol: this.nopol,
      nama: this.nama,
      alamat: this.alamat,
      nohp: this.nohp,
      jadwal: this.jadwal,
      notes: this.notes
    };

    this.http.post('https://tian.ti-zone.io/booking.php', data).subscribe(
      async (res: any) => {
        await loading.dismiss();
        if (res.success) {
          const toast = await this.toastCtrl.create({
            message: 'Booking berhasil!',
            duration: 2000,
            color: 'success'
          });
          await toast.present();

          // Reset form
          this.service = '';
          this.detail_service = '';
          this.merk = '';
          this.nopol = '';
          this.nama = '';
          this.alamat = '';
          this.nohp = '';
          this.jadwal = '';
          this.notes = '';


          this.navCtrl.navigateRoot('/tabs/tab1');
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Booking gagal. Coba lagi!',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        }
      },
      async () => {
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Gagal terhubung ke server!',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    );
  }
}
