import hydrate from "next-mdx-remote/hydrate";
import { dynamicComponents } from "@lib/mdx";

export default function mdxHydrate(source, addedComponents) {
    const c = dynamicComponents(addedComponents || {});
    return hydrate(source, { components: c });
}
