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

    if (!decycled) {
      console.error("JSON stringify error.");

      return;
    }

    return localStorage.setItem(key, decycled);
  } catch (error) {
    return;
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return;
  }
};
