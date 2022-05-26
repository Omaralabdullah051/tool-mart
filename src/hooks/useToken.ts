import { useEffect, useState } from "react";

export const useToken = (email: string | null | undefined) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const user = { email: email };
    if (email) {
      fetch(`http://localhost:5000/user/add/${email}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [email]);

  return [token];
};
