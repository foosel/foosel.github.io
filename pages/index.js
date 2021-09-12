import Page from "@components/Page";
import Link from "next/link";
import { NextSeo } from "next-seo";

import config from "@data/config.yml";

import GitHubIcon from "mdi-react/GithubIcon";
import TwitterIcon from "mdi-react/TwitterIcon";
import LinkedInIcon from "mdi-react/LinkedinIcon";
import MailIcon from "mdi-react/EmailIcon";

import generate from "@lib/generate";

function SocialButton(props) {
    return (
        <a
            className="rounded-full text-white bg-black dark:text-black dark:bg-white p-1 mx-4"
            href={props.link}
            target="_blank"
            rel="nofollow noreferrer"
        >
            {props.children}
        </a>
    );
}

export default function Home() {
    return (
        <>
            <NextSeo title="Home" description="" canonical={config.external} />
            <Page>
                <div className="dark:text-white text-center">
                    <img
                        className="rounded-full mx-auto mb-8"
                        src="/img/avatar-2021-250x250.jpg"
                    />
                    <h1 className="mb-8">Hi, I'm Gina Häußge aka foosel!</h1>
                    <p className="max-w-sm text-center mx-auto mb-8">
                        Passionate code monkey&nbsp;🐒 Geek&nbsp;👩‍💻
                        Gamer&nbsp;🎮 Hobby baker&nbsp;👩‍🍳 Creator &amp;
                        maintainer of OctoPrint&nbsp;🐙 GitHub Star&nbsp;🌟
                    </p>
                    <div className="flex flex-row items-center justify-center mb-8">
                        <SocialButton link={config.social.github}>
                            <GitHubIcon />
                        </SocialButton>
                        <SocialButton link={config.social.twitter}>
                            <TwitterIcon />
                        </SocialButton>
                        <SocialButton link={config.social.linkedin}>
                            <LinkedInIcon />
                        </SocialButton>
                        <SocialButton link={config.social.mail}>
                            <MailIcon />
                        </SocialButton>
                    </div>
                    <div className="text-center w-full mb-8">
                        <Link href="/about">More about me?</Link>
                    </div>
                </div>
            </Page>
        </>
    );
}

export async function getStaticProps() {
    await generate();
    return { props: {} };
}
