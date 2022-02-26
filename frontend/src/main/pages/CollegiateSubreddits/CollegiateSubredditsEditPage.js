import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Navigate, useParams } from "react-router-dom";
import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { useBackend, useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CollegiateSubredditsEditPage() {
  let { id } = useParams();

  const {
    data: subreddit,
    error: error,
    status: status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    [`/api/collegiateSubreddits?id=${id}`],
    {
      // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
      method: "GET",
      url: `/api/collegiateSubreddits`,
      params: {
        id,
      },
    }
  );

  const objectToAxiosPutParams = (subreddit) => ({
    url: "/api/collegiateSubreddits",
    method: "PUT",
    params: {
      id: subreddit.id,
    },
    data: {
      name: subreddit.name,
      location: subreddit.location,
      subreddit: subreddit.subreddit,
    },
  });

  const onSuccess = (subreddit) => {
    toast(
      `Collegiate Subreddit Updated - id: ${subreddit.id} name: ${subreddit.name}`
    );
  };

  const mutation = useBackendMutation(
    objectToAxiosPutParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    [`/api/collegiateSubreddits?id=${id}`]
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Navigate to="/collegiateSubreddits/list" />;
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit Collegiate Subreddit</h1>
        {subreddit && (
          <CollegiateSubredditForm
            initialCollegiateSubreddit={subreddit}
            submitAction={onSubmit}
            buttonLabel="Update"
          />
        )}
      </div>
    </BasicLayout>
  );
}
