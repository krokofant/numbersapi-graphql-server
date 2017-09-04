import { fetchField } from "Utils/numbers-api"

const Query = {
  number(root, { number }) {
    return { number }
  }
}

const Number = {
  trivia: async ({ number }) => fetchField(number, "trivia"),
  math: async ({ number }) => fetchField(number, "math"),
  date: async ({ number }) => fetchField(number, "date"),
  year: async ({ number }) => fetchField(number, "year")
}

export default { Query, Number }
