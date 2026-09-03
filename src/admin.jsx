import React, { useEffect, useState } from "react";

 const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("adminLoggedIn") === "true",
  );

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Load submissions
  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const saved = JSON.parse(localStorage.getItem("submissions") || "[]");

    setSubmissions(saved);
  };

  // Login
  const handleLogin = (e) => {
    e.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      setIsLoggedIn(true);
      setError("");
      setPassword("");
    } else {
      setError("❌ Incorrect password");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  // Delete one submission
  const deleteSubmission = (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) {
      return;
    }

    const updated = submissions.filter((item) => item.id !== id);

    localStorage.setItem("submissions", JSON.stringify(updated));
    setSubmissions(updated);
    setSelectedSubmission(null);
  };

  // Clear all
  const clearAll = () => {
    if (!window.confirm("Are you sure you want to delete ALL submissions?")) {
      return;
    }

    localStorage.removeItem("submissions");
    setSubmissions([]);
    setSelectedSubmission(null);
  };

  // =========================
  // LOGIN PAGE
  // =========================

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-3xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="text-6xl mb-4">🔐</div>

            <h1 className="text-3xl font-bold text-white">Admin Login</h1>

            <p className="text-gray-400 mt-2">
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8">
            <label className="block text-white font-semibold mb-2">
              Admin Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                bg-black
                border
                border-gray-700
                text-white
                outline-none
                focus:border-pink-500
                transition
              "
            />

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

            <button
              type="submit"
              className="
                w-full
                mt-6
                bg-pink-500
                hover:bg-pink-600
                text-white
                font-bold
                py-3
                rounded-xl
                transition
                hover:scale-[1.02]
              "
            >
              🔓 Login
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">Admin Panel</p>
        </div>
      </div>
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden flex items-center justify-between bg-gray-900 border-b border-gray-800 px-5 py-4">
        <h1 className="text-xl font-bold">💕 Admin Panel</h1>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-2xl"
        >
          ☰
        </button>
      </div>

      <div className="flex">
        {/* =========================
            SIDEBAR
        ========================== */}

        <aside
          className={`
            fixed
            lg:static
            z-50
            top-0
            left-0
            h-screen
            w-64
            bg-gray-900
            border-r
            border-gray-800
            transform
            transition-transform
            duration-300
            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-pink-500">💕 Love Admin</h1>

            <p className="text-gray-500 text-sm mt-1">Dashboard</p>
          </div>

          <nav className="px-4 space-y-2">
            <button
              onClick={() => {
                setSelectedSubmission(null);
                setSidebarOpen(false);
              }}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                bg-pink-500/10
                text-pink-400
                hover:bg-pink-500/20
                transition
              "
            >
              📊 Dashboard
            </button>

            <button
              onClick={() => {
                loadSubmissions();
                setSidebarOpen(false);
              }}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                text-gray-300
                hover:bg-gray-800
                transition
              "
            >
              👥 Submissions
            </button>

            <button
              onClick={clearAll}
              className="
                w-full
                text-left
                px-4
                py-3
                rounded-xl
                text-red-400
                hover:bg-red-500/10
                transition
              "
            >
              🗑️ Clear All
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 w-full p-4">
            <button
              onClick={handleLogout}
              className="
                w-full
                bg-gray-800
                hover:bg-red-500
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* MOBILE OVERLAY */}

        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="
              fixed
              inset-0
              bg-black/70
              z-40
              lg:hidden
            "
          />
        )}

        {/* =========================
            MAIN CONTENT
        ========================== */}

        <main className="flex-1 min-w-0">
          <div className="p-5 sm:p-8">
            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Dashboard</h2>

                <p className="text-gray-400 mt-1">
                  View submitted responses 💕
                </p>
              </div>

              <button
                onClick={loadSubmissions}
                className="
                  bg-pink-500
                  hover:bg-pink-600
                  px-5
                  py-2.5
                  rounded-xl
                  font-semibold
                  transition
                "
              >
                🔄 Refresh
              </button>
            </div>

            {/* =========================
                STAT CARDS
            ========================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-400">Total Submissions</p>

                <h3 className="text-3xl font-bold mt-2 text-pink-400">
                  {submissions.length}
                </h3>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-400">Personal Answers</p>

                <h3 className="text-3xl font-bold mt-2 text-green-400">
                  {submissions.length * 5}
                </h3>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-400">Status</p>

                <h3 className="text-3xl font-bold mt-2 text-blue-400">
                  Online
                </h3>
              </div>
            </div>

            {/* =========================
                SUBMISSIONS
            ========================== */}

            <div className="mt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <h2 className="text-xl font-bold">💌 User Submissions</h2>

                {submissions.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="
                      text-red-400
                      hover:text-red-300
                      text-sm
                    "
                  >
                    Delete All
                  </button>
                )}
              </div>

              {submissions.length === 0 ? (
                <div
                  className="
                  bg-gray-900
                  border
                  border-gray-800
                  rounded-2xl
                  p-10
                  text-center
                "
                >
                  <div className="text-5xl">📭</div>

                  <h3 className="text-xl font-bold mt-4">No submissions yet</h3>

                  <p className="text-gray-500 mt-2">
                    User responses will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="
                        bg-gray-900
                        border
                        border-gray-800
                        rounded-2xl
                        p-5
                        hover:border-pink-500/50
                        transition
                      "
                    >
                      {/* USER */}

                      <div className="flex items-center gap-4">
                        <div
                          className="
                          w-12
                          h-12
                          rounded-full
                          bg-pink-500/20
                          flex
                          items-center
                          justify-center
                          text-xl
                        "
                        >
                          ❤️
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-bold text-lg truncate">
                            {submission.name}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            {submission.date || "Recently"}
                          </p>
                        </div>
                      </div>

                      {/* CONTACT */}

                      <div className="mt-5 space-y-2 text-sm">
                        <p className="text-gray-300 break-all">
                          📞 {submission.phone}
                        </p>

                        <p className="text-gray-300 break-all">
                          📸 {submission.instagram}
                        </p>
                      </div>

                      {/* BUTTONS */}

                      <div className="flex gap-2 mt-5">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="
                            flex-1
                            bg-pink-500
                            hover:bg-pink-600
                            py-2
                            rounded-lg
                            font-semibold
                            transition
                          "
                        >
                          👁️ View
                        </button>

                        <button
                          onClick={() => deleteSubmission(submission.id)}
                          className="
                            px-4
                            bg-red-500/10
                            text-red-400
                            hover:bg-red-500
                            hover:text-white
                            rounded-lg
                            transition
                          "
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* =========================
          DETAILS MODAL
      ========================== */}

      {selectedSubmission && (
        <div
          className="
          fixed
          inset-0
          z-[100]
          bg-black/80
          flex
          items-center
          justify-center
          p-4
        "
        >
          <div
            className="
            bg-gray-900
            border
            border-gray-700
            rounded-3xl
            w-full
            max-w-lg
            max-h-[90vh]
            overflow-y-auto
            p-6
          "
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">💕 User Details</h2>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* CONTACT DETAILS */}

            <div className="mt-6 space-y-4">
              <div className="bg-black rounded-xl p-4">
                <p className="text-gray-500 text-sm">Name</p>
                <p className="font-semibold mt-1">{selectedSubmission.name}</p>
              </div>

              <div className="bg-black rounded-xl p-4">
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="font-semibold mt-1">{selectedSubmission.phone}</p>
              </div>

              <div className="bg-black rounded-xl p-4">
                <p className="text-gray-500 text-sm">Instagram</p>
                <p className="font-semibold mt-1">
                  {selectedSubmission.instagram}
                </p>
              </div>
            </div>

            {/* ANSWERS */}

            <h3 className="text-xl font-bold mt-7 mb-4">💬 Personal Answers</h3>

            <div className="space-y-3">
              {selectedSubmission.answers?.map((answer, index) => (
                <div key={index} className="bg-black rounded-xl p-4">
                  <p className="text-gray-500 text-sm">Question {index + 1}</p>

                  <p className="font-semibold mt-1">{answer}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedSubmission(null)}
              className="
                w-full
                mt-6
                bg-gray-800
                hover:bg-gray-700
                py-3
                rounded-xl
                font-semibold
              "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
