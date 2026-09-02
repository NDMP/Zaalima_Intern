import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
