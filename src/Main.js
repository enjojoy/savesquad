import { DynamicWidget ,  useDynamicContext} from "@dynamic-labs/sdk-react-core";
import { useState } from "react";
import  CreateGroup from "./views/CreateGroup";
import { Datepicker } from "flowbite-react";
import GroupView from "./views/GroupView";

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
 

  const [groups, setGroups] = useState(
    [
      {
        "name": "Crypto Enthusiasts",
        "desc": "A group for those passionate about cryptocurrency.",
        "currency": "eth",
        "amount": 100,
        "expDate": "2024-12-31"
      },
      {
        "name": "Blockchain Developers",
        "desc": "A community for developers working on blockchain technology.",
        "currency": "btc",
        "amount": 50,
        "expDate": "2025-06-30"
      },
      {
        "name": "DeFi Investors",
        "desc": "Investors exploring decentralized finance opportunities.",
        "currency": "eth",
        "amount": 200,
        "expDate": "2023-09-15"
      },
      {
        "name": "NFT Collectors",
        "desc": "A group for enthusiasts of non-fungible tokens.",
        "currency": "eth",
        "amount": 150,
        "expDate": "2024-03-20"
      },
    ]);

  const [view, setView] = useState("CREATEGROUP");
  const {user} = useDynamicContext();
  console.log(view);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const renderView = () => {
    switch (view) {
      case "CREATEGROUP":
        return <CreateGroup />;
        case "GROUPDETAIL":
        return <GroupView group={selectedGroup} />;
    }
  };

  if (!user){
    return(

    <div className="h-screen bg-beige flex flex-col items-center justify-center text-white">
      <h1 className="font-press-start text-black text-5xl mb-6">JOIN SAVE SQUAD</h1>
        <DynamicWidget />
    </div>
    )
  }else {
  return (
    <div className="drawer h-screen bg-brown flex flex-row text-black overflow-hidden">
      < div className=" drawer-side drawer-open h-auto bg-beige rounded p-6 m-6 flex-none">
        <ul className="menu bg-base-200 text-base-content min-h-full">

      <li>
        <button className=" bg-[#9670fa] font-press-start hover:bg-gray-700 hover:text-white p-2 mb-2 w-full text-white rounded" onClick={() => setView("CREATEGROUP")}>New squad +</button>
        </li>


        {groups.map((group, index) => (
              <li key={index}>
                <button 
                  className="hover:bg-gray-700 hover:text-white p-2 mb-2 w-full rounded"
                  onClick={() => {
                    setSelectedGroup(group);
                    setView("GROUPDETAIL");
                  }}
                >
                  {group.name}
                </button>
              </li>
            ))}
        <li>



      < DynamicWidget  />
        </li>
        </ul>
      </div>
      <div className="drawer-content felx-grow h-auto w-full bg-beige rounded p-6 m-6 ">
        {renderView()}
      </div>


  </div>
  );}
}

export default Main;
