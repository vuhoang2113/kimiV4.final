/*
    initialState: {
        componentStatus: {
            update: {
                processing: false,
                resolved: false,
            },
        },
        response: {
            user: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
            uploadAvatar: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
            uploadBackground: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
            savedContact: {
                success: null,
                status_code: null,
                message: null,
                data: null,
            },
        },
    },
*/

export const checkSavedContactReducer = {
    pending: (state, action) => {
        state.componentStatus.update.processing = true;
        state.componentStatus.update.resolved = false;

        state.response.savedContact.success = null;
        state.response.savedContact.status_code = null;
        state.response.savedContact.message = null;
        state.response.savedContact.data = false;
    },
    fulfilled: (state, action) => {
        state.response.savedContact.success = action.payload.success;
        state.response.savedContact.status_code = action.payload.status_code;
        state.response.savedContact.message = action.payload.message;
        state.response.savedContact.data = action.payload.data;
    },
    rejected: (state, action) => {
        state.response.savedContact.success = action.payload?.success;
        state.response.savedContact.status_code = action.payload?.status_code;
        state.response.savedContact.message = action.payload?.message;
        state.response.savedContact.data = action.payload?.data;
    },
};
