import React from "react";
import { Overview, ProfitOverview, TransactionOverview } from "./overview";

const Dashboard = () => {
  return (
    <div className="columns-1 lg:columns-2 gap-8 space-y-8">
      <Overview className="break-inside-avoid" />
      <ProfitOverview className="break-inside-avoid" />
      <TransactionOverview className="break-inside-avoid" />
    </div>
  );
};

export default Dashboard;
