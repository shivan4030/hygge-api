import { readFileSync } from "fs";
import web3 from "./head";

const getBalance = async (address) => {
  // Import Solidity Contract
  const solidityContract = readFileSync("src/contracts/Counter.sol", {
   encoding: "utf8"
 });
 
 console.log("fetching balance...");
 const compContract = await web3.eth.compileSolidity(solidityContract);
 const ABI = compContract.Counter.info.abiDefinition;
 const contCode = compContract.Counter.code;

 var MyContract = new web3.eth.Contract(ABI, address);
 var balance=MyContract.methods.getCount().call().then((re)=>{
   console.log(re);
   return re;
 });
 return balance;
 
};

export default getBalance;