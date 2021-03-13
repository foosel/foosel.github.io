import React from "react";

export default function ResponsiveIframe(props) {
    const url = props.url;
    return (
        <div style={{
            position: "relative", 
            paddingBottom: "56.25%", /* 16:9 */
            paddingTop: 25, 
            height: 0
        }}>
            <iframe 
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                src={url} 
                frameBorder={0} />
        </div>
    )
}
