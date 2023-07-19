import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const userDetails = useSelector((state) => state.user);

  return <div>Welcome {userDetails?.user?.user?.name}</div>;
};

export default Home;
