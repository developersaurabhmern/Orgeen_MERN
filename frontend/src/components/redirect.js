import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Loading({ path }) {
  const navigate = useNavigate();
  // console.log('path ', path)
  useEffect(() => {
    navigate(path);
  }, []);

  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export default Loading;
