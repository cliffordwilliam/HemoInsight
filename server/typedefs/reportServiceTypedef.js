module.exports = reportServiceTypedef = `#graphql
type ReportService {
    _id: ID
    reportId: ID
    serviceId: ID
    createdAt: String
    updatedAt: String
}

type Query{
    reportServices: [ReportService]
    reportservice(id: ID): ReportService
}

type Mutation {
    createReportServices(payload: ReportServiceInput): ReportService
}

input ReportServiceInput {
    reportId: ID!
    serviceId: ID!
}
`;
