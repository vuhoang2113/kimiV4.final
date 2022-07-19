import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const profileRepository = RepositoryFactory.exec("profile");

export const checkSavedContact = createAsyncThunk(
    "profile/user/check-saved-contact",
    async (uid, { rejectWithValue }) => {
        try {
            const res = await profileRepository.checkSavedContact(uid);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
