import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import HomePage from "./pages/home/HomePage"
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import PremiumPage from "./pages/premium/PremiumPage";
import ExplorePage from "./pages/explore/ExplorePage";
import MessagesPage from "./pages/message/MessagesPage";
import CommunitiesPage from "./pages/communities/CommunitiesPage";
import ListsPage from "./pages/lists/ListsPage";
import BookmarksPage from "./pages/bookmarks/BookmarksPage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
	const {data: authUser, isLoading} = useQuery({
		// this queryKey can be referenced in other components to get the data
		queryKey: ['authUser'],
		queryFn: async() => {
			try {
				const res = await fetch("https://x-clone-backend-h8jvrmx78-kalparatnas-projects.vercel.app/api/auth/me")
				const data = await res.json()
				if(data.error) return null
				if(!res.ok){
					throw new Error(data.error || "Something went wrong")
				}
				// console.log("Auth user: ",data)
				return data
			} catch (error) {
				throw new Error(error)
			}
		},
		retry: false
	})

	if(isLoading) 
		return <div className="h-screen flex justify-center items-center"><LoadingSpinner size='lg'/></div>
	
	return (
		<div
    data-theme="black"
    className="min-h-screen bg-base-100 text-base-content flex max-w-6xl mx-auto"
  >
			{authUser && <Sidebar/>}
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'}/>} />	
				<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={'/'}/>} />
				<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={'/'}/>} />
				<Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to={'/login'}/>} />
				<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={'/login'}/>} />
				<Route path='/premium' element={authUser ? <PremiumPage/> : <Navigate to={'/login'}/>} />
				<Route path='/explore' element={authUser ? <ExplorePage/> : <Navigate to={'/login'}/>} />  
				<Route path='/messages' element={authUser ? <MessagesPage/> : <Navigate to={'/login'}/>} /> 
				<Route path='/communities' element={authUser ? <CommunitiesPage/> : <Navigate to={'/login'}/>} /> 
				<Route path='/lists' element={authUser ? <ListsPage/> : <Navigate to={'/login'}/>} /> 
				<Route path='/bookmarks' element={authUser ? <BookmarksPage/> : <Navigate to={'/login'}/>} /> 

			</Routes>
			{authUser && <RightPanel/>}
			<Toaster/>
		</div>
	);
}

export default App;
