import React from 'react';

import UCSBSubjectsTable from "main/components/UCSBSubjects/UCSBSubjectsTable";
import { subjectFixtures } from 'fixtures/ucsbSubjectsFixtures';

export default {
    title: 'components/UCSBSubjects/UCSBSubjectsTable',
    component: UCSBSubjectsTable
};

const Template = (args) => {
    return (
        <UCSBSubjectsTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    subjects: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    subjects: subjectFixtures.twoSubjects
};


