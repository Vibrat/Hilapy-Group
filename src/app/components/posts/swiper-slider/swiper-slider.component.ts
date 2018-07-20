import {Component, OnChanges, Input, ElementRef, Output, EventEmitter, SimpleChanges, OnInit} from '@angular/core';
import * as itf from '../data/posts.interface';
@Component({
  selector: 'app-swiper-slider',
  templateUrl: './swiper-slider.component.html',
  styleUrls: ['../posts.component.scss']
})
export class SwiperSliderComponent implements OnChanges {
  @Input()  lazyData: itf.Data[] = undefined;
  @Input()  post: itf.Data;
  @Output() eleRef: EventEmitter<any> = new EventEmitter(true);

  public template: ElementRef;
  public data: itf.Data;

  constructor(templateRef: ElementRef) {
      this.template = templateRef;
  }

  ngOnChanges(changes: SimpleChanges) {
      if (this.lazyData) {
          this.eleRef.emit(this.template);
      }
  }


}
