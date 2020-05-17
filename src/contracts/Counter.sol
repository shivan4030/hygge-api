/*
  sol Counter
  Simple Counter Contract - Increase / Decrease by 1
*/

pragma solidity ^0.4.10;

contract Counter {

  /* State Variables */
  // State variables are values which are permanently stored in contract storage.
  int private count; // = 0
  address owner;


  // EVENTS
  event CounterIncreased(bool counter);
  event CounterDecreased(bool counter);
  /* Functions */
  // Functions are the executable units of code within a contract.
  function Counter(int _initCount) public {
      owner = msg.sender;
      count = 101;
  }

  function incrementCounter(int b) public {
     
      count += b;
      CounterIncreased(true);
  }
  function decrementCounter() public {
      count -= 1;
      CounterDecreased(true);
  }
  function getCount() public constant returns (int) {
      return count;
  }
}
