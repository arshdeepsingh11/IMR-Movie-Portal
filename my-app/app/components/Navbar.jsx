
const Navbar = () => {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">IMR Movie Database</h1>
          <div className="flex space-x-4">
            <a href="/" className="hover:text-blue-400">Home</a>
           
          </div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  