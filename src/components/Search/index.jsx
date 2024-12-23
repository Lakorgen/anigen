import React, { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChangeValue = (e) => {
    const value = e.currentTarget.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className={styles.search_wrapper}>
      <input
        type="text"
        className={styles.search}
        value={searchValue}
        onChange={handleChangeValue}
        placeholder="Поиск"
      />
    </div>
  );
};

export default Search;
