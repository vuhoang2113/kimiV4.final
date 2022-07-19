import React, { useState } from "react";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import ValidateMessage from "../../../utils/validateMessage";
import { useQuery } from "../../../utils/router";
import {
    fetchUser,
    profileActions,
    selectUser,
    selectSuccess,
} from "../../profile/profileSlice";
import { selectContactGroup } from "../contactSlice";

import {
    getContactGroup,
    createContactGroup,
    createContact,
} from "../contactSlice";
import {
    selectCheckSavedContact,
    checkSavedContact,
} from "../../profile/profileSlice";

import * as Yup from "yup";

import FirstScreen from "../../../common/screen/auth/FirstScreen";

import Head from "../../profile/page/components/index/Head";

const CreateContactPage = () => {
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();

    const uid = query.get("uid") || null;

    const profileData = useSelector(selectUser);
    const success = useSelector(selectSuccess);

    const contactGroup = useSelector(selectContactGroup);

    const handleOptionContactGroup = async () => {
        if (contactGroup) {
            const option = contactGroup.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setOptionContactGroup(option);
        }
    };

    const [optionContactGroup, setOptionContactGroup] = useState([]);
    const [loading, setLoading] = useState(true);
    const isSavedContact = useSelector(selectCheckSavedContact);

    useEffect(async () => {
        setLoading(true);

        if (!uid) {
            history.push("/404");
        } else {
            await dispatch(checkSavedContact(uid));
            await dispatch(fetchUser(uid));
            await dispatch(getContactGroup());
            await handleOptionContactGroup();
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (isSavedContact && loading === false) {
            history.push("/profile");
        }
    });

    useEffect(() => {
        if (_.isEmpty(profileData) === true && success) {
            dispatch(profileActions.deleteMessage());
            history.push("/404");
        }
    }, [profileData]);

    useEffect(() => {
        if (uid && contactGroup) {
            const option = contactGroup.map((item) => ({
                label: item.name,
                value: item.id,
            }));
            setOptionContactGroup(option);
        }
    }, [contactGroup]);

    const validationSchema = Yup.object().shape({
        category: Yup.string().required(ValidateMessage.required("category")),
        note: Yup.string().max(1024, "Maximum 1024 characters"),
    });

    const handleChangeCategory = async (field, form, newValue, actionMeta) => {
        if (actionMeta.action === "select-option") {
            form.setFieldValue(field.name, newValue.value);
        } else if (actionMeta.action === "create-option") {
            const payload = {
                name: newValue.label,
            };
            await dispatch(createContactGroup(payload));
        }
    };

    return (
        <FirstScreen>
            <div className="w-full h-full" id="page__contact__create">
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
                        </div>
                        <Head profileData={profileData} />
                        <hr className="my-4" />
                        <div>
                            <Formik
                                initialValues={{
                                    category: "",
                                    note: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={async (values) => {
                                    if (profileData) {
                                        const payload = {
                                            contact_user_id: profileData.id,
                                            contact_group_id: values.category,
                                            note: values.note,
                                        };
                                        await dispatch(
                                            createContact(payload)
                                        ).then(() => {
                                            history.push("/contact");
                                        });
                                    }
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div>
                                            <label>
                                                <div>
                                                    <h3 className="text-base mb-2">
                                                        Category
                                                    </h3>
                                                    <Field name="category">
                                                        {({
                                                            field,
                                                            form,
                                                            meta,
                                                        }) => (
                                                            <div>
                                                                <CreatableSelect
                                                                    name={
                                                                        field.name
                                                                    }
                                                                    className="w-full mb-2"
                                                                    onChange={(
                                                                        newValue,
                                                                        actionMeta
                                                                    ) =>
                                                                        handleChangeCategory(
                                                                            field,
                                                                            form,
                                                                            newValue,
                                                                            actionMeta
                                                                        )
                                                                    }
                                                                    options={
                                                                        optionContactGroup
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="category"
                                                        component="div"
                                                        className="text-red-500 text-xs italic bg-red-200 px-2 py-1 rounded"
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <div>
                                                    <h3 className="text-base mb-2">
                                                        Note
                                                    </h3>
                                                    <Field
                                                        name="note"
                                                        className="w-full px-2 py-2 mb-2 rounded"
                                                    >
                                                        {({
                                                            field,
                                                            form,
                                                            meta,
                                                        }) => (
                                                            <textarea
                                                                {...field}
                                                                rows="4"
                                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Your note..."
                                                            ></textarea>
                                                        )}
                                                    </Field>
                                                    <ErrorMessage
                                                        name="note"
                                                        component="div"
                                                        className="text-red-500 text-xs italic bg-red-200 px-2 py-1 rounded"
                                                    />
                                                </div>
                                            </label>
                                        </div>
                                        <div className="flex justify-center my-4">
                                            <button
                                                type="submit"
                                                className="px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </FirstScreen>
    );
};

export default CreateContactPage;
