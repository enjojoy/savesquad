import { DynamicWidget ,  useDynamicContext} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";

// import { Address } from "~~/components/scaffold-eth";
// import  {UserProfile}  from "@dynamic-labs/sdk-react-core";

//Views: LOGIN - not logged in; Menu - DASHBOARD, APP 


const Main = () => {

  const [view, setView] = useState("DASHBOARD");
  const {user} = useDynamicContext();
  console.log(view);
  if (!user){
    return(

    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo"/>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Onboard the world</h1>
        <p className="text-lg mb-16">Web3 login for <span className="text-blue-400">everyone</span>.</p>
        <DynamicWidget />
      </div>
      <ul className="menu bg-base-200 rounded-box w-56">
  <li><a>Item 1</a></li>
  <li><a>Item 2</a></li>
  <li><a>Item 3</a></li>
</ul> 
    </div>
    )
  }else {
  return (
    <div className="drawer min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-row text-white">
      < div className=" drawer-side drawer-open min-h-screen bg-gray-400 rounded p-6 m-6 ">
        <ul className="menu bg-base-200 text-base-content min-h-full">

      <li>
        <button className="hover:bg-gray-700 hover:text-white p-2 w-full rounded" onClick={() => setView("DASHBOARD")}>Dashboard</button>
        </li>
        <li>

      <button className="hover:bg-gray-700 hover:text-white p-2 mb-2 w-full rounded" onClick={() => setView("INTERFACE")}>Interface</button>
        </li>
        <li>

      < DynamicWidget  />
        </li>
        </ul>
      </div>
      <div className="drawer-content min-h-screen w-full bg-gray-400 rounded p-6 m-6 ">
        {view}
      </div>
  </div>
  );}
}

export default Main;
