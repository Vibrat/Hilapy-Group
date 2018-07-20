import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser , CommonModule} from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'angular2-useful-swiper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './core/pipes/pipes.module';

import { Endpoints } from './core/endpoints/endpoints.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { MainContentModule } from './main-content/main-content.module';
import { MenuBarModule } from './components/menu-bar/menu-bar.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'angular'}),
    AppRoutingModule,
    SwiperModule,
    HttpClientModule,
    MainContentModule,
    MenuBarModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  providers: [
      { provide: 'endpoints', useClass: Endpoints}
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
  constructor(  @Inject(PLATFORM_ID) private platformId: Object,
                @Inject(APP_ID) private appId: string ) {
      const platform = isPlatformBrowser(platformId) ?
          'in the browser' : 'on the server';
      console.log(`Running ${platform} with appId=${appId}`);
  }
}
