import React from 'react';

import EarthquakesTable from "main/components/Earthquakes/EarthquakesTable";
import { earthquakesFixtures } from 'fixtures/earthquakesFixtures';

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
    earthquakes: earthquakesFixtures.threeEarthquakes
};