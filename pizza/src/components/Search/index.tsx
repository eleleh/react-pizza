import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { FiSearch } from "react-icons/fi";
import { VscClose } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  // const { setSearchValue } = React.useContext(SearchContext);
  const [searchIsOpen, setSearchIsOpen] = React.useState(false);

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const toggleSearch = () => {
    setSearchIsOpen(!searchIsOpen);
  };
  const closeSearch = () => {
    dispatch(setSearchValue(""));
    setValue("");
    toggleSearch();
  };

  return (
    <div className={styles.root}>
      {searchIsOpen ? (
        <div className={styles.openedSearch}>
          <FiSearch className={styles.searchIcon} onClick={toggleSearch} />
          <input
            placeholder="Suchen nach..."
            onChange={onChangeInput}
            value={value}
          />

          <button onClick={closeSearch} >
            <VscClose />
          </button>
        </div>
      ) : (
        <div className={styles.closedSearch} onClick={toggleSearch}>
          <FiSearch className={styles.searchIcon} />
        </div>
      )}
    </div>
  );
};
