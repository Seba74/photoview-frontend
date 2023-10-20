import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { UIService } from 'src/app/services/uiservice.service';
import { User } from 'src/app/interfaces';
import { ComponentsModule } from 'src/app/components/components.module';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ComponentsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginPage implements OnInit {
  @ViewChild('mainSwiper', { static: true }) mainSwiper!: any;
  swiperModules = [IonicSlides];
  activeButton: boolean = true;
  loading: boolean = false;
  avatarSelected: string = '';

  loginUser = {
    email: '',
    password: '',
  };
  registerUser: User = {
    username: '',
    email: '',
    password: '',
    avatar: this.avatarSelected,
  };

  constructor(
    private userService: UserService,
    private postService: PostService,
    private navController: NavController,
    private uiService: UIService
  ) {}

  ngOnInit() {}

  async login(formLogin: NgForm) {
    if (formLogin.invalid) {
      return;
    }
    this.loading = true;
    const validToken = await this.userService.login(
      this.loginUser.email,
      this.loginUser.password
    );
    this.loading = false;
    if (validToken) {
      this.postService.delateImageFromTemp();
      this.navController.navigateRoot('/home/tabs/tab1', { animated: true });
    } else {
      this.uiService.infoAlert('Usuario o contraseña incorrectos');
    }
  }

  async register(formRegister: NgForm) {
    if (formRegister.invalid) {
      return;
    }
    this.loading = true;
    this.registerUser.avatar = this.avatarSelected;
    const validToken = await this.userService.register(this.registerUser);
    this.loading = false;
    if (validToken) {
      this.navController.navigateRoot('/home/tabs/tab1', { animated: true });
    } else {
      this.uiService.infoAlert('Este correo ya está registrado');
    }
  }

  selectedAvatar(avatar: any) {
    const avatarUrl = `assets/avatars/${avatar}`;
    this.avatarSelected = avatarUrl;
  }

  goTologin() {
    this.mainSwiper.nativeElement.swiper.slidePrev();
    if (this.activeButton == false) {
      this.activeButton = !this.activeButton;
    }
  }

  goToRegister() {
    this.mainSwiper.nativeElement.swiper.slideNext();
    if (this.activeButton == true) {
      this.activeButton = !this.activeButton;
    }
  }
}
