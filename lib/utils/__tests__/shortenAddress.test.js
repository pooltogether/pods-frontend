import { shortenAddress } from '../shortenAddress'

describe('shortenAddress', () => {
  it('should work', () => {
    expect(shortenAddress('0x1234567890')).toEqual('0x12..90')
  })
})
