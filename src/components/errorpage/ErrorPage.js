//import userRouteError to deal with routin errors
import { useRouteError } from "react-router-dom";
function ErrorPage() {
  //Error Object
  const error = useRouteError();

  return (
    <div className="text-center mt-5">
      <h2 className="text-danger">
        {error.status} : {error.statusText}
      </h2>
      <h4 className="text-warning">{error.data}</h4>
    </div>
  );
}
//export ErrorPage
export default ErrorPage;