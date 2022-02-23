import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'


function EarthquakesPurge({ initialEarthquake, submitAction, buttonLabel="Purge" }) {

    // Stryker disable all
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm(
        { defaultValues: initialEarthquake || {}, }
    );
    // Stryker enable all

    const navigate = useNavigate();

    // For explanation, see: https://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
    // Note that even this complex regex may still need some tweaks


    return (

        <Form onSubmit={handleSubmit(submitAction)}>

            {initialEarthquake && (
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="id">Id</Form.Label>
                    <Form.Control
                        data-testid="EarthquakesForm-id"
                        id="id"
                        type="text"
                        {...register("id")}
                        value={initialEarthquake.id}
                        disabled
                    />
                </Form.Group>
            )}

            <Button
                type="purge"
                data-testid="EarthquakesPurge-purge"
            >
                {buttonLabel}
            </Button>

        </Form>

    )
}

export default EarthquakesPurge;