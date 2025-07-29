import React, { useEffect } from "react";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../../../store/blogSlice";
import STATUSES from "../../globals/status/statuses";
import { useNavigate } from "react-router-dom";
import { addBlog } from "../../../store/blogSlice";
import Layout from "../../components/layout/Layout";

const AddBlog = () => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateBlog = (data) => {
    const result = dispatch(addBlog(data));
    if (result) {
      navigate("/");
    }
  };
  useEffect(() => {
    // check the status value

    if (status === STATUSES.SUCCESS) {
      dispatch(setStatus(null));
    }
  }, [status]);
  return (
    <Layout>
      <Form type="Create" onSubmit={handleCreateBlog} />
    </Layout>
  );
};

export default AddBlog;
