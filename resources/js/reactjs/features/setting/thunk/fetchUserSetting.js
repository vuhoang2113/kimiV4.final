import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";

const settingRepository = RepositoryFactory.exec("setting");

export const fetchUserSetting = createAsyncThunk(
    "setting/user-setting/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await settingRepository.getUserSetting();
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);

export const updateUserSetting = createAsyncThunk(
    "setting/user-setting/update-contact-saving-feature",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await settingRepository.updateUserSetting(payload);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
