const os = require('os');

// Get server's IP address
const getIpAddress = () => {
    const networkInterfaces = os.networkInterfaces();
    let ipAddress = 'Not available';
  
    for (const [interfaceName, addresses] of Object.entries(networkInterfaces)) {
      for (const address of addresses) {
        if (address.family === 'IPv4' && !address.internal) {
          ipAddress = address.address;
          break;
        }
      }
      if (ipAddress !== 'Not available') break;
    }
  
    return ipAddress;
  };

  module.exports = { getIpAddress };