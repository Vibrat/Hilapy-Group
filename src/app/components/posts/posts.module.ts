import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRouterModule } from './posts-router.module';

import { PostsComponent } from './posts.component';
import { PostComponent } from '../post/post.component';
import { SwiperSliderComponent } from './swiper-slider/swiper-slider.component';
import { PipesModule } from '../../core/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PostsRouterModule,
    PipesModule
  ],
  declarations: [ PostsComponent, PostComponent, SwiperSliderComponent ],
})

export class PostsModule { }
