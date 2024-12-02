/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useLocation, Navigate } from "react-router-dom";

function RouteGaurd({ authenticated, user, element }) {
  const location = useLocation();

  console.log(authenticated, user, "useruser");

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment> {element} </Fragment>;
}

export default RouteGaurd;
