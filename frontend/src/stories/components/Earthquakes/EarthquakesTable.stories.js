import React from 'react';

import EarthquakesTable from "main/components/Earthquakes/EarthquakesTable";
import { earthquakeFixtures } from 'fixtures/earthquakeFixtures';

export default {
    title: 'components/earthquakes/EarthquakesTable',
    component: EarthquakesTable
};

const Template = (args) => {
    return (
        <EarthquakesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    earthquakes: []
};

export const ThreeEarthquakes = Template.bind({});

ThreeEarthquakes.args = {
    earthquakes: earthquakeFixtures.threeEarthquakes
};