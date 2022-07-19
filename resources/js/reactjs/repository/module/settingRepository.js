import Repository from "../Repository";

const resource = "/setting";

const settingRepository = {
    getUserSetting() {
        return Repository.get(`${resource}/user-setting`);
    },
    updateUserSetting: (payload) => {
        return Repository.put(`${resource}/user-setting`, payload);
    },
};

export default settingRepository;
