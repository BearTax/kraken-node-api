# Kraken Node API
Node.js library for [Kraken API](https://www.kraken.com/features/api)



## Installation

`npm install <kraken-node-api>` [Yet to be published]


## Quick Start

You would need API Key and API Secret before using this library.
Create a ``Client`` object to access the Kraken API:

```javascript
var Client = require('kraken-node-api');
var client = new Client(apikey, apiSecret);
```

## Features

For detailed `Request` and `Response` please check [API Docs](https://www.kraken.com/features/api)


### Public Endpoints
**Time**

URL : https://api.kraken.com/0/public/Time

```javascript
client.time();
```

**Assets**

URL : https://api.kraken.com/0/public/Assets

```javascript
client.assets();
```

**Asset Pairs**

URL : https://api.kraken.com/0/public/AssetPairs

```javascript
client.assetPairs();
```

**Ticker**

URL : https://api.kraken.com/0/public/Ticker

```javascript
client.ticker();
```

**OHLC**

URL : https://api.kraken.com/0/public/OHLC

```javascript
client.oHLC();
```

**Depth**

URL : https://api.kraken.com/0/public/Depth

```javascript
client.depth();
```

**Trades**

URL : https://api.kraken.com/0/public/Trades

```javascript
client.trades();
```

**Spread**

URL : https://api.kraken.com/0/public/Spread

```javascript
client.spread();
```

### Private Endpoints
**Balance**

URL : https://api.kraken.com/0/private/Balance

```javascript
client.balance();
```

**Trade Balance**

URL : https://api.kraken.com/0/private/TradeBalance

```javascript
client.tradeBalance();
```

**Open Orders**

URL : https://api.kraken.com/0/private/OpenOrders

```javascript
client.openOrders();
```

**Closed Orders**

URL : https://api.kraken.com/0/private/ClosedOrders

```javascript
client.closedOrders();
```

**Query Orders**

URL : https://api.kraken.com/0/private/QueryOrders

```javascript
client.queryOrders();
```

**Trades History**

URL : https://api.kraken.com/0/private/TradesHistory

```javascript
client.tradesHistory();
```

**Query Trades**

URL : https://api.kraken.com/0/private/QueryTrades

```javascript
client.queryTrades();
```

**Open Positions**

URL : https://api.kraken.com/0/private/OpenPositions

```javascript
client.openPositions();
```

**Ledgers**

URL : https://api.kraken.com/0/private/Ledgers

```javascript
client.ledgers();
```

**Query Ledgers**

URL : https://api.kraken.com/0/private/QueryLedgers

```javascript
client.queryLedgers();
```

**Trade Volume**

URL : https://api.kraken.com/0/private/TradeVolume

```javascript
client.tradeVolume();
```

**Add Export**

URL : https://api.kraken.com/0/private/AddExport

```javascript
client.addExport();
```

**Export Status**

URL : https://api.kraken.com/0/private/ExportStatus

```javascript
client.exportStatus();
```

**Retrieve Export**

URL : https://api.kraken.com/0/private/RetrieveExport

```javascript
client.retrieveExport();
```

**Remove Export**

URL : https://api.kraken.com/0/private/RemoveExport

```javascript
client.removeExport();
```

**Add Order**

URL : https://api.kraken.com/0/private/AddOrder

```javascript
client.addOrder();
```

**Cancel Order**

URL : https://api.kraken.com/0/private/CancelOrder

```javascript
client.cancelOrder();
```

**Deposit Methods**

URL : https://api.kraken.com/0/private/DepositMethods

```javascript
client.depositMethods();
```

**Deposit Addresses**

URL : https://api.kraken.com/0/private/DepositAddresses

```javascript
client.depositAddresses();
```

**Deposit Status**

URL : https://api.kraken.com/0/private/DepositStatus

```javascript
client.depositStatus();
```

**Withdraw Information**

URL : https://api.kraken.com/0/private/WithdrawInfo

```javascript
client.withdrawInfo();
```

**Withdraw**

URL : https://api.kraken.com/0/private/Withdraw

```javascript
client.withdraw();
```

**Withdraw Status**

URL : https://api.kraken.com/0/private/WithdrawStatus

```javascript
client.withdrawStatus();
```

**Withdraw Cancel**

URL : https://api.kraken.com/0/private/WithdrawCancel

```javascript
client.withdrawCancel();
```

**Wallet Transfer**

URL : https://api.kraken.com/0/private/WalletTransfer

```javascript
client.walletTransfer();
```

**Get WebSockets Token**

URL : https://api.kraken.com/0/private/GetWebSocketsToken

```javascript
client.getWebSocketsToken();
```

## Testing

```
npm test
```
