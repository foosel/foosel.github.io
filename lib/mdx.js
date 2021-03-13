import YouTubeEmbed from "@components/YouTubeEmbed";
import { Card, Aside } from "@components/Card";
import { AssetLink, ImageAsset } from "@components/Assets";
import footnotes from "remark-footnotes";
import prism from "rehype-prism";

export const components = {
    YouTubeEmbed: YouTubeEmbed,
    Card: Card,
    Aside: Aside,
};

export const DynamicImageAsset = (pathname) => (props) =>
    ImageAsset({ pathname: pathname, ...props });

export const DynamicAssetLink = (pathname) => (props) =>
    AssetLink({ pathname: pathname, ...props });

export const dynamicComponents = (added) => ({
    ...components,
    ...added,
});

export const assetComponents = (pathname) => ({
    img: DynamicImageAsset(pathname),
    a: DynamicAssetLink(pathname),
});

export const remarkPlugins = [footnotes];

export const rehypePlugins = [prism];

/* Make use of this once mdx switches to a current version of remark
function customDirectives() {
    return transform;

    function transform(tree) {
        visit(
            tree,
            ["textDirective", "leafDirective", "containerDirective"],
            ondirective
        );
    }

    function ondirective(node) {
        if (node.type === "containerDirective") {
            if (node.name === "card") {
                const prio = node.attributes.prio || "normal";
                const type = node.attributes.type || "neutral";
                const classes = `card !${prio} ~${type}`;

                const data = node.data || (node.data = {});
                const props = data.hProperties || (data.hProperties = {});

                props.class = classes;
            } else if (node.name === "aside") {
                const type = node.attributes.type || "neutral";
                const classes = `aside ~${type}`;

                const data = node.data || (node.data = {});
                const props = data.hProperties || (data.hProperties = {});

                props.class = classes;
            }
        } else if (node.type === "leafDirective") {
            if (node.name === "youtube") {
                const vid = node.attributes.vid;
                const embed = ReactDOMServer.renderToStaticMarkup(
                    <YouTubeEmbed vid={vid} />
                );

                node.type = "html";
                node.children = undefined;
                node.value = embed;
            }
        }
    }
}

export default async function markdown2html(content) {
    const pipeline = unified()
        .use(parse)
        .use(footnotes, { inlineNotes: true })
        .use(directive)
        .use(customDirectives)
        .use(rehype, { allowDangerousHtml: true })
        .use(raw)
        .use(prism)
        .use(format)
        .use(stringify);
    const result = (await pipeline.process(content)).toString();
    return result;
}
*/
