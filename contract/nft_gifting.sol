// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTGiftingSystem {
    struct NFT {
        uint256 id;
        address owner;
        string tokenURI;
    }

    uint256 private _tokenIds;
    mapping(uint256 => NFT) private _nfts;
    mapping(address => uint256[]) private _ownedTokens;

    event NFTMinted(uint256 tokenId, address recipient, string tokenURI);
    event NFTGifted(uint256 tokenId, address from, address to);

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _nfts[newItemId] = NFT(newItemId, recipient, tokenURI);
        _ownedTokens[recipient].push(newItemId);

        emit NFTMinted(newItemId, recipient, tokenURI);
        return newItemId;
    }

    function giftNFT(address to, uint256 tokenId) public {
        require(_nfts[tokenId].owner == msg.sender, "Sender must own the NFT");
        
        _removeTokenFromOwner(msg.sender, tokenId);
        _nfts[tokenId].owner = to;
        _ownedTokens[to].push(tokenId);
        
        emit NFTGifted(tokenId, msg.sender, to);
    }

    function _removeTokenFromOwner(address from, uint256 tokenId) internal {
        uint256[] storage ownerTokens = _ownedTokens[from];
        for (uint256 i = 0; i < ownerTokens.length; i++) {
            if (ownerTokens[i] == tokenId) {
                ownerTokens[i] = ownerTokens[ownerTokens.length - 1];
                ownerTokens.pop();
                break;
            }
        }
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return _nfts[tokenId].tokenURI;
    }

    function getOwner(uint256 tokenId) public view returns (address) {
        return _nfts[tokenId].owner;
    }
}
