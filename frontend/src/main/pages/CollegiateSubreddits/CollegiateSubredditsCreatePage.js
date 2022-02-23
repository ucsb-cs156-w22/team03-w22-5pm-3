import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CollegiateSubredditForm from "main/components/CollegiateSubreddits/CollegiateSubredditForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CollegiateSubredditsCreatePage() {

  const objectToAxiosParams = (collegiatesubreddit) => ({
    url: "/api/collegiateSubreddits/post",
    method: "POST",
    params: {
      name: collegiatesubreddit.name,
      location: collegiatesubreddit.location,
      subreddit: collegiatesubreddit.subreddit
    }
  });

  const onSuccess = (collegiatesubreddit) => {
    toast(`New collegiatesubreddit Created - id: ${collegiatesubreddit.id} name: ${collegiatesubreddit.name}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/collegiateSubreddits/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess) {
    return <Navigate to="/collegiateSubreddits/list" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New CollegiateSubreddit</h1>

        <CollegiateSubredditForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}