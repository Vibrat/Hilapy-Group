import { Component, OnInit, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { flatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

// Services and apis
import { ApiService } from '../../api.service';

// interface, languages and config
import * as itf from './data/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit, OnDestroy {
  protected slug: string = undefined;
  public data: itf.Article;
  public headers: any[] = [];
  public featured: itf.Article[];

  constructor(
      @Inject('endpoints') private endpoints,
      private route: ActivatedRoute,
      private api: ApiService,
      private meta: Meta, private title: Title,
      private location: Location
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
        const endpoint = `${ this.endpoints.getPost }?seo=${ this.slug }`;

        const post = this.api.getData(endpoint).pipe(flatMap((res: itf.Response) => {

            // loading feature posts
            const featureApi: any[] = [];
            res.meta.related.forEach((id, index) => {
                if (id) {
                    const api =  `${ this.endpoints.getPost }/${ id }`;
                    this.api.getData(api).pipe(tap((rePost: itf.Response) => {
                        if (+rePost.meta.code === 200) {
                            featureApi[index] = rePost.data;
                        }
                    })).subscribe();
                }
            });


            // getting and display data for main post
            this.data = res.data[0];
            this.setHeaders(res.data[0].content);

            // setting data for seo
            this.title.setTitle(res.data[0].seo_title);

            this.meta.addTags( [
                { name: 'description', content: res.data[0].seo_description },
                { property: 'og:title', content: res.data[0].seo_title },
                { property: 'og:description', content: res.data[0].seo_description },
                { property: 'og:image', content: res.data[0].image.url },
                { property: 'og:site_name', content: 'Hilapy Creative'}
                ]);
            // return next activity of the chain
            return of(featureApi);
        }));

        post.subscribe(features => {
            this.featured = features;
        });
        return;
    }

    console.log ('api not working');
  }

  ngAfterViewInit() {
      const headers = Array.from(document.querySelectorAll('.content .title'));
      headers.forEach((item, index) => {
          item.id = index.toString();
      });
  }

  ngOnDestroy() {
      this.meta.removeTag('name="description"');
      this.meta.removeTag('property="og:title"');
      this.meta.removeTag('property="og:description"');
      this.meta.removeTag('property="og:image"');
      this.meta.removeTag('property="og:site_name"');
  }

  setHeaders(content: string) {
      const container = document.createElement('div');
            container.innerHTML = content;
      const headers = Array.from(container.querySelectorAll('.title'));
      headers.forEach((header, index) => {
            header.id = index.toString();
            this.headers.push({
                 text: header.textContent,
                 index: index
            });
      });

      this.data.content = container.innerHTML;
  }

  scroll(index, event) {
      event.preventDefault();
      const header = document.getElementById(index);
      header.scrollIntoView({ block: 'center' });
  }

  sharePost(event, channel: string): void {
      event.preventDefault();

      switch (channel) {
          case 'fb':
              window.open(
                  'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href),
                  'facebook-share-dialog',
                  'width=626,height=436');
              break;
          case 'twitter':
              window.open(
                  'https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href),
                  'twitter-share-dialog',
                  'width=626,height=436');
              break;
          case 'linkedin':
              window.open(
                  'https://www.linkedin.com/shareArticle?url=' + encodeURIComponent(location.href),
                  'linkedin-share-dialog',
                  'width=626,height=436');
      }
  }
}
