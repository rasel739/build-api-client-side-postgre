import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASE_URL;
const initialState = {
  resetAuth: null,
  loading: false,
  error: null,
};

export const resetPassword = createAsyncThunk(
  "resetPassword/resetPasswordEmail",
  async (resetEmail) => {
    const { email } = resetEmail;
    const res = await axios.post(`${baseUrl}/reset-password`, {
      email: email,
    });

    return res.data;
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "resetPassword/resetPasswordConfirm",
  async (resetPasswordConfirms) => {
    const { email,token, confirmPassword } = resetPasswordConfirms;
    const res = await axios.post(
      `${baseUrl}/reset-password/${email}/${token}`,
      {
       
        password: confirmPassword,
      }
    );

    return res.data;
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  extraReducers: (builder) => {
    // reset password
    builder.addCase(resetPassword, (state) => {
      state.loading = true;
    });

    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetAuth = action.payload;
      state.loading = false;
    });

    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //reset password confirmation
    // builder.addCase(resetPasswordConfirm, (state) => {
    //   state.loading = true;
    // });

    // builder.addCase(resetPasswordConfirm.fulfilled, (state, action) => {
    //   state.resetAuth = action.payload;
    //   state.loading = false;
    // });

    // builder.addCase(resetPasswordConfirm.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  },
});

export default resetPasswordSlice.reducer;
