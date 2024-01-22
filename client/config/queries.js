import { gql } from "@apollo/client";

export const REPORTS = gql`
  query Reports {
    reports {
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
          weight
          height
          address
          commorbidity
          userId
        }
      }
      childOwner {
        _id
        username
        birthdate
        weight
        height
        address
        commorbidity
        userId
      }
      appointment
    }
  }
`;

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

export const SERVICETITLEDESC = gql`
  query ServiceTitleDescription($title: String) {
    serviceTitleDescription(title: $title) {
      _id
      title
      description
      price
      clinic
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
  mutation Register($payload: RegisterInput) {
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
  mutation CreateChild($payload: ChildInput) {
    createChild(payload: $payload) {
      _id
      username
      birthdate
      weight
      height
      address
      commorbidity
      userId
    }
  }
`;

export const CREATEREPORT = gql`
  mutation Mutation($payload: ReportInput) {
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

export const LOGGEDINUSER = gql`
  query LoggedIn {
    loggedIn {
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

export const ADD_SERVICES = gql`
  mutation CreateReportServices($payload: ReportServiceInput) {
    createReportServices(payload: $payload) {
      _id
      reportId
      serviceId
      createdAt
      updatedAt
    }
  }
`;

export const GET_REPORT_BY_ID = gql`
  query Report($reportId: ID) {
    report(id: $reportId) {
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
          weight
          height
          address
          commorbidity
          userId
        }
      }
      childOwner {
        _id
        username
        birthdate
        weight
        height
        address
        commorbidity
        userId
      }
      appointment
    }
  }
`;
export const GET_REPORT_BY_OWNERID = gql`
  query Query($ownerId: ID) {
    reportsByOwnerId(ownerId: $ownerId) {
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
          weight
          height
          address
          commorbidity
          userId
        }
      }
      childOwner {
        _id
        username
        birthdate
        weight
        height
        address
        commorbidity
        userId
      }
      appointment
    }
  }
`;
export const DELETE_REPORT = gql`
  mutation DeleteReport($reportId: ID) {
    deleteReport(reportId: $reportId) {
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
          weight
          height
          address
          commorbidity
          userId
        }
      }
      childOwner {
        _id
        username
        birthdate
        weight
        height
        address
        commorbidity
        userId
      }
      appointment
    }
  }
`;
export const PAY_MAIL = gql`
  mutation Mail($payload: MailInput) {
    mail(payload: $payload)
  }
`;
export const CREATE_INTENT = gql`
  mutation CreateIntent($payload: IntentInput) {
    createIntent(payload: $payload) {
      paymentIntent
    }
  }
`;
export const UPDATE_STATUS_REPORT = gql`
  mutation UpdateStatusReport($reportId: ID) {
    updateStatusReport(reportId: $reportId)
  }
`;
