import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PostService } from 'src/app/services/post.service';
import { ComponentsModule } from '../../components/components.module';
import { Post } from 'src/app/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ComponentsModule],
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];
  disabled: boolean = false;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.getPosts();

    this.postService.newPost.subscribe((post) => {
      this.posts.unshift(post);
    });

  }

  getPosts(event?: any, pull: boolean = false) {
    this.postService.getPosts(pull).subscribe((posts) => {
      this.posts.push(...posts);

      if (event) {
        event.target.complete();
        if (posts.length === 0) {
          this.disabled = true;
        }
      }
    });
  }

  refreshPosts(event: any) {
    this.getPosts(event, true);
    this.disabled = false;
    this.posts = [];
  }
}
