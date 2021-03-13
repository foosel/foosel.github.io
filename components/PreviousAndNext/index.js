import React from "react";

import Link from "next/link";

export default function PreviousAndNext({ previous, next }) {
    if (next || previous) {
        return (
            <p className="flex flex-row mt-6 text-inherit text-sm">
                {next && <Link href={next.link}>{"← " + next.title}</Link>}
                <span className="flex-1"></span>
                {previous && (
                    <Link href={previous.link}>{previous.title + " →"}</Link>
                )}
            </p>
        );
    } else {
        return null;
    }
}
