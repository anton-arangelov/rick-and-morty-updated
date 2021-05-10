import { useState } from "react";

const useAxios = (requestConfig, applyData) => {
  const [loading, setLoading] = useState(false);
  const sendRequest = async () => {
    setLoading(true);

    try {
      const response = await requestConfig.func(
        requestConfig.url,
        requestConfig.body ? requestConfig.body : null
      );
      const data = response.data;

      applyData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  return {
    loading: loading,
    sendRequest: sendRequest,
  };
};

export default useAxios;
