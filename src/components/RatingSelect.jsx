import React from "react";
import { useState, useContext,useEffect } from "react";
import FeedbackContext from "../context/FeedbackContext";

const ratingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function RatingSelect({ select }) {
  const { feedbackEdit } = useContext(FeedbackContext);
  const [selected, setSelected] = useState(10);
  const handleChange = (e) => {
    setSelected(+e.currentTarget.value);
    select(+e.target.value);
  };
  useEffect(() => {
    if (feedbackEdit.edit) {
      setSelected(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  return (
    <>
      <ul className="rating">
        {ratingArr.map((item) => (
          <li>
            <input
              type="radio"
              id={`num${item}`}
              name="rating"
              value={item}
              onChange={handleChange}
              checked={selected === item}
            />
            <label htmlFor={`num${item}`}>{item}</label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RatingSelect;
