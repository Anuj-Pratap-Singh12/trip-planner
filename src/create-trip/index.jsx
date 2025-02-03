import { useEffect, useState } from "react"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from "../constants/options";
import { chatSession } from "../service/AIModal";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FcGoogle } from "react-icons/fc";
import { LogIn } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";


const CreateTrip = () => {

  const [place,setPlace] = useState();
  
  const [formData,setFormData]= useState([]);
  const [open, setOpen] = useState(true)

  const handleInputChange=(name,value)=>{
    setFormData({
      ...formData,
      [name] : value
    })
  }

  const login= useGoogleLogin({
    onSuccess: (codeResp) =>GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  useEffect(()=>{
    console.log(formData);
  },[formData])

  const onGenerateTrip = async() => {
    
    const user = localStorage.getItem('user');

    if(!user){
      return ;
    }

    if(formData?.noOfDays>5&&!formData?.location||!formData?.budget||!formData?.traveler){
      alert("Please fill alll the details");
    }

    const FINAL_PROMPT = AI_PROMPT.replace('{location}',formData?.location?.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{budget}',formData?.budget)
    .replace('{traveler}',formData?.traveler)

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
  }

  const SaveTrip= async(TripData)=> {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db,"AITrips",docId),{
      userSelection: formData,
    })
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json',
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpen(false);
      onGenerateTrip();
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-70 px-5 mt-10">
    <h2 className="font-bold text-3xl  ">Tell us your travel preferences🏕️</h2>
    <p className="mt-3 text-gray-500 text-xl">JUst provide some basic informations, about your trip pannner will generate a customized itinerary on your preferences</p>

    <div className="mt-10 ">
      <div>
        <h2 className="text-xl my-3 font-medium ">What is destination of choice?</h2>
        <GooglePlacesAutocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          selectProps={{
            place,
            onChange:(v)=>{setPlace(v); handleInputChange('location',v)}
          }}
        />
      </div>

      <div className="mt-5">
      <h2 className="text-xl my-3 font-medium ">How many days are you planning to travel?</h2>
        <input className="h-10 w-full flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
        placeholder="Ex.3" type="number"
        onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
        ></input>
      </div>

      <div className="mt-3">
        <h2 className="text-xl my-3 font-medium ">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-3">
          {SelectBudgetOptions.map((item,index)=>(
            <div key={index} 
             onClick={()=> handleInputChange('budget', item.title)}
            className={`p-4 cursor-pointer rounded-lg border hover:shadow
            ${formData?.budget==item.title&&'shadow-lg border-3'}`}>
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="text-lg foint-bold">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <h2 className="text-xl my-3 font-medium ">Who do you plan on travelling with your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-3">
          {SelectTravelsList.map((item,index)=>(
            <div key={index}
              onClick={()=> handleInputChange('traveler', item.people)}
              className={`p-4 cursor-pointer rounded-lg border hover:shadow
                ${formData?.traveler==item.people&&'shadow-lg border-3'}`}>
            <h2 className="text-4xl">{item.icon}</h2>
            <h2 className="text-lg foint-bold">{item.title}</h2>
            <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="my-10 justify-end flex">
      <button className="bg-black hover:bg-blue-700 hover:cursor-pointer text-white py-2 px-4 rounded-md"
      onClick={onGenerateTrip}>Generate trip</button>
    </div>

    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  </DialogTitle>
                  <div className="mt-2">
                    <img src="/logo.svg"/>
                    <h2 className="font-bold text-xl mt-7">Sign In with Google</h2>
                    <p>Sign in to the App with Google Authentication securely</p>
                    <button className="bg-black w-full hover:cursor-pointer text-white py-2 px-4 rounded-lg mt-5 flex gap-4 items-center"
                    onClick={login}>{<FcGoogle className="h-7 w-7"/>}  Sign In With Google </button>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
    </div>
  )
}

export default CreateTrip