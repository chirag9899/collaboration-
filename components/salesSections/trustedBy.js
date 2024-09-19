import _ from "lodash";
import React from "react";
import { Eyebrow, LogoImage, Section, TrustedByContainer } from "./styled";

export default function TrustedBySection() {
  const trustedByList = [
    {
      src: "/imgs/logos/berachain.png",
      alt: "berachain",
      link: "#",
    },
    {
      src: "/imgs/logos/taiko.png",
      alt: "taiko",
      link: "#",
    },
    {
      src: "/imgs/logos/bitcoin.png",
      alt: "bitcoin",
      link: "#",
    },
    {
      src: "/imgs/logos/rune.svg",
      alt: "rune",
      link: "#",
    },
    {
      src: "/imgs/logos/brc20.png",
      alt: "brc20",
    },
    {
      src: "/imgs/logos/saltwater.png",
      alt: "saltwater",
      link: "#",
    },
    {
      src: "/imgs/logos/daedalus.svg",
      alt: "daedalus",
      link: "#",
    },
    {
      src: "/imgs/logos/owl.png",
      alt: "Owl",
      link: "#",
    },
    {
      src: "/imgs/logos/degendao.svg",
      alt: "digendao",
      link: "#",
    },
  ];
  return (
    <Section>
      <TrustedByContainer>
        <Eyebrow>Trusted by</Eyebrow>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {trustedByList.map((item, index) => (
            <a
              href={item.link}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LogoImage src={item.src} alt={item.alt} />
            </a>
          ))}
        </div>
      </TrustedByContainer>
    </Section>
  );
}
