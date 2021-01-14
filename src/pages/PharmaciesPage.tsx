import SkeletonItem from '../components/SkeletonItem';
import React, { useState } from 'react';
import { Area, getCities, getArea, fetchApiData } from '../data/ApiData';
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
import PharmacyItem from '../components/PharmacyItem';

interface PharmaciesPageProps extends RouteComponentProps<{ cityId: string; areaName: string; }> { }

const PharmaciesPage: React.FC<PharmaciesPageProps> = ({ match }) => {

  const [area, setRenderArea] = useState<Area>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const loadPharmicesData = (isRefresh: boolean = false) => {
    if (match.params.cityId !== null && match.params.cityId !== undefined && match.params.areaName !== null && match.params.areaName !== undefined) {
      if (getCities().length === 0 || isRefresh) {
        setRenderArea(undefined);
        fetchApiData().then(() => {
          const c = getArea(match.params.cityId, match.params.areaName);
          setRenderArea(c);
        }).catch(err => {
          console.log('Error:', err);
          setErrorMessage(err);
        });
      } else {
        const a = getArea(match.params.cityId, match.params.areaName);
        setRenderArea(a);
      }
    } else {
      setErrorMessage('Lütfen Öncelikle Şehir Seçimi Yapınız');
    }
  }

  useIonViewWillEnter(() => {
    loadPharmicesData();
  });

  const refresh = (e: CustomEvent) => {
    loadPharmicesData(true);
    setTimeout(() => {
      e.detail.complete();
    }, 100);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text={area?.name} defaultHref="/cities"></IonBackButton>
          </IonButtons>
          <IonTitle>Eczaneler</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Eczaneler
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {
          errorMessage ? <h4>{errorMessage}</h4> :
            area !== null ?
              <IonList>
                {
                  area?.pharmacies.map(p =>
                    <PharmacyItem key={p.name} cityId={match.params.cityId} areaName={match.params.areaName} pharmacy={p} />)
                }
              </IonList>
              :
              <IonList>
                {Array.from(Array(1).keys()).map(s => <SkeletonItem key={s} />)}
              </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default PharmaciesPage;
