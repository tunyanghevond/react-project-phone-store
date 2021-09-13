import React from "react";
import Navbar from "./Navbar";
import CartContainer from "./CartContainer";
import { useGlobalContext } from "./context";

function App() {
  const { isLoading } = useGlobalContext();
  if (isLoading) {
    return (
      <main className="loading">
        <h1>Loading...</h1>
      </main>
    );
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
