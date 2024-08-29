import { RouterProvider, createBrowserRouter } from "react-router-dom";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import { action as logoutAction } from "./components/Logout";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { checkAuthLoader, tokenLoader } from "./utils/auth";
import { lazy, Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/http";
import SearchPage, { loader as searchLoader } from "./pages/SearchPage";
const EventsPage = lazy(() => import("./pages/Events"));
const EventDetailPage = lazy(() => import("./pages/EventDetail"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <EventsPage />
              </Suspense>
            ),
            loader: ({ request, params }) =>
              import("./pages/Events").then((module) =>
                module.loader({
                  request,
                  params,
                })
              ),
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: ({ params, request }) =>
              import("./pages/EventDetail").then((module) =>
                module.loader({ params, request })
              ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<p>Loading...</p>}>
                    <EventDetailPage />
                  </Suspense>
                ),
                action: ({ params, request }) =>
                  import("./pages/EventDetail").then((module) =>
                    module.action({ params, request })
                  ),
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: searchLoader,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
