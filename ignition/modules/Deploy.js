const { buildModule } = require('@nomicfoundation/hardhat-ignition/modules');
module.exports = buildModule('CoreLoanPlatform', (m) => {
  const CoreLoanPlatform = m.contract('CoreLoanPlatform');
  return { CoreLoanPlatform };
});
