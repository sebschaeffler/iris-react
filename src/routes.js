import React from 'react';
import { IndexRedirect, Route } from 'react-router';
import AppLayout from "./components/AppLayout";
import dashboard from "./modules/dashboard";

const getRoutes = (store) => {
  return (
    <Route path="/" component={AppLayout}>
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={dashboard.components.DashboardPage} />
    </Route>
  );
};

export default { getRoutes };
