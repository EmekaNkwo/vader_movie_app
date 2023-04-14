import { BsSearch } from "react-icons/bs";
import "./inputField.scss";

export const SearchInputField = ({
  placeholder,
  onChange,
  value,
  onKeyDown,
}) => {
  return (
    <>
      <div className="search_input_field">
        <BsSearch className="search_icon" />
        <input
          type="text"
          placeholder={placeholder}
          className="search_input"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
        />
      </div>
    </>
  );
};
