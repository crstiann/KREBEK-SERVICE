import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  phone = '';
  showpassword = false;


  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

   togglePasswordVisibility() {
    this.showpassword = !this.showpassword;
  }

  async register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password,
      phone: this.phone
    };

    this.http.post('https://tian.ti-zone.io/register.php', data).subscribe(async (res: any) => {
        console.log(res);
      if (res.success) {
        const toast = await this.toastCtrl.create({
          message: 'Registrasi berhasil!',
          duration: 2000,
          color: 'success'
        });
        toast.present();
       console.log('Navigating to login...');
      this.navCtrl.navigateRoot('/login');
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Gagal mendaftar.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
