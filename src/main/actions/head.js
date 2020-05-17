import AionKeystore from "aion-web3-eth-accounts";
import Web3 from "aion-web3";
import { readFileSync } from "fs";
import { PRIVATE_KEY, NODESMITH_API } from "../../../credentials.js"; 
const provider = new Web3.providers.HttpProvider(NODESMITH_API);
const web3 = new Web3(provider);

export default web3;