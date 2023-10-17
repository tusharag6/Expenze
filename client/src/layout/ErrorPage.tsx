import { useRouteError } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 m-4">Oops!</h1>
        <p className="text-xl mb-2">Sorry, an unexpected error has occurred.</p>
        <p className="text-lg ">
          The requested URL{" "}
          <span className="text-red-500">{location.pathname}</span> was not
          found.
        </p>
        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
