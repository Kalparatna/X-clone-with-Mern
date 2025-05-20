import { FaEllipsisH } from "react-icons/fa";
import { useState } from "react";

const communityTabs = ["All Communities", "Tech", "Music", "Sports", "Gaming", "News"];

const communities = [
  {
    name: "Tech Enthusiasts",
    category: "Tech",
    description: "A place for the latest tech discussions and updates.",
    members: "250K Members",
  },
  {
    name: "Rock Music Fans",
    category: "Music",
    description: "Share your favorite rock music and artists with fellow fans.",
    members: "150K Members",
  },
  {
    name: "Football Lovers",
    category: "Sports",
    description: "All things football – latest news, matches, and fan talk.",
    members: "320K Members",
  },
  {
    name: "Gaming Legends",
    category: "Gaming",
    description: "Join discussions, gaming events, and meet fellow gamers.",
    members: "500K Members",
  },
  {
    name: "Global News Hub",
    category: "News",
    description: "Stay updated with the latest global news and discussions.",
    members: "420K Members",
  },
];

const CommunitiesPage = () => {
  document.title = "X clone / Communities";
  const [activeTab, setActiveTab] = useState("All Communities");

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Communities</h1>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          {communityTabs.map((tab, index) => (
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

      {/* Community List */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">
          {activeTab === "All Communities" ? "All Communities" : `${activeTab} Communities`}
        </h2>

        {communities
          .filter((community) => activeTab === "All Communities" || community.category === activeTab)
          .map((community, index) => (
            <div
              key={index}
              className="flex justify-between items-start p-3 hover:bg-[#16181c] cursor-pointer transition rounded-lg"
            >
              <div>
                <h3 className="font-semibold text-md">{community.name}</h3>
                <p className="text-gray-500 text-sm">{community.description}</p>
                <p className="text-gray-500 text-xs">{community.members}</p>
              </div>
              <FaEllipsisH className="text-gray-400 mt-1 w-4 h-4" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommunitiesPage;
