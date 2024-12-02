import React from 'react';
import { Text } from 'react-native';

const TemperatureDisplay = ({ temperature }) => (
    <>
        <Text style={{ fontWeight: "900", fontSize: 20, marginTop: 10 }}>
            Temperature:
        </Text>
        <Text style={{ fontSize: 40, marginTop: 5, fontWeight: "900" }}>
            {temperature ? `${temperature}°` : "No value available"}
        </Text>
    </>
);

export default TemperatureDisplay;
