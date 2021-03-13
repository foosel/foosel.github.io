import "a17t/dist/a17t.css";
import "../styles/tailwind.css";
import "tailwindcss/utilities.css";
import "../styles/prism-vsc-dark-plus.css";
import "../styles/a17t-dark.css";
import "../styles/custom.css";

import { DefaultSeo } from "next-seo";

import config from "@data/config.yml";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <DefaultSeo {...config.seo} />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
