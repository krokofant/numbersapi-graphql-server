import fetch from "node-fetch"

export async function fetchField(number, type) {
  let r = await fetch(`http://numbersapi.com/${number}/${type}`)
  let text = await r.text()
  return text
}
