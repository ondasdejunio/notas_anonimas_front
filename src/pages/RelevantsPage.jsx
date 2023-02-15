import PostList from "../components/PostList";

const RelevantsPage = () => {
  const title = "Más relevantes";
  const params = { sortByLikes: true, size: 10 };

  return <PostList title={title} params={params} />;
};

export default RelevantsPage;
