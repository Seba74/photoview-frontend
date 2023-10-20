import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { User } from 'src/app/interfaces';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { UIService } from 'src/app/services/uiservice.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule, FormsModule],
})
export class Tab3Page implements OnInit {
  avatarSelected: string = '';
  currentAvatar: string = '';
  user: User = {};

  constructor(private userService: UserService, private uiService: UIService, private postService: PostService) {}
  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.avatarSelected = this.user.avatar || 'assets/avatar/av-1.png';
    this.currentAvatar = this.avatarSelected;
  }

  logout() {
    this.postService.delateImageFromTemp();
    this.userService.logout();
  }

  selectedAvatar(avatar: string) {
    const avatarUrl = `assets/avatars/${avatar}`;
    this.avatarSelected = avatarUrl;
  }

  async updateUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.user.avatar = this.avatarSelected;
    const userUpdated = await this.userService.updateUser(this.user);
    if (userUpdated) {
      this.uiService.infoAlert('Usuario actualizado');
    } else {
      this.uiService.infoAlert('No se pudo actualizar el usuario');
    }
  }
}
