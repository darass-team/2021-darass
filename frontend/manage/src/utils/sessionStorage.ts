const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const getSessionStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (typeof value === "string") return JSON.parse(value);
};

export const setSessionStorage = (key: string, value: any) => {
  const decycled = JSON.stringify(value, getCircularReplacer());

  if (decycled) {
    localStorage.setItem(key, decycled);
  } else {
    console.error("JSON stringify error.");
  }
};

export const removeSessionStorage = (key: string) => {
  localStorage.removeItem(key);
};
