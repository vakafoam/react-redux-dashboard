import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getMusicEventsActionCreator,
  GotMusicEventsActionI,
} from "store/actions";
import { QueryParamsI } from "api/interfaces";
import "components/header/header.scss";
import SearchIcon from "components/icons/SearchIcon";

interface PropsI {
  getMusicEvents: (q: QueryParamsI) => Promise<GotMusicEventsActionI>;
}

const Header = ({ getMusicEvents }: PropsI) => {
  const [searchValue, setSearchValue] = useState<string>();
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [searchTimeout]);

  const debouncedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSearchValue(input);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        if (input.length !== 0 && input.length < 3) return;
        getMusicEvents({ keyword: input });
      }, 1500)
    );
  };

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTimeout) clearTimeout(searchTimeout);
      getMusicEvents({ keyword: searchValue });
    }
  };

  return (
    <header className="header">
      <div className="header__title-search">
        <h1 className="header__title-search__title">Music events</h1>
        <form>
          <SearchIcon className="header__search-icon" />
          <input
            type="text"
            name="keyword"
            onChange={debouncedSearch}
            onKeyDown={keyHandler}
          />
        </form>
      </div>
      <ul className="header__navigation">
        <li className="header__navigation__link header__navigation__link--active">
          All genres
        </li>
        <li className="header__navigation__link">Alternative</li>
        <li className="header__navigation__link">Ballads/Romantic</li>
        <li className="header__navigation__link">Blues</li>
        <li className="header__navigation__link">Chanson Francaise</li>
        <li className="header__navigation__link">More...</li>
      </ul>
    </header>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getMusicEvents: (query?: QueryParamsI) =>
      dispatch(getMusicEventsActionCreator(query)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
