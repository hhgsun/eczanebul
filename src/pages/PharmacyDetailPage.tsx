import React, { useState } from 'react';
import { fetchApiData, getCities, getPharmacy, Pharmacy } from '../data/ApiData';
import {
  IonContent,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  isPlatform,
  IonSpinner,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { call } from 'ionicons/icons';

interface PharmacyDetailPageProps extends RouteComponentProps<{ cityId: string; areaName: string; pharmacyName: string; }> { }

const PharmacyDetailPage: React.FC<PharmacyDetailPageProps> = ({ match }) => {

  const [pharmacy, setRenderPharmacy] = useState<Pharmacy>();
  const [pharmacyCoords, setRenderPharmacyCoords] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const loadPharmicyData = (isRefresh: boolean = false) => {
    if (match.params.cityId !== null && match.params.cityId !== undefined && match.params.areaName !== null && match.params.areaName !== undefined) {
      if (getCities().length === 0 || isRefresh) {
        setRenderPharmacyCoords(undefined);
        fetchApiData().then(() => {
          const p = getPharmacy(match.params.cityId, match.params.areaName, match.params.pharmacyName);
          setRenderPharmacyCoords(splitCoordinates(p?.coordinates ? p.coordinates : '0,0'))
          setRenderPharmacy(p);
        }).catch(err => {
          console.log('Error:', err);
          setErrorMessage(err);
        });
      } else {
        const p = getPharmacy(match.params.cityId, match.params.areaName, match.params.pharmacyName);
        setRenderPharmacyCoords(splitCoordinates(p?.coordinates ? p.coordinates : '0,0'))
        setRenderPharmacy(p);
      }
    } else {
      setErrorMessage('Lütfen Öncelikle Şehir Seçimi Yapınız');
    }
  }

  useIonViewWillEnter(() => {
    loadPharmicyData();
  });

  const openMap = (lat: string, lon: string) => {
    console.log(lat, lon);
    if (isPlatform('ios')) {
      window.open('maps://?q=' + lat + ',' + lon, '_system');
    } else if (isPlatform('desktop')) {
      window.open('https://maps.google.com/maps?daddr=' + lat + ',' + lon + '&amp;ll=');
    } else {
      window.open('geo:' + lat + ',' + lon + '?q=' + lat + ',' + lon + '', '_system');
    }
  }

  const splitCoordinates = (coordinates: string) => {
    let coords = coordinates.split(',');
    return {
      lat: coords[0],
      lng: coords[1]
    };
  }


  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Eczaneler" defaultHref="/cities"></IonBackButton>
          </IonButtons>
          <IonTitle>{pharmacy?.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              {pharmacy?.name}
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href={"tel:" + pharmacy?.phone}>
            <IonIcon icon={call} />
          </IonFabButton>
        </IonFab>

        {
          errorMessage ? <h4>{errorMessage}</h4> :
            pharmacy !== undefined ?
              <MapContainer className={isPlatform('ios') ? 'leaflet-container-ios' : ''} center={[pharmacyCoords.lat, pharmacyCoords.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[pharmacyCoords.lat, pharmacyCoords.lng]}>
                  <Popup>
                    <h3><b>{pharmacy.name}</b></h3>
                    <b>Adres:</b>
                    <h5 style={{ marginTop: 0 }}>{pharmacy.address}</h5>
                    <b>Tel:</b>
                    <h5 style={{ marginTop: 0 }}>
                      <a style={{ textDecoration: 'none', color: 'black' }} href={'tel:' + pharmacy.phone}>{pharmacy.phone}</a>
                    </h5>
                    <br></br>
                    {
                      <IonButton expand="full" onClick={() => openMap(pharmacyCoords.lat, pharmacyCoords.lng)} target="_blank" color="primary">Yol Tarifi</IonButton>
                    }
                  </Popup>
                </Marker>
              </MapContainer>
              :
              <IonSpinner name="crescent" style={{ position: 'absolute', left: 'calc(50% - 14px)', top: 'calc(50% - 14px)' }} />
        }
      </IonContent>
    </IonPage>
  );
};

export default PharmacyDetailPage;
