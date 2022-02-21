import React from 'react';

import EarthquakesForm from "main/components/Earthquakes/EarthquakesForm"
import { earthquakeFixtures } from 'fixtures/earthquakeFixtures';

export default {
    title: 'components/Earthquakes/EarthquakesForm',
    component: EarthquakesForm
};


const Template = (args) => {
    return (
        <EarthquakesForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Retrieve",
    submitAction: () => { console.log("Retrieve was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    earthquakes: earthquakeFixtures.oneEarthquake ,
    submitText: "",
    submitAction: () => { }
};