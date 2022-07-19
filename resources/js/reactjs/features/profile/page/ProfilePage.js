import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useQuery } from "../../../utils/router";
import {
    fetchUser,
    profileActions,
    checkSavedContact,
    selectUser,
    selectSuccess,
    selectCheckSavedContact,
} from "../profileSlice";

import { selectData, fetchUserSetting } from "../../setting/settingSlice";

import FirstScreen from "../../../common/screen/auth/FirstScreen";
import {
    selectComponentStatusLoginResolved,
    selectAuthUser,
} from "../../auth/authSlice";
import Head from "./components/index/Head";
import List from "./components/index/List";
import ListSecondDisplay from "./components/index/ListSecondDisplay";

import { BiLink } from "react-icons/bi";
import { AiOutlineEdit, AiFillContacts } from "react-icons/ai";

const ProfilePage = () => {
    const query = useQuery();
    const uid = query.get("uid") || null;

    const dispatch = useDispatch();
    const history = useHistory();

    const profileData = useSelector(selectUser);
    const success = useSelector(selectSuccess);
    const isSavedContact = useSelector(selectCheckSavedContact);

    const isLoggedIn = useSelector(selectComponentStatusLoginResolved);
    const authUser = useSelector(selectAuthUser);

    const [isOwnerProfile, setOwnerProfileState] = useState(false);
    const checkOwnerProfile = () => {
        if (uid === null) return true;
        else {
            console.log(authUser);
            if (authUser) {
                return authUser.uid.code === uid;
            }
        }
        return false;
    };

    const settingData = useSelector(selectData);

    const [isSavingContactFeatureState, setSavingContactFeatureState] =
        useState(false);

    useEffect(() => {
        if (settingData) {
            setSavingContactFeatureState(
                settingData.contact_saving_feature == 1 ? true : false
            );
        } else {
            setSavingContactFeatureState(false);
        }
    }, [settingData]);

    useEffect(() => {
        dispatch(fetchUser(uid));
        if (isLoggedIn) {
            if (uid && authUser) {
                dispatch(checkSavedContact(uid));
            }
            setOwnerProfileState(checkOwnerProfile());
        } else {
            if (uid == null) {
                history.push("/login");
            }
        }
    }, []);

    useEffect(() => {
        if (authUser) {
            setOwnerProfileState(checkOwnerProfile());
        }
    }, [authUser]);

    useEffect(() => {
        if (_.isEmpty(profileData) === true && success) {
            dispatch(profileActions.deleteMessage());
            history.push("/404");
        }
    }, [profileData]);

    return (
        <FirstScreen>
            <div className="w-full h-full" id="page__profile">
                <div className="px-6 pt-24 z-10">
                    <div className=" relative bg-white opacity-88 rounded-sm px-4 pt-16 pb-4 ">
                        <div className="absolute inset-x-0 top-0 transform -translate-y-1/2">
                            <div className="flex justify-center items-center">
                                <div className="rounded-full w-32 overflow-hidden">
                                    <div className="aspect-w-1 aspect-h-1">
                                        <img
                                            src={profileData?.profile_photo_url}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                            {isLoggedIn && isOwnerProfile && (
                                <div className="px-2">
                                    <div className="flex justify-end transform -translate-y-full">
                                        <NavLink
                                            to="/profile/edit"
                                            className="flex justify-between items-center px-2 w-20 border-2 rounded shadow-lg border-blue-500 text-blue-500 bg-gray-50 hover:bg-gray-200 hover:text-blue-700"
                                        >
                                            <span>
                                                <AiOutlineEdit />
                                            </span>
                                            <span>Edit</span>
                                        </NavLink>
                                    </div>
                                </div>
                            )}
                            {isLoggedIn &&
                                !isOwnerProfile &&
                                !isSavedContact &&
                                isSavingContactFeatureState &&
                                uid && (
                                    <div className="px-2">
                                        <div className="flex justify-end transform -translate-y-full">
                                            <NavLink
                                                to={`/contact/create?uid=${uid}`}
                                                className="flex justify-between items-center px-2 w-20 border-2 rounded shadow-lg border-blue-500 text-blue-500 bg-gray-50 hover:bg-gray-200 hover:text-blue-700"
                                            >
                                                <span>
                                                    <AiFillContacts />
                                                </span>
                                                <span>Save</span>
                                            </NavLink>
                                        </div>
                                    </div>
                                )}
                        </div>
                        <Head profileData={profileData} />
                        <hr className="my-4" />
                        <ListSecondDisplay profileData={profileData} />
                    </div>
                </div>
                {isLoggedIn && isOwnerProfile && (
                    <div className="fixed right-1 bottom-14">
                        <NavLink
                            to="/about"
                            className="flex justify-between items-center rounded px-2 w-24 bg-blue-500 text-white hover:bg-blue-700 hover:text-gray-50"
                        >
                            <span>
                                <BiLink />
                            </span>
                            <span>Edit Link</span>
                        </NavLink>
                    </div>
                )}
            </div>
        </FirstScreen>
    );
};

export default ProfilePage;
