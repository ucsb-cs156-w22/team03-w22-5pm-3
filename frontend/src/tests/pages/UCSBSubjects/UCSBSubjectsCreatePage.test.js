import { render ,waitFor,fireEvent} from "@testing-library/react";
import UCSBSubjectsCreatePage from "main/pages/UCSBSubjects/UCSBSubjectsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
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

describe("UCSBSubjectsCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBSubjectsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const ucsbSubject = {
            id: 1,
            subjectCode: "1A",
            subjectTranslation: "1B",
            deptCode: "1C",
            collegeCode: "1D",
            relatedDeptCode: "1E",
            inactive: "true"
        };

        axiosMock.onPost("/api/ucsbsubjects/post").reply( 202, ucsbSubject );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <UCSBSubjectsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("UCSBSubjectsForm-subjectCode")).toBeInTheDocument();
        });

        const subjectCodeField = getByTestId("UCSBSubjectsForm-subjectCode");
        const subjectTranslationField = getByTestId("UCSBSubjectsForm-subjectTranslation");
        const deptCodeField = getByTestId("UCSBSubjectsForm-deptCode");
        const collegeCodeField = getByTestId("UCSBSubjectsForm-collegeCode");
        const relatedDeptCodeField = getByTestId("UCSBSubjectsForm-relatedDeptCode");
        const inactiveFieled=getByTestId("UCSBSubjectsForm-inactive");
        const submitButton = getByTestId("UCSBSubjectsForm-submit");

        fireEvent.change(subjectCodeField, { target: { value: '1A' } });
        fireEvent.change(subjectTranslationField, { target: { value: '1B' } });
        fireEvent.change(deptCodeField, { target: { value: '1C' } });
        fireEvent.change(collegeCodeField, { target: { value: '1D' } });
        fireEvent.change(relatedDeptCodeField, { target: { value: '1E' } });
        fireEvent.change(inactiveFieled, { target: { value: 'true' } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "subjectCode": "1A",
                "subjectTranslation": "1B",
                "deptCode": "1C",
                "collegeCode": "1D",
                "relatedDeptCode": "1E",
                "inactive": "true"
        });

        expect(mockToast).toBeCalledWith("New ucsbSubject Created - id: 1 subjectCode: 1A");
        expect(mockNavigate).toBeCalledWith({ "to": "/ucsbsubjects/list" });
    });


});


