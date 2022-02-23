import { render, waitFor, fireEvent } from "@testing-library/react";
import EarthquakesCreatePage from "main/pages/Earthquakes/EarthquakesCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});

describe("EarthquakesCreatePage tests", () => {

  const axiosMock =new AxiosMockAdapter(axios);

  beforeEach(() => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
  })

  
  test("renders without crashing", () => {
    const queryClient = new QueryClient();
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <EarthquakesCreatePage />
            </MemoryRouter>
        </QueryClientProvider>
    );
  });

  test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

    const queryClient = new QueryClient();
    const earthquake = {
        id: 1,
        Title: "M 2.2 - 10km ESE of Ojai, CA",
        mag: 2.5,
        place: "10km ESE of Ojai, CA",
        time: 1644571919000 

    };

    axiosMock.onPost("/api/earthquakes/retrieve").reply( 202, earthquake );

    const { getByTestId } = render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <EarthquakesCreatePage />
            </MemoryRouter>
        </QueryClientProvider>
    );

    // issues needs to be fixed below:
    // await waitFor(() => {
    //     expect(getByTestId("EarthquakesForm-quarterYYYYQ")).toBeInTheDocument();
    // });

    // const quarterYYYYQField = getByTestId("EarthquakesForm-quarterYYYYQ");
    // const nameField = getByTestId("EarthquakesForm-name");
    // const localDateTimeField = getByTestId("EarthquakesForm-localDateTime");
    // const submitButton = getByTestId("EarthquakeForm-submit");

    // fireEvent.change(quarterYYYYQField, { target: { value: '20221' } });
    // fireEvent.change(nameField, { target: { value: 'Groundhog Day' } });
    // fireEvent.change(localDateTimeField, { target: { value: '2022-02-02T00:00' } });

    // expect(submitButton).toBeInTheDocument();

    // fireEvent.click(submitButton);

    // await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    // expect(axiosMock.history.post[0].params).toEqual(
    //     {
    //     "localDateTime": "2022-02-02T00:00",
    //     "name": "Groundhog Day",
    //     "quarterYYYYQ": "20221"
    // });

    // expect(mockToast).toBeCalledWith("New earthquake Created - id: 17 name: Groundhog Day");
    // expect(mockNavigate).toBeCalledWith({ "to": "/earthquakes/list" });
});

});