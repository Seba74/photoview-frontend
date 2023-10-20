import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Geolocation } from '@capacitor/geolocation';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule, FormsModule],
})
export class Tab2Page implements OnInit {
  photos: string[] = [];
  isLoading: boolean = false;
  imageLoading: boolean = false;

  constructor(private postService: PostService, private route: Router) {}

  ngOnInit(): void {
    this.postService.delateImageFromTemp();
  }

  post = {
    message: '',
    coords: '',
    position: false,
  };

  async crearPost() {
    await this.postService.createPost(this.post);

    this.post = {
      message: '',
      coords: '',
      position: false,
    };

    this.photos = [];

    this.route.navigateByUrl('/home/tabs/tab1');
  }

  async getGeo() {
    if (!this.post.position) {
      this.post.coords = '';
      return;
    }
    this.isLoading = true;
    Geolocation.getCurrentPosition().then((resp) => {
      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
      this.post.coords = coords;
      this.isLoading = false;
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });

    if (image) {
      this.saveImage(image);
    }
  }

  async gallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    
    if (image) {
      this.saveImage(image);
    }
  }

  private async saveImage(image: Photo) {
    this.imageLoading = true;
    const fileName = new Date().getTime() + '.jpeg';
    const originalImage = image;
    const tempImage = await Filesystem.readFile({
      path: originalImage.path!,
    });

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: tempImage.data,
      directory: Directory.Data,
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: Directory.Data,
      path: fileName,
    });

    let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);

    // append the file to the form data
    const formData = new FormData();
    const path = await fetch(photoPath);
    const blob = await path.blob();
    formData.append('image', blob, fileName);

    // upload the image
    await this.postService.uploadImage(formData).then((res) => {
      this.imageLoading = false;
    });
    this.photos.push(photoPath);
  }
}
