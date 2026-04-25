// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LithosPortal
 * @dev Confidential messaging system deployed on Oasis Sapphire.
 * State variables are encrypted inside the TEE. 
 */
contract LithosPortal {
    // Immutable owner address set at deployment. Trustless and unalterable.
    address public immutable owner;

    struct EncryptedMessage {
        address sender;
        string content; 
        uint256 timestamp;
    }

    // This array is private. On standard EVM, "private" is an illusion. 
    // On Sapphire, it is cryptographically secured inside the enclave.
    EncryptedMessage[] private messages;

    // Events are public on all EVMs. We emit the notification, but NEVER the content.
    event MessageReceived(address indexed sender, uint256 timestamp);

    error Unauthorized();
    error IndexOutOfBounds();

    modifier onlyOwner() {
        if (msg.sender != owner) revert Unauthorized();
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @dev Submits a new message. The `_content` payload is encrypted end-to-end 
     * using the oasisprotocol/sapphire-paratime wrapper on the frontend.
     */
    function submitMessage(string calldata _content) external {
        messages.push(EncryptedMessage({
            sender: msg.sender,
            content: _content,
            timestamp: block.timestamp
        }));

        emit MessageReceived(msg.sender, block.timestamp);
    }

    /**
     * @dev Read functions restricted strictly to the immutable owner.
     */
    function getMessageCount() external view onlyOwner returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 _index) external view onlyOwner returns (address, string memory, uint256) {
        if (_index >= messages.length) revert IndexOutOfBounds();
        
        EncryptedMessage memory msgData = messages[_index];
        return (msgData.sender, msgData.content, msgData.timestamp);
    }
}