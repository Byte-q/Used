import React from "react";

const Search: React.FC<{
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ value, onChange }) => {
  return (
    <div>
      <input
        className="outline-none border-b-1 rounded w-full"
        type="text"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Search;
