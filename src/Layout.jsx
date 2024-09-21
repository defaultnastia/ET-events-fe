import { Suspense } from "react";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </>
  );
};

export default Layout;
