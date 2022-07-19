import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const contactRepository = RepositoryFactory.exec("contact");

export const createContact = createAsyncThunk(
    "contact/create",
    async (payload, { rejectWithValue }) => {
        try {
            const res = await contactRepository.createContact(payload);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
