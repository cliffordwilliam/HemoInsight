module.exports = reportTypedef = `#graphql
type Report {
    _id: ID
    patientId:ID
    userId:ID
    status:String
    services:[Service]
    result: [Result]
    createdAt:String
    updatedAt:String
}

type Result {
    title:String
    value:String
    createdAt:String
    updatedAt:String
}

type Query{
    getReports:[Report]
    getReportById(reportId:ID):Report #get a single report only.
    getReportsByPatientId(patientId:ID):[Report] #get records of report from a single person.

}

type Mutation {
    createReport(payload: CreateReportInput): Report
}


input CreateReportInput {
    userId:ID!
    patientId: ID!
    status:String
    services:[ServicesInput]
    results:[ResultInput]
    createdAt:String
    updatedAt:String
}

input ServicesInput {
    title: String

}

input ResultInput {
    title:String
    value:String
}

`;
