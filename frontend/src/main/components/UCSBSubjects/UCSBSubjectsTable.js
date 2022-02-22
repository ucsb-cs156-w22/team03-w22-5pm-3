import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
// import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
<<<<<<< HEAD
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBDateUtils"
=======
import { cellToAxiosParamsDelete, onDeleteSuccess } from "main/utils/UCSBSubjectUtils"
>>>>>>> 4e1ed70cd3ff640f7ec175741d5b77ee0c9e1fbb
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

export default function UCSBSubjectsTable({ subjects, currentUser }) {

    const navigate = useNavigate();

    const editCallback = (cell) => {
        navigate(`/ucsbsubjects/edit/${cell.row.values.id}`)
    }

    // Stryker disable all : hard to test for query caching

    const deleteMutation = useBackendMutation(
        cellToAxiosParamsDelete,
        { onSuccess: onDeleteSuccess },
        ["/api/UCSBSubjects/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const deleteCallback = async (cell) => { deleteMutation.mutate(cell); }


    const columns = [
        {
            Header: 'ID',
            accessor: 'id', // accessor is the "key" in the data
        },
        {
            Header: 'Subject Code',
            accessor: 'subjectCode',
        },
        {
            Header: 'Subject Translation',
            accessor: 'subjectTranslation',
        },
        {
            Header: 'Department Code',
            accessor: 'deptCode',
        },
        {
            Header: 'College Code',
            accessor: 'collegeCode',
        },
        {
            Header: 'Related Department Code',
            accessor: 'relatedDeptCode',
        },
        {
<<<<<<< HEAD
            Header: 'Inactive',
            accessor: 'inactive',
=======
            id: 'inactive',
            Header: 'Inactive',
            accessor: i => i.inactive.toString()
>>>>>>> 4e1ed70cd3ff640f7ec175741d5b77ee0c9e1fbb
        },
    ];

    if (hasRole(currentUser, "ROLE_ADMIN")) {
        columns.push(ButtonColumn("Edit", "primary", editCallback, "UCSBSubjectsTable"));
        columns.push(ButtonColumn("Delete", "danger", deleteCallback, "UCSBSubjectsTable"));
    } 

    // Stryker disable ArrayDeclaration : [columns] and [subjects] are performance optimization; mutation preserves correctness
    const memoizedColumns = React.useMemo(() => columns, [columns]);
    const memoizedUCSBSubjects = React.useMemo(() => subjects, [subjects]);
    // Stryker enable ArrayDeclaration

    return <OurTable
        data={memoizedUCSBSubjects}
        columns={memoizedColumns}
        testid={"UCSBSubjectsTable"}
    />;
};