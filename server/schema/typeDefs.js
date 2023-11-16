const gql = String.raw;

const typeDefs = gql`
type Hobby {
    _id: ID
    name: String
}

type User {
    _id: ID
    email: String
    createdAt: String
    updatedAt: String
    hobbies: [Hobby]
}

type Query {
    authenticate: User
}

type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout: String
}
`;

module.exports = typeDefs;