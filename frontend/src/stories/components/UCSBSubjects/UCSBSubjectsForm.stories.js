import React from 'react';

import UCSBSubjectsForm from "main/components/UCSBSubjects/UCSBSubjectsForm"
import { subjectFixtures } from 'fixtures/ucsbSubjectsFixtures';

export default {
    title: 'components/UCSBSubjects/UCSBSubjectsForm',
    component: UCSBSubjectsForm
};


const Template = (args) => {
    return (
        <UCSBSubjectsForm {...args} />
    )
};

export const Default = Template.bind({});

Default.args = {
    submitText: "Create",
    submitAction: () => { console.log("Submit was clicked"); }
};

export const Show = Template.bind({});

Show.args = {
    ucsbSubject: subjectFixtures.oneSubject,
    submitText: "",
    submitAction: () => { }
};
