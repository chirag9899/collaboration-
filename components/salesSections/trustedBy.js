import _ from "lodash";
import React from "react";
import { Eyebrow, LogoImage, Section, TrustedByContainer } from "./styled";

export default function TrustedBySection() {
  const trustedByList = [
    {
      src: "/imgs/logos/Berachain.svg",
      alt: "berachain",
      link: "#",
    },
    {
      src: "/imgs/logos/Taiko.svg",
      alt: "taiko",
      link: "#",
    },
    {
      src: "/imgs/logos/Bitcoin.svg",
      alt: "bitcoin",
      link: "#",
    },
    {
      src: "/imgs/logos/Thorchain.svg",
      alt: "rune",
      link: "#",
    },
    {
      src: "/imgs/logos/BRC20.svg",
      alt: "brc20",
    },
    {
      src: "/imgs/logos/Saltwater Lab.png",
      alt: "saltwater",
      link: "#",
    },
    {
      src: "/imgs/logos/Daedalus.svg",
      alt: "daedalus",
      link: "#",
    },
    {
      src: "/imgs/logos/Owl Ventures.svg",
      alt: "Owl",
      link: "#",
    },
    {
      src: "/imgs/logos/DegenDAO.svg",
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
