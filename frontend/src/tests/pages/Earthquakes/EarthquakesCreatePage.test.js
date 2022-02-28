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
    const earthquake = [{
        id: 1,
        title: "M 2.2 - 10km ESE of Ojai, CA",
        mag: 2.5,
        place: "10km ESE of Ojai, CA",
        time: 1644571919000 

    }];

    axiosMock.onPost("/api/earthquakes/retrieve").reply( 201, earthquake );

    const { getByTestId } = render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <EarthquakesCreatePage />
            </MemoryRouter>
        </QueryClientProvider>
    );

    // issues needs to be fixed below:
    await waitFor(() => {
        expect(getByTestId("EarthquakesForm-distance")).toBeInTheDocument();
    });

    const distanceField = getByTestId("EarthquakesForm-distance");
    const minMagField = getByTestId("EarthquakesForm-minMag");
    const submitButton = getByTestId("EarthquakesForm-retrieve");

    fireEvent.change(distanceField, { target: { value: '100' } });
    fireEvent.change(minMagField, { target: { value: '2.5' } });

    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));
    expect(axiosMock.history.post[0].params).toEqual({
        "distance": "100",
        "minMag": "2.5"
    });

    expect(mockToast).toBeCalledWith(`${axiosMock.history.post.length} Earthquakes retrieved`);
    expect(mockNavigate).toBeCalledWith({ "to": "/earthquakes/list" });
});

});