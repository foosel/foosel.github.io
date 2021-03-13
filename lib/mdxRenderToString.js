import renderToString from "next-mdx-remote/render-to-string";
import { dynamicComponents, remarkPlugins, rehypePlugins } from "@lib/mdx";

export default async function mdxRenderToString(source, addedComponents) {
    const c = dynamicComponents(addedComponents || {});
    return await renderToString(source, {
        components: c,
        mdxOptions: {
            remarkPlugins: remarkPlugins,
            rehypePlugins: rehypePlugins,
        },
    });
}
