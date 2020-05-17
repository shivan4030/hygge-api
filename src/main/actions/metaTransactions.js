import { readFileSync } from "fs";
import web3 from "./head";
import { PRIVATE_KEY, NODESMITH_API } from "../../../credentials.js"; 
import AionKeystore from "aion-web3-eth-accounts";
// https://ethereum.stackexchange.com/questions/62578/meta-transaction-with-web3
const metaTransaction = async (address,value) =>{
  //account_x with zero balance 
  var fromPvtKey='17ba1bc605ddbbeca9f066d275cb27405c5921cd5d91d9aed39083dd57434d5436cb2f4bfd43a8b617454810959d1876903e7653cc5dc3d7f4f9e5546d17fda4';
  const aionKeystore = new AionKeystore(NODESMITH_API); 
  const account_x  = aionKeystore.privateKeyToAccount(
    fromPvtKey // Add Private Key of Account that will be used to deploy contract
  );
  const solidityContract = readFileSync("src/contracts/Counter.sol", {
   encoding: "utf8"
 });
 const compContract = await web3.eth.compileSolidity(solidityContract);
 const ABI = compContract.Counter.info.abiDefinition;
 
  //the address to which acccount_x wants to send/make a trxn on.
  var account_y_address=address; 
  var MyContract = new web3.eth.Contract(ABI, account_y_address);
  var data=MyContract.methods.incrementCounter(value).encodeABI();
  var msg="will meta trxn succeed";
  var signature = await web3.eth.accounts.sign(msg, fromPvtKey);
  console.log("signed by account x");
  console.log(signature);
try{
  var meta_object=getMetaTransactionObject(data,account_x.address,account_y_address,msg, signature.signature);
  console.log("sending hygge meta trxn object");
  // console.log(meta_object);
  sendHygge(meta_object);
}catch(e){
  console.log(e);
}

 };
   

const sendHygge =async (tx) => {
console.log(tx);
var from=web3.eth.accounts.recover(tx.message,tx.signature);
console.log(from);
//verifies if its comming from account_x
if(tx.from==from){
  console.log("yay account_x request reached");
  //now hygge can make a trxn.
  const aionKeystore = new AionKeystore(NODESMITH_API);
  const account_z = aionKeystore.privateKeyToAccount(
    PRIVATE_KEY 
  );
  const trx_object=await getTransactionObject(tx.data,account_z.address,tx.to);
  console.log("tx object");
  console.log(trx_object);
  const signedTransaction = await account_z.signTransaction(trx_object);
  try{
      console.log("account_z sends the trxn on account_x's belhalf..");
      const trxReceipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      console.log("Meta trxn receipt: ", trxReceipt);
      return trxReceipt;
     }catch(e){
       console.log(e);
       return e;
     }
  
}
};

const getTransactionObject = async (contractData, from,to) => {
  const nonce = await web3.eth.getTransactionCount(from);
  const gasPrice = await web3.eth.getGasPrice();
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

const getMetaTransactionObject =  (txdata,from,to,msg, signature) => {
  const transaction = {
    from: from,
    to:to,
    msg:msg,
    signature:signature,
    data: txdata
  };
  return transaction;
};

export default metaTransaction;
