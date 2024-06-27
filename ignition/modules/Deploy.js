const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("CoreLoanPlatform", (m) => {

  const CoreLoanPlatform = m.contract("CoreLoanPlatform", ["0x3786495f5d8a83b7bacd78e2a0c61ca20722cce3","0x6B0e7A1C756564bB0A0d12008BB6b964C836Cbc3"]);

  return { CoreLoanPlatform };
});