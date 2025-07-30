import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage {
  userRole: string = '';
  nama: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ionViewWillEnter() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user?.role || 'user';
    this.nama = user?.name || '';
  }

  goToKelolaBooking() {
    this.navCtrl.navigateForward('/admin');
  }

  goToKelolaLayanan() {
    this.navCtrl.navigateForward('/admin');
  }

  goToRiwayatBooking() {
    this.navCtrl.navigateForward('/status');
  }

  async logout() {
    localStorage.removeItem('user');
    const toast = await this.toastCtrl.create({
      message: 'Logout berhasil!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
    this.navCtrl.navigateRoot('/login');
  }
}
