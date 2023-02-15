import PostList from "../components/PostList";

const RecentsPage = () => {
  const title = "Más recientes";
  const params = { sortByRecent: true, size: 10 };

  return <PostList title={title} params={params} showCreateModal />;
};

export default RecentsPage;
