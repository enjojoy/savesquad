const GroupView = ({ group}) => {
    console.log(group)
  return (
    <div>
        <h1 className="font-press-start p-2">
   {group.name} 
        </h1>
        <p className="p-4">{group.desc}</p>
    </div>
  );
};

export default GroupView;