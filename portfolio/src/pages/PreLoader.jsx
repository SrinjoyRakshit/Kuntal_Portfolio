import React, { useEffect, useState } from "react";
import Loading from "./Loading";

const PreLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000); 
  }, []);

  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-[#131f11] flex items-center justify-center z-[9999]">
          <Loading />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default PreLoader;