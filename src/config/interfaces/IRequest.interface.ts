export interface IRequestInterface {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: any;
}
