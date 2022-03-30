// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigWallet {
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public minConfirmNum;

    // 一笔交易的结构
    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 confirmedNum;
    }

    Transaction[] public transactions;

    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    constructor(address[] memory _owners, uint256 _minConfirm) {
        // 校验钱包可签人数
        require(_owners.length > 2, "owners must more than 3");
        // 校验最小可执行签约人数
        require(
            _minConfirm > 0 && _minConfirm <= _owners.length,
            "Invalid min confirm number"
        );

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "Invalid address");
            require(!isOwner[owner], "address alread add");

            isOwner[owner] = true;
            owners.push(owner);
        }
        minConfirmNum = _minConfirm;
    }

    receive() external payable {}

    fallback() external payable {}

    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }

    // 发起一笔交易
    function launchTransaction(
        address _to,
        uint256 _amount,
        bytes memory _data
    ) public onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                value: _amount,
                data: _data,
                executed: false,
                confirmedNum: 0
            })
        );
    }

    // 同意一笔交易
    function confirmTransaction(uint256 _txIndex) public onlyOwner {
        // 校验交易ID是否存在
        require(_txIndex < transactions.length, "Invalid id");
        // 校验是否已经同意
        require(!isConfirmed[_txIndex][msg.sender], "Already Confirmed");

        Transaction storage transaction = transactions[_txIndex];
        transaction.confirmedNum += 1;
        isConfirmed[_txIndex][msg.sender] = true;
    }

    // 执行一笔交易
    function executeTransaction(uint256 _txIndex) public onlyOwner {
        Transaction storage transaction = transactions[_txIndex];
        require(transaction.confirmedNum >= minConfirmNum, "Not enough numer");

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        transaction.executed = true;
    }
}
