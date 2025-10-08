/*
  Configuration for the psf-slp-block-indexer.
*/

export default {
  psfSlpDbUrl: 'http://localhost:5020',

  // RPC connection information, used by the SLP indexer to communicate with the
  // full node.
  rpcIp: process.env.RPC_IP ? process.env.RPC_IP : '172.17.0.1',
  rpcPort: process.env.RPC_PORT ? process.env.RPC_PORT : '8332',
  zmqPort: process.env.ZMQ_PORT ? process.env.ZMQ_PORT : '28332',
  rpcUser: process.env.RPC_USER ? process.env.RPC_USER : 'bitcoin',
  rpcPass: process.env.RPC_PASS ? process.env.RPC_PASS : 'password',

  // This blacklist is used to ignore problematic tokens.
  blacklist: process.env.DISABLE_BLACKLIST
    ? []
    : [
        // FlexUSD
        'dd21be4532d93661e8ffe16db6535af0fb8ee1344d1fef81a193e2b4cfa9fbc9'
      ]

}
