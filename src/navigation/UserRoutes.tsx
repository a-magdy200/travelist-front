import { Route, Routes } from 'react-router-dom'
import ListPrograms from '../pages/Program/index'
import CreateProgram from '../pages/Program/CreateProgram'
import Show from '../pages/Program/show'
import Profile from '../components/Profile/Profile'
import TravelerProfile from '../pages/Profile/TravelerProfile'
import EditPassword from '../pages/Profile/EditPassword'
import EditUser from '../pages/Profile/EditUser'
import EditTraveler from '../pages/Profile/EditTraveler'
import EditCompany from '../pages/Profile/EditCompany'
import CompanyProfile from '../pages/Profile/CompanyProfile'
import UserBaseData from '../pages/Profile/UserBaseData'
import ShowProgram from '../pages/Program/show'
import EditProgram from '../pages/Program/edit'
import CreateCycle from '../pages/Cycle/create-cycle'
import ListCycles from '../pages/Cycle/index-cycle'
import ShowCycle from '../pages/Cycle/show-cycle'
import EditCycle from '../pages/Cycle/edit-cycle'
import ListCompany from '../pages/Company/list-company'
import CompanyDetails from '../pages/Company/details-company'
import ShowProgramUser from '../pages/Program/show-program-user'
import ListProgramCycles from '../pages/Program/list-program-cycles'
import ListProgramsPage from '../pages/Program/list_programs'
import ProgramDetailsPage from '../pages/Program/program_details'
import ListGroups from '../pages/Group/list_groups'
import ShowGroup from '../pages/Group/show_group'
import LandingPage from '../pages/LandingPage'
import ListHotels from '../pages/Hotel/list_hotels'
import ShowHotel from '../pages/Hotel/show_hotel'
import ShowCountry from '../pages/Country/showCountry'
import ListPosts from '../pages/post/list_posts'
import ShowPost from '../pages/post/show_post'
import EditPost from '../pages/post/EditPost'
import CreatePost from '../pages/post/create_post'
import DeletePost from '../pages/post/delete_post'
import ListFriends from '../pages/Friend/list_friends'
import ListTravelerBookings from '../pages/booking/TravelerBooking'

import ListHotelsReviews from '../pages/HotelReviews/list_hotels_reviews'
import ListCountriesReviews from '../pages/CountryReviews/list_hotels_reviews'
import ListCompaniesReviews from '../pages/CompanyReviews/list_companies_reviews'
import ListGuidesReviews from '../pages/GuideReviews/list_guides_reviews'
import ListCyclesReviews from '../pages/CycleReviews/list_cycles_reviews'
import DeleteHotelReview from '../pages/HotelReviews/delete_hotel_review'
import DeleteCountryReview from '../pages/CountryReviews/delete_country_review'
import DeleteCompanyReview from '../pages/CompanyReviews/delete_company_review'
import DeleteGuideReview from '../pages/GuideReviews/delete_guide_review'
import DeleteCycleReview from '../pages/CycleReviews/delete_cycle_review'
import CreateCountryReviews from '../pages/CountryReviews/create_country_review'

const UserRoutes = () => {
	return (
		<Routes>
			{/*  traveler  */}
			<Route path="/traveler" element={<TravelerProfile />} />
			<Route path="/editTraveler" element={<EditTraveler />} />

			<Route path="/post/show/:id" element={<ShowPost />} />
			<Route path="/post/edit/:id" element={<EditPost />} />
			<Route path="/post/delete/:id" element={<DeletePost />} />
			<Route path="/post/create" element={<CreatePost />} />
			<Route path="/posts" element={<ListPosts />} />

			<Route path="/traveler/booking" element={<ListTravelerBookings />} />

			<Route path="/friends" element={<ListFriends />} />
			
			<Route path="/program/all" element={<ListProgramsPage />} />


			{/*  company  */}
			<Route path="/company" element={<CompanyProfile />} />
			<Route path="/editCompany" element={<EditCompany />} />

			{/* <Route path="/create" element={<CreateProgram />} /> */}
			<Route path="/program/create" element={<CreateProgram />} />
			<Route path="/program/edit/:id" element={<EditProgram />} />
			<Route path="/program/list" element={<ListPrograms />} />

			<Route path="/cycle/create/:id" element={<CreateCycle />} />
			<Route path="/cycle/edit/:id" element={<EditCycle />} />


			{/*  both  */}
			<Route path="/profile" element={<UserBaseData />} />
			<Route path="/editUser" element={<EditUser />} />
			{/* <Route path="/editUser/:id" element={<EditUser />} /> */}
			<Route path="/editPassword" element={<EditPassword />} />

			<Route path="/program/show/user/:id" element={<ShowProgramUser />} />
			<Route path="/program/details/:id" element={<ProgramDetailsPage />} />
			{/* <Route path="/show" element={<Show />} /> */}

			<Route path="/country/show/:id" element={<ShowCountry />} />

			<Route path="/cycle/list" element={<ListCycles />} />
			<Route path="/cycle/show/:id" element={<ShowCycle />} />

			<Route path="/company/show/:id" element={<CompanyDetails />} />

			<Route path="/group/list" element={<ListGroups />} />
			<Route path="/group/show/:id" element={<ShowGroup />} />

			<Route path="/hotel/list" element={<ListHotels />} />
			<Route path="/hotel/show/:id" element={<ShowHotel />} />

            {/*  admin  */}
     		<Route path="/hotelReview/list" element={<ListHotelsReviews />} />
			<Route path="/hotelReview/delete/:id" element={<DeleteHotelReview />} />

			<Route path="/countryReview/list" element={<ListCountriesReviews />} />
			<Route path="/countryReview/delete/:id" element={<DeleteCountryReview />}/>

			<Route path="/companyReview/list" element={<ListCompaniesReviews />} />
			<Route path="/companyReview/delete/:id" element={<DeleteCompanyReview />}/>

			<Route path="/guideReview/list" element={<ListGuidesReviews />} />
			<Route path="/guideReview/delete/:id" element={<DeleteGuideReview />} />

			<Route path="/cycleReview/list" element={<ListCyclesReviews />} />
			<Route path="/cycleReview/delete/:id" element={<DeleteCycleReview />} />

			<Route path="/program/cycles/list/:id" element={<ListProgramCycles />} />
			<Route path="/program/show/:id" element={<ShowProgram />} />
			<Route path="/company/list" element={<ListCompany />} />

			{/* <Route path="/company/:id" element={<CompanyProfile />} /> */}
			<Route path="/countryReview/create/:id" element={<CreateCountryReviews />} />

		</Routes>
	)
}
export default UserRoutes
