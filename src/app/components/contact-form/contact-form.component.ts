import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';

import { ApiService } from '../../api.service';

// languages, config and interface
import * as itf from './data/contact-form.interface';
import * as la from './data/contact-form.language';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})

export class ContactFormComponent implements OnInit {
  private bool: string;

  public newsletterForm: FormGroup;
  public la = la.Entry;
  public media: itf.Media;
  public contact: itf.Contact;

  public success: boolean = false;

  constructor(
      @Inject('endpoints') private endpoints,
      private api: ApiService, private fb: FormBuilder ) {
      this.createForm();
  }


  ngOnInit() { this.showData(); }


  showData(): void {
        this.api.getData(this.endpoints.getContact)
            .subscribe((data: itf.ResponseContact) => this.contact = data['data'] );
        this.api.getData(this.endpoints.getMedia)
            .subscribe((data: itf.ResponseMedia) => this.media = data['data'] );
  }

  onSubmit(): void {
      const endpoint = `${ this.endpoints.postNewsletter }`;
      let submission = this.api.postData(endpoint, this.newsletterForm.value);
      submission.subscribe((res) => {
         if ( res.meta.code === 200) {
             this.success = true;
             setTimeout(() => {
                 this.success = false;
                 this.newsletterForm.patchValue({ email: '' });
              }, 4500);
         }
      });
  }

  createForm(): void {
     this.newsletterForm = this.fb.group({
        email: ['', [ Validators.required , Validators.email]],
     });
  }

  validation(event): void {
     this.bool = event;
  }

  getControl(name: string): FormControl {
      return this.newsletterForm.get(name) as FormControl;
  }
}
