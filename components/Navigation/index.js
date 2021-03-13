import React, { useState } from "react";

import Link from "next/link";
import HomeIcon from "mdi-react/HomeIcon";
import MenuIcon from "mdi-react/MenuIcon";
import DarkModeIcon from "mdi-react/Brightness6Icon";

const links = [
    { href: "/", title: "Home" },
    { href: "/about", title: "About Me" },
    { href: "/blog", title: "Blog" },
    { href: "/media", title: "Media" },
];

export default function Navigation(props) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(!open);
    };

    const menuClass = open ? "flex" : "hidden";
    const linkClass = "text-white uppercase font-semibold";

    const Menu = () => (
        <ul
            className={`flex-col mt-2 lg:mt-0 text-right lg:text-center lg:flex lg:flex-row lg:justify-end ${menuClass}`}
        >
            {links.map((link, i) => (
                <li key={"nav-" + i} className="my-2 lg:my-0 lg:mx-4">
                    <Link href={link.href}>
                        <a className={linkClass}>{link.title}</a>
                    </Link>
                </li>
            ))}
            <li key="nav-darkmode" className="lg:hidden my-2">
                <DarkModeToggle
                    className={linkClass}
                    onDarkToggle={props.onDarkToggle}
                />
            </li>
        </ul>
    );

    const DarkModeToggle = (props) => (
        <a
            className={props.className}
            onClick={props.onDarkToggle}
            title="Toggle dark mode"
        >
            <DarkModeIcon className="inline cursor-pointer" />
        </a>
    );

    const MenuToggle = () => (
        <span className="flex flex-row justify-end lg:hidden cursor-pointer">
            <div onClick={toggleOpen}>
                <MenuIcon />
            </div>
        </span>
    );

    const HomeJump = () => (
        <span className="justify-start">
            <Link href="/">
                <a className={linkClass}>foosel.net</a>
            </Link>
        </span>
    );

    return (
        <nav className="fixed bg-black text-white p-4 w-full z-50">
            <div className="w-screen-sm xl:w-screen-md lg:mx-auto flex flex-col lg:flex-row content-end lg:justify-center">
                <div className="flex flex-row lg:absolute lg:left-4">
                    <HomeJump />
                </div>
                <div className="absolute right-4">
                    <DarkModeToggle
                        className="justify-end hidden lg:inline"
                        onDarkToggle={props.onDarkToggle}
                    />
                    <MenuToggle />
                </div>
                <Menu />
            </div>
        </nav>
    );
}
