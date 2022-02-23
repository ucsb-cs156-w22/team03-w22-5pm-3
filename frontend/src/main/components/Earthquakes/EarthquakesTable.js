import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import { cellToAxiosParamsDelete } from "main/utils/EarthquakeUtils";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import { onDeleteSuccess } from "main/utils/UCSBDateUtils";

export default function EarthquakesTable({ earthquakes, currentUser }) {
    const navigate = useNavigate();

    // const editCallback = (cell) => {
    //     navigate(`/earthquakes/edit/${cell.row.values.id}`)
    // }

    // const deleteMutation = useBackendMutation(
    //     cellToAxiosParamsDelete,
    //     { onSuccess: onDeleteSuccess },
    //     ["/api/earthquakes/all"]
    // );

    // const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }

    const columns = [
        {
            Header: 'id',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Title',
            accessor: 'properties.title',
            link: true
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

    /*
    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, "EarthquakesTable"));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, "EarthquakesTable"));
    }
    */

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