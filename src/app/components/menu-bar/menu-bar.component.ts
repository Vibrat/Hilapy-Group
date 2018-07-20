import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators/map';
import { ApiService } from '../../api.service';

// languages, config and interface
import * as la from './data/menu-bar.language';
import * as itf from './data/menu-bar.interface';
import * as cf from './data/menu-bar.config';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent implements OnInit {
  public la = la;
  public data = cf.Menu;
  public domain = document.location.hostname;

  public media: Observable<itf.Media>;
  public contact: Observable<itf.Contact>;
  public form: FormGroup;

  constructor(
      @Inject('endpoints') private endpoints,
      private api: ApiService ) {
      this.form = new FormGroup({
          email: new FormControl('' , [ Validators.required, Validators.email ]),
      });
  }

  ngOnInit() { this.showData(); }

  showData(): void {
    this.media = this.api.getData(this.endpoints.getMedia)
        .pipe(map((res: itf.ResponseMedia) => res.data ));
    this.contact = this.api.getData(this.endpoints.getContact)
        .pipe(map((res: itf.ResponseContact) => res.data ));
  }

  toggle(event) {

     const bool     = event.toElement.classList.contains('navRotation');
     const isButton = event.target.localName === 'button';
     const target   = (isButton) ? event.target : null;
     const cases    = (target === null) ? null : (isButton && bool);

     switch (cases) {
         case null:
             event.path[1].click();
             break;
         case true:
             target.innerHTML = `<i class="fa fa-bars"></i>`;
             target.classList.remove('navRotation');
             break;
         case false:
             target.innerHTML = `<i class="fa fa-plus"></i>`;
             target.classList.add('navRotation');
     }
  }
}
