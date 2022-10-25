import { Input } from "@nextui-org/react";
import {
  Card,
  Col,
  Row,
  Button,
  Text,
  Modal,
  useModal,
  Avatar,
  Grid,
  Spacer,
} from "@nextui-org/react";
import React from "react";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import qs from "qs";
import Erc20 from "../engine/erc20.json";
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
import Image from "next/image";
import Link from "next/link";
require("dotenv").config();
export default function Defiswap() {
  const { visible, setVisible } = useModal();
  const [flogo, getFromLogo] = useState([]);
  const [fname, getFromName] = useState(["Swap From"]);
  const [faddr, getFromAddr] = useState([]);
  const [fdec, getFromDec] = useState([]);
  const [tlogo, getToLogo] = useState([]);
  const [tname, getToName] = useState(["Swap To"]);
  const [taddr, getToAddr] = useState([]);
  const [tdec, getToDec] = useState([]);
  const [holdup, setHold] = useState("");
  const [wallet, getWallet] = useState([]);
  const [alert, setAlert] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const config = {
    apiKey: process.env.AlchemyAPI,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  var zeroxapi = "https://api.0x.org";

  useEffect(() => {}, [getFromLogo, getFromName, getFromAddr, getFromDec]);

  useEffect(() => {}, [getToLogo, getToName, getToAddr]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getPrice();
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [holdup]);

  let currentTrade = {};
  let currentSelectSide = null;
  let toTrade = {};
  let toSelectSide = null;

  const sendAlert = () => setAlert(true);

  const fromHandler = (side) => {
    if (wallet.includes("0x")) {
      setVisible(true);
      currentSelectSide = side;
      listFromTokens();
    } else {
      sendAlert();
    }
  };
  const fromSearch = (side) => {
    if (wallet.includes("0x")) {
      setVisible(true);
      currentSelectSide = side;
      listFromSearch();
    } else {
      sendAlert();
    }
  };
  const toHandler = (side) => {
    setVisible(true);
    toSelectSide = side;
    listToTokens();
    getPrice();
  };

  var account = null;
  var web3 = null;

  const closeHandler = () => {
    setVisible(false);
    setAlert(false);
    console.log("closed");
  };
  async function connect() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    web3 = new Web3(connection);
    await connection.send("eth_requestAccounts");
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("wallet-address").textContent =
      "➡️" + account + "⬅️";
    if (account !== null) {
      document.getElementById("status").textContent = "CONNECTED!😃";
    } else {
      document.getElementById("status").textContent = "CONNECT";
    }
    getWallet(account);
  }

  async function listFromTokens() {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    var tokens = tokenListJSON.tokens;
    let parent = document.getElementById("token_list");
    for (const i in tokens) {
      let div = document.createElement("div");
      div.className = "token_row";
      let html = `
          <img className="token_list_img" width="12%" src="${tokens[i].logoURI}">
            <span className="token_list_text">${tokens[i].name}</span>
            `;
      div.innerHTML = html;
      div.onclick = () => {
        selectFrom(tokens[i]);
      };
      parent.appendChild(div);
    }
  }

  async function listFromSearch() {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    var tokens = tokenListJSON.tokens;
    let parent = document.getElementById("token_list");
    for (const i in tokens) {
      var name = tokens[i].name.toLowerCase();
      if (name == contractAddress) {
        let div = document.createElement("div");
        div.className = "token_row";
        let html = `
            <img className="token_list_img" width="12%" src="${tokens[i].logoURI}">
              <span className="token_list_text">${tokens[i].name}</span>
              `;
        div.innerHTML = html;
        div.onclick = () => {
          selectFrom(tokens[i]);
        };
        parent.innerHTML = html;
        parent.appendChild(div);
      }
    }
  }

  function selectFrom(token) {
    currentTrade[currentSelectSide] = token;
    closeHandler();
    var fromName = token.symbol;
    var fromLogo = token.logoURI;
    var fromAddr = token.address;
    var fromDec = token.decimals;
    getFromName(fromName);
    getFromLogo(fromLogo);
    getFromAddr(fromAddr);
    getFromDec(fromDec);
  }

  async function displayBalance() {
    const tokenContractAddresses = [faddr];
    const data = await alchemy.core.getTokenBalances(
      wallet,
      tokenContractAddresses
    );
    data.tokenBalances.find((item) => {
      let rawbalance = parseInt(item.tokenBalance, 16).toString();
      let formatbalance = Number(Web3.utils.fromWei(rawbalance));
      let balance = formatbalance.toFixed(2);
      if (
        item.tokenBalance ===
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      ) {
        document.getElementById("get_balance").innerHTML = "0.00";
      } else {
        document.getElementById("get_balance").innerHTML = balance;
      }
    });
  }

  async function listToTokens() {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    var tokens = tokenListJSON.tokens;
    let parent = document.getElementById("token_list");
    for (const i in tokens) {
      let div = document.createElement("div");
      div.className = "token_row";
      let html = `
        <img className="token_list_img" width="12%" src="${tokens[i].logoURI}">
        <span className="token_list_text">${tokens[i].name}</span>
          `;
      div.innerHTML = html;
      div.onclick = () => {
        selectTo(tokens[i]);
      };
      parent.appendChild(div);
    }
  }
  async function listToSearch() {
    let response = await fetch("https://tokens.coingecko.com/uniswap/all.json");
    let tokenListJSON = await response.json();
    var tokens = tokenListJSON.tokens;
    let parent = document.getElementById("token_list");
    for (const i in tokens) {
      let div = document.createElement("div");
      div.className = "token_row";
      let html = `
        <img className="token_list_img" width="12%" src="${tokens[i].logoURI}">
        <span className="token_list_text">${tokens[i].symbol}</span>
          `;
      div.innerHTML = html;
      div.onclick = () => {
        selectTo(tokens[i]);
      };
      parent.appendChild(div);
    }
  }
  function selectTo(token) {
    toTrade[toSelectSide] = token;
    closeHandler();
    var toName = token.symbol;
    var toLogo = token.logoURI;
    var toAddr = token.address;
    var toDec = token.decimals;
    getToName(toName);
    getToLogo(toLogo);
    getToAddr(toAddr);
    getToDec(toDec);
    displayBalance();
  }
  async function getPrice() {
    console.log("Getting Price");
    if (!faddr || !taddr || !document.getElementById("from_amount").value)
      return;
    let amount = Number(
      document.getElementById("from_amount").value * 10 ** fdec
    );
    const params = {
      sellToken: faddr,
      buyToken: taddr,
      sellAmount: amount,
    };
    const response = await fetch(
      zeroxapi + `/swap/v1/price?${qs.stringify(params)}`
    );
    const sources = await fetch(
      zeroxapi + `/swap/v1/quote?${qs.stringify(params)}`
    );
    var swapPriceJSON = await response.json();
    console.log(swapPriceJSON);
    var swapOrders = await sources.json();
    try {
      await swapOrders.orders.find((item) => {
        document.getElementById("defisource").innerHTML = item.source;
      });
    } catch (error) {
      document.getElementById("defisource").innerHTML = "Pool Not Available";
    }
    var rawvalue = swapOrders.buyAmount / 10 ** tdec;
    var value = rawvalue.toFixed(2);
    document.getElementById("to_amount").innerHTML = value;
    document.getElementById("gas_estimate").innerHTML =
      swapPriceJSON.estimatedGas;
  }

  async function swapit() {
    if (!faddr || !taddr || !document.getElementById("from_amount").value)
      return;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    web3 = new Web3(connection);
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const userWallet = await signer.getAddress();
    let amount = Number(
      document.getElementById("from_amount").value * 10 ** fdec
    );
    const params = {
      sellToken: faddr,
      buyToken: taddr,
      sellAmount: amount,
    };
    const fromTokenAddress = faddr;
    const getquote = await fetch(
      zeroxapi + `/swap/v1/quote?${qs.stringify(params)}`
    );
    var quote = await getquote.json();
    var proxy = quote.allowanceTarget;
    var amountstr = amount.toString();
    const ERC20Contract = new ethers.Contract(fromTokenAddress, Erc20, signer);
    const approval = await ERC20Contract.approve(proxy, amountstr);
    await approval.wait();
    const txParams = {
      ...quote,
      from: userWallet,
      to: quote.to,
      value: quote.value.toString(16),
      gasPrice: null,
      gas: quote.gas,
    };
    await ethereum.request({
      method: "eth_sendTransaction",
      params: [txParams],
    });
  }

  return (
    <Grid.Container
      gap={1}
      justify="center"
      css={{ margin: "auto", paddingTop: "20px" }}
    >
      <Button
        rounded
        onPress={connect}
        style={{
          marginTop: "25px",
          marginBottom: "10px",
        }}
        className="connectButton"
        shadow
        css={{
          backgroundColor: "rgb(4, 104, 4)",
          boxShadow: "",
          "&:hover": {
            backgroundColor: "$black",
            boxShadow: "-4px 4px #888888",
          },
        }}
      >
        <Text
          css={{ color: "white" }}
          size={16}
          weight="bold"
          transform="uppercase"
          id="status"
          className="connectTitle"
        >
          CONNECT 🙇
        </Text>
      </Button>
      <Row justify="center">
        <Grid sm={4}>
          <Card variant="bordered">
            <Grid sm={4} justify="center" style={{ margin: "auto" }}>
              <Link href="https://forms.gle/iu7smRWnwu35XDEG6">
                <a target={"_blank"}>
                  <Button
                    size={"lg"}
                    style={{ marginRight: "2px" }}
                    shadow
                    css={{
                      backgroundColor: "rgb(4, 104, 4)",
                      boxShadow: "",
                      "&:hover": {
                        backgroundColor: "$black",
                        boxShadow: "4px 4px #888888",
                      },
                    }}
                  >
                    FEEDBACK FORM 📃
                  </Button>
                </a>
              </Link>
              <Button
                size={"lg"}
                style={{ marginLeft: "2px" }}
                shadow
                css={{
                  backgroundColor: "rgb(4, 104, 4)",
                  boxShadow: "",
                  "&:hover": {
                    backgroundColor: "$black",
                    boxShadow: "4px 4px #888888",
                  },
                }}
              >
                GITHUB REPO . <i class="fa-brands fa-github"></i>
              </Button>
            </Grid>
            <Text
              h2={true}
              css={{
                display: "flex",
                justifyContent: "center",
                textRendering: "geometricPrecision",
                fontFamily: "SF Pro Display",
                fontWeight: "$extrabold",
                m: "$0",
                color: "$green800",
                fontSize: "$4xl",
              }}
            >
              Genesis Swap
            </Text>
          </Card>
        </Grid>
      </Row>
      <Modal
        scroll
        closeButton
        blur
        aria-labelledby="connect_modal"
        onClose={closeHandler}
        open={alert}
      >
        Please Connect Wallet
        <Modal.Footer>
          <Button auto flat color="primary" onClick={connect}>
            Connect Wallet
          </Button>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Text h5="true">Select a token</Text>
      <Row justify="center">
        <Grid sm={4}>
          <Col>
            <Card
              variant="bordered"
              css={{
                color: "white",
                opacity: "80%",
                fontFamily: "SF Pro Display",
                fontWeight: "300",
                fontSize: "30px",
                textShadow: "0px 0px 2px #000000",
                boxShadow: "0px 0px 4px #39FF14",
              }}
            >
              <Col>
                <Input
                  type="text"
                  size="$3xl"
                  css={{ fontFamily: "SF Pro Display", color: "white" }}
                  className="number"
                  color="default"
                  placeholder="amount"
                  id="from_amount"
                  onChange={(e) => setHold(e.target.value)}
                />
              </Col>
            </Card>
          </Col>
          <Col>
            <a onClick={fromHandler}>
              <Text
                size="$3xl"
                css={{
                  fontFamily: "SF Pro Display",
                  fontWeight: "400",
                  ml: "$10",
                }}
              >
                <img src={flogo} style={{ width: "50px" }} />
                {" " + fname} ⬇️
              </Text>
            </a>
            <Row justify="center">
              <Text css={{ marginLeft: "$3", fontSize: "$lg" }}>Balance:</Text>
              <Text
                css={{
                  marginLeft: "$3",
                  fontSize: "$lg",
                  fontFamily: "SF Pro Display",
                  color: "$blue600",
                }}
                id="get_balance"
              ></Text>
            </Row>
          </Col>
        </Grid>
      </Row>
      <Modal
        scroll
        closeButton
        blur
        aria-labelledby="token_modal"
        onClose={closeHandler}
        open={visible}
      >
        <Modal.Body>
          <Grid>
            <Input
              type="text"
              size="$3xl"
              css={{ fontFamily: "SF Pro Display", color: "white" }}
              className="number"
              color="default"
              placeholder="Paste Token Address"
              onChange={(e) => setContractAddress(e.target.value)}
              value={contractAddress}
            />
            <Button size={"xs"} onPress={listFromSearch}>
              Search
            </Button>
          </Grid>
          <Text size={16}>Or Choose Below:</Text>
          <div id="token_list" style={{ cursor: "pointer" }}></div>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Row justify="center">
        <img src="arrow.png" width={"4%"} style={{ marginBottom: "20px" }} />
      </Row>
      <Row justify="center">
        <Grid sm={4}>
          <Card
            variant="bordered"
            css={{
              opacity: "80%",
              fontFamily: "SF Pro Display",
              fontWeight: "300",
              fontSize: "30px",
              boxShadow: "0px 0px 4px #39FF14",
            }}
          >
            <Col>
              <Text
                type="text"
                size="$4xl"
                css={{
                  fontFamily: "SF Pro Display",
                  color: "black",
                  textShadow: "0px 0px 3px #39FF14",
                  ml: "$2",
                }}
                className="number"
                color="black"
                id="to_amount"
              />
            </Col>
          </Card>
          <Spacer />
          <Col>
            <a onClick={toHandler}>
              <Text
                size="$3xl"
                css={{
                  fontFamily: "SF Pro Display",
                  fontWeight: "400",
                  ml: "$10",
                }}
              >
                <img src={tlogo} style={{ width: "50px" }} />
                {" " + tname} ⬆️
              </Text>
            </a>
          </Col>
        </Grid>
      </Row>
      <Grid sm={4}>
        <Row justify="center">
          <Card
            isPressable
            css={{ backgroundColor: "rgb(4, 104, 4)" }}
            onPress={swapit}
          >
            <Text
              css={{
                display: "flex",
                justifyContent: "center",
                color: "black",
                textShadow: "0px 0px 2px #000000",
                color: "white",
              }}
              size="$3xl"
              weight="bold"
              transform="uppercase"
            >
              SWAP 💵
            </Text>
          </Card>
        </Row>
      </Grid>
      <Row justify="center">
        <Grid sm={4}>
          <Row>
            <Text size={20} css={{ marginLeft: "$5" }}>
              Gas Estimate ⛽ :{" "}
            </Text>
            <p
              style={{
                fontFamily: "SF Pro Display",
                fontSize: "24px",
                marginLeft: "4px",
                color: "black",
                fontWeight: "bold",
              }}
              id="gas_estimate"
            ></p>
          </Row>
          <Row>
            <Text size={24} css={{ marginLeft: "$5" }}>
              LP Provider 🎢:{" "}
            </Text>
            <p
              style={{
                fontFamily: "SF Pro Display",
                fontSize: "25px",
                marginLeft: "4px",
                fontWeight: "bold",
              }}
              id="defisource"
            ></p>
          </Row>
        </Grid>
      </Row>
      <Grid sm={5}>
        <Card
          css={{
            backgroundColor: "Black",
            margin: "auto",
            justify: "center",
          }}
        >
          <Text
            size={20}
            id="wallet-address"
            css={{
              marginRight: "$2",
              color: "$green200",
              margin: "auto",
              padding: "2px",
            }}
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
}
