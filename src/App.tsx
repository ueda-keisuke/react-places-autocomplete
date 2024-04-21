import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

function App() {
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState<{lat: number | null, lng: number | null}>({lat: null, lng: null});
    const [addressComponents, setAddressComponents] = useState<google. maps. GeocoderAddressComponent[]>([]);


    const handleSelect = async (value: string) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        console.log(results);
        setAddressComponents(results[0].address_components);
    }

    return (
        <div className="App">
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                    <div>
                        <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p>
                        <p>Address: {addressComponents.map(ac => ac.long_name).join(', ')}</p>

                        <input {...getInputProps({placeholder: "Type address"})} />
                        <div>
                            {loading ? <div>...loading</div> : null}

                            {suggestions.map((suggestion, index) => {
                                const style: React.CSSProperties = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                };

                                return (
                                    <div {...getSuggestionItemProps(suggestion, {style})} key={index}>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
}

export default App;
