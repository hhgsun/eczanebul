import React from 'react';
import { IonItem, IonLabel, IonThumbnail, IonSkeletonText } from '@ionic/react';

const SkeletonItem: React.FC = () => {
  return (
    <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText animated style={{ width: '50%' }} />
        </h3>
        <p>
          <IonSkeletonText animated style={{ width: '80%' }} />
        </p>
        <p>
          <IonSkeletonText animated style={{ width: '60%' }} />
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default SkeletonItem;
