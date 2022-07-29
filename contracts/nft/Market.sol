import "./ERC721.sol";

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Market {
    modifier onlyOwner() {
        require(owner == msg.sender, "You are not an owner!");
        _;
    }

    ERC721 public nft;
    address owner;
    uint256 commission = 10;
    uint256 volume = 0;

    struct Item {
        uint256 idNft;
        string url;
        uint256 price;
        string description;
        uint256 startSale;
        uint256 endSale;
        address seller;
    }

    Item[] public items;

    event itemList(
        address indexed seller,
        uint256 indexed id,
        uint256 price,
        uint256 timestamp
    );
    event itemDelist(
        address indexed initiator,
        uint256 indexed id,
        uint256 timestamp
    );
    event itemSell(
        address indexed seller,
        address indexed buyer,
        uint256 indexed id,
        uint256 price,
        uint256 timestamp
    );

    constructor(ERC721 _nft) {
        nft = _nft;
        owner = msg.sender;
    }

    function listItem(
        uint256 _id,
        uint256 _price,
        string memory _description,
        uint256 _endSale
    ) external {
        require(nft.getApproved(_id) == address(this), "not approved");

        string memory nftUrl = nft.tokenURI(_id);

        Item memory itemOnSale = Item(
            _id,
            nftUrl,
            _price,
            _description,
            block.timestamp,
            _endSale,
            msg.sender
        );

        items.push(itemOnSale);

        nft.marketTransfer(msg.sender, address(this), _id);

        emit itemList(msg.sender, _id, _price, block.timestamp);
    }

    function delistItem(uint256 _id) public {
        uint256 index = getIndex(_id);
        require(index != 101, "error");
        require(
            msg.sender == items[index].seller || msg.sender == owner,
            "Not enough rights"
        );

        address _seller = items[index].seller;

        nft.marketTransfer(address(this), _seller, _id);

        deleteItem(index);

        emit itemDelist(msg.sender, _id, block.timestamp);
    }

    function buyItem(uint256 _id) public payable {
        uint256 index = getIndex(_id);
        require(index != 101, "error");
        require(msg.sender != items[index].seller, "error");
        require(msg.value == items[index].price, "wrong amount");

        volume += msg.value;

        address _seller = items[index].seller;
        uint256 _price = items[index].price;
        address payable receiver = payable(items[index].seller);
        uint256 amount = (msg.value * 90) / 100;

        receiver.transfer(amount);

        nft.marketTransfer(address(this), msg.sender, _id);

        deleteItem(index);

        emit itemSell(_seller, msg.sender, _id, _price, block.timestamp);
    }

    function getItem(uint256 _id) public view returns (Item memory) {
        uint256 index = getIndex(_id);
        require(index != 101, "error");
        return items[index];
    }

    function getList() public view returns (Item[] memory) {
        return items;
    }

    function getVolume() public view returns (uint256) {
        return volume;
    }

    function getIndex(uint256 _id) internal view returns (uint256) {
        for (uint256 i = 0; i < items.length; i++) {
            if (items[i].idNft == _id) {
                return i;
            }
        }
        return 101;
    }

    function deleteItem(uint256 indexItem) internal {
        uint256 indexDelete = indexItem;
        uint256 indexEnd = items.length - 1;
        if (indexDelete == indexEnd) {
            items.pop();
        } else {
            items[indexDelete] = items[indexEnd];
            items.pop();
        }
    }

    function withdraw(address payable _to) external onlyOwner {
        _to.transfer(address(this).balance);
    }
}
