
import test from "./actions/test";
import getBalance from "./actions/getBalance";
import deploy from "./actions/deployContract";
import addBalance from "./actions/addBalance";
import metaTransaction from "./actions/metaTransactions";
import web3 from "./actions/head";

const controller = {
  getMain: (req, res) => {
    res.status(200);
    test("!@");
    return res.json({ ok: "hi" });
  },
  getContract: (req, res) => {
    res.status(200);
    return res.json({ ok: "call your cotract here" });
  },
  createAccount: (req, res) => {
    res.status(200);
    console.log("creating account ...")
    var Accounts = require('aion-web3-eth-accounts');
    var accounts = new Accounts();
    var ress=web3.eth.accounts.create();
    return res.json({ ok: ress });
  },
  getAccount: (req, res) => {
    res.status(200);
    console.log("retriving account ...");
    console.log(req.params.key);
    var Accounts = require('aion-web3-eth-accounts');
    //need to finish it up !
    // var accounts = new Accounts();
    // var ress=web3.eth.accounts.web3.eth.accounts.privateKeyToAccount(req.params.key);
    return res.json({ ok:"yey"});
  },
  deployContract: (req,res) => {
    var Receipt = deploy().then((response) =>{return res.json({ ok:response}); }).catch((e)=>{
      return res.json({ error:e});
    })
    
  },
  getBalances: (req,res) => { 
    console.log(req.params.address);
    var x= getBalance(req.params.address).then((result) => {
      console.log("main metod");
      // console.log(result)
      return res.json({ ok : result})
    }).catch((e) => {''
      return res.json({error: "e"});
    });
    
  },
  addBalance: (req,res) => { 
    addBalance(req.params.address,req.params.value).then((ress)=>{
      return res.json({ ok :ress})
    }).catch((e)=>{
      return res.json({ error : e});
    });

  },
  deductBalance: (req,res) => { 
    addBalances(req.params.address,-req.params.value).then((ress)=>{
      return res.json({ ok :ress})
    }).catch((e)=>{
      return res.json({ error : e});
    });

  },
  metaTransaction: (req,res) => { 
    metaTransaction(req.params.address,req.params.value).then((ress)=>{
      return res.json({ ok :ress})
    }).catch((e)=>{
      return res.json({ error : e});
    });

  }

  
};




export default controller;


// 0xa05eb7b4250508f6586E50517E77136A4c866438855661d44535DC2e8e1a05C2

// deployCOntract
// createAccount !
// addBalnce

// getBalance// Json issue ! 
//create acccount issue
// track transactions !