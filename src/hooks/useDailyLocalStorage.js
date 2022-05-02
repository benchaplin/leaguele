// Forked from: https://usehooks.com/useLocalStorage/
// Implements the same functionality except state is not fetched if from a previous date (local timezone)
import { useState } from "react";

export default function useDailyLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Check if local storage date key is same as today's
      const todayStr = getTodayStr();
      if (
        window.localStorage.getItem(key) &&
        Object.keys(JSON.parse(window.localStorage.getItem(key)))[0] ===
          todayStr
      ) {
        // If so, use the value behind it
        const item = JSON.parse(window.localStorage.getItem(key))[todayStr];
        // Parse stored json or if none return initialValue
        return item ? item : initialValue;
      } else {
        // If not, use the initialValue
        return initialValue;
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        const todayStr = getTodayStr();
        window.localStorage.setItem(
          key,
          JSON.stringify({ [todayStr]: valueToStore })
        );
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function getTodayStr() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}
