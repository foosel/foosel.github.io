import config from "@data/config.yml";

export function rewriteAssetUrl(url, pathname) {
    if (url.startsWith("./")) {
        return "/assets/content" + pathname + url.substring(1);
    }
    return url;
}

export function externalize(url) {
    if (url.startsWith("/")) {
        return config.external + url;
    }
    return url;
}
