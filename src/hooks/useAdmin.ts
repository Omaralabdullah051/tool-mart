import { useEffect, useState } from "react";

const useAdmin = (email: string | null | undefined) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (email) {
      fetch(`http://localhost:5000/user/admin/${email}`, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data.admin);
          setAdminLoading(false);
        });
    }
  }, [email]);

  return [admin, adminLoading];
};

export default useAdmin;
