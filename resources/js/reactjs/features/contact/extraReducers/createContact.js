export const createContactReducer = {
    pending: (state, action) => {
        state.contact.success = null;
        state.contact.status_code = null;
        state.contact.message = null;
    },
    fulfilled: (state, action) => {
        state.contact.success = action.payload.success;
        state.contact.status_code = action.payload.status_code;
        state.contact.message = action.payload.message;
    },
    rejected: (state, action) => {
        state.contact.success = action.payload?.success;
        state.contact.status_code = action.payload?.status_code;
        state.contact.message = action.payload?.message;
    },
};
