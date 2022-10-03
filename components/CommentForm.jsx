import React, { useState, useEffect, useRef } from "react";

import { submitComment } from "../services";

const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  //  ref elements
  const commentElRef = useRef();
  const nameElRef = useRef();
  const emailElRef = useRef();
  const storeDataElRef = useRef();

  useEffect(() => {
    nameElRef.current.value = window.localStorage.getItem("name");
    emailElRef.current.value = window.localStorage.getItem("email");
  }, []);

  const submitCommentHandler = () => {
    setError(false);

    const { value: comment } = commentElRef.current;
    const { value: name } = nameElRef.current;
    const { value: email } = emailElRef.current;
    const { checked: storeData } = storeDataElRef.current;

    //prettier-ignore
    //if (!commentElRef.current.value || !nameElRef.current.value || !emailElRef.current.value) {
    if (!comment || !name || !email) {
      setError(true);
      return;
    }

    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    // local storage handler
    if (storeData) {
      window.localStorage.setItem("name", name);
      window.localStorage.setItem("email", email);
    } else {
      window.localStorage.removeItem("name", name);
      window.localStorage.removeItem("email", email);
    }

    submitComment(commentObj).then((res) => {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Add Comment</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea
          ref={commentElRef}
          className="p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 placeholder:italic"
          placeholder="Comment"
          name="comment"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input
          ref={nameElRef}
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 placeholder:italic"
          placeholder="Name"
          name="name"
        />
        <input
          ref={emailElRef}
          type="text"
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700 placeholder:italic"
          placeholder="Email"
          name="email"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          {/* prettier-ignore */}
          <input ref={storeDataElRef} type="checkbox" id="storeData" name="storeData" value="true" />
          <label
            className="text-gray-500 cursor-pointer ml-2"
            htmlFor="storeData"
          >
            Save my name and e-mail adress for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className="text-red-500 text-center mt-10 font-semibold">
          All fields are required!
        </p>
      )}
      <div className="mt-8">
        <button
          type="button"
          className="transition duration-500 ease bg-pink-600 text-white text-lg px-6 py-3 rounded-full hover:bg-pink-800 inline-block cursor-pointer"
          onClick={submitCommentHandler}
        >
          Add Comment
        </button>
        {showSuccessMessage && (
          <span className="text-green-500 ml-5 font-semibold">
            Comment added successfully! (Waiting for confirmation...)
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
