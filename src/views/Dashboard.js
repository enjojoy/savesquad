
const Dashboard = ({user}) => {

    console.log("USER DASHBOARD:", user);


  return (
    <div className="grid grid-cols-2 gap-4 h-full">
    <div className="bg-gray-200 flex items-center justify-center">Countdown</div>
    <div className="bg-gray-200 flex items-center justify-center">Pool/Balance/Rewards</div>
    <div className="bg-gray-200 flex items-center justify-center">My Transactions</div>
    <div className="bg-gray-200 flex items-center justify-center">Four</div>
  </div>
  );
};

export default Dashboard;