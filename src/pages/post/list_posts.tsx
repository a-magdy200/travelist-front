import ListPostsComponent from '../../components/post/ListPosts'
import { IPostInterface } from '../../config/interfaces/IPost.interface'

const ListPosts = ({posts}: {posts: IPostInterface[]}) => {

	return (
		<div>
			{posts ? (
				posts.map((post, index) => (
					<ListPostsComponent post={post} key={index} />
				))
			) : (
				<div></div>
			)}
		</div>
	)
}
export default ListPosts
