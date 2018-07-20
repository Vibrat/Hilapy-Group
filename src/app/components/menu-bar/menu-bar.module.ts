import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MenuBarComponent} from './menu-bar.component';
import { EmailSubmissionComponent } from './email-submission/email-submission.component';

@NgModule({
    imports: [ RouterModule, CommonModule, FormsModule, ReactiveFormsModule ],
    declarations: [ MenuBarComponent, EmailSubmissionComponent ],
    exports: [ MenuBarComponent, EmailSubmissionComponent ],
})

export  class MenuBarModule {

}