import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondScreen from "../../../common/screen/auth/SecondScreen";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useHistory } from "react-router-dom";

import {
    selectData,
    fetchUserSetting,
    updateUserSetting,
} from "../settingSlice";

import { MdKeyboardArrowRight } from "react-icons/md";

const SettingPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const sizeIcon = 25;

    const header = {
        leftBtn: true,
        leftBtnLink: null,
        leftBtnIcon: <IoIosArrowBack />,
        title: "Setting",
        rightBtn: false,
        rightBtnLink: null,
        rightBtnIcon: null,
    };

    useEffect(() => {
        dispatch(fetchUserSetting());
    }, []);

    const settingData = useSelector(selectData);

    const [isLoading, setIsLoading] = useState(false);

    const toggle = async () => {
        setIsLoading(true);
        const payload = {
            contact_saving_feature:
                settingData?.contact_saving_feature === 1 ? 0 : 1,
        };
        dispatch(updateUserSetting(payload));
        setIsLoading(false);
    };

    const handleRedirectContactGroupList = () => {
        history.push("/contact-group");
    };

    const data = true;

    return (
        <SecondScreen header={header}>
            <div className="h-full overflow-auto px-4 pb-8" id="page__setting">
                <div>
                    <h2 className="text-gray-800 text-xl font-bold mb-4">
                        Feature
                    </h2>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <h4 className="">Contact Saving</h4>
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        name="show_button_text"
                                        className="sr-only"
                                        value={data}
                                        defaultChecked={
                                            settingData?.contact_saving_feature ==
                                            1
                                                ? true
                                                : false
                                        }
                                        onChange={() => {
                                            toggle();
                                        }}
                                        disabled={isLoading}
                                    />
                                    <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                    <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-between items-center">
                            <h4 className="">Contact Group</h4>
                            <div
                                className="cursor-pointer"
                                onClick={handleRedirectContactGroupList}
                            >
                                <MdKeyboardArrowRight size={sizeIcon} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SecondScreen>
    );
};

export default SettingPage;
