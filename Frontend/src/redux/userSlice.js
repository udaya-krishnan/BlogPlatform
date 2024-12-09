import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userThunk";

// Safely parse localStorage data with fallback
const getLocalStorageData = () => {
  try {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Failed to parse localStorage data:", error);
    return null; // Fallback to null if parsing fails
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: getLocalStorageData(),
  },
  reducers: {
    Logout: (state) => {
      localStorage.removeItem("data");
      state.data = null;
    },
  },
  extraReducers: (builder) => {
     builder
     .addCase(loginUser.fulfilled, (state, action) => {
      const data= action.payload.data; 
      localStorage.setItem("data", JSON.stringify(data)); 
      state.data =data

    })
  },
});

export const { Logout } = userSlice.actions;
export default userSlice.reducer;
