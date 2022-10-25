import { Grid, Row } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const Footer = () => {
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
      <div style={{ marginLeft: "20px", width: "70vw" }}>
        <h3 style={{ marginBottom: "0" }}>About:-</h3>
        <p>
          {" "}
          Genesis Swap is a <span className="spanned">FREE</span> and{" "}
          <span>OPEN SOURCE</span> DeFi swap created by Mohammad Ayaan Siddiqui.
          The website has been created using 0xProtocol, alchemy sdk, next.js
          and nextUi. Here is a guide to use it:- 1) Install metamask extension
          2) Connect to the wallet. 3) Select from token 4) Select to token 5)
          Swap the tokens
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
        <p style={{ fontSize: "12px" }}>Copyright ©️ 2022.</p>
      </div>
    </div>
  );
};

export default Footer;
