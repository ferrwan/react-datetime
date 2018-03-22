// @flow

const MAX_NUMBER = Number.MAX_SAFE_INTEGER // (2^53 - 1) = 9007199254740991

type Loop = (index: number) => any

/**
 * Iterator HOF
 * @param {number} n
 * @param {Function} loop
 * @returns void
 */
const times = (n: number = 0, loop: Loop): void => {
  if (n > MAX_NUMBER) {
    return
  }

  const len = n
  let i = 0

  while (i < len) {
    loop(i)
    i += 1
  }
}

export default times
