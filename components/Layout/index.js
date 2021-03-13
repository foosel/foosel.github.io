import React, { useState } from "react";

import Navigation from "../Navigation";
import Footer from "../Footer";

export default function Layout(props) {
    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
        const theme = localStorage.theme;
        if (theme === "dark") {
            localStorage.theme = "light";
        } else {
            localStorage.theme = "dark";
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navigation onDarkToggle={toggleDark} />

            <main className="container flex-grow mx-auto justify-content py-4 pt-20">
                <div className="flex flex-col max-w-screen-sm xl:max-w-screen-md mx-auto justify-content">
                    {props.children}
                </div>
            </main>

            <Footer />
        </div>
    );
}
