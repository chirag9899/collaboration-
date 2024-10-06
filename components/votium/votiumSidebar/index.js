import React from "react";
import { Sidebar } from "./styled";

export default function RoundsSidebar({ selecetedOption, setSelectedOption }) {
  return (
    <Sidebar>
      <div className="sidebar-content">
        <div className="header">
          <a href="#">Votium</a>
        </div>
        <nav>
          <span
            className={selecetedOption === "rounds" ? "active" : ""}
            onClick={() => setSelectedOption("rounds")}
          >
            Rounds
          </span>
          <span
            className={selecetedOption === "overview" ? "active" : ""}
            onClick={() => setSelectedOption("overview")}
          >
            Overview
          </span>
        </nav>
      </div>
      <footer>
        <a href="#">Donate</a>
      </footer>
    </Sidebar>
  );
}
