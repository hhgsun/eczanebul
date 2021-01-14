
export interface City {
  id: number;
  name: string;
  count_pharmacy: number;
  areas: Array<Area>;
}

export interface Area {
  name: string;
  count_pharmacy: string;
  pharmacies: Array<Pharmacy>;
}

export interface Pharmacy {
  name: string,
  phone: string,
  address: string,
  coordinates: string,
}

let cities: City[] = [];

export const fetchApiData = async () => {
  return new Promise((resolve,reject) => {
    setTimeout(async () => {
      try {
        const res = await fetch("http://localhost:5858");
        const data = await res.json();
        cities = data;
        resolve(cities);
        return data;
      } catch (err) {
        console.log(err);
        reject(err);
      }
    }, 1000);
  });
}

export const getCities = () => cities;

// export const setCities = (_cities: City[]) => cities = _cities;

export const getCity = (id: string) => cities.find(m => m.id.toString() === id);

export const getArea = (cityId: string, areaName: string) => {
  let area: Area | undefined;
  cities.forEach(c => {
    if (c.id.toString() === cityId) {
      c.areas.forEach((a) => {
        if (a.name === areaName) {
          area = a;
          console.log('Selected City:', c);
          console.log('Selected Area:', a);
          return area;
        }
      });
    }
  });
  return area;
};

export const getPharmacy = (cityId: string, areaName: string, pharmacyName: string) => {
  let pharmacy: Pharmacy | undefined;
  let area: Area | undefined = getArea(cityId, areaName);
  area?.pharmacies.forEach(p => {
    if (p.name === pharmacyName) {
      pharmacy = p;
      console.log('Selected Pharmacy:', p);
      return p;
    }
  });
  return pharmacy;
}
