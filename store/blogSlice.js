import { createSlice } from "@reduxjs/toolkit";
import STATUSES from "../src/globals/status/statuses";
import API from "../src/http";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: [],
    status: null,
    editStatus: null,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setEditStatus(state, action) {
      state.editStatus = action.payload;
    },
  },
});
export const { setStatus, setData, setEditStatus } = blogSlice.actions;
export default blogSlice.reducer;
//addblog
export function addBlog(data) {
  return async function addBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.post("blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 201) {
        dispatch(setStatus(STATUSES.SUCCESS));
        return true;
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//fetch

export function fetchBlog() {
  return async function fetchBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get("blog");
      if (response.status === 200 && response.data.data?.length > 0) {
        dispatch(setData(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setData([]));
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

// Delete blog
export function deleteBlog(id, token) {
  return async function deleteBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.delete(`blog/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
export function getSingleBlog(id) {
  return async function getSingleBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.get(`blog/${id}`);
      if (response.status === 200) {
        dispatch(setData([response.data.data])); // wrap in array for reuse
        dispatch(setStatus(STATUSES.SUCCESS));
      } else {
        dispatch(setStatus(STATUSES.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//edit
export function editBlog(blog, id) {
  return async function editBlogThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await API.patch(`blog/${id}`, blog, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization ": localStorage.getItem("token"),
        },
      });
      if (response.status === 200) {
        dispatch(setEditStatus(true));
      } else {
        dispatch(setEditStatus(null));
      }
    } catch (error) {
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
