import { ICountryInterface } from './ICountry.interface'
import { IPostInterface } from './IPost.interface'
import { IUserInterface } from './IUser.interface'

export interface IGroupInterface {
	id: number
	followers_count: number
	cover_picture?: string
	post: IPostInterface
	posts?: IPostInterface[]
	country: ICountryInterface
	followers?: IUserInterface[]
}
