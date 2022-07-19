import { createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryFactory from "../../../repository/RepositoryFactory";
const contactRepository = RepositoryFactory.exec("contact");

export const deleteContact = createAsyncThunk(
    "contact/delete-contact",
    async (id, { rejectWithValue }) => {
        try {
            const res = await contactRepository.deleteContact(id);
            return res.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            return rejectWithValue(err.response);
        }
    }
);
