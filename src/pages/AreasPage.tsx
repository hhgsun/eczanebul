import SkeletonItem from '../components/SkeletonItem';
import AreaItem from '../components/AreaItem';
import React, { useState } from 'react';
import { City, fetchApiData, getCities, getCity } from '../data/ApiData';
import {
  IonContent,
  IonHeader,
  IonList,
  IonButtons,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface AreasPageProps extends RouteComponentProps<{ cityId: string; }> { }

const AreasPage: React.FC<AreasPageProps> = ({ match }) => {

  const [city, setRenderCity] = useState<City>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const loadCityData = (isRefresh: boolean = false) => {
    if (match.params.cityId !== null && match.params.cityId !== undefined) {
      if (getCities().length === 0 || isRefresh) {
        setRenderCity(undefined);
        fetchApiData().then(() => {
          const c = getCity(match.params.cityId);
          setRenderCity(c);
        }).catch(err => {
          console.log('Error:', err);
          setErrorMessage(err);
        });
      } else {
        const c = getCity(match.params.cityId);
        setRenderCity(c);
      }
    } else {
      setErrorMessage('Lütfen Öncelikle Şehir Seçimi Yapınız');
    }
  }

  useIonViewWillEnter(() => {
    loadCityData();
  });

  const refresh = (e: CustomEvent) => {
    loadCityData(true);
    setTimeout(() => {
      e.detail.complete();
    }, 100);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={city?.name} defaultHref="/cities"></IonBackButton>
          </IonButtons>
          <IonTitle>İlçe Seçiniz</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
      <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              İlçe Seçiniz
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {
          errorMessage ? <h4>{errorMessage}</h4> :
            city !== null && city !== undefined ?
              <IonList>
                {city?.areas.map(a => <AreaItem key={a.name} cityId={city.id} area={a} />)}
              </IonList>
              :
              <IonList>
                {Array.from(Array(10).keys()).map(s => <SkeletonItem key={s} />)}
              </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default AreasPage;
