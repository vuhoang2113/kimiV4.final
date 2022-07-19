import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserSetting, updateUserSetting } from "./thunk/fetchUserSetting";
import { fetchUserSettingReducer } from "./extraReducers/fetchUserSetting";
import { updateUserSettingReducer } from "./extraReducers/updateUserSettingReducer";

export { fetchUserSetting, updateUserSetting } from "./thunk/fetchUserSetting";

// import RepositoryFactory from "../../repository/RepositoryFactory";
// import LocalStorageService from "../../app/localStorageService";

export const settingSlice = createSlice({
    name: "setting",
    initialState: {
        response: {
            success: null,
            status_code: null,
            message: null,
            data: null,
        },
    },
    reducers: {
        deleteMessage(state) {
            state.response.message = null;
        },
    },
    extraReducers(builder) {
        /* Fetch User Setting*/
        builder
            .addCase(fetchUserSetting.pending, fetchUserSettingReducer.pending)
            .addCase(
                fetchUserSetting.fulfilled,
                fetchUserSettingReducer.fulfilled
            )
            .addCase(
                fetchUserSetting.rejected,
                fetchUserSettingReducer.rejected
            );
        builder
            .addCase(
                updateUserSetting.pending,
                updateUserSettingReducer.pending
            )
            .addCase(
                updateUserSetting.fulfilled,
                updateUserSettingReducer.fulfilled
            )
            .addCase(
                updateUserSetting.rejected,
                updateUserSettingReducer.rejected
            );
    },
});
/* Action */
export const settingActions = settingSlice.actions;

/* Selectors */
export const selectSuccess = (state) => state?.response.success || null;
export const selectStatusCode = (state) => state?.response.status_code || null;
export const selectMessage = (state) => state?.response.message || null;
export const selectData = (state) => state.setting?.response.data || null;

/* Reducer */
const settingReducer = settingSlice.reducer;
export default settingReducer;
