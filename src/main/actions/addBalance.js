import { readFileSync } from "fs";
import web3 from "./head";
import { PRIVATE_KEY, NODESMITH_API } from "../../../credentials.js"; 
import AionKeystore from "aion-web3-eth-accounts";

const addBalance = async (address,value) =>{
  console.log("add balance called..");
  const solidityContract = readFileSync("src/contracts/Counter.sol", {
   encoding: "utf8"
 });
 const aionKeystore = new AionKeystore(NODESMITH_API);
 const hyggeAccount = aionKeystore.privateKeyToAccount(
   PRIVATE_KEY 
 );
 const compContract = await web3.eth.compileSolidity(solidityContract);
 const ABI = compContract.Counter.info.abiDefinition;
 const contCode = compContract.Counter.code;
 const contract = new web3.eth.Contract(ABI);
 const deployableContract = await contract.deploy({
   from: hyggeAccount.address,
   data: contCode,
   arguments: [1]
 });

 var contractAddress=address; 
 var MyContract = new web3.eth.Contract(ABI, contractAddress);
 var data=MyContract.methods.incrementCounter(value).encodeABI();
 const transaction_object = await getTransactionObject(data, hyggeAccount.address,contractAddress, deployableContract);
 const signedTransaction = await hyggeAccount.signTransaction(transaction_object);
 try{
     console.log("sending signed trxn..");
     const trxReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
     console.log("Transaction Receipt : ", trxReceipt);
     var newBalance= MyContract.methods.getCount().call().then((re)=>{
     console.log(re);
      return re;
     });
     return trxReceipt;
    }catch(e){
      console.log(e);
      return e;
    }
 };

 const getTransactionObject = async (contractData, from,to, deployableContract) => {
  const nonce = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();
  const gas = await deployableContract.estimateGas();

  const transaction = {
    from: from,
    to:to,
    nonce,
    gasPrice,
    gas:2000000,    
    data: contractData
  };
  return transaction;
};


 export default addBalance;