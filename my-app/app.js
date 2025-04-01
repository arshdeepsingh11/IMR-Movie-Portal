import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./app/page";
import Layout from "./app/layout";
import NotFound from "./app/NotFound"; // Ensure this component exists

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
