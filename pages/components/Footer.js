import { Grid, Row } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import "../../styles/Footer.module.css";
import { Text } from "@nextui-org/react";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div
      style={{
        bottom: "0",
        nBottom: "0",
        position: "fixed",
        left: " 0",
        bottom: "0",
        width: "100%",
        backgroundColor: "green",
        color: "white",

        borderTop: "2px black",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
      }}
    >
      <div style={{ marginLeft: "20px", width: "75vw" }}>
        <h3 style={{ marginBottom: "0" }}>About:-</h3>
        <p>
          {" "}
          Genesis Swap is a <span style={{ fontWeight: "bold" }}>
            FREE
          </span> and <span style={{ fontWeight: "bold" }}>OPEN SOURCE</span>{" "}
          DeFi swap on ETH MAINNET. The website is a{" "}
          <span style={{ fontWeight: "bold" }}> PRACTICE project</span> and
          advised <span style={{ fontWeight: "bold" }}>NOT</span> to use for{" "}
          <span style={{ fontWeight: "bold" }}>PROFESSIONAL PURPOSES.</span>{" "}
          Here is a guide to use to site:- 💠Install Metamask 💠Connect to ETH
          MAINNET 💠Select FROM and TO tokens 💠Perform Swap. 📌For video demo,
          click{" "}
          <Link href="https://www.loom.com/share/33e15b0d2bdf42ea98bcc1a3330fcf76">
            <a
              target={"_blank"}
              style={{ color: "white", textDecoration: "underline" }}
            >
              HERE
            </a>
          </Link>
        </p>
      </div>
      <div style={{ textAlign: "center", width: "25vw" }}>
        <h5 style={{ marginBottom: "0", marginTop: "10px" }}>
          Created by <i class="fa-brands fa-ethereum"></i>{" "}
          <span style={{ color: "greenyellow" }}>MOHAMMAD AYAAN SIDDIQUI</span>{" "}
          <i class="fa-brands fa-ethereum"></i>{" "}
        </h5>
        <Link href="https://linktr.ee/ayaaneth" target="_blank">
          <a target={"_blank"} style={{ cursor: "pointer" }}>
            <img src="linktree.png" alt="twitter" />
          </a>
        </Link>
        <Link
          href="https://github.com/moayaan1911"
          style={{ cursor: "pointer" }}
          target="_blank"
        >
          <a target={"_blank"} style={{ cursor: "pointer" }}>
            <img src="github.png" alt="github" />
          </a>
        </Link>
        <Link
          href="https://www.linkedin.com/in/ayaaneth/"
          style={{ cursor: "pointer" }}
          target="_blank"
        >
          <a target={"_blank"} style={{ cursor: "pointer" }}>
            <img src="linkedin.png" alt="linkedin" />
          </a>
        </Link>
        <Link
          href="https://twitter.com/usdisshitcoin"
          style={{ cursor: "pointer" }}
          target="_blank"
        >
          <a target={"_blank"} style={{ cursor: "pointer" }}>
            <img src="twitter.png" alt="twitter" />
          </a>
        </Link>
        <p style={{ fontSize: "12px" }}>Copyright ©️ {currentYear}.</p>
      </div>
    </div>
  );
};

export default Footer;
