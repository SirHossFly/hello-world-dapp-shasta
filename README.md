Hello World DApp (Shasta)

A simple dApp allowing the contract owner to set and get a message on the TRON Shasta Testnet.

Tools and Versions







Tool



Version





Node.js



v20.12.2





TronBox



Latest (May 2025)





Solidity Compiler



0.8.21





TronWeb



6.0.3





Bootstrap



v5.3.0





http-server



Latest (May 2025)

Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites





Node.js (v20.12.2 or compatible)



TronBox (latest version as of May 2025)



TronLink browser extension (set to Shasta Testnet)



A TronGrid API key (for TronWeb requests, if needed)

Setup Steps





Clone the repository:

git clone <your-repo-url>
cd hello-world-dapp/tron



Install dependencies:

npm install



Create a .env file in the tron directory:

PRIVATE_KEY=your-tronlink-private-key
TRONGRID_API_KEY=your-trongrid-api-key



Generate the front-end config:

node generate-config.js



Compile the contracts:

tronbox compile



Deploy the contract to Shasta:





Obtain test TRX at https://shasta.tronex.io/



Run:

tronbox migrate --network shasta --reset



Deployed contract address: THLkaX1QYbowxm53f4q96DeefMn3eBxrAZ



Run the front-end:

cd frontend
http-server



Interact with the dApp:





Open http://127.0.0.1:8080 in your browser.



Connect TronLink (set to Shasta Testnet).



Use the owner account to set messages; any account to get messages.

Configuration

Your configuration file is called tronbox-config.js and is located at the root of your project directory.

Migration

This project is configured for the following networks:





Mainnet (https://api.trongrid.io)



Shasta Testnet (https://api.shasta.trongrid.io)



Nile Testnet (https://nile.trongrid.io)



Localnet (http://127.0.0.1:9090)

Mainnet

tronbox migrate --network mainnet

Shasta Testnet

Obtain test TRX at https://shasta.tronex.io/

tronbox migrate --network shasta

Nile Testnet

Obtain test TRX at https://nileex.io/join/getJoinPage

tronbox migrate --network nile

Localnet

Get the tronbox/tre docker image at https://hub.docker.com/r/tronbox/tre

tronbox migrate

Testing

To test your contracts, you can run:

tronbox test --network <mainnet|shasta|nile|development>

Work with EVM

TronBox supports deploying contracts on EVM-compatible blockchains. For more information, refer to: https://developers.tron.network/reference/work-with-evm

Security Notes





Sensitive Data: Do not commit .env to GitHub (contains sensitive data).



Testnet Only: Designed for Shasta Testnet; not for Mainnet without further security enhancements.



Dependencies: Review package.json dependencies for vulnerabilities (npm audit) before Mainnet deployment.



Dedicated Test Account: Use a separate TronLink account for testnet to avoid risks with Mainnet funds.



HTTPS in Production: Deploy with HTTPS in a production environment to prevent man-in-the-middle attacks.

Built With





TronBox - The framework used for contract development and deployment

Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

Authors





SirHossFly - Initial work - SirHossFly

License

This project is licensed under the MIT License - see the LICENSE.md file for details.

Additional Resources

For further learning, visit the official TronBox site at https://tronbox.io