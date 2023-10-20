import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, pipe, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUpload, Post, ResponsePosts } from '../interfaces';
import { UserService } from './user.service';
import { Filesystem } from '@capacitor/filesystem';

const API = environment.api;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private API_POST: string = `${API}/posts`;
  private page: number = 0;
  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private userService: UserService) {}

  getPosts(pull: boolean = false): Observable<Post[]> {
    if (pull) {
      this.page = 0;
    }

    this.page++;
    return this.http
      .get<ResponsePosts>(this.API_POST, {
        params: {
          page: this.page,
        },
      })
      .pipe(map(({ posts }) => posts));
  }

  async createPost(post: Post): Promise<boolean> {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({ 'user-token': token || '' });

    return new Promise((resolve) => {
      this.http
        .post<any>(`${this.API_POST}/create`, post, { headers })
        .subscribe(({ post }) => {
          this.newPost.emit(post);
          resolve(true);
        });
    });
  }

  async uploadImage(formData: FormData) {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({ 'user-token': token || '' });

    return new Promise((resolve) => {
      this.http
        .post(`${this.API_POST}/upload`, formData, { headers })
        .subscribe((resp) => {
          if (resp) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async delateImageFromTemp() {
    const token = await this.userService.getToken();
    const headers = new HttpHeaders({ 'user-token': token || '' });

    return new Promise((resolve) => {
      this.http
        .delete(`${this.API_POST}/temp`, { headers })
        .subscribe((resp) => {
          if (resp) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });

  }


}
