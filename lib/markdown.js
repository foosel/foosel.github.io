import unified from "unified";
import parse from "remark-parse";
import rehype from "remark-rehype";
import format from "rehype-format";
import stringify from "rehype-stringify";

import { remarkPlugins, rehypePlugins } from "@lib/mdx";

function withPlugins(pipeline, plugins) {
    let p = pipeline;
    plugins.forEach((plugin) => {
        if (Array.isArray(plugin)) {
            p = p.use(plugin[0], plugin[1]);
        } else {
            p = p.use(plugin);
        }
    });
    return p;
}

function createPipeline() {
    let pipeline = unified().use(parse);
    pipeline = withPlugins(pipeline, remarkPlugins);
    pipeline = pipeline.use(rehype);
    pipeline = withPlugins(pipeline, rehypePlugins);
    pipeline = pipeline.use(format).use(stringify);
    return pipeline;
}

export default async function markdown2html(content) {
    return (await createPipeline().process(content)).toString();
}
