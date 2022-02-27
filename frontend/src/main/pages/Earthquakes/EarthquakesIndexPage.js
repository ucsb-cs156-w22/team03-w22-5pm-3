import React from 'react'
import { useBackend } from 'main/utils/useBackend';

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesTable from 'main/components/Earthquakes/EarthquakesTable';
import { useCurrentUser } from 'main/utils/currentUser'
import { toast } from "react-toastify";
import { useBackendMutation } from "main/utils/useBackend";
import { Button} from 'react-bootstrap';

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
      method: "POST"
    });
  
    const onSuccess = (earthquakes) => {
      console.log('On success')
      toast(`All records were successfully deleted`);
    }
  
    const mutation = useBackendMutation(
      objectToAxiosParams,
       { onSuccess }, 
       // Stryker disable next-line all : hard to set up test for caching
       ["/api/earthquakes/all"]
       );
  
    const onSubmit = async (data) => {
      mutation.mutate(data);
    }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Earthquakes</h1>
        <Button
                type="purge"
                onClick={onSubmit}
                data-testid="EarthquakesPurge-purge"
            >
            Purge
        </Button>
        <EarthquakesTable earthquakes={earthquakes} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}