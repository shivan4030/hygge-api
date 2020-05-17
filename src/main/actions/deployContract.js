import { readFileSync } from "fs";
import web3 from "./head";
import { PRIVATE_KEY, NODESMITH_API } from "../../../credentials.js"; // This file has purposefully been omitted on github repo
import AionKeystore from "aion-web3-eth-accounts";

const deploy = async () => {
 console.log("deploying the contract now.....");
  const solidityContract = readFileSync("src/contracts/Counter.sol", {
   encoding: "utf8"
 });
 
 const aionKeystore = new AionKeystore(NODESMITH_API);
 const HyggeAccount = aionKeystore.privateKeyToAccount(
   PRIVATE_KEY 
 );
 
 const compCont = await web3.eth.compileSolidity(solidityContract);
 const ABI = compCont.Counter.info.abiDefinition;
 const contCode = compCont.Counter.code;

 const contract = new web3.eth.Contract(ABI);

 const deployableContract = await contract.deploy({
   from: HyggeAccount.address,
   data: contCode,
   arguments: [1]
 });

 const contractData = deployableContract.encodeABI();
 console.log(HyggeAccount.address);
 const transaction = await getTransactionObject(contractData, HyggeAccount.address, deployableContract);
 const signedTransaction = await HyggeAccount.signTransaction(transaction);
 console.log("Transaction signed!");
 try{
   console.log("deploying now...");
  const transactionReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
  console.log("Transaction Receipt : ", transactionReceipt);
  console.log("Contract Address : ", transactionReceipt.contractAddress);
  return transactionReceipt;
 }catch(e){
   console.log(e);
   return e;
 }
 
 };

 const getTransactionObject = async (contractData, address, deployableContract) => {
  const nonce = await web3.eth.getTransactionCount(address);
  const gasPrice = await web3.eth.getGasPrice();
  const gas = await deployableContract.estimateGas();

  const transaction = {
    from: address,
    nonce,
    gasPrice,
    gas:2000000, 
    data: contractData
  };
  return transaction;
};

 export default deploy;