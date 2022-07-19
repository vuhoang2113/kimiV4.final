import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const contactRepository = RepositoryFactory.exec("contact");

export const getContactGroup = createAsyncThunk(
    "contact/get-contact-group",
    async (uid, { rejectWithValue }) => {
        try {
            const res = await contactRepository.getContactGroup(uid);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
