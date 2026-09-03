import React, { useState } from "react";
import dog from "./image/dog.jpg";

export const App = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showPersonalQuestions, setShowPersonalQuestions] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  // First 5 questions
  const [questionIndex, setQuestionIndex] = useState(0);

  // Second 5 questions
  const [personalQuestionIndex, setPersonalQuestionIndex] = useState(0);

  // Store personal answers
  const [answers, setAnswers] = useState(["", "", "", "", ""]);

  const questions = [
    "Are you sure? 😢",
    "Do you really not like me? 🥺",
    "What if I give you a treat? 🐶",
    "Can you give me one more chance? ❤️",
    "So... do you like me now? 😍",
  ];

  const personalQuestions = [
    "Which country do you like? 🌍",
    "Which food do you like? 🍕",
    "Which color do you like? 🎨",
    "What is your favorite hobby? 🎮",
    "Where would you like to travel? ✈️",
  ];

  // =========================
  // NOPE BUTTON
  // =========================

  const handleNope = () => {
    setShowQuestions(true);
    setQuestionIndex(0);
  };

  // =========================
  // NEXT FIRST QUESTION
  // =========================

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  // =========================
  // YES BUTTON
  // =========================

  const handleYes = () => {
    setShowQuestions(false);
    setShowPersonalQuestions(true);
    setPersonalQuestionIndex(0);
  };

  // =========================
  // HANDLE PERSONAL ANSWER
  // =========================

  const handleAnswerChange = (e) => {
    const newAnswers = [...answers];

    newAnswers[personalQuestionIndex] = e.target.value;

    setAnswers(newAnswers);
  };

  // =========================
  // NEXT PERSONAL QUESTION
  // =========================

  const nextPersonalQuestion = () => {
    if (answers[personalQuestionIndex].trim() === "") {
      alert("Please enter your answer ❤️");
      return;
    }

    if (personalQuestionIndex < personalQuestions.length - 1) {
      setPersonalQuestionIndex(personalQuestionIndex + 1);
    } else {
      setShowPersonalQuestions(false);
      setShowContactForm(true);
    }
  };

  // =========================
  // MAYBE BUTTON
  // =========================

  const handleMaybe = () => {
    alert("Aww 🥺 Take your time!");
  };

  // =========================
  // CONTACT FORM SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const name = formData.get("name");
    const phone = formData.get("phone");
    const instagram = formData.get("instagram");

    // Create submission object
    const newSubmission = {
      id: Date.now(),
      name: name,
      phone: phone,
      instagram: instagram,
      answers: answers,
      date: new Date().toLocaleString(),
    };

    // Get existing submissions
    const existingSubmissions = JSON.parse(
      localStorage.getItem("submissions") || "[]",
    );

    // Add new submission
    existingSubmissions.push(newSubmission);

    // Save to localStorage
    localStorage.setItem("submissions", JSON.stringify(existingSubmissions));

    alert("Thank you ❤️ Your details have been submitted!");

    console.log("New Submission:", newSubmission);

    // Reset form
    e.target.reset();

    // Reset answers
    setAnswers(["", "", "", "", ""]);
    setPersonalQuestionIndex(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
      <div
        className="
          text-white
          border-2
          border-white
          w-full
          max-w-sm
          p-6
          rounded-3xl
          text-center
          shadow-2xl
        "
      >
        {/* =========================
            DOG IMAGE
        ========================== */}

        <img
          src={dog}
          alt="dog"
          className="
            w-32
            h-32
            mx-auto
            object-cover
            rounded-full
            border-4
            border-pink-500
            shadow-lg
          "
        />

        {/* =====================================================
            CONTACT FORM
        ===================================================== */}

        {showContactForm ? (
          <>
            <h1 className="text-2xl font-bold mt-5">❤️ Welcome!</h1>

            <p className="text-gray-400 mt-2">
              Now tell me a little about you 🥰
            </p>

            <form onSubmit={handleSubmit} className="mt-6 text-left">
              {/* NAME */}

              <label className="block text-sm font-semibold mb-2">Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-900
                  border
                  border-gray-600
                  text-white
                  outline-none
                  focus:border-pink-500
                  mb-4
                "
              />

              {/* PHONE */}

              <label className="block text-sm font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-900
                  border
                  border-gray-600
                  text-white
                  outline-none
                  focus:border-pink-500
                  mb-4
                "
              />

              {/* INSTAGRAM */}

              <label className="block text-sm font-semibold mb-2">
                Instagram ID
              </label>

              <input
                type="text"
                name="instagram"
                placeholder="@yourinstagram"
                required
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-900
                  border
                  border-gray-600
                  text-white
                  outline-none
                  focus:border-pink-500
                  mb-5
                "
              />

              {/* SUBMIT */}

              <button
                type="submit"
                className="
                  w-full
                  bg-pink-500
                  px-6
                  py-3
                  rounded-full
                  font-bold
                  hover:bg-pink-600
                  hover:scale-105
                  active:scale-95
                  transition-all
                  shadow-lg
                "
              >
                💌 Submit
              </button>
            </form>
          </>
        ) : showPersonalQuestions ? (
          /* =====================================================
             PERSONAL QUESTIONS PAGE
          ===================================================== */

          <>
            <div className="mt-5">
              <h1 className="text-2xl font-bold">💕 Tell Me About You</h1>

              <p className="text-sm text-gray-400 mt-2">
                Question {personalQuestionIndex + 1} of{" "}
                {personalQuestions.length}
              </p>

              <h2 className="text-xl font-bold mt-6">
                {personalQuestions[personalQuestionIndex]}
              </h2>

              <input
                type="text"
                value={answers[personalQuestionIndex]}
                onChange={handleAnswerChange}
                placeholder="Type your answer..."
                className="
                  w-full
                  mt-5
                  px-4
                  py-3
                  rounded-xl
                  bg-gray-900
                  border
                  border-gray-600
                  text-white
                  outline-none
                  focus:border-pink-500
                  focus:ring-1
                  focus:ring-pink-500
                "
              />

              <button
                onClick={nextPersonalQuestion}
                className="
                  mt-6
                  bg-pink-500
                  px-7
                  py-3
                  rounded-full
                  font-bold
                  hover:bg-pink-600
                  hover:scale-110
                  active:scale-90
                  transition-all
                  shadow-lg
                "
              >
                {personalQuestionIndex === personalQuestions.length - 1
                  ? "Finish ❤️"
                  : "Next ➡️"}
              </button>
            </div>
          </>
        ) : !showQuestions ? (
          /* =====================================================
             MAIN QUESTION
          ===================================================== */

          <>
            <div className="text-lg font-bold mt-4">DO YOU LIKE ME ♥️</div>

            <div className="flex justify-center gap-4 mt-5">
              {/* NOPE */}

              <button
                onClick={handleNope}
                className="
                  bg-red-500
                  px-5
                  py-2
                  rounded-full
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:-rotate-6
                  hover:bg-red-600
                  active:scale-90
                  shadow-lg
                "
              >
                ❌ Nope
              </button>

              {/* LIKE */}

              <button
                onClick={handleYes}
                className="
                  bg-pink-500
                  px-5
                  py-2
                  rounded-full
                  font-bold
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:rotate-6
                  hover:bg-pink-600
                  active:scale-90
                  shadow-lg
                  animate-pulse
                "
              >
                ❤️ Like
              </button>
            </div>
          </>
        ) : (
          /* =====================================================
             FIRST 5 QUESTIONS
          ===================================================== */

          <>
            <div className="mt-5">
              <p className="text-sm text-gray-400">
                Question {questionIndex + 1} of {questions.length}
              </p>

              <h2 className="text-xl font-bold mt-3">
                {questions[questionIndex]}
              </h2>

              {questionIndex < questions.length - 1 ? (
                <button
                  onClick={nextQuestion}
                  className="
                    mt-6
                    bg-pink-500
                    px-6
                    py-2
                    rounded-full
                    font-bold
                    hover:bg-pink-600
                    hover:scale-110
                    active:scale-90
                    transition-all
                    shadow-lg
                  "
                >
                  Next ➡️
                </button>
              ) : (
                <div
                  className="
                    flex
                    justify-center
                    items-center
                    gap-3
                    mt-6
                    flex-wrap
                  "
                >
                  {/* YES */}

                  <button
                    onClick={handleYes}
                    className="
                      bg-green-500
                      px-5
                      py-2
                      rounded-full
                      font-bold
                      hover:bg-green-600
                      hover:scale-110
                      active:scale-90
                      transition-all
                      shadow-lg
                    "
                  >
                    ❤️ Yes, I Like You
                  </button>

                  {/* MAYBE */}

                  <button
                    onClick={handleMaybe}
                    className="
                      bg-gray-600
                      px-5
                      py-2
                      rounded-full
                      font-bold
                      hover:bg-gray-700
                      hover:scale-110
                      active:scale-90
                      transition-all
                      shadow-lg
                    "
                  >
                    😅 Maybe
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
