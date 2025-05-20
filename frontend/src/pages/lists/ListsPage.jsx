import { FaEllipsisH } from "react-icons/fa";
import { useState } from "react";

const listTabs = ["Discover", "Your Lists"];

const lists = [
  {
    name: "Pune",
    description: "Discover updates and discussions about Pune.",
    members: "56 members",
    followers: "17.1K followers",
    handle: "@faijalkhantroll",
  },
  {
    name: "#Pune",
    description: "Community for everything happening in Pune.",
    members: "61 members",
    followers: "8.5K followers",
    handle: "@HarishAswal_",
  },
  {
    name: "Government affairs (Pune)",
    description: "Stay updated on government affairs in Pune.",
    members: "39 members",
    followers: "13.5K followers",
    handle: "@VijayWadettiwar",
  },
];

const ListsPage = () => {
  document.title = "X clone / Lists";
  const [activeTab, setActiveTab] = useState("Discover");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter lists based on the search query
  const filteredLists = lists.filter((list) =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Lists</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search Lists"
          className="w-full bg-[#16181c] text-white rounded-full px-4 py-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          {listTabs.map((tab, index) => (
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

      {/* Lists Section */}
      <div className="p-4">
        {activeTab === "Discover" && (
          <>
            <h2 className="text-xl font-bold mb-4">Discover new Lists</h2>
            {filteredLists.length > 0 ? (
              filteredLists.map((list, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start p-4 hover:bg-[#16181c] cursor-pointer transition rounded-lg border-b border-gray-700"
                >
                  <div>
                    <h3 className="font-semibold text-md mb-1">{list.name}</h3>
                    <p className="text-gray-500 text-sm mb-1">{list.description}</p>
                    <p className="text-gray-400 text-xs">
                      {list.members} · {list.followers} including {list.handle}
                    </p>
                  </div>
                  <FaEllipsisH className="text-gray-400 mt-1 w-5 h-5" />
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No lists found matching your search.</p>
            )}
            <div className="text-blue-500 text-xs mt-4 cursor-pointer">Show more</div>
          </>
        )}

        {activeTab === "Your Lists" && (
          <>
            <h2 className="text-xl font-bold mb-4">Your Lists</h2>
            <p className="text-gray-400 text-sm">
              You haven't created or followed any Lists. When you do, they'll show up here.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ListsPage;
