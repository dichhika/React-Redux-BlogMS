import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import Card from "./components/card/Card";
import { fetchBlog } from "../../../store/blogSlice";
import Spinner from "../../Spinner";

const Home = () => {
  const dispatch = useDispatch();

  const { data: blogs } = useSelector((state) => state.blog);
  const searchQuery = useSelector((state) => state.search.query);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchBlog());
    // simulate API delay
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  const filteredBlogs = blogs?.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.userId?.username?.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-wrap justify-center mt-6 gap-5 px-4">
          {filteredBlogs?.length > 0 ? (
            filteredBlogs.map((blog, index) => <Card blog={blog} key={index} />)
          ) : (
            <p className="text-gray-500 text-xl mt-10">No blogs found.</p>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Home;
