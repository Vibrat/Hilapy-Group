import { Injectable } from '@angular/core';


@Injectable()
export class Endpoints  {
    public getPorfolios = 'http://hilapy.com:7777/hilapyportfolios';
    public getPartners = 'http://hilapy.com:7777/partners';
    public getSliders = 'http://hilapy.com:7777/sliders';

    /**
     * @property getPosts
     */

    public getPosts   = 'http://hilapy.com:7777/posts';
    public getPost    = 'http://hilapy.com:7777/posts';
    public getContact = 'http://hilapy.com:7777/contacts';
    public getMedia   = 'http://hilapy.com:7777/contacts/media';

    public postNewsletter = 'http://hilapy.com:7777/newsletters';
}