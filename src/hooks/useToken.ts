import { useEffect, useState } from "react";

export const useToken = (user: any) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const email = user?.user?.email;
    const img = user?.user?.photoURL;
    const name = user?.user?.displayName;
    const userInfo = {
      email,
      img,
      name,
    };
    if (email) {
      fetch(`https://limitless-beach-64664.herokuapp.com/user/add/${email}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const accessToken = data.token;
          localStorage.setItem("accessToken", accessToken);
          setToken(accessToken);
        });
    }
  }, [user]);

  return [token];
};
