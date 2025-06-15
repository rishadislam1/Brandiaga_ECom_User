import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    isAuthenticated: boolean;
    username: string | null;
    role: string | null;
}

const initialState: UserState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).firstName || null : null,
    role: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).roleName || null : null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ username: string; role: string }>) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.role = action.payload.role;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.username = null;
            state.role = null;
            localStorage.removeItem('token');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;