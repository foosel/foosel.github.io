import React, { useState } from "react";

import ResponsiveIframe from "@components/ResponsiveIframe";
import { PlayButton, Disclaimer } from "./styled";

export function YouTubePlaceholder(props) {
    const vid = props.vid;
    const preview =
        props.preview || `https://i.ytimg.com/vi/${vid}/hqdefault.jpg`;

    return (
        <div
            style={{
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0,
            }}
        >
            <div
                style={{
                    backgroundImage: `url(${preview})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundColor: "black",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        paddingBottom: "56.25%" /* 16:9 */,
                        paddingTop: 25,
                        height: 0,
                    }}
                ></div>
                <PlayButton onClick={props.onConfirmed} />
                <Disclaimer>
                    This video will be embedded from Youtube. The{" "}
                    <a
                        href="https://policies.google.com/privacy?hl=en"
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        Privacy Policies of Google
                    </a>{" "}
                    apply.
                </Disclaimer>
            </div>
        </div>
    );
}

export default function YouTubeEmbed(props) {
    const domain = "www.youtube-nocookie.com";
    const vid = props.vid;
    const url = `https://${domain}/embed/${vid}`;

    const [consent, setConsent] = useState(!!props.consent);

    if (consent) {
        return <ResponsiveIframe url={url} />;
    } else {
        return (
            <YouTubePlaceholder
                vid={vid}
                preview={props.preview}
                onConfirmed={() => setConsent(true)}
            />
        );
    }
}
