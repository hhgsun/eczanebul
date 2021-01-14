import React from 'react';
import {
  IonItem,
  IonLabel,
  IonNote
} from '@ionic/react';
import { Pharmacy } from '../data/ApiData';

interface PharmacyItemProps {
  cityId: string,
  areaName: string;
  pharmacy: Pharmacy
}

const PharmacyItem: React.FC<PharmacyItemProps> = ({ cityId, areaName, pharmacy }) => {
  return (
    <IonItem routerLink={`/cities/${cityId}/${areaName}/${pharmacy.name}`} detail={false} >
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {pharmacy.name}
          <span className="date">
            <IonNote>{pharmacy.address}</IonNote>
          </span>
        </h2>
        <h3>{pharmacy.coordinates}</h3>
      </IonLabel>
    </IonItem>
  );
};

export default PharmacyItem;
