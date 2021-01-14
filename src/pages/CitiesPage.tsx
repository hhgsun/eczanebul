import CityItem from '../components/CityItem';
import SkeletonItem from '../components/SkeletonItem';
import React, { useEffect, useState } from 'react';
import { City, fetchApiData, getCities } from '../data/ApiData';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import { bandageOutline } from 'ionicons/icons';

const CitiesPage: React.FC = () => {

  const [cities, setRenderCities] = useState<City[]>([]);
  const [isPageLoad = false, setPageLoad] = useState<boolean>();
  const [searchQuery = '', setSearchQuery] = useState<string>();

  const loadCitiesData = (isRefresh: boolean = false) => {
    setPageLoad(false);
    const citylist = getCities();
    if (citylist.length === 0 || isRefresh) {
      setRenderCities([]);
      fetchApiData().then(() => {
        setRenderCities(getCities());
        setPageLoad(true);
      }).catch(err => console.log('Error:', err));
    } else {
      setRenderCities(citylist);
      setPageLoad(true);
    }
  }

  useIonViewWillEnter(() => {
    loadCitiesData();
  });

  const refresh = (e: CustomEvent) => {
    loadCitiesData(true);
    setTimeout(() => {
      e.detail.complete();
    }, 100);
  };

  useEffect(() => {
    if (searchQuery !== '' && searchQuery !== undefined && searchQuery !== null) {
      let tempSearchResult = getCities().filter(ele => ele.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setRenderCities(tempSearchResult);
    } else {
      setRenderCities(getCities());
    }
  }, [searchQuery])

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonIcon icon={bandageOutline} slot="start" style={{marginLeft:'20px'}} />
          <IonTitle>Şehir Seçiniz</IonTitle>
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

        <IonSearchbar disabled={!isPageLoad} placeholder="Şehir Ara" value={searchQuery} onIonChange={e => setSearchQuery(e.detail.value!)} cancelButtonText={'Vazgeç'} type="search"></IonSearchbar>

        {
          isPageLoad ?
            <IonList>
              {cities.map(c => <CityItem key={c.id} city={c} />)}
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

export default CitiesPage;
