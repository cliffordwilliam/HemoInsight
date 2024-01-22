module.exports = reportTypedef = `#graphql
type Report {
    _id: ID
    ownerId: ID
    status: String
    servicesConnection: [ReportService]
    services: [Service]
    createdAt: String
    updatedAt: String
    userOwner: User
    childOwner: Child
    appointment: String
    clinicName:String
}


type Query{
    reports: [Report]
    report(id: ID): Report
    reportsByOwnerId(ownerId:ID):[Report]

}

type Mutation {
    createReport(payload: ReportInput): Report
    deleteReport(reportId: ID): Report
    updateStatusReport(reportId: ID): String
}

input ReportInput {
    ownerId: ID
    appointment: String   
    clinicName:String

}
`;
