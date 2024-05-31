import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
    token: string;
}
const initialState = { 
  token: "",
} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action){
      state.token = action.payload;
    },
    clearToken(state){
      state.token = "";
    }
  },
})

export const { setToken, clearToken } = authSlice.actions
export default authSlice.reducer