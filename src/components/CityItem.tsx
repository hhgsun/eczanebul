import React from 'react';
import {
  IonAvatar,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { City } from '../data/ApiData';

interface CityItemProps {
  city: City;
}

const CityItem: React.FC<CityItemProps> = ({ city }) => {
  return (
    <IonItem lines="full" routerLink={`/cities/${city.id}`} detail={false}>
      <IonAvatar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2em', fontWeight: 'bold' }} slot="start">
        {city.id}
      </IonAvatar>
      <IonLabel className="ion-text-wrap">
        <h2>
          {city.name}
        </h2>
        <h3>
          {city.count_pharmacy} Eczane Açık
        </h3>
        <p>
          {city.name} şehrindeki nöbetçi eczaneler
        </p>
      </IonLabel>      
    </IonItem>
  );
};

export default CityItem;
