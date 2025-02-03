
const Header = () => {
  return (
    <div className="p-2 shadow-sm flex justify-between">
      <img src="./logo.svg"/>
      <div>
      <button className="bg-black hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded-md">Sign in</button>
      </div>
    </div>
  )
}

export default Header