import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import RepositoryFactory from "../../repository/RepositoryFactory";
// import LocalStorageService from "../../app/localStorageService";

import { fetchUser } from "./thunk/fetchUser";
import { putMe } from "./thunk/putMe";
import { uploadMyAvatar } from "./thunk/uploadMyAvatar";
import { uploadMyBackground } from "./thunk/uploadMyBackground";
import { checkSavedContact } from "./thunk/checkSavedContact";

export { fetchUser } from "./thunk/fetchUser";
export { putMe } from "./thunk/putMe";
export { uploadMyAvatar } from "./thunk/uploadMyAvatar";
export { uploadMyBackground } from "./thunk/uploadMyBackground";
export { checkSavedContact } from "./thunk/checkSavedContact";

import { fetchUserReducer } from "./extraReducers/fetchUser";
import { putMeReducer } from "./extraReducers/putMe";
import { uploadMyAvatarReducer } from "./extraReducers/uploadMyAvatar";
import { uploadMyBackgroundReducer } from "./extraReducers/uploadMyBackground";
import { checkSavedContactReducer } from "./extraReducers/checkSavedContact";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        componentStatus: {
            update: {
                processing: false,
                resolved: false,
            },
        },
        response: {
            user: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
            uploadAvatar: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
            uploadBackground: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
            savedContact: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
        },
    },
    reducers: {
        deleteMessage(state) {
            state.response.message = null;
        },
    },
    extraReducers(builder) {
        /* Fetch User */
        builder
            .addCase(fetchUser.pending, fetchUserReducer.pending)
            .addCase(fetchUser.fulfilled, fetchUserReducer.fulfilled)
            .addCase(fetchUser.rejected, fetchUserReducer.rejected);

        /* Put Me */
        builder
            .addCase(putMe.pending, putMeReducer.pending)
            .addCase(putMe.fulfilled, putMeReducer.fulfilled)
            .addCase(putMe.rejected, putMeReducer.rejected);

        /* Upload Avatar */
        builder
            .addCase(uploadMyAvatar.pending, uploadMyAvatarReducer.pending)
            .addCase(uploadMyAvatar.fulfilled, uploadMyAvatarReducer.fulfilled)
            .addCase(uploadMyAvatar.rejected, uploadMyAvatarReducer.rejected);

        /* Upload Background */
        builder
            .addCase(
                uploadMyBackground.pending,
                uploadMyBackgroundReducer.pending
            )
            .addCase(
                uploadMyBackground.fulfilled,
                uploadMyBackgroundReducer.fulfilled
            )
            .addCase(
                uploadMyBackground.rejected,
                uploadMyBackgroundReducer.rejected
            );

        /* Check Saved Contact */
        builder
            .addCase(
                checkSavedContact.pending,
                checkSavedContactReducer.pending
            )
            .addCase(
                checkSavedContact.fulfilled,
                checkSavedContactReducer.fulfilled
            )
            .addCase(
                checkSavedContact.rejected,
                checkSavedContactReducer.rejected
            );
    },
});
/* Action */
export const profileActions = profileSlice.actions;

/* Selectors */
export const selectUpdate = (state) =>
    state.profile?.componentStatus.update || null;

export const selectSuccess = (state) =>
    state.profile?.response.user.success || null;
export const selectStatusCode = (state) =>
    state.profile?.response.user.status_code || null;
export const selectMessage = (state) =>
    state.profile?.response.user.message || null;
export const selectCheckSavedContact = (state) =>
    state.profile?.response.savedContact.data || false;
export const selectUser = (state) => state.profile?.response.user.data || null;

/* Reducer */
const profileReducer = profileSlice.reducer;
export default profileReducer;
