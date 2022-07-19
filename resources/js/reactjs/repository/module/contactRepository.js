import Repository from "../Repository";

const resource = "/contact";

const contactRepository = {
    getContactGroup() {
        return Repository.get(`${resource}/group`);
    },
    createContactGroup(payload) {
        return Repository.post(`${resource}/group`, payload);
    },
    deleteContactGroup(id) {
        return Repository.delete(`${resource}/group/${id}`);
    },
    createContact(payload) {
        return Repository.post(`${resource}`, payload);
    },
    getContact(payload) {
        return Repository.get(`${resource}`);
    },
    deleteContact(id) {
        return Repository.delete(`${resource}/${id}`);
    },
};

export default contactRepository;
