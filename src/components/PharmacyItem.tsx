import React from 'react';
import {
  IonIcon,
  IonItem,
  IonLabel
} from '@ionic/react';
import { Pharmacy } from '../data/ApiData';
import { call, location } from 'ionicons/icons';

interface PharmacyItemProps {
  cityId: string,
  areaName: string;
  pharmacy: Pharmacy
}

const PharmacyItem: React.FC<PharmacyItemProps> = ({ cityId, areaName, pharmacy }) => {
  return (
    <IonItem lines="full" routerLink={`/cities/${cityId}/${areaName}/${pharmacy.name}`} detail={false} >
      <IonLabel className="ion-text-wrap">
        <h2>
          {pharmacy.name}
        </h2>
        <h3 style={{color: 'var(--ion-color-step-600, #666666)'}}>
          <IonIcon icon={call} slot="start" /> {pharmacy.phone}
        </h3>
        <p>
          <IonIcon icon={location} slot="start" />
          {pharmacy.address}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default PharmacyItem;
