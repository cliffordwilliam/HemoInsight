module.exports = serviceTypedef = `#graphql
type Service {
    _id: ID
    title: String
    description:String
    price:Int
    clinic:String
}

type Query {
    getServices: [Service]
    serviceById(id:ID):Service
    serviceByName(title:String):Service
}
`;
