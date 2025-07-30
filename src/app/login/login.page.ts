import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email = '';
  password = '';
  showpassword = false;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  togglePasswordVisibility() {
    this.showpassword = !this.showpassword;
  }

 async login() {
  if (!this.email || !this.password) {
    const toast = await this.toastCtrl.create({
      message: 'Email dan password wajib diisi!',
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    toast.present();
    return;
  }

  // ✅ Admin hardcoded
  if (this.email === 'admin' && this.password === 'admin1234') {
    localStorage.setItem('user', JSON.stringify({
      name: 'Administrator',
      email: 'admin',
      role: 'admin'
    }));

    const toast = await this.toastCtrl.create({
      message: 'Login sebagai admin berhasil!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
    this.navCtrl.navigateRoot('/admin');
    return;
  }

  // ✅ Login user dari API
  const data = {
    email: this.email,
    password: this.password
  };

  this.http.post('https://tian.ti-zone.io/login.php', data).subscribe(
    async (res: any) => {
      if (res.success) {
        localStorage.setItem('user', JSON.stringify({
          name: res.user.name,
          email: res.user.email,
          role: 'user'
        }));

        const toast = await this.toastCtrl.create({
          message: 'Login berhasil!',
          duration: 2000,
          color: 'success',
          position: 'top'
        });
        toast.present();
        this.navCtrl.navigateRoot('/tabs/tab1');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Email atau password salah.',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        toast.present();
      }
    },
      async (error) => {
      const toast = await this.toastCtrl.create({
        message: 'Gagal terhubung ke server!',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      console.error('Login Error:', error);
     }
    );
  }

}