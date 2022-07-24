import { Route, Routes } from 'react-router-dom'
import ListPrograms from '../pages/Program/index'
import CreateProgram from '../pages/Program/CreateProgram'
import EditProgram from '../pages/Program/edit'
import CreateCycle from '../pages/Cycle/create-cycle'
import ListCycles from '../pages/Cycle/index-cycle'
import ShowCycle from '../pages/Cycle/show-cycle'
import EditCycle from '../pages/Cycle/edit-cycle'
import CompanyDetails from '../pages/Company/details-company'
import ShowProgramUser from '../pages/Program/show-program-user'
import ListProgramsPage from '../pages/Program/list_programs'
import ProgramDetailsPage from '../pages/Program/program_details'
import ListGroups from '../pages/Group/list_groups'
import ShowGroup from '../pages/Group/show_group'
import ListHotels from '../pages/Hotel/list_hotels'
import ShowHotel from '../pages/Hotel/show_hotel'
import ShowCountry from '../pages/Country/showCountry'
import ListPosts from '../pages/post/list_posts'
import ListMyPosts from '../pages/post/list_my_posts'
import ShowPost from '../pages/post/show_post'
import EditPost from '../pages/post/EditPost'
import CreatePost from '../pages/post/create_post'
import DeletePost from '../pages/post/delete_post'
import ReportPost from '../pages/post/report_post'
import ListFriends from '../pages/Friend/list_friends'
import ListTravelerBookings from '../pages/booking/traveler-booking'

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
import ListBookings from '../pages/booking/show-bookings'
import ShowBooking from '../pages/booking/show-one-booking'
import CreateCountryReviews from '../pages/CountryReviews/create_country_review'
import ListFriendRequests from '../pages/FriendRequests/list_friend_requests'
import ListSentRequests from '../pages/FriendRequests/list_sent_requests'
import AddFriendComponent from '../components/FriendRequest/AddFriend'

import ShowProfile from '../pages/Profile/ShowProfile'
import EditProfile from '../pages/Profile/EditProfile'
import CountryList from '../pages/Country/CountryList'
import SearchList from '../pages/Search/search_list'
import ListCompanyBookings from '../pages/booking/company-booking'
import UserPosts from '../pages/post/UserPosts'
import TravelerList from '../pages/Traveler/TravelerList'
import ShowProgram from '../pages/Program/show'
import BookCycle from '../pages/Cycle/book-cycle'
import FeedHome from '../pages/FeedPage'
import useAuth from '../hooks/useAuth'
import HomePage from '../pages/HomePage'
import TravelerProfile from '../pages/Profile/TravelerProfile'
import Chat from "../pages/Chat";
import Notifications from "../pages/Notifications";
import ListCompany from "../pages/Company/list-company";

const UserRoutes = () => {
	const { user } = useAuth()
	return (
		<Routes>
			{/*  traveler  */}
			<Route path="/profile" element={<ShowProfile />} />
			<Route path="/profile/edit" element={<EditProfile />} />

			<Route path="/post/show/:id" element={<ShowPost />} />
			<Route path="/post/edit/:id" element={<EditPost />} />
			<Route path="/post/delete/:id" element={<DeletePost />} />
			<Route path="/post/report/:id" element={<ReportPost />} />
			<Route path="/post/create" element={<CreatePost />} />
			<Route path="/myPosts" element={<ListMyPosts />} />
			<Route path="/posts" element={<UserPosts />} />

			<Route path="/traveler/booking" element={<ListTravelerBookings />} />
			<Route path="/booking/list" element={<ListCompanyBookings />} />

			<Route path="/friends" element={<ListFriends />} />
			<Route path="/chat" element={<Chat />} />

			<Route path="/program/all" element={<ListProgramsPage />} />
			<Route path="/traveler/friendrequests" element={<ListFriendRequests />} />
			<Route path="/traveler/sentrequests" element={<ListSentRequests />} />
			<Route path="/traveler/testadd/:id" element={<AddFriendComponent />} />
			<Route path="/cycle/book/:id" element={<BookCycle />} />

			<Route path="/countryReview/create/:id" element={<CreateCountryReviews />} />

			{/*  company  */}
			<Route path="/program/create" element={<CreateProgram />} />
			<Route path="/program/edit/:id" element={<EditProgram />} />
			<Route path="/program/show/:id" element={<ShowProgram />} />
			<Route path="/program/list" element={<ListPrograms />} />

			<Route path="/cycle/create/:id" element={<CreateCycle />} />
			<Route path="/cycle/edit/:id" element={<EditCycle />} />

			<Route path="/program/show/user/:id" element={<ShowProgramUser />} />
			<Route path="/program/details/:id" element={<ProgramDetailsPage />} />

			<Route path="/country/show/:id" element={<ShowCountry />} />
			<Route path="/country/list" element={<CountryList />} />

			<Route path="/cycle/list" element={<ListCycles />} />
			<Route path="/cycle/show/:id" element={<ShowCycle />} />

			<Route path="/company/list" element={<ListCompany />} />
			<Route path="/company/show/:id" element={<CompanyDetails />} />

			<Route path="/group/list" element={<ListGroups />} />
			<Route path="/group/show/:id" element={<ShowGroup />} />

			<Route path="/hotel/list" element={<ListHotels />} />
			<Route path="/hotel/show/:id" element={<ShowHotel />} />

			<Route path="/traveler/list" element={<TravelerList />} />
			<Route path="/traveler/:id" element={<TravelerProfile />} />
			<Route path="/search/:type" element={<SearchList />} />

      {/* Create Review routes */}
      <Route path="/countryReview/create/:id" element={<CreateCountryReviews />} />

			{/* for admin usage */}
			<Route path="/hotelReview/list" element={<ListHotelsReviews />} />
			<Route path="/hotelReview/delete/:id" element={<DeleteHotelReview />} />
			<Route path="/countryReview/list" element={<ListCountriesReviews />} />
			<Route
				path="/countryReview/delete/:id"
				element={<DeleteCountryReview />}
			/>
			<Route path="/companyReview/list" element={<ListCompaniesReviews />} />
			<Route path="/notifications" element={<Notifications />} />

			<Route path="/guideReview/list" element={<ListGuidesReviews />} />
			<Route path="/guideReview/delete/:id" element={<DeleteGuideReview />} />

			<Route path="/cycleReview/list" element={<ListCyclesReviews />} />
			<Route path="/cycleReview/delete/:id" element={<DeleteCycleReview />} />
			{/*<Route path={"/"} element={<FeedHome/>}/>*/}
			<Route
				path={'/'}
				element={user.type === 'company' ? <HomePage /> : <FeedHome />}
			/>
		</Routes>
	)
}
export default UserRoutes
