import React from "react";

import Error404 from "../features/error/page/Error404Page";

import GuidePage from "../features/guide/page/GuidePage";
import HomePage from "../features/home/page/HomePage";

import LoginPage from "../features/auth/page/LoginPage";
import LogoutPage from "../features/auth/page/LogoutPage";

import RegisterPage from "../features/register/page/RegisterPage";

import ProfilePage from "../features/profile/page/ProfilePage";
import ProfileEditPage from "../features/profile/page/ProfileEditPage";

import AboutPage from "../features/about/page/AboutPage";
import AboutLinkPage from "../features/about/page/link/AboutLinkPage";
import AboutLinkCreatePage from "../features/about/page/link/AboutLinkCreatePage";
import AboutLinkEditPage from "../features/about/page/link/AboutLinkEditPage";

import SettingPage from "../features/setting/page/SettingPage";

import ListContactPage from "../features/contact/page/ListContact";
import CreateContactPage from "../features/contact/page/create";
import ContactGroupListPage from "../features/contact/page/ContactGroupList";

const routes = [
    {
        auth: false,
        path: "/guide",
        exact: true,
        main: () => <GuidePage />,
    },
    {
        auth: true,
        path: "/",
        exact: true,
        main: () => <HomePage />,
    },
    {
        auth: false,
        path: "/login",
        exact: true,
        main: () => <LoginPage />,
    },
    {
        auth: true,
        path: "/logout",
        exact: true,
        main: () => <LogoutPage />,
    },
    {
        auth: false,
        path: "/register",
        exact: true,
        main: () => <RegisterPage />,
    },
    {
        auth: false,
        path: "/profile",
        exact: true,
        main: () => <ProfilePage />,
    },

    {
        auth: true,
        path: "/profile/edit",
        exact: true,
        main: () => <ProfileEditPage />,
    },
    {
        auth: true,
        path: "/contact-group",
        exact: true,
        main: () => <ContactGroupListPage />,
    },
    {
        auth: true,
        path: "/contact",
        exact: true,
        main: () => <ListContactPage />,
    },
    {
        auth: true,
        path: "/contact/create",
        exact: true,
        main: () => <CreateContactPage />,
    },
    {
        auth: true,
        path: "/about",
        exact: true,
        main: () => <AboutPage />,
    },
    {
        auth: true,
        path: "/about/link",
        exact: true,
        main: () => <AboutLinkPage />,
    },
    {
        auth: true,
        path: "/about/create",
        exact: true,
        main: () => <AboutLinkCreatePage />,
    },
    {
        auth: true,
        path: "/about/edit",
        exact: true,
        main: () => <AboutLinkEditPage />,
    },
    {
        auth: true,
        path: "/setting",
        exact: true,
        main: () => <SettingPage />,
    },
    {
        auth: false,
        path: "/404",
        exact: true,
        main: () => <Error404 />,
    },
    {
        auth: false,
        path: "*",
        exact: true,
        main: () => <Error404 />,
    },
];

export default routes;
