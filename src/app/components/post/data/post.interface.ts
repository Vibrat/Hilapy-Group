export interface Article {
    image: {
        url: string;
        alt: string;
        width: number;
        height: number;
    };
    meta: {
        votes: number;
        favs: number;
    };
    _id: number;
    title: string;
    author: string;
    content: string;
    seo: string[];
    seo_title: string;
    seo_description: string;
    hidden: boolean;
    date: string;
    comments: any[];
    order: number;
    __v: number;
}

export interface Response {
    meta: {
        code: number;
        message: string;
        total: number;
        related: string[];
    };
    data: Article[] | Article;
}
