const axios = require("axios");
const {
  checkEligibiltyToken,
  createLoanContractToken,
  createLoanOfferToken,
  acceptLoanOfferToken,
} = require("../tokens.js");

const References = {
  loanRequestRef: "",
  loanOfferRequestRef: "",
  eligibilityCheckReference: "",
};

const approveLoan = (req, res) => {
  const approvalResponse = {
    requestSuccessful: true,
    responseMessage: "Approval sucessfully sent",
    responseCode: "200",
    responseBody: {
      loanOfferRequestReference: "LO|E39AF5DD-21F2-46D5-98AE-7C38D5107853",
      businessLoanEligibilityCheckRequestReference:
        "WCL|ELIG|CHK|6A5D4E5D8035DA99B0AFCCF587B1CC0F",
      loanRequestReference: "WCL|REQ|204D80A224722BCFF0BDAE6B178BD554",
    },
  };

  res.send(approvalResponse);
};

const getLgaCode = (req, res) => {
  const altLgaCode = req.params.altLgaCode;

  const lga003Response = {
    requestSuccessful: true,
    responseMessage: "success",
    responseCode: "0",
    responseBody: {
      id: 483,
      name: "Alimosho",
      code: "LG002",
      altCode: "LG003",
      state: "Lagos",
      country: "Nigeria",
      alias: "ALIMOSHO",
      stateCode: "LG",
    },
  };

  const lga001Response = {
    requestSuccessful: true,
    responseMessage: "success",
    responseCode: "0",
    responseBody: {
      id: 762,
      name: "Agege",
      code: "LG020",
      altCode: "LG001",
      state: "Lagos",
      country: "Nigeria",
      alias: "AGEGE",
      stateCode: "LG",
    },
  };

  const lga002Response = {
    requestSuccessful: true,
    responseMessage: "success",
    responseCode: "0",
    responseBody: {
      id: 482,
      name: "Ajeromi-Ifelodun",
      code: "LG001",
      altCode: "LG002",
      state: "Lagos",
      country: "Nigeria",
      alias: "AJEROMI/IFELODUN",
      stateCode: "LG",
    },
  };

  const lga004Response = {
    requestSuccessful: true,
    responseMessage: "success",
    responseCode: "0",
    responseBody: {
      id: 484,
      name: "Amuwo-Odofin",
      code: "LG003",
      altCode: "LG004",
      state: "Lagos",
      country: "Nigeria",
      alias: "AMUWO-ODOFIN",
      stateCode: "LG",
    },
  };

  if (altLgaCode == "LG003") {
    res.send(lga003Response);
  } else if (altLgaCode == "LG001") {
    res.send(lga001Response);
  } else if (altLgaCode == "LG002") {
    res.send(lga002Response);
  } else if (altLgaCode == "LG004") {
    res.send(lga004Response);
  } else {
    res.send(lga004Response);
  }
};

const validateBvn = (req, res) => {
  const bvnValidationResponse = {
    responseCode: "200",
    customerData: {
      firstName: "Victor",
      lastName: "Ezeganya",
      image:
        "data:image/png;base64,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",
      gender: "Male",
      address: "36 Canaan Estate Sangotedo",
      dateOfBirth: "12:12:12",
    },
  };

  res.send(bvnValidationResponse);
};

const getBusinessOwnerInfoByUserName = (req, res) => {
  const businessOwnerInfoResponse = {
    businessownerCode: "MP|AGENT_MANAGER|99C074D23AE7AF8B92D1EC7AA634F4E9",
    firstName: "Vikki",
    lastName: "Ezegnaya",
    businessPhone: "07036407688",
    businessEmail: "vikkiezeganya@gmail.com",
    hasCompletedKyc: true,
  };

  res.send(businessOwnerInfoResponse);
};

const getBusinessType = (req, res) => {
  const businessTypeResponse = {
    businessType: "Mobile Money",
    businessName: "Vikki Ventures",
    businessAccountNumber: "8000026199",
    businessDescription: "Mobile Money for businesses",
    businessTypeSubmitted: true,
  };

  res.send(businessTypeResponse);
};

const getBusinessOwnerInfo = (req, res) => {
  const businessOwnerInfo = {
    businessOwnerBvn: "12334123412",
    businessOwnerUsername: "vikki4fun",
    businessOwnerAddress: {
      addressLineOne: " 2 Canaan street",
      addressLineTwo: "Sangotedo",
      city: "Lagos",
      nearestLandMark: "DKK",
      nearestBusStop: "Skymall",
      stateCode: "LG-001",
      stateName: "Lagos",
      localGovernmentCode: "LG003",
      lgaName: "Etiosa",
      latitude: 78,
      longitude: 97,
      addressVerificationStatus: "APPROVED",
      verificationDate: "2023-05-24T15:30:00",
      verificationRef: "567THJII",
    },
    businessOwnerFirstName: "Abdul",
    businessOwnerLastName: "Hassan",
    businessOwnerMiddleName: "Onyeka",
    businessOwnerGender: "Male",
    businessOwnerPhoneNumber: "07036407688",
    businessOwnerEmail: "vikkiezeganya@gmail.com",
    businessOwnerCbaClientId: "1537778950801821696",
    businessOwnerNextOfKin: {
      fullName: "Jazmine Nelliz",
      relationship: "Spouse",
      phoneNumber: "08140731778",
      emailAddress: "jasminenelli@gmail.com",
      city: "Lekki",
      addressLineOne: "Cedar County",
      addressLineTwo: "Sangotedo",
      localGovernmentId: 5,
      stateId: 10,
      countryId: 234,
      stateName: "Lagos",
      lgaName: "Etiosa",
    },
  };
  res.send(businessOwnerInfo);
};

const getBusinessInfo = (req, res) => {
  const businessInfo = {
    businessCode: req.params.businessCode,
    businessName: "Vikki Enterprises",
    businessType: "Mobile Money",
    accountNuban: "12345677890",
    businessTypeVerified: true,
    businessAddress: {
      addressLineOne: " 3 Asajon Way",
      addressLineTwo: "Sangotedo",
      city: "Lagos",
      nearestLandMark: "DKK",
      nearestBusStop: "Skymall",
      stateCode: "LG-001",
      stateName: "Lagos",
      localGovernmentCode: "LG001",
      lgaName: "Etiosa",
      latitude: 78,
      longitude: 97,
      addressVerificationStatus: "APPROVED",
      verificationDate: "2023-05-24T15:30:00",
      verificationRef: "567THJII",
    },
    businessOwnerUsername: "Vikki",
    businessOwnerCode: "VIK1234",
    businessPhone: "08013456789",
  };

  res.send(businessInfo);
};

const getEligiblityCheckResponse = (req, res) => {
  // const reference = req.body.reference;

  // const eligibilityCheckRef = req.headers["wclrequesteligibilitycheckref"];
  const eligibilityCheckRef = req.body.reference;

  console.log("Eligibility-Check-Reference ====>" + eligibilityCheckRef);

  References.eligibilityCheckReference = eligibilityCheckRef;

  const eligibilityCheckResponse = {
    requestSuccessful: true,
    responseMessage: "success",
    responseCode: "0",
    responseBody: {
      businessLoanEligibilityCheckRequestReference: eligibilityCheckRef,
    },
  };

  // res.send(eligibilityCheckResponse);

  // Crass calls wclms call back url with eligibilty check response
  try {
    let data = JSON.stringify({
      successful: true,
      statusMessage: "eligibility created",
      clientReference: eligibilityCheckRef,
      expiresOn: "2023-12-26T15:30:00",
      selectedLoanProgramReference: "LP|15B4FF3A-4F01-43BA-B554-25F71D2DF5DE",
    });
    console.log("====> Eligibility check call back data =========>" + data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wcl-management-service.development.moniepoint.com/api/v1/wcl/eligibility",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + checkEligibiltyToken,
      },
      data: data,
    };
    // console.log("--> Eligibility request object:: ", config);

    axios
      .request(config)
      .then((response) => {
        console.log(
          "Eligibility response object: -->> ",
          JSON.stringify(response.data)
        );
        res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const getLoanOfferResponse = (req, res) => {
  const loanOffer = {
    requestSuccessful: true,
    responseMessage: "success",
    responseCode: "0",
    responseBody: {
      loanOfferRequestReference: req.body.reference,
    },
  };

  const loanOfferRequestReference = req.body.reference;
  References.loanOfferRequestRef = loanOfferRequestReference;

  const workingCapitalLoanRequestReference =
    req.headers["working-capital-loan-request-reference"];
  References.loanRequestRef = workingCapitalLoanRequestReference;

  const primaryBusinessCode = req.headers["primary-business-code"];

  console.log("======> HEADERS FROM WCLMS <=======");
  console.log(workingCapitalLoanRequestReference, primaryBusinessCode);

  // Crass calls wclms call back url to create  a loan Offer
  try {
    let data = JSON.stringify({
      successful: true,
      statusMessage: "sucessful",
      clientReference: loanOfferRequestReference,
      loanOffer: {
        reference: loanOfferRequestReference,
        loanOfferRequestReference: loanOfferRequestReference,
        businessCode: primaryBusinessCode,
        // businessCode: MP | AGENT | A218D30AE8A3F51F6302785BD5050131,
        loanAmount: 100000,
        loanProgramCode: "LP|15B4FF3A-4F01-43BA-B554-25F71D2DF5DE",
        tenure: 3,
        tenureUnit: "DAILY",
        interestRate: 9.8635,
        expiresOn: "2023-12-28T05:47:08.644",
        generatedOn: "2023-09-27T11:47:08.644",
        stake: 1000,
        salesTurnover: 10000,
        externalLoanBurden: 10664.27,
        internalLoanBurden: 0.0,
        loanContribution: 434757.15,
        minContributionPercentage: 20,
      },
    });
    console.log("====> Loan Offer creation call back data =========>" + data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wcl-management-service.development.moniepoint.com/api/v1/wcl/offer",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + createLoanOfferToken,
      },
      data: data,
    };
    console.log("--> Create loan offer request object :: ", config);
    axios
      .request(config)
      .then((response) => {
        console.log(
          "--> Create loan offer response object :: ",
          JSON.stringify(response.data)
        );
        // res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }

  // setTimeout(acceptLoanOffer, 5000);

  // setTimeout(createOrUpdateWclRequestApprovalStatusLevel, 5000);

  setTimeout(createLoanContract, 180000);

  // res.send(loanOffer);
};

const acceptLoanOffer = () => {
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      loanRequestReference: References.loanRequestRef,
    });
    console.log("====> Loan Acceptance call back data =========>" + data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wcl-management-service.development.moniepoint.com/api/v1/wcl/offer/mock/decision",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + acceptLoanOfferToken,
      },
      data: data,
    };

    console.log("--> Accept loan offer request object :: ", config);

    axios
      .request(config)
      .then((response) => {
        console.log(
          "--> Accept loan offer response object :: ",
          JSON.stringify(response.data)
        );
        // res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(
      "Error encountered while accepting loan offer:  =====>" + error
    );
  }
};

const createOrUpdateWclRequestApprovalStatusLevel = () => {
  try {
    const axios = require("axios");

    let data = JSON.stringify({
      loanRequestReference: References.loanRequestRef,
      approvalStatus: "ACCEPTED",
      dateRequestWasLogged: "2023-05-30T15:30:00",
    });

    console.log(
      "====> Loan Request Approval Status Level creation call back data =========>" +
        data
    );

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "https://wcl-management-service.development.moniepoint.com/api/v1/wcl/request/ongoing-approval/status/update",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + createLoanContractToken,
      },
      data: data,
    };

    console.log(
      "--> wcl request approval status level request object :: ",
      config
    );

    axios
      .request(config)
      .then((response) => {
        console.log(
          "--> wcl request approval status level response object :: ",
          JSON.stringify(response.data)
        );
        // res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const createLoanContract = () => {
  // integration for creating Loan Contract
  try {
    const axios = require("axios");
    let data = JSON.stringify({
      loanRequestOfferReference: References.loanOfferRequestRef
        .replace(/\s/g, "")
        .replace(/\p{C}/gu, ""),
      fco1Code: "qfMRSX6q0C3aoXzHsy76uJmIUWzjr0yRgzhs",
      fco2Code: "Z5BZ8ACIudhXLzp3iXjbgIWbFxbKRYH437ew",
      pmCode: "6kSDjXKNjFov6qcpUiMj5lpA8wPWgdaJmk5M",
      rmCode: "abccaabbcccs",
      loanRequestReference: References.loanRequestRef,
      // loanRequestReference: WCL | REQ | C46D7B864BF67ADAF2E6BF96B6D3A106,
      loanAmount: 100000,
    });
    console.log(
      "====> Loan Contract creation call back data =========>" + data
    );

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://wcl-management-service.development.moniepoint.com/api/v1/wcl/contract",
      // url: "http://localhost:9000/api/v1/wcl/contract",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + createLoanContractToken,
      },
      data: data,
    };
    // console.log("--> Create loan contract request object ::", config);
    axios
      .request(config)
      .then((response) => {
        console.log(
          "--> Create loan contract response object ::",
          JSON.stringify(response.data)
        );
        // res.send(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getEligiblityCheckResponse,
  getLoanOfferResponse,
  getBusinessInfo,
  getBusinessOwnerInfo,
  getBusinessType,
  getBusinessOwnerInfoByUserName,
  validateBvn,
  getLgaCode,
  approveLoan,
};
