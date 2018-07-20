
export interface Media {
   facebook: {
       id: number;
       url: string;
       order: number
    };
   instagram: {
       id: number;
       url: string;
       order: number
   }
}

export interface Contact {
    title: string;
    hotline: string;
    address: string;
    email: string;
    time: string;
}

export interface ResponseMedia {
    meta: {
        code: number;
        message: string;
    };
    data: Media;
}

export interface ResponseContact {
    meta: {
        code: number;
        message: string;
    };
    data: Contact;
}

