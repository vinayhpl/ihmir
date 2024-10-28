import axios from "axios";

// const BASE_URL = "http://10.60.62.186:8000";
// const BASE_URL = "http://10.60.60.134:8001";

// const BASE_URL = "https://iihmr.test.api.kavinsoft.in";
// const BASE_URL = "https://api.iihmrbangalore.in";
//const BASE_URL = "https://iihmr.dev.api.kavinsoft.in";
//const BASE_URL = "https://api.cloudnights.in";
//const BASE_URL = "https://api.iihmr-p.cloudnights.in";
const BASE_URL = "/api";

const api = {
  login: async (userid, password, additionalData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/web_login`,
        {
          userid,
          password,
          ...additionalData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  },
  get_Admin_RawData: async (requestData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin_raw_data_download`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching raw data:", error.message);
      throw error;
    }
  },
  uploadMobileApk: async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/admin_IIHMR_mobile_apk_upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Upload error:", error.message);
      throw error;
    }
  },
};

export default api;
