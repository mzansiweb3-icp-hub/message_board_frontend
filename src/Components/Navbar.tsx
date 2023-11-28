const Navbar = ({ login, logout, isAuthenticated }) => {
  return (
    <div className="flex justify-between py-10 px-5">
      <div className="">
        <h1 className="text-4xl text-gray-700 font-bold">
          Message board frontend
        </h1>
      </div>
      <button
        onClick={isAuthenticated ? logout : login}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
