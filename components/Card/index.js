import React from "react";

export function Card(props) {
    const priority = props.prio || "normal";
    const type = props.type || "neutral";
    const classes = `card ~${type} !${priority}`;
    return <div className={classes}>{props.children}</div>;
}

export function Aside(props) {
    const type = props.type || "neutral";
    const classes = `aside ~${type}`;
    return <div className={classes}>{props.children}</div>;
}
