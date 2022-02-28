import React from "react";
import OurTable from "main/components/OurTable";
import { useNavigate } from "react-router-dom";

export default function EarthquakesTable({ earthquakes, currentUser }) {
    const navigate = useNavigate();

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Title',
            accessor: 'properties.title',
        },
        {
            Header: 'Magnitude',
            accessor: 'properties.mag',
        },
        {
            Header: 'Place',
            accessor: 'properties.place',
        },
        {
            Header: 'Time',
            accessor: 'properties.time',
        }
    ];

    // Stryker disable ArrayDeclaration : [columns] and [earthquakes] are performance optimization; mutation preserves correctness
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memorizedEarthquakes = React.useMemo(() => earthquakes, [earthquakes]);
    // Stryker enable ArrayDeclaration

    return <OurTable
        data={memorizedEarthquakes}
        columns={memoizedColumns}
        testid={"EarthquakesTable"}
    />;
};