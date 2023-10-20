import { Pipe, PipeTransform } from '@angular/core';
import { PostService } from '../services/post.service';
import { environment } from 'src/environments/environment';

const API = environment.api

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, userId: string | undefined): string {
    if(!userId) return '';
    return `${API}/posts/image/${userId}/${img}`;
  }

}
