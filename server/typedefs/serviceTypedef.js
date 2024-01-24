module.exports = serviceTypedef = `#graphql
type Service {
    _id: ID
    title: String
    description: String
    price: Int
    clinic: String
}

type Query {
    services: [Service]
    service(id: ID): Service
    serviceTitleDescription(title: String): [Service]
    serviceByHospital(title:String):[Service]

}
`;
