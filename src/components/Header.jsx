import PropTypes from "prop-types";

export default function Header({ text, bgColor, textColor }) {
  const style = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <header style={style}>
      <div className="container">
        <h2>{text}</h2>
      </div>
    </header>
  );
}
Header.defaultProps = {
  text: "Header Logo ",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff69af",
};
Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};
