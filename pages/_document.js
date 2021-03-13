import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="/assets/fonts/economica/font.css"
                    />
                    <link
                        rel="stylesheet"
                        href="/assets/fonts/palanquin/font.css"
                    />
                    <script
                        type="text/javascript"
                        src="/assets/js/darkmode.js"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
