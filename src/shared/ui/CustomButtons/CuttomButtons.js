import "./customButtons.scss";
export const FilledButton = ({ icon, className, title, onClick }) => {
  return (
    <button className={`filled_button ${className}`} onClick={onClick}>
      {icon} {title}
    </button>
  );
};
