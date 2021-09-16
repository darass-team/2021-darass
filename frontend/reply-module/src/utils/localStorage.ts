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

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (typeof value === "string") return JSON.parse(value);
};

export const setLocalStorage = (key: string, value: any) => {
  const decycled = JSON.stringify(value, getCircularReplacer());

  if (decycled) {
    localStorage.setItem(key, decycled);
  } else {
    console.error("JSON stringify error.");
  }
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
