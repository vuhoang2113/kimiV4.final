import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondScreen from "../../../common/screen/auth/SecondScreen";
import { IoIosArrowBack } from "react-icons/io";
import { useHistory } from "react-router-dom";

import {
    getContact,
    selectContact,
    getContactGroup,
    deleteContact,
    selectContactGroup,
} from "../contactSlice";

import { MdDelete } from "react-icons/md";
import { AiFillTag } from "react-icons/ai";

const ContactGroupListPage = () => {
    const sizeIcon = 25;
    const dispatch = useDispatch();
    const history = useHistory();

    const header = {
        leftBtn: true,
        leftBtnLink: null,
        leftBtnIcon: <IoIosArrowBack />,
        title: "Contact Group",
        rightBtn: false,
        rightBtnLink: null,
        rightBtnIcon: null,
    };

    const contact = useSelector(selectContact);
    const contactGroup = useSelector(selectContactGroup);

    const checkContactGroupHaveContact = (contactGroupId) => {
        if (contact && contact.length > 0) {
            const result = contact.some(
                (item) =>
                    item.contact_detail.contact_group_id === contactGroupId
            );

            return result ? true : false;
        }
    };

    const handleDeleteContact = async (event, contactId) => {
        event.preventDefault();
        event.stopPropagation();
        await dispatch(deleteContact(contactId));
        await dispatch(getContact());
    };

    useEffect(async () => {
        await dispatch(getContactGroup());
        await dispatch(getContact());
    }, []);

    const handleClickContact = (uid) => {
        history.push(`/profile?uid=${uid}`);
    };

    return (
        <SecondScreen header={header}>
            <div
                className="h-full overflow-auto px-4 pt-4 pb-8"
                id="page__contact_group__list"
            >
                {contactGroup &&
                    contactGroup.length > 0 &&
                    contactGroup.map(
                        (itemContactGroup) =>
                            checkContactGroupHaveContact(
                                itemContactGroup.id
                            ) && (
                                <div
                                    key={itemContactGroup.id}
                                    className="mb-4 px-2 py-4"
                                >
                                    <div className="flex justify-start items-center gap-4 border mb-4 p-2 bg-yellow-50">
                                        <span>
                                            <AiFillTag />
                                        </span>
                                        <span>{itemContactGroup.name}</span>
                                    </div>
                                    {contact &&
                                        contact.length > 0 &&
                                        contact.map(
                                            (itemContact) =>
                                                itemContact.contact_detail
                                                    .contact_group.id ===
                                                    itemContactGroup.id && (
                                                    <div
                                                        className="pl-4"
                                                        key={itemContact.id}
                                                        onClick={() =>
                                                            handleClickContact(
                                                                itemContact
                                                                    .contact_user
                                                                    .uid.code
                                                            )
                                                        }
                                                    >
                                                        <div className="flex justify-between items-center gap-2 mb-4 px-2">
                                                            <div className="w-8">
                                                                <img
                                                                    src={
                                                                        itemContact
                                                                            .contact_user
                                                                            .profile_photo_url
                                                                    }
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="text-lg">
                                                                    {
                                                                        itemContact
                                                                            .contact_user
                                                                            .name
                                                                    }
                                                                </div>
                                                                <div className="text-gray-700 italic">
                                                                    {
                                                                        itemContact
                                                                            .contact_detail
                                                                            .note
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    handleDeleteContact(
                                                                        event,
                                                                        itemContact.id
                                                                    );
                                                                }}
                                                            >
                                                                <MdDelete
                                                                    size={
                                                                        sizeIcon
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        )}
                                </div>
                            )
                    )}
            </div>
        </SecondScreen>
    );
};

export default ContactGroupListPage;
