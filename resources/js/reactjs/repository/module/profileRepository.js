import Repository from "../Repository";

const resource = "/profile";

const profileRepository = {
    user(uid = "me") {
        uid = uid == null ? "me" : uid;
        return Repository.get(`${resource}/${uid}`);
    },
    putMe(payload) {
        return Repository.put(`${resource}/me`, payload);
    },
    uploadAvatar(fd) {
        return Repository.post(`${resource}/avatar`, fd);
    },
    uploadBackground(fd) {
        return Repository.post(`${resource}/background`, fd);
    },
    checkSavedContact(uid) {
        return Repository.get(`${resource}/check-saved-contact/${uid}`);
    },
};

export default profileRepository;
