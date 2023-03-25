import { useEffect } from "react";

function useOutsideClick(ref, eventHandler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      eventHandler(e);
    };
    //https://github.com/facebook/react/issues/20325
    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, [ref, eventHandler]);
}

export default useOutsideClick;
