import {
  Input,
  Card,
  Col,
  Row,
  Modal,
  useModal,
  Avatar,
  Grid,
  Spacer,
  Button,
  Text,
} from "@nextui-org/react";
import { React, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import qs from "qs";
import Erc20 from "../engine/erc20.json";
import { ethers } from "ethers";
import { Alchemy, Network } from "alchemy-sdk";
require("dotenv").config();
export default function DefiSwap() {
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

  const config = {
    apiKey: process.env.AlchemyAPI,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);

  return (
    <Grid.Container gap={1} justify="center" color="white">
      <Button
        rounded
        color="primary"
        css={{ boxShadow: "0px 0px 4px #000000" }}
      >
        <Text
          css={{ color: "white" }}
          size={16}
          weight="bold"
          transform="uppercase"
          id="status"
        >
          CONNECT
        </Text>
      </Button>
      <Row justify="center" align="center">
        <Grid sm={4}>
          <Card variant="bordered">
            <Card.Header>
              <Row>
                <Text h2={true} color="white" style={{ margin: "auto" }}>
                  Genesis Swap
                </Text>
              </Row>
            </Card.Header>
          </Card>
        </Grid>
      </Row>
      <Modal scroll closeButton blur aria-labelledby="connect_modal">
        {" "}
        Please Connect Wallet
        <Modal.Footer>
          <Button auto flat color="primary">
            Connect Wallet
          </Button>
          <Button auto flat color="error">
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Text h5="true">FROM TOKEN</Text>
      <Row justify="center">
        <Grid sm={4}>
          <Col>
            <Card variant="bordered">
              <Col>
                <Input
                  type="text"
                  size="$3xl"
                  className="number"
                  color="default"
                  placeholder="amount"
                  id="from_amount"
                  // onChange={(e) => setHold(e.target.value)}
                />
              </Col>
            </Card>
          </Col>
          <Col>
            <a>
              <Text size="$3xl"></Text>
            </a>
            <Row justify="center">
              <Text>Balance:</Text>
              <Text id="get_balance"></Text>
            </Row>
          </Col>
        </Grid>
      </Row>
    </Grid.Container>
  );
}
