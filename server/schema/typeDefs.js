const gql = String.raw;

const typeDefs = gql`
type Hobby {
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
    getAllUsers: [User]
    getOneUser(id: String!): User 
}

type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
}
`;

module.exports = typeDefs;