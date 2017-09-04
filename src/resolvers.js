import { fetchNumber } from "Utils/numbers-api"
import graphqlFields from "graphql-fields"

const Query = {
  async number(root, { number }, _, info) {
    const topLevelFields = Object.keys(graphqlFields(info))
    let responses = await Promise.all(
      topLevelFields.map(async field => fetchNumber(number, field))
    )
    return Object.assign({}, ...responses)
  }
}

export default { Query }
