import React from "react";

import { useSelector } from "react-redux";
import {
  selectFilter,
  selectFilterSort,
  setCategoryId,
  setCurrentPage,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzas } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

import { Categories } from "../components/Categories";
import { SortPopup } from "../components/SortPopup";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { Search } from "../components/Search";
import { categories } from "../components/Categories";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, currentPage, searchValue, sort } =
    useSelector(selectFilter);
  const selectedSort = useSelector(selectFilterSort);
  const { items, status } = useSelector(selectPizzas);

  //const { searchValue } = React.useContext(SearchContext);

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = selectedSort.replace("-", "");
    const order = selectedSort.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    /*
    fetch(
      `https://64d24f20f8d60b174361d90f.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${search}&order=${order}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
   */
    getPizzas();
  }, [categoryId, selectedSort, currentPage, searchValue]);

  const onClickCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  //  .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categorieId={categoryId}
          onClickCategory={onClickCategory}
        />
        <Search />
        <SortPopup sortValue={sort} />
      </div>
      <h2 className="content__title">{categories[categoryId]} PizZzas</h2>

      {status === "error" ? (
        <div className="content__error-info">
          <h2>Keine Pizzas?</h2>
          <p>Leider ist ein Fehler aufgetreten. Versuchen Sie später nochmal</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
