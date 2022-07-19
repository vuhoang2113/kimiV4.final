import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const contactRepository = RepositoryFactory.exec("contact");

export const getContact = createAsyncThunk(
    "contact/list",
    async (_, { rejectWithValue }) => {
        try {
            const res = await contactRepository.getContact();
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
