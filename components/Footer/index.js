import React from "react";

import Link from "next/link";

export default function Footer(props) {
    return (
        <footer className="p-4 bg-black text-white">
            <div className="max-w-screen-sm xl:max-w-screen-md mx-auto flex flex-col">
                <p className="text-white text-center">
                    Made with ❤ by{" "}
                    <a href="https://github.com/foosel">Gina Häußge</a>
                </p>
                <p className="text-white text-center">
                    <Link href="/legal">Legal Notice</Link> &middot;{" "}
                    <Link href="/privacy">Privacy Policy</Link> &middot;{" "}
                    <Link href="/feed/blog.atom">Feed</Link>
                </p>
            </div>
        </footer>
    );
    //return (null)
}
