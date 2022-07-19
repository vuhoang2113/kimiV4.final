export const getContactReducer = {
    pending: (state, action) => {
        state.contact.success = null;
        state.contact.status_code = null;
        state.contact.message = null;
        state.contact.data = [];
    },
    fulfilled: (state, action) => {
        state.contact.success = action.payload.success;
        state.contact.status_code = action.payload.status_code;
        state.contact.message = action.payload.message;
        state.contact.data = action.payload.data;
    },
    rejected: (state, action) => {
        state.contact.success = action.payload?.success;
        state.contact.status_code = action.payload?.status_code;
        state.contact.message = action.payload?.message;
        state.contact.data = [];
    },
};
