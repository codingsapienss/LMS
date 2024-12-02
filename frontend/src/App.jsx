import { Route, Routes } from "react-router-dom";
import RouteGaurd from "./components/route-gaurd";
import AuthPage from "./pages/auth";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
function App() {
  const { auth } = useContext(AuthContext);

  console.log(auth);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouteGaurd
            authenticated={auth?.authenticate}
            element={<AuthPage />}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor"
        element={
          <RouteGaurd
            authenticated={auth?.authenticate}
            element={<InstructorDashboardPage />}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/"
        element={
          <RouteGaurd
            authenticated={auth?.authenticate}
            element={<StudentViewCommonLayout />}
            user={auth?.user}
          />
        }
      >
        <Route path="/" element={<StudentHomePage />}></Route>
        <Route path="home" element={<StudentHomePage />}></Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
