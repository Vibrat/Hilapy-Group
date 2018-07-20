import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../../../api.service';

import * as la from '../data/menu-bar.language';

@Component({
    selector: 'email-submission',
    templateUrl: './email-submission.component.html',
    styleUrls: ['./email-submission.component.scss']
})

export class EmailSubmissionComponent {

    public la = la;
    public success = false;
    public form: FormGroup;

    constructor(
        @Inject('endpoints') private endpoints,
        private fb: FormBuilder,
        private api: ApiService ) {
        this.form = this.fb.group({
            email: [ '', [ Validators.required, Validators.email ]]
        });
    }

    onSubmit(): void {
        const endpoint = `${ this.endpoints.postNewsletter }`;

        const submission = this.api.postData(endpoint, this.form.value);

        submission.subscribe((res) => {
            if (res.meta.code  === 200 ) {
                this.success = true;

                setTimeout(() => {
                    this.success = false;
                    this.form.reset();
                }, 4500);
            }
        });
    }
}
