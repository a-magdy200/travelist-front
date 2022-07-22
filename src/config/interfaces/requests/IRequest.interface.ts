import { AxiosRequestHeaders } from 'axios'

export interface IRequestInterface {
	url: string
	method?: string
	// headers?: HeadersInit;
	headers?: AxiosRequestHeaders
	body?: any
}
