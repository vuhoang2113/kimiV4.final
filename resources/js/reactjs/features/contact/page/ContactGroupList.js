import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondScreen from "../../../common/screen/auth/SecondScreen";
import { IoIosArrowBack } from "react-icons/io";

import {
    getContactGroup,
    deleteContactGroup,
    selectContactGroup,
} from "../contactSlice";

import { MdDelete } from "react-icons/md";
import { AiFillTag } from "react-icons/ai";

const ContactGroupListPage = () => {
    const sizeIcon = 25;
    const dispatch = useDispatch();

    const header = {
        leftBtn: true,
        leftBtnLink: null,
        leftBtnIcon: <IoIosArrowBack />,
        title: "Contact Group",
        rightBtn: false,
        rightBtnLink: null,
        rightBtnIcon: null,
    };

    const contactGroup = useSelector(selectContactGroup);

    useEffect(() => {
        dispatch(getContactGroup());
    }, []);

    const handleDeleteContactGroup = async (id) => {
        await dispatch(deleteContactGroup(id));
        await dispatch(getContactGroup());
    };

    return (
        <SecondScreen header={header}>
            <div
                className="h-full overflow-auto px-4 pt-4 pb-8"
                id="page__contact_group__list"
            >
                {contactGroup &&
                    contactGroup.length > 0 &&
                    contactGroup.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-200 mb-4 px-2 py-4 rounded shadow-lg flex justify-between items-center"
                        >
                            <div className="flex justify-start items-center gap-2">
                                <span>
                                    <AiFillTag />
                                </span>
                                <span>{item.name}</span>
                            </div>
                            <button
                                onClick={() =>
                                    handleDeleteContactGroup(item.id)
                                }
                            >
                                <MdDelete size={sizeIcon} />
                            </button>
                        </div>
                    ))}
            </div>
        </SecondScreen>
    );
};

export default ContactGroupListPage;
