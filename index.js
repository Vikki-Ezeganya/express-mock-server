const express = require("express");
const app = express();
app.use(express.json());

const {
  approveLoan,
  getLgaCode,
  getEligiblityCheckResponse,
  getLoanOfferResponse,
  getBusinessInfo,
  getBusinessOwnerInfo,
  getBusinessType,
  getBusinessOwnerInfoByUserName,
  validateBvn,
} = require("./controllers/mockIntegrationController.js");

app.post("/api/v1/business-loan-requests", (req, res) => {
  approveLoan(req, res);
});

app.get("/api/v1/lga/alt-code/:altLgaCode", (req, res) => {
  getLgaCode(req, res);
});

app.post(
  "/mock/api/v1/credit-assessment-system/eligibility-check",
  (req, res) => {
    getEligiblityCheckResponse(req, res);
  }
);

app.post("/mock/api/v1/credit-assessment-system/loan-offer", (req, res) => {
  getLoanOfferResponse(req, res);
});

app.get(
  "/mock/api/v1/client/business/code/:businessCode/with-address",
  (req, res) => {
    getBusinessInfo(req, res);
  }
);

app.get(
  "/mock/api/v1/client/business/code/:businessCode/business-owner/with-address",
  (req, res) => {
    getBusinessOwnerInfo(req, res);
  }
);

app.get("/mock/api/v1/business-type/:businessCode", (req, res) => {
  getBusinessType(req, res);
});

app.get("/mock/api/v1/client/business-owner/username/:username", (req, res) => {
  getBusinessOwnerInfoByUserName(req, res);
});

app.get("/mock/api/v1/client/bvn/:bvn", (req, res) => {
  validateBvn(req, res);
});
//MakingUse of Environment varible to set port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
