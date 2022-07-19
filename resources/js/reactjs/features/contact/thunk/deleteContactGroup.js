import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const contactRepository = RepositoryFactory.exec("contact");

export const deleteContactGroup = createAsyncThunk(
    "contact/delete-contact-group",
    async (id, { rejectWithValue }) => {
        try {
            const res = await contactRepository.deleteContactGroup(id);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
