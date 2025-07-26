import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import Card from "./components/card/Card";
import { fetchBlog } from "../../../store/blogSlice";

const Home = () => {
  const dispatch = useDispatch();

  // Get blog data and search query from Redux store
  const { data: blogs } = useSelector((state) => state.blog);
  const searchQuery = useSelector((state) => state.search.query);

  // Fetch all blogs when the component mounts
  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  // Filter blogs by title or author name (case-insensitive)
  const filteredBlogs = blogs?.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.userId?.username?.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
      <div className="flex flex-wrap justify-center mt-6 gap-5 px-4">
        {filteredBlogs?.length > 0 ? (
          filteredBlogs.map((blog, index) => <Card blog={blog} key={index} />)
        ) : (
          <p className="text-gray-500 text-xl mt-10">No blogs found.</p>
        )}
      </div>
    </Layout>
  );
};

export default Home;
