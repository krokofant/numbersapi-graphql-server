import fetch from "node-fetch"

export async function fetchNumber(number, type) {
  let r = await fetch(`http://numbersapi.com/${number}/${type}`)
  let text = await r.text()
  return { [`${type}`]: text }
}
