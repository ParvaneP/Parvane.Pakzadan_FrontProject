import { useRoutes } from "react-router-dom";
import { Suspense, ElementType, lazy } from "react";
// sections
import '../index.css'

const loadable = (Component: ElementType) => (props: any) => {
    return (
        <Suspense>
            <Component {...props} />
        </Suspense>
    )
}

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <Login />,
          },
    ])
}

const Login = loadable(lazy(() => import('../pages/Login')))