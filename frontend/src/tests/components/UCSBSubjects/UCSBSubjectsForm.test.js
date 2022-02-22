import { render, waitFor, fireEvent } from "@testing-library/react";
import UCSBSubjectsForm from "main/components/UCSBSubjects/UCSBSubjectsForm";
import { ucsbSubjectsFixtures } from "fixtures/ucsbSubjectsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("UCSBSubjectsForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <UCSBSubjectsForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/Subject Code/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Subject Translation/)).toBeInTheDocument()); 
        await waitFor(() => expect(getByText(/Department Code/)).toBeInTheDocument()); 
        await waitFor(() => expect(getByText(/College Code/)).toBeInTheDocument()); 
        await waitFor(() => expect(getByText(/Related Department Code/)).toBeInTheDocument()); 
        await waitFor(() => expect(getByText(/Inactive/)).toBeInTheDocument());   
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a UCSBSubject ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <UCSBSubjectsForm initialUCSBSubjects={ucsbSubjectsFixtures.oneSubject} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/UCSBSubjectsForm-id/)).toBeInTheDocument());
        expect(getByText(/Id/)).toBeInTheDocument();
        expect(getByTestId(/UCSBSubjectsForm-id/)).toHaveValue("1");
    });


    // test("Correct Error messsages on bad input", async () => {

    //     const { getByTestId, getByText } = render(
    //         <Router  >
    //             <UCSBSubjectsForm />
    //         </Router>
    //     );
    //     await waitFor(() => expect(getByTestId("UCSBDateForm-quarterYYYYQ")).toBeInTheDocument());
    //     const quarterYYYYQField = getByTestId("UCSBDateForm-quarterYYYYQ");
    //     const localDateTimeField = getByTestId("UCSBDateForm-localDateTime");
    //     const submitButton = getByTestId("UCSBDateForm-submit");

    //     fireEvent.change(quarterYYYYQField, { target: { value: 'bad-input' } });
    //     fireEvent.change(localDateTimeField, { target: { value: 'bad-input' } });
    //     fireEvent.click(submitButton);

    //     await waitFor(() => expect(getByText(/QuarterYYYYQ must be in the format YYYYQ/)).toBeInTheDocument());
    //     expect(getByText(/localDateTime must be in ISO format/)).toBeInTheDocument();
    // });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <UCSBSubjectsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectsForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("UCSBSubjectsForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Subject Code is required./)).toBeInTheDocument());
        expect(getByText(/Subject Translation is required./)).toBeInTheDocument();
        expect(getByText(/Department Code is required./)).toBeInTheDocument();
        expect(getByText(/CollegeCode Code is required./)).toBeInTheDocument();
        expect(getByText(/Related Department Code is required./)).toBeInTheDocument();
        expect(getByText(/Inactive is required./)).toBeInTheDocument();
    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <UCSBSubjectsForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectsForm-subjectCode")).toBeInTheDocument());

        const subjectCodeField = getByTestId("UCSBSubjectsForm-subjectCode");
        const subjectTranslationField = getByTestId("UCSBSubjectsForm-subjectTranslation");
        const deptCodeField = getByTestId("UCSBSubjectsForm-deptCode");
        const collegeCodeField = getByTestId("UCSBSubjectsForm-collegeCode");
        const relatedDeptCodeField = getByTestId("UCSBSubjectsForm-relatedDeptCode");
        const inactiveFieled=getByTestId("UCSBSubjectsForm-inactive")
        const submitButton = getByTestId("UCSBSubjectsForm-submit");

        fireEvent.change(subjectCodeField, { target: { value: '1A' } });
        fireEvent.change(subjectTranslationField, { target: { value: '1B' } });
        fireEvent.change(deptCodeField, { target: { value: '1C' } });
        fireEvent.change(collegeCodeField, { target: { value: '1D' } });
        fireEvent.change(relatedDeptCodeField, { target: { value: '1E' } });
        fireEvent.change(inactiveFieled, { target: { value: 'true' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/Subject Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/Subject Translation is required./)).not.toBeInTheDocument();
        expect(queryByText(/Department Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/CollegeCode Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/Related Department Code is required./)).not.toBeInTheDocument();
        expect(queryByText(/Inactive is required./)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <UCSBSubjectsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("UCSBSubjectsForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("UCSBSubjectsForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));
    });

});


