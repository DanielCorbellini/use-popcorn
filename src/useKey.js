import { useEffect } from "react";

export default function useKey(key, action, optinalAction) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);
      optinalAction?.();
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}
