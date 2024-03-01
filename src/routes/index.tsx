import { useRoutes } from "react-router-dom";
import { Suspense, ElementType, lazy } from "react";
// sections
import '../index.css'
import AuthGaurd from "../pages/AuthGaurd";
import ParticipantView from "../pages/ParticipantView";

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
            children: [
                { element:  <AuthGaurd>
                                <Dashboard/>
                            </AuthGaurd>,
                 index: true },
                { path: 'dashboard',
                  element: 
                    <AuthGaurd>
                        <Dashboard/>
                    </AuthGaurd>
                },
                {
                    path: '/user',
                    children: [
                        { path: ':userId',
                          element: <UserView />
                        },
                    ]
                },
                {
                    path: '/class',
                    children: [
                        { 
                          path: ':classId',
                          element: <ClassView />
                        },
                    ]
                },
                {
                    path: '/participant/:participantId',
                    element: <ParticipantView/>
                }
            ]
        },
        {
            path: '/login',
            element: <Login />,
        }
    ])
}

const Login = loadable(lazy(() => import('../pages/Login')));
const Dashboard = loadable(lazy(() => import('../pages/admin/Dashboard')));
const UserView = loadable(lazy(() => import('../pages/UserView')));
const ClassView = loadable(lazy(() => import('../pages/ClassView')));