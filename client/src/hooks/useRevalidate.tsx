import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
export function useRevalidate() {
  // We get the navigate function from React Rotuer
  let navigate = useNavigate();
  // And return a function which will navigate to `.` (same URL) and replace it
  return useCallback(
    function revalidate() {
      navigate(".", { replace: true });
    },
    [navigate]
  );
}
