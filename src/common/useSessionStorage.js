import { useEffect, useState, useMemo } from "react";

const useSessionStorage = (key, initialValue) => {
  const [value, setValue] = useState();

  

  useEffect(() => {
    try {
      const string = sessionStorage.getItem(key);
      const json = JSON.parse(string)
      if (json) {
        setValue(json);
      } else {
        setValue(initialValue);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      const string = JSON.stringify(value);
      sessionStorage.setItem(key, string);
    } catch (e) {
      console.log(e);
    }
  }, [value]);

  console.log(value)
  return [value, setValue];
};

export default useSessionStorage;
