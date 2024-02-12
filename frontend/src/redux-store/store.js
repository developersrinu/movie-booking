import { createSlice, configureStore } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogedIn: false
    },
    reducers: {
        userLogin: (state) => {
            state.isLogedIn = true;
        },
        userLogout: (state) => {
            state.isLogedIn = false;
            localStorage.removeItem('userId')
        }
    }
});

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isLogedIn: false
    },
    reducers: {
        adminLogin: (state) => {
            state.isLogedIn = true;
        },
        adminLogout: (state) => {
            state.isLogedIn = false;
            localStorage.removeItem('adminId')
			localStorage.removeItem('token')
        }
    }
});

export const { userLogin, userLogout } = userSlice.actions;
export const { adminLogin, adminLogout } = adminSlice.actions;

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        admin: adminSlice.reducer
    }
});

export default store;

