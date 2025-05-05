# Coffee DApp

A decentralized application (DApp) for managing coffee-related transactions on the blockchain.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v22.14.0 or higher)
- npm (v9 or higher)
- MetaMask or any Web3 wallet
- Git

## Current Versions
- Node.js: v22.14.0
- Hardhat: v2.23.0
- Hardhat Toolbox: v5.0.0

## Project Structure

```
coffee-dapp/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # React components
│   │   ├── contractJson/    # Contract ABIs and addresses
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Main styles
│   │   ├── main.jsx         # Application entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.js       # Vite configuration
│   └── eslint.config.js     # ESLint configuration
│
├── contracts/                # Smart contracts
│   └── chai.sol             # Main contract
│
├── scripts/                  # Deployment and utility scripts
├── ignition/                 # Hardhat Ignition deployment modules
├── artifacts/                # Compiled contracts
├── cache/                    # Hardhat cache
├── node_modules/            # Dependencies
├── .vscode/                 # VS Code settings
├── hardhat.config.js        # Hardhat configuration
├── package.json             # Project dependencies
└── .gitignore              # Git ignore rules
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd coffee-dapp
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

3. Create a `.env` file in the root directory with the following variables:
```
PRIVATE_KEY=your_private_key
ALCHEMY_API_KEY=your_alchemy_api_key
```

## Running the Application

### 1. Start Local Blockchain

```bash
npx hardhat node
```

### 2. Deploy Smart Contracts

In a new terminal:
```bash
npx hardhat ignition deploy ./ignition/modules/Lock.js --network localhost
```

### 3. Start Frontend Development Server

In a new terminal:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Smart Contract Development
- `npx hardhat compile` - Compile smart contracts
- `npx hardhat test` - Run tests
- `npx hardhat node` - Start local blockchain
- `npx hardhat ignition deploy` - Deploy contracts

### Frontend Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Testing

To run the test suite:
```bash
npx hardhat test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
