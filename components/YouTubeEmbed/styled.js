import style from "styled-components";

const playButtonSize = "75px";

export const PlayButton = style.div`
    background: rgba(10, 10, 10, .75);
    border-radius: ${playButtonSize};
    height: ${playButtonSize};
    position: absolute;
    width: ${playButtonSize};
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;

    &::before {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 15px 0 15px 30px;
        border-color: transparent transparent transparent #ffffff;
        position: absolute;
        top:0;
        left:0;
        right:-5px;
        bottom:0;
        margin: auto;
    }

    &:hover {
        background: red;
    }
`

export const Disclaimer = style.div`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;

    padding: 10px;
    background: rgba(10, 10, 10, .75);
    color: white;
    text-align: center;
    font-size: 0.7em;

    a {
        color: white;
    }
`
