import React, { useState, useEffect, createContext } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext({});

function AuthorizeView(props) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState();

  useEffect(() => {
    let retryCount = 0;
    let maxRetries = 3;
    let delay = 1000;

    function wait(delay) {
      return new Promise((resolve) => setTimeout(resolve, delay));
    }

    async function fetchWithRetry(url, options) {
      try {
        let response = await fetch(url, options);

        if (response.status == 200) {
          console.log("Authorized");
          let j = await response.json();
          setUser({ email: j.email, username: j.username });
          setAuthorized(true);
          return response;
        } else if (response.Result = false) {
          console.log("Unauthorized");
          return response;
        } else {
          throw new Error("" + response.status);
        }
      } catch (error) {
        retryCount++;
        if (retryCount > maxRetries) {
          throw error;
        } else {
          await wait(delay);
          return fetchWithRetry(url, options);
        }
      }
    }

    fetchWithRetry("/api/Login/test", {
      method: "GET",
    })
      .catch((error) => {
        console.log(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading....
        </p>
      </>
    );
  } else {
    if (authorized && !loading) {
      return (
        <>
          <UserContext.Provider value={user}>
            {props.children}
          </UserContext.Provider>
        </>
      );
    } else {
      return (
        <>
          <Navigate to="/" />
        </>
      );
    }
  }
}

export default AuthorizeView;

// sekarang ini kan kunci page, nah ubah ke ini cuma ngecek user udh login atau belum, kalau udh mengirimkan data user dalam usercontext, kalau belum kirim data belum login di user context