import { apis } from "@component/apiendpoints/api";
import axiosInstance from "@component/hooks/AxiosInstanse";



const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUserProfile = createAsyncThunk(
  "getUserProfile",
  async (args, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${apis.GETUSERPROFILE}`);
    
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: "",
    error: "",
    addCustomeHotel : false,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setAddCustomeHotel: (state,action)=>{
      state.addCustomeHotel = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.pending, (state, action) => {
      state.loading = "getuser";
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = "";
      state.user = action.payload.user;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading = "";
      state.error = action.payload;
    });
  },
});

export const AuthActions = authSlice.actions;
const AuthReducer = authSlice.reducer;
export default AuthReducer;