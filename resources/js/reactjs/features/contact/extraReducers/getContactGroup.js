export const getContactGroupReducer = {
    pending: (state, action) => {
        state.contactGroup.success = null;
        state.contactGroup.status_code = null;
        state.contactGroup.message = null;
        state.contactGroup.data = [];
    },
    fulfilled: (state, action) => {
        state.contactGroup.success = action.payload.success;
        state.contactGroup.status_code = action.payload.status_code;
        state.contactGroup.message = action.payload.message;
        state.contactGroup.data = action.payload.data;
    },
    rejected: (state, action) => {
        state.contactGroup.success = action.payload?.success;
        state.contactGroup.status_code = action.payload?.status_code;
        state.contactGroup.message = action.payload?.message;
        state.contactGroup.data = action.payload?.data;
    },
};
