module.exports = reportTypedef = `#graphql
type Report {
    _id: ID
    ownerId: ID
    status: String
    servicesConnection: [ReportService]
    services: [Service]
    createdAt: String
    updatedAt: String
    userOwner: [User]
    childOwner: [Child]
}

type Query{
    reports: [Report]
    report(id: ID): Report
}

type Mutation {
    createReport(payload: ReportInput): Report
}

input ReportInput {
    ownerId: ID
}
`;
