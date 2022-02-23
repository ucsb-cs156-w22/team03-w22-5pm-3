import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import EarthquakesPurge from 'main/components/Earthquakes/EarthquakesPurge'
import { useCurrentUser } from 'main/utils/currentUser'
import { toast } from "react-toastify";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";

export default function EarthquakesIndexPage() {

  const currentUser = useCurrentUser();

  const { data: earthquakes, error: _error, status: _status } =
  useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/earthquakes/all"],
      { method: "GET", url: "/api/earthquakes/all" },
      []
    );
    

    const objectToAxiosParams = (earthquakes) => ({
      url: "/api/earthquakes/purge",
      method: "POST",
      params: {
      }
    });
  
    const onSuccess = (earthquakes) => {
      toast(`All records were successfully deleted`);
    }
  
    const mutation = useBackendMutation(
      objectToAxiosParams,
       { onSuccess }, 
       // Stryker disable next-line all : hard to set up test for caching
       ["/api/earthquakes/all"]
       );
  
    const { isSuccess } = mutation
  
    const onSubmit = async (data) => {
      mutation.mutate(data);
    }
  
    if (isSuccess) {
      return <Navigate to="/earthquakes/list" />
    }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <EarthquakesPurge submitAction={onSubmit} />
        <EarthquakesTable earthquakes={earthquakes} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}