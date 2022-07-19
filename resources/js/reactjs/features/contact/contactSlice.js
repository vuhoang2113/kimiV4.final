import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { createContact } from "./thunk/createContact";
import { getContactGroup } from "./thunk/getContactGroup";
import { createContactGroup } from "./thunk/createContactGroup";
import { deleteContactGroup } from "./thunk/deleteContactGroup";
import { getContact } from "./thunk/getContact";
import { deleteContact } from "./thunk/deleteContact";

export { createContact } from "./thunk/createContact";
export { getContactGroup } from "./thunk/getContactGroup";
export { createContactGroup } from "./thunk/createContactGroup";
export { deleteContactGroup } from "./thunk/deleteContactGroup";
export { getContact } from "./thunk/getContact";
export { deleteContact } from "./thunk/deleteContact";

import { createContactReducer } from "./extraReducers/createContact";
import { getContactGroupReducer } from "./extraReducers/getContactGroup";
import { createContactGroupReducer } from "./extraReducers/createContactGroup";
import { deleteContactGroupReducer } from "./extraReducers/deleteContactGroup";
import { getContactReducer } from "./extraReducers/getContact";
import { deleteContactReducer } from "./extraReducers/deleteContact";

export const contactSlice = createSlice({
    name: "contact",
    initialState: {
        contact: {
            success: null,
            status_code: null,
            message: null,
            data: [],
        },
        contactGroup: {
            success: null,
            status_code: null,
            message: null,
            data: [],
        },
    },
    reducers: {
        deleteMessage(state) {
            state.response.contact.message = null;
            state.response.contactGroup.message = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getContactGroup.pending, getContactGroupReducer.pending)
            .addCase(
                getContactGroup.fulfilled,
                getContactGroupReducer.fulfilled
            )
            .addCase(getContactGroup.rejected, getContactGroupReducer.rejected);
        builder
            .addCase(
                createContactGroup.pending,
                createContactGroupReducer.pending
            )
            .addCase(
                createContactGroup.fulfilled,
                createContactGroupReducer.fulfilled
            )
            .addCase(
                createContactGroup.rejected,
                createContactGroupReducer.rejected
            );
        builder
            .addCase(
                deleteContactGroup.pending,
                deleteContactGroupReducer.pending
            )
            .addCase(
                deleteContactGroup.fulfilled,
                deleteContactGroupReducer.fulfilled
            )
            .addCase(
                deleteContactGroup.rejected,
                deleteContactGroupReducer.rejected
            );
        builder
            .addCase(createContact.pending, createContactReducer.pending)
            .addCase(createContact.fulfilled, createContactReducer.fulfilled)
            .addCase(createContact.rejected, createContactReducer.rejected);
        builder
            .addCase(getContact.pending, getContactReducer.pending)
            .addCase(getContact.fulfilled, getContactReducer.fulfilled)
            .addCase(getContact.rejected, getContactReducer.rejected);
        builder
            .addCase(deleteContact.pending, deleteContactReducer.pending)
            .addCase(deleteContact.fulfilled, deleteContactReducer.fulfilled)
            .addCase(deleteContact.rejected, deleteContactReducer.rejected);
    },
});
/* Action */
export const contactActions = contactSlice.actions;

/* Selectors */
export const selectSuccess = (state) =>
    state.contact?.contactGroup.success || null;
export const selectStatusCode = (state) =>
    state.contact?.contactGroup.status_code || null;
export const selectMessage = (state) =>
    state.contact?.contactGroup.message || null;
export const selectContactGroup = (state) =>
    state.contact?.contactGroup.data || null;
export const selectContact = (state) => state.contact?.contact.data || null;

/* Reducer */
const contactReducer = contactSlice.reducer;
export default contactReducer;
