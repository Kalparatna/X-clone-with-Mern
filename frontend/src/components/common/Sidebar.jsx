import XSvg from "../svgs/X";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";

// Icons
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser, FaHashtag, FaEnvelope, FaRegBookmark, FaRegListAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { BsTwitterX, BsThreeDots } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaMoneyBillWave, FaBullhorn, FaBriefcase } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { HiMicrophone } from "react-icons/hi";

const Sidebar = () => {
	const queryClient = useQueryClient();
	const [showMoreMenu, setShowMoreMenu] = useState(false);
	const moreMenuRef = useRef(null);

	// Logout mutation
	const { mutate: logout } = useMutation({
		mutationFn: async () => {
			const res = await fetch("/api/auth/logout", { method: "POST" });
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to logout");
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
		onError: () => {
			toast.error("Logout failed");
		},
	});

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	// Close the dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
				setShowMoreMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="md:flex-[2_2_0] w-18 max-w-52">
			<div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
				<Link to="/" className="flex justify-center md:justify-start">
					<XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
				</Link>

				<ul className="flex flex-col gap-3 mt-4">
					{/* Primary Navigation Items */}
					{[
						{ to: "/", icon: <MdHomeFilled className="w-8 h-8" />, label: "Home" },
						{ to: "/explore", icon: <FaHashtag className="w-6 h-6" />, label: "Explore" },
						{ to: "/notifications", icon: <IoNotifications className="w-6 h-6" />, label: "Notifications" },
						{ to: "/messages", icon: <FaEnvelope className="w-6 h-6" />, label: "Messages" },
						{ to: "/bookmarks", icon: <FaRegBookmark className="w-6 h-6" />, label: "Bookmarks" },
						{ to: "/lists", icon: <FaRegListAlt className="w-6 h-6" />, label: "Lists" },
						{ to: "/communities", icon: <MdGroups className="w-6 h-6" />, label: "Communities" },
						{ to: "/premium", icon: <BsTwitterX className="w-6 h-6" />, label: "Premium" },
						{ to: `/profile/${authUser?.username}`, icon: <FaUser className="w-6 h-6" />, label: "Profile" },
					].map(({ to, icon, label }) => (
						<li key={label} className="flex justify-center md:justify-start">
							<Link
								to={to}
								className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
							>
								{icon}
								<span className="text-lg hidden md:block">{label}</span>
							</Link>
						</li>
					))}

					{/* More Menu */}
					<li className="relative flex justify-center md:justify-start" ref={moreMenuRef}>
						<div
							onClick={() => setShowMoreMenu((prev) => !prev)}
							className="flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer"
						>
							<BsThreeDots className="w-6 h-6" />
							<span className="text-lg hidden md:block">More</span>
						</div>

						{showMoreMenu && (
							<div className="absolute left-12 md:left-10 top-full mt-2 w-60 bg-black border border-gray-700 rounded-xl shadow-lg p-2 z-50">
								{[
									{ label: "Monetization", icon: <FaMoneyBillWave className="w-5 h-5" /> },
									{ label: "Verified Orgs", icon: <MdVerified className="w-5 h-5" /> },
									{ label: "Ads", icon: <FaBullhorn className="w-5 h-5" /> },
									{ label: "Jobs", icon: <FaBriefcase className="w-5 h-5" /> },
									{ label: "Create your Space", icon: <HiMicrophone className="w-5 h-5" /> },
									{ label: "Settings and privacy", icon: <IoMdSettings className="w-5 h-5" /> },
								].map(({ label, icon }) => (
									<div
										key={label}
										className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-800 cursor-pointer"
										onClick={() => toast(`${label} clicked!`)}
									>
										{icon}
										<span className="text-white">{label}</span>
									</div>
								))}
							</div>
						)}
					</li>
				</ul>

				{/* Post Button */}
				<div className="mt-4 px-4 hidden md:block">
					<button className="bg-primary text-white w-full py-2 rounded-full font-bold hover:brightness-90 transition-all">
						Post
					</button>
				</div>

				{/* Auth User Footer */}
				{authUser && (
					<Link
						to={`/profile/${authUser.username}`}
						className="mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full"
					>
						<div className="avatar hidden md:inline-flex">
							<div className="w-8 rounded-full">
								<img src={authUser?.profileImg || "/avatar-placeholder.png"} />
							</div>
						</div>
						<div className="flex justify-between flex-1">
							<div className="hidden md:block">
								<p className="text-white font-bold text-sm w-20 truncate">{authUser?.fullName}</p>
								<p className="text-slate-500 text-sm">@{authUser?.username}</p>
							</div>
							<BiLogOut
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}
								className="w-5 h-5 cursor-pointer"
							/>
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Sidebar;
