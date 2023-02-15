import PostList from "../components/PostList";
import useAuth from "../hooks/useAuth";

const UserPostsPage = () => {
  const { userDetails } = useAuth();
  const title = `Posts de ${userDetails.username}`;
  const params = { size: 10 };

  return <PostList title={title} params={params} getPostsByUser />;
};

export default UserPostsPage;
