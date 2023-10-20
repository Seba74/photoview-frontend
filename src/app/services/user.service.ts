import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { User } from '../interfaces';
import { NavController } from '@ionic/angular';

const API = environment.api;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private token: string | null = null;
  private user: User | null = null;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navController: NavController
  ) {}

  login(email: string, password: string) {
    const userLogin = {
      email,
      password,
    };

    return new Promise((resolve) => {
      this.http
        .post(`${API}/user/login`, userLogin)
        .subscribe((response: any) => {
          if (response.ok) {
            this.saveToken(response.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  }


  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navController.navigateRoot('/login', { animated: true });
  }

  register = (user: User) => {
    const userRegister: User = user;

    return new Promise((resolve) => {
      this.http
        .post(`${API}/user/register`, userRegister)
        .subscribe((response: any) => {
          if (response.ok) {
            this.saveToken(response.token);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        });
    });
  };

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set('token', this.token);
    await this.validateToken();
  }

  async getToken() {
    if (!this.token) {
      this.token = (await this.storage.get('token')) || null;
    }
    return this.token;
  }

  async validateToken(): Promise<boolean> {
    await this.getToken();

    if (!this.token) {
      this.navController.navigateRoot('/login', { animated: true });
      return Promise.resolve(false);
    }

    const headers = new HttpHeaders({
      'user-token': this.token || '',
    });
    return new Promise<boolean>((resolve) => {
      this.http
        .get(`${API}/user`, { headers })
        .subscribe((response: any) => {
          if (!response.ok) {
            this.navController.navigateRoot('/login', { animated: true });
            resolve(false);
          } else {
            this.user = response.user;
            resolve(true);
          }
        });
    });
  }

  getUser() {
    if (!this.user) {
      this.validateToken();
    }
    return { ...this.user };
  }

  updateUser(user: User) {
    const headers = new HttpHeaders({
      'user-token': this.token || '',
    });

    return new Promise((resolve) => {
      this.http.put(`${API}/user/update`, user, {headers}).subscribe((response: any) => {
        if (response.ok) {
          this.saveToken(response.token);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
