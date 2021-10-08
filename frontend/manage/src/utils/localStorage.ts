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
  try {
    const value = localStorage.getItem(key);

    if (typeof value === "string") return JSON.parse(value);
  } catch (error) {
    return undefined;
  }
};

export const setLocalStorage = (key: string, value: any) => {
  try {
    const decycled = JSON.stringify(value, getCircularReplacer());

    if (decycled) {
      localStorage.setItem(key, decycled);
    } else {
      console.error("JSON stringify error.");
    }
  } catch (error) {
    return null;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};
