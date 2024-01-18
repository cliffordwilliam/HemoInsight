import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Mutation($payload: LoginInput) {
        login(payload: $payload) {
            user {
                _id
                username
                password
                email
                birthdate
                address
                status
                commorbidity
                childs {
                    _id
                    username
                    birthdate
                    address
                    commorbidity
                    userId
                }
            }
            token
        }
    }
`;

export const GETSERVICES = gql`
    query Query {
        services {
            _id
            title
            description
            price
            clinic
        }
    }
`;

export const REGISTER = gql`
    mutation Mutation($payload: RegisterInput) {
        register(payload: $payload) {
            _id
            username
            password
            email
            birthdate
            weight
            height
            address
            status
            commorbidity
            childs {
                _id
                username
                birthdate
                address
                commorbidity
                userId
            }
        }
    }
`;

export const ADDFAMILY = gql`
    mutation Mutation($payload: ChildInput) {
        createChild(payload: $payload) {
            _id
            username
            birthdate
            address
            commorbidity
            userId
        }
    }
`;

export const CREATEREPORT = gql`
    mutation CreateReport($payload: ReportInput) {
        createReport(payload: $payload) {
            _id
            ownerId
            status
            servicesConnection {
                _id
                reportId
                serviceId
                createdAt
                updatedAt
            }
            services {
                _id
                title
                description
                price
                clinic
            }
            createdAt
            updatedAt
            userOwner {
                _id
                username
                password
                email
                birthdate
                weight
                height
                address
                status
                commorbidity
                childs {
                    _id
                    username
                    birthdate
                    address
                    commorbidity
                    userId
                }
            }
            childOwner {
                _id
                username
                birthdate
                address
                commorbidity
                userId
            }
            appointment
        }
    }
`;
