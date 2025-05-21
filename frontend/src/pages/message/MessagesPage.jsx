import { FaEnvelopeOpenText, FaSearch } from "react-icons/fa";
import { useState } from "react";

const dummyMessages = [
	{
		id: 1,
		name: "Elon Musk",
		username: "elonmusk",
		avatar: "https://i.pravatar.cc/150?img=1",
		preview: "Let's discuss Mars colonization!",
		time: "2h",
	},
	{
		id: 2,
		name: "Jane Doe",
		username: "jane_doe",
		avatar: "https://i.pravatar.cc/150?img=5",
		preview: "That thread was hilarious 😂",
		time: "5h",
	},
	{
		id: 3,
		name: "John Smith",
		username: "johnsmith",
		avatar: "https://i.pravatar.cc/150?img=10",
		preview: "Are you joining the space today?",
		time: "1d",
	},
];

const MessagesPage = () => {
	const [selectedId, setSelectedId] = useState(null);
	const selectedChat = dummyMessages.find((msg) => msg.id === selectedId);

	return (
		<div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white flex">
			{/* Sidebar - Chat List */}
			<div className="w-[30%] border-r border-gray-700">
				{/* Header */}
				<div className="p-4 border-b border-gray-700 flex items-center justify-between">
					<h1 className="text-xl font-bold">Messages</h1>
					<FaEnvelopeOpenText className="w-5 h-5" />
				</div>

				{/* Search */}
				<div className="p-2">
					<div className="flex items-center bg-[#16181c] px-3 py-2 rounded-full">
						<FaSearch className="text-gray-500 mr-2" />
						<input
							type="text"
							placeholder="Search Direct Messages"
							className="bg-transparent outline-none text-sm text-white w-full"
						/>
					</div>
				</div>

				{/* Message List */}
				<div className="overflow-y-auto max-h-[calc(100vh-120px)]">
					{dummyMessages.map((msg) => (
						<div
							key={msg.id}
							onClick={() => setSelectedId(msg.id)}
							className={`flex gap-3 p-3 hover:bg-[#181818] cursor-pointer ${
								selectedId === msg.id ? "bg-[#1f1f1f]" : ""
							}`}
						>
							<img
								src={msg.avatar}
								alt={msg.name}
								className="w-10 h-10 rounded-full"
							/>
							<div className="flex-1">
								<div className="flex justify-between items-center">
									<p className="font-bold">{msg.name}</p>
									<span className="text-xs text-gray-500">{msg.time}</span>
								</div>
								<p className="text-sm text-gray-400 truncate">{msg.preview}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Message Preview */}
			<div className="w-[70%] flex flex-col">
				{selectedChat ? (
					<>
						{/* Chat Header */}
						<div className="p-4 border-b border-gray-700 flex gap-3 items-center">
							<img
								src={selectedChat.avatar}
								alt={selectedChat.name}
								className="w-10 h-10 rounded-full"
							/>
							<div>
								<p className="font-bold">{selectedChat.name}</p>
								<p className="text-sm text-gray-400">@{selectedChat.username}</p>
							</div>
						</div>

						{/* Chat Body */}
						<div className="flex-1 p-4 overflow-y-auto text-gray-300 space-y-2">
							<p className="text-sm">This is a placeholder conversation with <b>{selectedChat.name}</b>.</p>
							<p className="bg-[#1a1a1a] p-3 rounded-xl w-max">Hi there! 👋</p>
							<p className="bg-blue-500 text-white p-3 rounded-xl w-max ml-auto">Hello! How are you?</p>
							<p className="bg-[#1a1a1a] p-3 rounded-xl w-max">All good! Let’s catch up soon.</p>
						</div>

						{/* Chat Input */}
						<div className="p-4 border-t border-gray-700">
							<input
								type="text"
								placeholder="Start a message"
								className="w-full bg-[#16181c] p-3 rounded-full outline-none text-sm"
							/>
						</div>
					</>
				) : (
					<div className="flex-1 flex items-center justify-center text-gray-500">
						<p>Select a message to start chatting</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MessagesPage;
