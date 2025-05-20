import { FaEllipsisH, FaRegHeart, FaRetweet } from "react-icons/fa";
import { useState } from "react";

const bookmarkTabs = ["Tweets", "Lists", "Media"];

const bookmarkedTweets = []; // Empty array to simulate no bookmarks

const BookmarksPage = () => {
  document.title = "X clone / Bookmarks";
  const [activeTab, setActiveTab] = useState("Tweets");

  return (
    <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen text-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Bookmarks</h1>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex overflow-x-auto hide-scrollbar">
          {bookmarkTabs.map((tab, index) => (
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

      {/* Bookmarked Content (Tweets, Lists, Media) */}
      <div className="p-4">
        {activeTab === "Tweets" && (
          <>
            <h2 className="text-xl font-bold mb-4">Bookmarked Tweets</h2>

            {bookmarkedTweets.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <h3 className="text-lg font-semibold mb-2">See new posts</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Save posts for later. Bookmark posts to easily find them again in the future.
                </p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/No_bookmarks.svg"
                  alt="No bookmarks"
                  className="w-24 h-24 mb-4"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                  Explore posts
                </button>
              </div>
            ) : (
              bookmarkedTweets.map((tweet, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 border-b border-gray-700 hover:bg-[#16181c] cursor-pointer transition rounded-lg"
                >
                  <div className="flex items-center mb-2">
                    <img
                      src={tweet.image}
                      alt={tweet.user}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold">{tweet.user}</h3>
                      <p className="text-gray-500 text-sm">{tweet.handle} · {tweet.timeAgo}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 mb-2">{tweet.tweet}</p>

                  <div className="flex justify-between text-gray-400 text-xs">
                    <div className="flex items-center">
                      <FaRetweet className="mr-2" />
                      {tweet.retweets}
                    </div>
                    <div className="flex items-center">
                      <FaRegHeart className="mr-2" />
                      {tweet.likes}
                    </div>
                    <FaEllipsisH />
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* Add more content for "Lists" and "Media" tabs */}
        {activeTab === "Lists" && (
          <div className="text-gray-400">Lists tab content here...</div>
        )}
        {activeTab === "Media" && (
          <div className="text-gray-400">Media tab content here...</div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
