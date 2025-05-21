import { BsTwitterX } from "react-icons/bs";
import {
	FaCheckCircle,
	FaRocket,
	FaPenFancy,
	FaEdit,
	FaDollarSign,
	FaRegSmile,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const premiumFeatures = [
	{
		icon: <FaCheckCircle className="text-blue-500 w-6 h-6" />,
		title: "Verified Badge",
		description: "Get a blue checkmark and show the world you're authentic.",
	},
	{
		icon: <FaRocket className="text-orange-500 w-6 h-6" />,
		title: "Boosted Visibility",
		description: "Your posts will get prioritized in replies and search.",
	},
	{
		icon: <FaPenFancy className="text-green-500 w-6 h-6" />,
		title: "Longer Posts & Videos",
		description: "Post up to 25,000 characters and longer high-quality videos.",
	},
	{
		icon: <FaEdit className="text-yellow-500 w-6 h-6" />,
		title: "Edit Posts",
		description: "Fix typos or reword your posts for up to 1 hour.",
	},
	{
		icon: <FaDollarSign className="text-red-500 w-6 h-6" />,
		title: "Creator Revenue",
		description: "Earn ad revenue from your content on X.",
	},
	{
		icon: <FaRegSmile className="text-pink-400 w-6 h-6" />,
		title: "Custom Icons & Themes",
		description: "Customize the X app with exclusive icons and themes.",
	},
];

const PremiumPage = () => {
	document.title = "X clone/ Premium";
	const navigate = useNavigate();

	const handleSubscribe = () => {
		alert("Subscription coming soon!");
		// navigate("/subscribe");
	};

	return (
		<div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white">
			{/* Header */}
			<div className="flex justify-between items-center p-4 border-b border-gray-700">
				<div className="flex items-center gap-3">
					<BsTwitterX className="text-white w-6 h-6" />
					<h1 className="text-xl font-bold">X Premium</h1>
				</div>
			</div>

			{/* Intro */}
			<div className="p-4 border-b border-gray-700 text-gray-400">
				<p>
					Unlock powerful features and support the future of X. Choose the Premium plan that's right for you.
				</p>
			</div>

			{/* Premium Feature Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
				{premiumFeatures.map((feature, index) => (
					<div
						key={index}
						className="flex gap-4 items-start bg-[#1a1a1a] p-4 rounded-lg border border-gray-700"
					>
						{feature.icon}
						<div>
							<h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
							<p className="text-gray-400 text-sm">{feature.description}</p>
						</div>
					</div>
				))}
			</div>

			{/* Subscribe Button */}
			<div className="text-center py-6">
				<button
					onClick={handleSubscribe}
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300"
				>
					Subscribe for ₹650/month
				</button>
			</div>
		</div>
	);
};

export default PremiumPage;
