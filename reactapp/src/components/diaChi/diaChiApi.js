import axios from "axios";

export class AdressClientApi {
  static getAllProvince = () => {
    return axios({
      method: "GET",
      headers: {
        token: "6cbda0e4-7e4c-11ee-a59f-a260851ba65c",
      },
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
    });
  };
  static getAllDistrict = (codeCity) => {
    return axios({
      method: "GET",
      headers: {
        token: "6cbda0e4-7e4c-11ee-a59f-a260851ba65c",
      },
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      param: { province_id: codeCity },
    });
  };
  static getAllWard = (codeDistrict) => {
    return axios({
      method: "GET",
      headers: {
        token: "6cbda0e4-7e4c-11ee-a59f-a260851ba65c",
      },
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      param: { district_id: codeDistrict },
    });
  };
}
