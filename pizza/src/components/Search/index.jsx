import React from "react";
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { SearchContext } from "../../App";



export const Search = () => {

  const {searchValue,setSearchValue} =React.useContext(SearchContext)
  return (
    <div className={styles.root}>
      <FiSearch className={styles.searchIcon} />
      <input
        className={styles.input}
        placeholder="Suchen nach..."
        onChange={(event) => setSearchValue(event.target.value)}
        value={searchValue}
      />
      {searchValue && (
        <button onClick={() => setSearchValue("")} className={styles.closeBtn}>
          <VscClose />
        </button>
      )}
    </div>
  );
};
