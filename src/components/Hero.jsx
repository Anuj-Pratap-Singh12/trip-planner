
const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[60px] text-center mt-16">
      <span className="text-red-700">Discover your Next Adventure with AI:</span>Personalized Itineraries at your Fingertips</h1>
      <p className="text-xl text-gray-500 text-center">The AI Trip Planner App is an intelligent travel companion designed to help users plan, organize, and optimize their trips effortlessly. Using artificial intelligence, it personalizes itineraries based on user preferences, budget, time constraints, and real-time data.</p>

      <a href='/create-trip'><button className="bg-black hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded-md">Get started, it is free</button></a>
    </div>
  )
}

export default Hero