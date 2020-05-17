import controller from "./controller";

const routes = [
  {
    method: "get",
    path: "/",
    handler: controller.getMain
  },
  {
    method: "get",
    path: "/aion",
    handler: controller.getContract
  },{
    method: "get",
    path: "/createAccount",
    handler: controller.createAccount
  },
  {
    method: "get",
    path: "/getAccount/:key",
    handler: controller.getAccount
  },
  {
    method: "get",
    path: "/deployContract",
    handler: controller.deployContract
  },
  {
    method: "get",
    path: "/getBalance/:address",
    handler: controller.getBalances

  },
  {
    method: "get",
    path: "/addBalance/:address/:value",
    handler: controller.addBalance

  },
  {
    method: "get",
    path: "/deductBalance/:address/:value",
    handler: controller.deductBalance

  },
  {
    method: "get",
    path: "/metaTransaction/:address/:value",
    handler: controller.metaTransaction

  }

  
// getBalances addBalance
  
// metaTransactionmetaTransaction
];

export default routes;
