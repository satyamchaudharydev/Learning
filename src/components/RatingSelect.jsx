import React from "react";
import { useState, useContext, useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

const ratingArr = [1, 2, 3, 4, 5];
function RatingSelect({ select }) {
  const { feedbackEdit } = useContext(FeedbackContext);
  const [selected, setSelected] = useState(4);
  const handleClick = (index) => {
    setSelected(index);
    select(index + 1);
  };
  useEffect(() => {
    if (feedbackEdit.edit) {
      console.log(feedbackEdit.item.rating);
      setSelected(feedbackEdit.item.rating - 1);
    }
  }, [feedbackEdit]);
  return (
    <>
      <ul className="rating">
        {ratingArr.map((item, index) => (
          <li
            key={index}
            className={`${selected === index && "selected-rating"}`}
            onClick={() => handleClick(index)}
          >
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RatingSelect;
