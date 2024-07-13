import { Progress } from "flowbite-react";
import { SendTransactionSection } from "./SendTransaction"



const GroupView = ({ group }) => {
  console.log(group)
  return (
    <div className="flex flex-col">
      <h1 className="font-press-start p-2">
        {group.name}
      </h1>
      <p>{group.desc}</p>


      <div className=" w-4/5 py-3">
        <Progress size={"lg"} progress={0}></Progress>
      </div>

      <div>contributed: {group.contributed} / {group.amount}</div>


      <div className="flex justify-end">

        <SendTransactionSection address={0xb76080b3025f0fAAF8A2223C037C351d6AF6A1AA}></SendTransactionSection>

      </div>
    </div>
  );
};

export default GroupView;