import React from 'react';
import {
  IonItem,
  IonLabel,
} from '@ionic/react';
import { Area } from '../data/ApiData';

interface CityItemProps {
  cityId: number,
  area: Area;
}

const AreaItem: React.FC<CityItemProps> = ({ cityId, area }) => {
  return (
    <IonItem lines="full" routerLink={`/cities/${cityId}/${area.name}`} detail={false}>
      <IonLabel className="ion-text-wrap">
        <h2>
          {area.name} İlçesi
        </h2>
        <h3>
          {area.count_pharmacy} Eczane Açık
        </h3>
      </IonLabel>
    </IonItem>
  );
};

export default AreaItem;
