import AddExpense from './AddExpense';


const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Dashboard: Start Splitting Expenses!</h2>
      <p>Welcome back! Ippo neenga expenses manage panna ready.</p>

      {/* Inga dhaan Add Expense or Group Create components varum */}
      <AddExpense />
     
      {/* Example: GroupCreate component-a unga path-la irunthu import panni inga podunga */}
      {/* <GroupCreate /> */}
    </div>
  );
};

export default Dashboard;