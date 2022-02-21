import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import EarthquakesForm from "main/components/Earthquakes/EarthquakesForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function EarthquakesCreatePage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Retrieve Earthquakes</h1>
        <p>
          This is where the retrieve page will go
        </p>
      </div>
    </BasicLayout>
  )
}