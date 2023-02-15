import PostList from "../components/PostList";

const OldestPage = () => {
  const title = "Más antiguos";
  const params = { sortByOldest: true, size: 10 };

  return <PostList title={title} params={params} />;
};

export default OldestPage;
