import React from "react";

import Layout from "@components/Layout";
import DateFormatter from "@components/DateFormatter";

import ClockIcon from "mdi-react/ClockOutlineIcon";

export default function Page(props) {
    return (
        <>
            <Layout {...props}>
                {props.title && <PageHeader {...props} />}
                <div className="flex flex-col w-full px-4 mt-8">
                    {props.children}
                </div>
            </Layout>
        </>
    );
}

export function PageHeader(props) {
    return (
        <div className="flex flex-col space-y-4 mb-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-center">
                {props.title}
            </h1>
            {props.subtitle && (
                <p className="text-3xl md:text-4xl lg:text-5xl text-center">
                    {props.subtitle}
                </p>
            )}
            {props.published ? (
                <p className="italic text-center">
                    {props.updated ? (
                        <>
                            Posted on{" "}
                            <DateFormatter dateString={props.published} /> and
                            updated on{" "}
                            <DateFormatter dateString={props.updated} />
                        </>
                    ) : (
                        <>
                            Posted on{" "}
                            <DateFormatter dateString={props.published} />
                        </>
                    )}
                </p>
            ) : null}
            {props.readingtime && (
                <p className="text-center text-xs">
                    <ClockIcon
                        className="inline-block object-center"
                        size={12}
                    />{" "}
                    {props.readingtime.text}
                </p>
            )}
            {props.image && (
                <img
                    src={props.image.url}
                    alt={props.image.alt}
                    className="w-full"
                />
            )}
        </div>
    );
}
