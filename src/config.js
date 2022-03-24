const BASE_URL = 'http://3.39.99.10:8000';
const API = {
  login: `${BASE_URL}/users/kakao/login`,
  jobs: `${BASE_URL}/jobs`,
  cv: `${BASE_URL}/cv`,
  cv_list: `${BASE_URL}/cv/list`,
  applications: `${BASE_URL}/applications`,
  submission: `${BASE_URL}/applications/submission`,
};

export default API;
