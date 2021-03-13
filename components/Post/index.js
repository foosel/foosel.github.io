import React from "react";

import Page from "@components/Page";
import PreviousAndNext from "@components/PreviousAndNext";

export default function Post(props) {
    return (
        <Page {...props}>
            {props.html ? (
                <article
                    className="prose prose-full lg:prose-xl w-full mx-auto"
                    dangerouslySetInnerHTML={{ __html: props.html }}
                />
            ) : (
                <article className="prose lg:prose-xl w-full mx-auto">
                    {props.children}
                </article>
            )}
            <PreviousAndNext previous={props.previous} next={props.next} />
        </Page>
    );
}
