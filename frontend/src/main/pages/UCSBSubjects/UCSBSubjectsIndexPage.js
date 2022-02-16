import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
// import StudentsTable from 'main/components/Students/StudentsTable';

export default function UCSBSubjectsIndexPage() {

  // const { data: students, error: _error, status: _status } =
  //   useBackend(
  //     // Stryker disable next-line all : don't test internal caching of React Query
  //     ["/api/UCSBSubjects/all"],
  //     { method: "GET", url: "/api/UCSBSubjects/all" },
  //     []
  //   );

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>UCSBSubjects</h1>
        <p>[PLACEHOLDER]</p>
        {/* <StudentsTable students={students} currentUser={currentUser} /> */}
      </div>
    </BasicLayout>
  )
}