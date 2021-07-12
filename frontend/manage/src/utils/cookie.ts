const setCookie = (key: string, value: string, keepAliveMinutes = 60) => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + keepAliveMinutes);

  const cookieValue = escape(value) + "; expires=" + expiryDate.toUTCString();
  document.cookie = key + "=" + cookieValue;
};

const getCookie = (key: string) => {
  let x, y;
  let val = document.cookie.split(";");

  for (let i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf("="));
    y = val[i].substr(val[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x === key) {
      return unescape(y);
    }
  }

  return null;
};

export { setCookie, getCookie };
