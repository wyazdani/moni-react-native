import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteAccountApi } from "../../api/auth";

export interface AuthState {
  user: any;
}

const initialState: AuthState = {
  user: null,
};

interface DeleteUserAction {
  onSuccess: () => void;
  onFinally: () => void;
}

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (action: DeleteUserAction) => {
    const res = await deleteAccountApi();
    if (res?.status == 200) {
      action.onSuccess();
      return true;
    }
    action.onFinally();
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveUser: (_, action: PayloadAction<any>) => ({
      user: action.payload,
    }),
    removeUserData: () => ({
      user: null,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      if (action.payload) {
        return {
          user: null,
        };
      } else {
        return state;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { saveUser, removeUserData } = authSlice.actions;

export default authSlice.reducer;
