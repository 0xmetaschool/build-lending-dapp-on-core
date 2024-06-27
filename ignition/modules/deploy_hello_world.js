import { deploy } from './ethers-lib'

(async () => {
  try {
    const result = await deploy('HelloWorld', [])
    console.log(`address: ${result.address}`)
  } catch (e) {
    console.log(e.message)
  }
})()