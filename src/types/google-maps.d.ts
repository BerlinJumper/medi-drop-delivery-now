declare namespace google.maps {
  class Geocoder {
    geocode(
      request: {
        location?: { lat: number; lng: number };
        address?: string;
      },
      callback: (
        results: google.maps.places.PlaceResult[],
        status: google.maps.GeocoderStatus
      ) => void
    ): void;
  }

  type GeocoderStatus = "OK" | "ZERO_RESULTS" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST";
}

declare namespace google.maps.places {
  interface PlaceResult {
    formatted_address?: string;
    address_components?: AddressComponent[];
    geometry?: {
      location: google.maps.LatLng;
      viewport?: google.maps.LatLngBounds;
    };
    place_id?: string;
    name?: string;
  }

  interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  interface AutocompletePrediction {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }
}

declare module 'react-google-autocomplete' {
  import { ComponentType, ChangeEvent } from 'react';

  interface AutocompleteProps {
    apiKey?: string;
    onPlaceSelected: (place: google.maps.places.PlaceResult) => void;
    types?: string[];
    componentRestrictions?: {
      country: string | string[];
    };
    defaultValue?: string;
    className?: string;
    placeholder?: string;
    options?: {
      types?: string[];
      componentRestrictions?: {
        country: string | string[];
      };
    };
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  }

  const Autocomplete: ComponentType<AutocompleteProps>;
  export default Autocomplete;
}
