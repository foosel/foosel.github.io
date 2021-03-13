import React from "react";

import { rewriteAssetUrl } from "@lib/util";

export function AssetLink(props) {
    return (
        <a {...props} href={rewriteAssetUrl(props.href, props.pathname)}>
            {props.children}
        </a>
    );
}

export function ImageAsset(props) {
    return <img {...props} src={rewriteAssetUrl(props.src, props.pathname)} />;
}
