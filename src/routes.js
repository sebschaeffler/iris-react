import React from 'react';
import {IndexRedirect, IndexRoute, Route} from 'react-router';
import AppLayout from './components/AppLayout';
import dashboard from './modules/dashboard';
import apis from './modules/apis';
import apps from './modules/apps';
import packs from './modules/packs';
import subscriptions from './modules/subscriptions';
import uiPage from './modules/repositories/ui';

const getRoutes = (store) => {
  return (
    <Route path='/' component={AppLayout}>
      <IndexRoute component={AppLayout}/>
      <IndexRedirect to='dashboard'/>
      <Route path='dashboard' component={dashboard.components.DashboardPage}/>
      <Route component={apis.components.ApisPage}>
        <Route path='apislist' component={apis.components.ApisListPage}/>
        <Route path='newapi' component={apis.components.ApisCreatePage}/>
        <Route path='api/:id' component={apis.components.ApisCreatePage}/>
      </Route>
      <Route component={apps.components.AppsPage}>
        <Route path='appslist' component={apps.components.AppsListPage}/>
        <Route path='newapp' component={apps.components.AppsCreatePage}/>
        <Route path='app/:id' component={apps.components.AppsCreatePage}/>
      </Route>
      <Route component={packs.components.PacksPage}>
        <Route path='packageslist' component={packs.components.PacksListPage}/>
        <Route path='newpackage' component={packs.components.PacksCreatePage}/>
        <Route path='package/:id' component={packs.components.PacksCreatePage}/>
      </Route>
      <Route component={subscriptions.components.SubscriptionsPage}>
        <Route path='subscriptionslist' component={subscriptions.components.SubscriptionsListPage}/>
        <Route path='newsubscription' component={subscriptions.components.SubscriptionsCreatePage}/>
        <Route path='subscription/:id' component={subscriptions.components.SubscriptionsCreatePage}/>
      </Route>
      <Route component={uiPage.UIPage}>
        <Route path='ui' component={uiPage.ColorsPage}/>
      </Route>
    </Route>
  );
};

export default {getRoutes};
