export interface City {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  dt: number;

  wind?: {
    speed: number;
    deg: number;
  };
  rain?: any;
  snow?: any;
  clouds?: {
    all: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}
