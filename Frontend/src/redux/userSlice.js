import { createSlice } from "@reduxjs/toolkit";
// import { login } from "./userThunk";

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
   
  },
});

export const { Logout } = userSlice.actions;
export default userSlice.reducer;
