import React from 'react';
import { Text } from 'react-native';

const GasDisplay = ({ gasLevel }) => (
    <>
        <Text style={{ fontWeight: "900", fontSize: 20, marginTop: 10 }}>
            Gas Level:
        </Text>
        <Text style={{ fontSize: 40, marginTop: 5, fontWeight: "900" }}>
            {gasLevel ? `${gasLevel} ppm` : "No value available"}
        </Text>
    </>
);

export default GasDisplay;
