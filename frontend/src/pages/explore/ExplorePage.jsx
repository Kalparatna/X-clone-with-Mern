import { BsTwitterX } from "react-icons/bs";
import { FaEllipsisH } from "react-icons/fa";
import { useState } from "react";

const tabs = ["For you", "Trending", "News", "Sports", "Entertainment"];

const exploreTrends = [
	{
		location: "Trending in India",
		tag: "#AIRevolution",
		tweets: "102K Tweets",
	},
	{
		location: "Trending in Technology",
		tag: "#ReactJS",
		tweets: "75.3K Tweets",
	},
	{
		location: "Entertainment · Trending",
		tag: "#HouseOfTheDragon",
		tweets: "88.1K Tweets",
	},
	{
		location: "Trending in Sports",
		tag: "#IPL2025",
		tweets: "150K Tweets",
	},
	{
		location: "Music · Trending",
		tag: "#Kpop",
		tweets: "190K Tweets",
	},
	{
		location: "Finance · Trending",
		tag: "#CryptoCrash",
		tweets: "60.5K Tweets",
	},
];

const ExplorePage = () => {
	document.title = "X clone / Explore";
	const [activeTab, setActiveTab] = useState("For you");

	return (
		<div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white">
			{/* Header */}
			<div className="p-4 border-b border-gray-700">
				<h1 className="text-xl font-bold">Explore</h1>
			</div>

			{/* Horizontal Tabs */}
			<div className="border-b border-gray-700">
				<div className="flex overflow-x-auto hide-scrollbar">
					{tabs.map((tab, index) => (
						<button
							key={index}
							onClick={() => setActiveTab(tab)}
							className={`py-3 px-4 text-sm font-medium whitespace-nowrap ${
								activeTab === tab
									? "border-b-4 border-blue-500 text-white"
									: "text-gray-400 hover:text-white"
							}`}
						>
							{tab}
						</button>
					))}
				</div>
			</div>

			{/* Top Banner */}
			{activeTab === "For you" && (
				<div className="p-4 border-b border-gray-700">
					<img
						src="https://images.unsplash.com/photo-1516251193007-45ef944ab0c6?auto=format&fit=crop&w=1000&q=80"
						alt="Trending Banner"
						className="w-full h-52 object-cover rounded-xl mb-4"
					/>

					<h2 className="text-xl font-bold mb-1">What’s happening</h2>
					<p className="text-gray-400 text-sm">
						Stay updated with global and local trends tailored just for you.
					</p>
				</div>
			)}

			{/* Trends */}
			<div className="p-4">
				<h2 className="text-xl font-bold mb-4">
					{activeTab === "For you" ? "Trends for you" : `${activeTab} Trends`}
				</h2>

				{exploreTrends.map((trend, index) => (
					<div
						key={index}
						className="flex justify-between items-start p-3 hover:bg-[#16181c] cursor-pointer transition rounded-lg"
					>
						<div>
							<p className="text-gray-500 text-xs">{trend.location}</p>
							<h3 className="font-semibold text-md">{trend.tag}</h3>
							<p className="text-gray-500 text-sm">{trend.tweets}</p>
						</div>
						<FaEllipsisH className="text-gray-400 mt-1 w-4 h-4" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ExplorePage;
