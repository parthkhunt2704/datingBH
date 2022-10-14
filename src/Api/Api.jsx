import axios from "axios";

let BaseURL = "https://phpwebdevelopmentservices.com/development/datingbh_admin/";
const token = () => {
  let token = "Bearer " +  JSON.parse(localStorage.getItem("access_tocken"));
  return token;
};
let headers = {
  authorization: token(),
};
console.log("headers",headers);

export const Bucket = process.env.REACT_APP_BUCKET;
export const getFileImage=(file)=>{
  let ext = file.split('.').pop();
  let filePrev = "";
  let img = ['apng', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp', 'bmp', 'ico', 'cur', 'tif','tiff'];
  if (img.includes(ext.toLowerCase())) {
      filePrev = BaseURL + file;
  } 
  return filePrev;
}
export const ApiGetNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + "api/" + type)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiPostNoAuth = (type, userData) => {
  console.log("userData", BaseURL + "api/" + type);
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + "api/" + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          console.log("userData1");

          reject(error?.response?.data);
        } else {
          console.log("userData2");

          reject(error?.response);
        }
      });
  });
};

export const ApiPutNoAuth = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + "api/" + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiDeleteNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + "api/" + type)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiGet = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + "api/" + type, { headers: headers })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            //   signout();
            console.log("auth token error");
          } else {
            reject(error?.response?.data);
          }
        } else {
          console.log(error);
          reject(error);
        }
      });
  });
};

export const ApiPost = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + "api/" + type, userData, { headers: headers })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            console.log("auth token error");
          } else {
            reject(error?.response?.data);
          }
        } else {
          console.log(error);
          reject(error);
        }
      });
  });
};

export const ApiPut = (type, userData) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + "api/" + type, userData, { headers: headers })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            //   signout();
            console.log("auth token error");
          } else {
            reject(error?.response?.data);
          }
        } else {
          console.log(error);
          reject(error);
        }
      });
  });
};

export const ApiDelete = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + "api/" + type, { headers: headers })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            //   signout();
            console.log("auth token error");
          } else {
            reject(error?.response?.data);
          }
        } else {
          console.log(error);
          reject(error);
        }
      });
  });
};
