// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Market is Ownable {
    IERC20 public erc20;
    IERC721 public erc721;
    bool public paused;
    uint256 public feePercentage; // 以基点表示，例如：250 = 2.5%

    bytes4 internal constant MAGIC_ON_ERC721_RECEIVED = 0x150b7a02;

    struct Order {
        address seller;
        uint256 tokenId;
        uint256 price;
    }

    mapping(uint256 => Order) public orderOfId; // token id to order
    Order[] public orders;
    mapping(uint256 => uint256) public idToOrderIndex;

    event Deal(address seller, address buyer, uint256 tokenId, uint256 price, uint256 fee);
    event NewOrder(address seller, uint256 tokenId, uint256 price);
    event OrderCancelled(address seller, uint256 tokenId);
    event PriceChanged(
        address seller,
        uint256 tokenId,
        uint256 previousPrice,
        uint256 price
    );
    event MarketPaused(bool paused);
    event FeePercentageChanged(uint256 oldFee, uint256 newFee);

    modifier whenNotPaused() {
        require(!paused, "Market: Market is paused");
        _;
    }

    constructor(address _erc20, address _erc721) Ownable(msg.sender) {
        require(_erc20 != address(0),
            "Market: ERC20 contract address must be non-null"
        );
        require(_erc721 != address(0),
            "Market: ERC721 contract address must be non-null"
        );
        erc20 = IERC20(_erc20);
        erc721 = IERC721(_erc721);
        feePercentage = 250; // 默认2.5%手续费
        paused = false;
    }

    function buy(uint256 _tokenId) external whenNotPaused {
        address seller = orderOfId[_tokenId].seller;
        require(seller != address(0), "Market: Order does not exist");
        
        address buyer = msg.sender;
        uint256 price = orderOfId[_tokenId].price;
        
        // 先移除订单，防止重入攻击
        removeOrder(_tokenId);
        
        // 计算手续费
        uint256 fee = (price * feePercentage) / 10000;
        uint256 sellerAmount = price - fee;
        
        // 执行转账
        require(
            erc20.transferFrom(buyer, seller, sellerAmount),
            "Market: ERC20 transfer to seller failed"
        );
        
        if (fee > 0) {
            require(
                erc20.transferFrom(buyer, owner(), fee),
                "Market: ERC20 fee transfer failed"
            );
        }
        
        // 转移NFT
        erc721.safeTransferFrom(address(this), buyer, _tokenId);
        
        emit Deal(seller, buyer, _tokenId, price, fee);
    }

    function cancelOrder(uint256 _tokenId) external whenNotPaused {
        address seller = orderOfId[_tokenId].seller;
        require(seller == msg.sender, "Market: Sender is not seller");

        // 先移除订单，防止重入攻击
        removeOrder(_tokenId);
        
        // 转移NFT
        erc721.safeTransferFrom(address(this), seller, _tokenId);

        emit OrderCancelled(seller, _tokenId);
    }

    function changePrice(uint256 _tokenId, uint256 _price) external whenNotPaused {
        require(_price > 0, "Market: Price must be greater than 0");
        
        address seller = orderOfId[_tokenId].seller;
        require(seller == msg.sender, "Market: Sender is not seller");

        uint256 previousPrice = orderOfId[_tokenId].price;
        orderOfId[_tokenId].price = _price;
        Order storage order = orders[idToOrderIndex[_tokenId]];
        order.price = _price;

        emit PriceChanged(seller, _tokenId, previousPrice, _price);
    }
    
    function isListed(uint256 _tokenId) public view returns (bool) {
        return orderOfId[_tokenId].seller != address(0);
    }
    
    function onERC721Received(
        address,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external whenNotPaused returns (bytes4) {
        // 验证调用者是否为预期的ERC721合约
        require(msg.sender == address(erc721), "Market: Only accept NFTs from the specified collection");
        
        uint256 price = toUint256(data, 0);
        require(price > 0, "Market: Price must be greater than 0");
        
        // 确保NFT未被列出
        require(!isListed(tokenId), "Market: NFT already listed");
        
        orders.push(Order(from, tokenId, price));
        orderOfId[tokenId] = Order(from, tokenId, price);
        idToOrderIndex[tokenId] = orders.length - 1;
        
        emit NewOrder(from, tokenId, price);
        return MAGIC_ON_ERC721_RECEIVED;
    }
    
    function removeOrder(uint256 _tokenId) internal {
        uint256 index = idToOrderIndex[_tokenId];
        uint256 lastIndex = orders.length - 1;
        if (index != lastIndex) {
            Order storage lastOrder = orders[lastIndex];
            orders[index] = lastOrder;
            idToOrderIndex[lastOrder.tokenId] = index;
        }
        orders.pop();
        delete orderOfId[_tokenId];
        delete idToOrderIndex[_tokenId];
    }

    // https://stackoverflow.com/questions/63252057/how-to-use-bytestouint-function-in-solidity-the-one-with-assembly
    function toUint256(bytes memory _bytes, uint256 _start)
        public pure returns (uint256)
    {
        require(_start + 32 >= _start, "Market: toUint256_overflow");
        require(_bytes.length >= _start + 32, "Market: toUint256_outOfBounds");
        uint256 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x20), _start))
        }

        return tempUint;
    }
    
    function getOrderLength() external view returns (uint256) {
        return orders.length;
    }

    function getAllNFTs() external view returns (Order[] memory) {
        return orders;
    }
    
    function getMyNFTs() external view returns (Order[] memory) {
        // 先计算数量
        uint256 count = 0;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].seller == msg.sender) {
                count++;
            }
        }
        
        // 创建正确大小的数组
        Order[] memory myOrders = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].seller == msg.sender) {
                myOrders[index] = orders[i];
                index++;
            }
        }
        return myOrders;
    }  
    
    function getNFTsByOwner(address _owner) external view returns (Order[] memory) {
        // 先计算数量
        uint256 count = 0;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].seller == _owner) {
                count++;
            }
        }
        
        // 创建正确大小的数组
        Order[] memory ownerOrders = new Order[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].seller == _owner) {
                ownerOrders[index] = orders[i];
                index++;
            }
        }
        return ownerOrders;
    }
    
    // 管理员功能
    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
        emit MarketPaused(_paused);
    }
    
    function setFeePercentage(uint256 _feePercentage) external onlyOwner {
        require(_feePercentage <= 1000, "Market: Fee cannot exceed 10%");
        uint256 oldFee = feePercentage;
        feePercentage = _feePercentage;
        emit FeePercentageChanged(oldFee, _feePercentage);
    }
    
    // 紧急情况下，管理员可以取回NFT给原始卖家
    function emergencyWithdraw(uint256 _tokenId) external onlyOwner {
        require(isListed(_tokenId), "Market: NFT not listed");
        address seller = orderOfId[_tokenId].seller;
        
        removeOrder(_tokenId);
        erc721.safeTransferFrom(address(this), seller, _tokenId);
        
        emit OrderCancelled(seller, _tokenId);
    }
}