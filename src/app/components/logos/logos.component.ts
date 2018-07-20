import { AfterViewInit, Component, Inject, QueryList } from '@angular/core';
import { ViewChildren } from '@angular/core';

import { ApiService } from '../../api.service';
import * as cf from './data/logos.config';
import * as itf from './data/logos.interface';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.scss']
})
export class LogosComponent implements AfterViewInit  {
  public cf = cf;
  public data: itf.Logos;

  // litmit and offset
  public sw: Swiper;
  public limit: number = 999;
  public offset: number = 1;

  @ViewChildren('watcher') private slider: QueryList<any>;

  constructor(
      @Inject('endpoints') private endpoints,
      private api: ApiService
  ) {
      const endpoint = `${ this.endpoints.getPartners }?offset=${ this.offset }&limit=${ this.limit }`;

      this.api.getData(endpoint).subscribe((res: itf.Response) => {
          (res.meta.code === 200) ? this.data = res.data : console.warn('api not work');
      });
  }

  ngAfterViewInit (): void {
      this.slider.changes.subscribe(() => this.renderSlider());
  }

  renderSlider() {
      this.sw = new Swiper('.' + cf.SwiperContainer.name, {
          slidesOffsetBefore: 14,
          slidesPerView: 1,
          spaceBetween: 25,
          slidesOffsetAfter: 14,
          width: 120
      });
  }
}
