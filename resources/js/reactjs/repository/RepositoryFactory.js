import RegisterRepository from "./module/registerRepository";
import AuthRepository from "./module/authRepository";
import ProfileRepository from "./module/profileRepository";
import FileRepository from "./module/fileRepository";
import aboutRepository from "./module/aboutRepository";
import settingRepository from "./module/settingRepository";
import contactRepository from "./module/contactRepository";

const repositories = {
    register: RegisterRepository,
    auth: AuthRepository,
    profile: ProfileRepository,
    file: FileRepository,
    about: aboutRepository,
    setting: settingRepository,
    contact: contactRepository,
};

const RepositoryFactory = {
    exec: (name) => repositories[name],
};

export default RepositoryFactory;
