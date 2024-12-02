import React from 'react';
import { Text } from 'react-native';

const HumidityDisplay = ({ humidity }) => (
    <>
        <Text style={{ fontWeight: "900", fontSize: 20, marginTop: 10 }}>
            Humidity:
        </Text>
        <Text style={{ fontSize: 40, marginTop: 5, fontWeight: "900" }}>
            {humidity ? `${humidity}%` : "No value available"}
        </Text>
    </>
);

export default HumidityDisplay;
