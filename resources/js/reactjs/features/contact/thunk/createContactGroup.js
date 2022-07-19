import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const contactRepository = RepositoryFactory.exec("contact");

export const createContactGroup = createAsyncThunk(
    "contact/create-contact-group",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await contactRepository.createContactGroup(payload);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
