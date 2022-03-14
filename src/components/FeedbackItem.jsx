import { FaTimes, FaEdit } from "react-icons/fa";
import { useState, useContext } from "react";

import PropTypes from "prop-types";
import Card from "./shared/Card";
import FeedbackContext from "../context/FeedbackContext";
function FeedbackItem({ item }) {
  const { dltFeedback, editFeedback, feedbackEdit } =
    useContext(FeedbackContext);
  return (
    <Card reverse={true}>
      <div className="num-display">{item.rating}</div>
      <button className="close" onClick={() => dltFeedback(item.id)}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{item.text}</div>
    </Card>
  );
}
FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedbackItem;
