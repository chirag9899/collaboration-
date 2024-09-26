import _ from "lodash";
import React from "react";
import { Eyebrow, LogoImage, Section, TrustedByContainer } from "./styled";

export default function TrustedBySection() {
  const trustedByList = [
    {
      src: "/imgs/logos/Berachain.svg",
      alt: "berachain",
      link: "https://www.berachain.com",
    },
    {
      src: "/imgs/logos/Taiko.svg",
      alt: "taiko",
      link: "https://taiko.xyz",
    },
    {
      src: "/imgs/logos/Bitcoin.svg",
      alt: "bitcoin",
      link: "https://bitcoin.org",
    },
    {
      src: "/imgs/logos/Thorchain.svg",
      alt: "rune",
      link: "https://thorchain.org",
    },
    {
      src: "/imgs/logos/BRC20.svg",
      alt: "brc20",
      link: "https://brc20.com",
    },
    {
      src: "/imgs/logos/Saltwater Lab.png",
      alt: "saltwater",
      link: "https://saltwaterlab.io",
    },
    {
      src: "/imgs/logos/Daedalus.svg",
      alt: "daedalus",
      link: "https://x.com/daedalus_angels",
    },
    {
      src: "/imgs/logos/Owl Ventures.svg",
      alt: "Owl",
      link: "https://x.com/OwlVentures",
    },
    {
      src: "/imgs/logos/DegenDAO.svg",
      alt: "digendao",
      link: "https://x.com/DegenCitadel",
    },
    {
      src: "/imgs/logos/Sonic.svg",
      alt: "sonic",
      link: "https://x.com/sonic",
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
