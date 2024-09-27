import React from "react";
import { Sidebar } from "./styled";
import Image from "next/image";

export default function RoundsSidebar() {
  return (
    <Sidebar>
      <div className="sidebar-content">
        <div className="header">
          <a href="#">Rounds</a>
        </div>
        <nav>
          <a href="#" className="active">
            <Image src="/imgs/icons/cup.svg" alt="cup" width={20} height={20} />
            <span>Rounds</span>
          </a>
          
         
          <a href="#">
            <Image
              src="/imgs/icons/whale-dark.svg"
              alt="whale image"
              width={20}
              height={20}
            />
            <span>Overview</span>
          </a>
        </nav>
       
      </div>
      <footer>
        <a href="/donate">Donate</a>
        <a href="https://twitter.com/DefiWars_" target="_blank"></a>
      </footer>
    </Sidebar>
  );
}
