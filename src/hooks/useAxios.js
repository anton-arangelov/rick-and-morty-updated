import { useState } from "react";

const useAxios = (requestConfig, applyData) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = async () => {
    setLoading(true);
    try {
      setError()
      const response = await requestConfig.func(
        requestConfig.url,
        requestConfig.body ? requestConfig.body : null
      );
      const data = response.data;
      // console.log(data)
      applyData(data);
    } catch (error) {
      // applyData([]);
      console.log(error);
      setError(error)
    }
    setLoading(false);
  };
  return {
    loading: loading,
    error: error,
    sendRequest: sendRequest,
  };
};

export default useAxios;
