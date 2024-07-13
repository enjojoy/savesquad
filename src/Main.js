import { DynamicWidget, useDynamicContext, useDynamicScopes } from "@dynamic-labs/sdk-react-core";
import { useState, useEffect } from "react";
import CreateGroup from "./views/CreateGroup";
import { Datepicker } from "flowbite-react";
import GroupView from "./views/GroupView";
import Dashboard from "./views/Dashboard";
import Image from 'next/image'


// import { Address } from "~~/components/scaffold-eth";
// import  {UserProfile}  from "@dynamic-labs/sdk-react-core";

//Views: LOGIN - not logged in; Menu - DASHBOARD, APP 

//group object example
// {
//   name:"Name",
//   desc:"Hello here is a group",
//   currency: "eth",
//   amount: 100,
//   expDate: "11.01.2001"
// }

const Main = () => {
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch('/api/proxy', {
  //         method: 'POST', // Ensure this is a POST request
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           name: 'Name test another123',
  //           scope: 'Test1',
  //           outcome: 'scope',
  //         }),
  //       });

  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         throw new Error(`Error from API: ${errorText}`);
  //       }

  //       const result = await response.json();
  //       console.log('Result:', result);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);
 
  const [file, setFile] = useState(null);

  const [groups, setGroups] = useState(
    [

    ]);
  useEffect(() => {

    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      setGroups(JSON.parse(storedGroups));
    }
  }, [])

  const [view, setView] = useState("DASHBOARD");
  const { user } = useDynamicContext();
  console.log('USER:', user);
  const { userScopes } = useDynamicScopes();
  const [selectedGroup, setSelectedGroup] = useState(null);
  console.log("SCOPES:", userScopes);

  const renderView = () => {
    switch (view) {
      case "CREATEGROUP":
        return <CreateGroup groups={groups} setGroups={setGroups} file={file} setFile={setFile}/>;
      case "GROUPDETAIL":
        return <GroupView group={selectedGroup} />;
      case "DASHBOARD":
        return <Dashboard user={user}/>
    }
  };

  if (!user) {
    return (

      <div className="h-screen bg-beige flex flex-col items-center justify-center text-white">
        <h1 className="font-press-start text-black text-5xl mb-6">JOIN SAVE SQUAD</h1>
        <DynamicWidget />
      </div>
    )
  } else {
    return (
      <div className="drawer h-screen bg-brown flex flex-row text-black overflow-hidden">
        < div className=" drawer-side relative drawer-open h-auto bg-beige rounded p-6 m-6 flex-none">
          <ul className="flex flex-col menu bg-base-200 text-base-content min-h-full">
            <li>
            <Image src={`images/logo.svg`} alt="logo" height="50" width="250" onClick={()=>setView("DASHBOARD")}/>
            </li>


            {groups.map((group, index) => (
              <li key={index} >
                <button
                  className="hover:bg-orange hover:text-white p-2 mb-2 w-full rounded"
                  onClick={() => {
                    setSelectedGroup(group);
                    setView("GROUPDETAIL");
                  }}
                >
                  {group.name}
                </button>
              </li>
            ))}
            <div className="absolute bottom-0 mb-6 center w-[250px]">

            <li>
              <button className=" bg-[#9670fa] font-press-start hover:bg-gray-700 hover:text-white p-2 mb-2 w-full text-white rounded" onClick={() => setView("CREATEGROUP")}>New squad +</button>
            </li>
            <li>
              < DynamicWidget />
            </li>
            </div>
          </ul>
        </div>
        <div className="drawer-content felx-grow h-auto w-full bg-beige rounded p-6 m-6 ">
          {renderView()}
        </div>




      </div>
    );
  }
}

export default Main;
