import React from "react";
import { Sidebar } from "./styled";
import Image from "next/image";

export default function WarsSidebar() {
  return (
    <Sidebar>
      <div className="sidebar-content">
        <div className="header">
          <a href="#">Beravote Wars</a>
        </div>
        <nav>
          <a href="#" className="active">
            <Image src="/imgs/icons/cup.svg" alt="cup" width={20} height={20} />
            <span>Token Wars</span>
          </a>
          <a href="#">
            <Image
              src="/imgs/icons/project.svg"
              alt="cup"
              width={20}
              height={20}
            />
            <span>Projects</span>
          </a>
          <a href="#">
            <Image
              src="/imgs/icons/token.svg"
              alt="cup"
              width={20}
              height={20}
            />
            <span>Tokens</span>
          </a>
          <a href="#">
            <Image
              src="/imgs/icons/whale-dark.svg"
              alt="whale image"
              width={20}
              height={20}
            />
            <span>Whales</span>
          </a>
        </nav>
        <div className="sponsors">
          <h2>Sponsors</h2>
          <p>
            Thanks to the sponsors below for supporting Beravote Wars. None of the
            following is investment advice.
          </p>
          <div className="sponsor-logos">
            <a href="/wars/convex">
              <img alt="Convex logo" src="/imgs/logos/convex-finance.svg" />
            </a>
            <a href="/wars/aura">
              <img alt="Aura logo" src="/imgs/logos/aura.png" />
            </a>
          </div>
        </div>
      </div>
      <footer>
        <a href="/donate">Donate</a>
        <a href="https://twitter.com/DefiWars_" target="_blank"></a>
      </footer>
    </Sidebar>
  );
}
