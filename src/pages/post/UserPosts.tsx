import { useEffect, useState } from "react";
import { IPostInterface } from "../../config/interfaces/IPost.interface";
import Loader from "../../components/Loader";
import ListPosts from "./list_posts";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";

const UserPosts = () => {
  const [posts, setPosts] = useState<IPostInterface[]>([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async() => {
      const response: IResponseInterface<IPostInterface[]> = await api<
        IPostInterface[]
        >({
        url: '/api/posts/',
      });
      if (response.success && response.data) {
        setPosts(response.data);
      }
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <Loader />
  }
  return <ListPosts posts={posts} />
}
export default UserPosts;
