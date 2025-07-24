import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import Card from "./components/card/Card";
import { fetchBlog } from "../../../store/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlog());
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex flex-wrap justify-center mt-6 gap-5 px-4">
        {data?.length > 0 &&
          data.map((blog, index) => <Card blog={blog} key={index} />)}
      </div>
    </Layout>
  );
};

export default Home;
