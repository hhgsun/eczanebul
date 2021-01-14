import MessageListItem from '../components/MessageListItem';
import SkeletonItem from '../components/SkeletonItem';
import React, { useState } from 'react';
import { City, fetchApiData, getCities } from '../data/ApiData';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';

const Home: React.FC = () => {

  const [cities, setRenderCities] = useState<City[]>([]);

  const getCitiesServer = (isRefresh: boolean = false) => {
    const citylist = getCities();
    console.log(citylist);
    if (citylist.length === 0 || isRefresh) {
      setRenderCities([]);
      fetchApiData().then(() => {
        setRenderCities(getCities());
      });
    } else {
      setRenderCities(citylist);
    }
  }

  useIonViewWillEnter(() => {
    getCitiesServer();
  });

  const refresh = (e: CustomEvent) => {
    getCitiesServer(true);
    setTimeout(() => {
      e.detail.complete();
    }, 100);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Şehir Seçiniz
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {
          cities.length !== 0 ?
            <IonList>
              {cities.map(c => <MessageListItem key={c.id} city={c} />)}
            </IonList>
            :
            <IonList>
              {Array.from(Array(7).keys()).map(s => <SkeletonItem key={s} />)}
            </IonList>
        }

      </IonContent>
    </IonPage>
  );
};

export default Home;
