import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ViewMessage from './pages/ViewMessage';
import CitiesPage from './pages/CitiesPage';
import AreasPage from './pages/AreasPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import PharmaciesPage from './pages/PharmaciesPage';
import PharmacyDetailPage from './pages/PharmacyDetailPage';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/cities" component={CitiesPage} exact={true} />
        <Route path="/cities/:cityId" component={AreasPage} exact={true} />
        <Route path="/cities/:cityId/:areaName" component={PharmaciesPage} exact={true} />
        <Route path="/cities/:cityId/:areaName/:pharmacyName" component={PharmacyDetailPage} exact={true} />
        <Route path="/message/:id" component={ViewMessage} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/cities" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
