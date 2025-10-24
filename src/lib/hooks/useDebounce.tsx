import React from "react";

let timeout: any;
export const useDebounce = ({
  value,
  delay,
}: {
  value: string,
  delay: number
}) => {
  const prevKeyword = React.useRef(value);
  const [debounceValue, setDebounceValue] = React.useState(value);

  const setValue = React.useCallback((_value: string) => {
    if (timeout) clearTimeout(timeout);

    if (prevKeyword.current !== _value) {
      timeout = setTimeout(() => {
        setDebounceValue(_value);
        prevKeyword.current = _value;
      }, delay);
    }
  }, [delay]);

  return {
   value: debounceValue,
   setVlue: setValue,
   setDebounceValue
  }
};

export default useDebounce
