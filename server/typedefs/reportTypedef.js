module.exports = reportTypedef = `#graphql
type Report {
    _id: ID
    patientId:ID
    status:String
    services:[Service]
    result: [Result]
}

type Result {
    title:String
    value:String
}


type Mutation {
    createReport(payload: RegisterInput): User # register
}


input ReportInput {
    patientId: ID! # req
    status:String
    serviceID: [Services]!
}

`;
