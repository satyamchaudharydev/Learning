import { useState, useContext, useEffect } from "react";
import Button from "./shared/Button";
import Card from "./shared/Card";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

export default function FeedbackForm() {
  const { addFeedback, updateFeedback, feedbackEdit } =
    useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [msg, setMsg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleChange = (e) => {
    setText(e.target.value);
    if (text === "") {
      setBtnDisabled(true);
      setMsg(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMsg("Must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMsg(null);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      let newFeedback = { text, rating };
      if (feedbackEdit.edit === true) {
        console.log(feedbackEdit);
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setText("");
    }
  };
  useEffect(() => {
    if (feedbackEdit.edit) {
      setBtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
      console.log(feedbackEdit.item.text, feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  return (
    <Card>
      <form action="" onSubmit={handleSubmit}>
        <h2>How Would you Rate Your Service woth us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => handleChange(e)}
            placeholder="write a review"
          />
          <Button type="submit" isDisabled={btnDisabled}>
            send
          </Button>
        </div>
        {msg && <p className="message">{msg}</p>}
      </form>
    </Card>
  );
}
