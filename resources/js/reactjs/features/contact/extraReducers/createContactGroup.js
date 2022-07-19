export const createContactGroupReducer = {
    pending: (state, action) => {
        state.contactGroup.success = null;
        state.contactGroup.status_code = null;
        state.contactGroup.message = null;
    },
    fulfilled: (state, action) => {
        state.contactGroup.success = action.payload.success;
        state.contactGroup.status_code = action.payload.status_code;
        state.contactGroup.message = action.payload.message;
        if (action.payload.data) {
            if (
                state.contactGroup.data.length < 0 ||
                !state.contactGroup.data.some(
                    (item) => item.id === action.payload.data.id
                )
            ) {
                state.contactGroup.data.push({
                    id: action.payload.data.id,
                    name: action.payload.data.name,
                    user_id: action.payload.data.user_id,
                });
            }
        }
        state.contactGroup.data;
    },
    rejected: (state, action) => {
        state.contactGroup.success = action.payload?.success;
        state.contactGroup.status_code = action.payload?.status_code;
        state.contactGroup.message = action.payload?.message;
    },
};
