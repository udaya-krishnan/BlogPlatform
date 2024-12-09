import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_REACT_APP_URL;



export const registerUser = createAsyncThunk(
    "user/register",
    async ({ username, email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${apiUrl}/register`, {
          username,
          email,
          password,
        });
        return response.data;
      } catch (error) {
        console.error("Error in registerUser:", error);
        // Reject with a message for proper error handling
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );



  export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({email, password }, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${apiUrl}/login`, {
          email,
          password,
        },{withCredentials:true});
        return response.data;
      } catch (error) {
        console.error("Error in Login:", error);
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );


  export const addBlog = createAsyncThunk(
    "user/addBlog",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${apiUrl}/addblog`,formData,{withCredentials:true});
        return response.data;
      } catch (error) {
        console.error("Error in Login:", error);
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );


  export const fetchBlog = createAsyncThunk(
    "user/fetchBlog",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${apiUrl}/fetchblog?id=${id}`,{withCredentials:true});
        return response.data;
      } catch (error) {
        console.error("Error in Login:", error);
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );


  export const deleteBlog = createAsyncThunk(
    "user/deleteBlog",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`${apiUrl}/deleteblog?id=${id}`,{withCredentials:true});
        return response.data;
      } catch (error) {
        console.error("Error in Login:", error);
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );



  export const fetchSingleBlog = createAsyncThunk(
    "user/fetchSingleBlog",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${apiUrl}/fetchsingleblog?id=${id}`,{withCredentials:true});
        return response.data;
      } catch (error) {
        console.error("Error in Login:", error);
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );
  


  export const updateBlog = createAsyncThunk(
    "user/updateBlog",
    async (formData, { rejectWithValue }) => {
      try {
        const response = await axios.put(`${apiUrl}/updateblog`,formData,{withCredentials:true});
        return response.data;
      } catch (error) {
        console.error("Error in Login:", error);
        return rejectWithValue(error.response.data || "Something went wrong");
      }
    }
  );