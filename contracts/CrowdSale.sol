import "./SafeMath.sol";
import "./NToken.sol";
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;



contract Crowdsale {
  using SafeMath for uint256;

  NToken public token;

  address public wallet;

  uint256 public  rate;

  uint256 public weiRaised;

  event TokenPurchase(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);

  constructor(uint256 _rate, address _wallet, NToken _token) {
    require(_rate > 0);
    require(_wallet != address(0));
    require(address(_token) != address(0));

    rate = _rate;
    wallet = _wallet;
    token = _token;
  }

  receive() external payable{
    buyTokens(msg.sender);
  }

  function receiveFunds() external payable {
    buyTokens(msg.sender);
  }

  function buyTokens(address _beneficiary) public payable {

    uint256 weiAmount = msg.value;
    _preValidatePurchase(_beneficiary, weiAmount);

    uint256 tokens = _getTokenAmount(weiAmount);

    weiRaised = weiRaised.add(weiAmount);

    _processPurchase(_beneficiary, tokens);
    emit TokenPurchase(msg.sender, _beneficiary, weiAmount, tokens);

    _forwardFunds();
  }

  function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal pure {
    require(_beneficiary != address(0));
    require(_weiAmount != 0);
  }

  function _processPurchase(address _beneficiary, uint256 _tokenAmount) internal {
    token.transfer(_beneficiary, _tokenAmount);
  }

  function _getTokenAmount(uint256 _weiAmount) internal view returns (uint256) {
    return _weiAmount.mul(rate);
  }

  function _forwardFunds() internal {
    address payable _to = payable(wallet);
    _to.transfer(msg.value);
  }
}