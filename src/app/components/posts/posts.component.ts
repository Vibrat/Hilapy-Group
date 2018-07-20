import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Inject, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { ApiService} from '../../api.service';

// languages, config & interface
import * as itf from './data/posts.interface';
import * as cf from './data/posts.config';
import * as la from './data/posts.language';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit, OnDestroy {
  // language and config
  public cf = cf;
  public la = la;

  public data: itf.Data[];
  public features: Observable<itf.Data[]>;
  public lazyData: itf.Data[];
  public swiper: Swiper;

  // Pagination config
  public offset: number = cf.Config.offset;
  public limit: number = cf.Config.limit;
  public interval: any;

  @ViewChildren('watching') things: QueryList<any>;

  constructor(
      @Inject ('endpoints') private endpoints,
      private api: ApiService,
      private meta: Meta, private title: Title ) {

      this.title.setTitle(this.la.metaTags.title);

      this.meta.addTags([
          { name: 'description', content: this.la.metaTags.description }
      ]);

  }

  ngAfterViewInit() { this.things.changes.subscribe(() => this.renderJs()); }

  ngOnInit() { this.showData(); }

  ngOnDestroy() {
      this.meta.removeTag('name="description"');
  }

  showData(): void {
      const endpoint = `${this.endpoints.getPosts}?limit=${ this.limit }&offset=${ this.offset }`;

      this.api.getData(endpoint)
          .subscribe((res: itf.Response) => this.data = res.data );

      const featureEndpoint = `${this.endpoints.getPosts}?limit=${ this.limit }&offset=${ this.offset }&order=-2`;
      this.features = this.api.getData(featureEndpoint).pipe( map ((res: itf.Response) => res.data ));
  }

  renderJs(): void {
      this.swiper = new Swiper('.' + cf.Config.swiperName, {
          slidesPerView: 1,
          spaceBetween: 1000,
          slidesOffsetBefore: 0,
          preloadImages: true,
          paginationType: 'bullets',
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-custom-next',
          prevButton: '.swiper-custom-prev',
          onReachEnd: () => this.loadMore()
      });
  }

  private loadMore() {
      // Setting Pagination here
      let checker: boolean = false;
      if (this.interval) { clearInterval(this.interval); }

      this.interval = setInterval(() => {
          if (checker) { clearInterval(this.interval); return; }
          ++this.offset;
          const endpoint = `${this.endpoints.getPosts}?limit=${ this.limit }&offset=${ this.offset }`;

          this.api.getData(endpoint)
              .subscribe((res) => {
                  if (res.meta.code !== 200 || !res.data.length) { --this.offset; return;  }
                  this.lazyData = res.data;
          });

          checker = true;
      }, 500);
  }

  setTemplate(event) {
      // this.hiddenSliders = false;
      event.nativeElement.hidden = false;
      // copy template
      const slider = event.nativeElement.outerHTML;
      // add slider & go to the correct index
      this.swiper.appendSlide([slider]);
      this.swiper.slideTo(((this.offset - 1) * this.limit - 1), 2000, false);

      // set model view back to hidden
      event.nativeElement.hidden = true;
  }
}

