// app/layout.js

import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
import "./globals.css"; // Ensure global styles are applied

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans min-h-screen flex flex-col">
        
        {/* Navbar */}
        <Navbar /> 

        {/* Page Content */}
        <main className="flex-1">{children}</main> {/* Render child components inside here */}

        {/* Footer */}
        <Footer /> 

      </body>
    </html>
  );
}
