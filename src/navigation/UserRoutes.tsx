import { Route, Routes } from 'react-router-dom'
import ListPrograms from '../pages/Program/index'
import CreateProgram from '../pages/Program/CreateProgram'
import Show from '../pages/Program/show'
import Profile from '../components/Profile/Profile'
import Traveler from '../components/Profile/Traveler'
import TravelerProfile from '../pages/Profile/TravelerProfile'
import EditPassword from '../pages/Profile/EditPassword'
import EditUser from '../pages/Profile/EditUser'
import EditTraveler from '../pages/Profile/EditTraveler'
import EditCompany from '../pages/Profile/EditCompany'
import CompanyProfile from "../pages/Profile/CompanyProfile";
import UserBaseData from "../pages/Profile/UserBaseData";
import ShowProgram from "../pages/Program/show";
import EditProgram from "../pages/Program/edit";
import CreateCycle from "../pages/Cycle/create-cycle";
import ListCycles from "../pages/Cycle/index-cycle";
import ShowCycle from "../pages/Cycle/show-cycle";
import EditCycle from "../pages/Cycle/edit-cycle";
import React from "react";
import Home from "../pages/Home";
import ListCompany from "../pages/Company/list-company";
import CompanyDetails from "../pages/Company/details-company";
import ShowProgramUser from "../pages/Program/show-program-user";
import ListProgramCycles from "../pages/Program/list-program-cycles";
import ListProgramsPage from '../pages/Program/list_programs'
import ProgramDetailsPage from '../pages/Program/program_details'
import ListGroups from '../pages/Group/list_groups'
import ShowGroup from '../pages/Group/show_group'
import LandingPage from "../pages/LandingPage";
import ListHotels from '../pages/Hotel/list_hotels'
import ShowHotel from '../pages/Hotel/show_hotel'
import ListHotelsReviews from '../pages/HotelReviews/list_hotels_reviews'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create" element={<CreateProgram />} />
      <Route path="/show" element={<Show />} />
      <Route path="/profile" element={<UserBaseData />} />
      <Route path="/traveler" element={<Traveler />} />
      <Route path="/travelerprofile" element={<TravelerProfile />} />
      <Route path="/editpassword" element={<EditPassword />} />
      <Route path="/edituser" element={<EditUser />} />
      <Route path="/edittraveler" element={<EditTraveler />} />
      <Route path="/editcompany" element={<EditCompany />} />
      <Route path="/editUser/:id" element={<EditUser />} />
      <Route path="/company/:id" element={<CompanyProfile />} />
      <Route path="/company/list" element={< ListCompany />} />
      <Route path="/company/show/:id" element={< CompanyDetails />} />
      <Route path="/program/list" element={<ListPrograms />} />
      <Route path="/program/cycles/list/:id" element={<ListProgramCycles />} />
      <Route path="/program/create" element={<CreateProgram />} />
      <Route path="/program/show/:id" element={<ShowProgram />} />
      <Route path="/program/show/user/:id" element={<ShowProgramUser />} />
      <Route path="/program/edit/:id" element={<EditProgram />} />
      <Route path="/cycle/create/:id" element={<CreateCycle />} />
      <Route path="/cycle/list" element={<ListCycles />} />
      <Route path="/cycle/show/:id" element={<ShowCycle />} />
      <Route path="/cycle/edit/:id" element={<EditCycle />} />
			<Route path="/program/all" element={<ListProgramsPage />} />
      <Route path="/program/details/:id" element={<ProgramDetailsPage />} />
      <Route path="/group/list" element={<ListGroups />} />
      <Route path="/group/show/:id" element={<ShowGroup />} />
      <Route path="/hotel/list" element={<ListHotels />} />
      <Route path="/hotel/show/:id" element={<ShowHotel />} />
      <Route path="/hotelReview/list" element={<ListHotelsReviews />} />
    </Routes>
  )
}
export default UserRoutes
