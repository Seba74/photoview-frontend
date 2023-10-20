import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AvatarSelectorComponent } from './avatar-selector/avatar-selector.component';
import { MapComponent } from './map/map.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [PostComponent, PostsComponent, HeaderComponent, AvatarSelectorComponent, MapComponent],
  imports: [CommonModule, IonicModule, PipesModule],
  exports: [PostsComponent, HeaderComponent, AvatarSelectorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
