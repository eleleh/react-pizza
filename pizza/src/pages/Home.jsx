import React from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";
import { setItems, fetchPizzas } from "../redux/slices/pizzasSlice";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { Search } from "../components/Search";

export const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
  const selectedSort = useSelector((state) => state.filter.sort.sortProperty);
  const { items, status } = useSelector((state) => state.pizzas);

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

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  //  .filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
  const pizzas = items.map((obj) => (
    <Link to={`/pizza/${obj.id}`} key={obj.id}>
      <PizzaBlock {...obj} />
    </Link>
  ));
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
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

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
