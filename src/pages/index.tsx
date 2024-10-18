import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AddCoachPopup } from "~widgets/addCoach-popup";
import { AddGuestPopup } from "~widgets/addGuest-popup";
import { AddSkiPassPopup } from "~widgets/addSkiPass-popup";
import { AdminPopup } from "~widgets/admin-popup";
import { ConfirmCoachPopup } from "~widgets/confirmCoach-popup";
import { ConfirmGuestPopup } from "~widgets/confirmGuest-popup";
import { ConfirmSkipassPopup } from "~widgets/confirmSkipass-popup";
import { DeleteCoachPopup } from "~widgets/deleteCoach-popup";
import { DeleteGuestPopup } from "~widgets/deleteGuest-popup";
import { DeleteSkipassPopup } from "~widgets/deleteSkipass-popup";
import { ErrorPopup } from "~widgets/error-popup";
import { ProtectedRoute } from "~shared/protected-route";
import { routes } from "../shared/lib/routes-names";

const LoginPage = lazy(() => import("./login/ui/Login"));
const RegisterPage = lazy(() => import("./register/ui/Register"));
const Layout = lazy(() => import("./layout"));
const MainPage = lazy(() => import("./main/ui/Main"));
const GuestsPage = lazy(() => import("./guests/ui/Guests"));
const CoachesPage = lazy(() => import("./coaches/ui/Coaches"));
const SkipassesPage = lazy(() => import("./skipasses/ui/Skipasses"));

export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route
          path={routes.main}
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MainPage />} />
          <Route path={routes.guests} element={<GuestsPage />} />
          <Route path={routes.coaches} element={<CoachesPage />} />
          <Route path={routes.skipasses} element={<SkipassesPage />} />
        </Route>
      </Routes>

      <AdminPopup />
      <AddGuestPopup />
      <AddCoachPopup />
      <AddSkiPassPopup />
      <ConfirmGuestPopup />
      <ConfirmCoachPopup />
      <ConfirmSkipassPopup />
      <DeleteGuestPopup />
      <DeleteCoachPopup />
      <DeleteSkipassPopup />
      <ErrorPopup />
    </>
  );
};
