import React, { useState, useEffect, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  getMusicEventsActionCreator,
  GotMusicEventsActionI,
  setClassificationActionCreator,
  SetClassificationActionI,
} from "store/actions";
import { AppStateI } from "store/state";
import { QueryParamsI, ClassificationI } from "api/interfaces";
import "components/header/header.scss";
import SearchIcon from "components/icons/SearchIcon";
import MenuItem from "components/header/MenuItem";

import { getEventsClassifications, CLASSIFICATION_ID } from "api/data";

interface PropsI {
  activeClassification: ClassificationI;
  getMusicEvents: (
    clsId?: string,
    q?: QueryParamsI
  ) => Promise<GotMusicEventsActionI>;
  setActiveClassification: (
    cls: ClassificationI
  ) => Promise<SetClassificationActionI>;
}

const DEFAULT_MENU_ITEM: ClassificationI = {
  name: "All genres",
  id: CLASSIFICATION_ID,
};

const Header = ({
  activeClassification,
  getMusicEvents,
  setActiveClassification,
}: PropsI) => {
  const [classifications, setClassifications] = useState<ClassificationI[]>([
    DEFAULT_MENU_ITEM,
  ]);
  const [searchValue, setSearchValue] = useState<string>();
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timer | null>(null);
  const [isPopoverActive, setIsPopoverActive] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (searchTimeout) clearTimeout(searchTimeout);
    };
  }, [searchTimeout]);

  useEffect(() => {
    // fetch menu items from API
    getEventsClassifications()
      .then((res) => {
        const result: ClassificationI[] =
          res?.result?.segment?._embedded?.genres || [];
        setClassifications([DEFAULT_MENU_ITEM, ...result]);
        console.log("res", result);
      })
      .catch((er) => console.error("Error occured", er));
  }, []);

  const debouncedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // auto search after user stopped input (triggered only once)
    const input = e.target.value;
    setSearchValue(input);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        if (input.length !== 0 && input.length < 3) return;
        getMusicEvents(activeClassification.id, { keyword: input });
      }, 1500)
    );
  };

  const keyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchTimeout) clearTimeout(searchTimeout);
      getMusicEvents(activeClassification.id, { keyword: searchValue });
    }
  };

  const onClick = (e: SyntheticEvent, cls: ClassificationI) => {
    setIsPopoverActive(false);
    setActiveClassification(cls);
  };

  const onMouseLeave = (e: SyntheticEvent) => {
    setIsPopoverActive(false);
  };

  return (
    <header className="header" onMouseLeave={onMouseLeave}>
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
        {classifications.slice(0, 4).map((cls) => (
          <MenuItem
            item={cls}
            activeItemId={activeClassification.id}
            onClick={onClick}
            key={cls.id}
          />
        ))}
        {classifications.length > 4 && (
          <li
            className="header__navigation__link"
            onClick={() => setIsPopoverActive(!isPopoverActive)}
          >
            More...
          </li>
        )}
        {isPopoverActive && (
          <div className="header__popover" onMouseLeave={onMouseLeave}>
            {classifications.slice(4).map((cls) => (
              <MenuItem
                item={cls}
                activeItemId={activeClassification.id}
                onClick={onClick}
                key={cls.id}
              />
            ))}
          </div>
        )}
      </ul>
    </header>
  );
};

const mapStateToProps = (store: AppStateI) => {
  return {
    activeClassification: store.activeClassificationState.activeClassification,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getMusicEvents: (clsId?: string, query?: QueryParamsI) =>
      dispatch(getMusicEventsActionCreator(clsId, query)),
    setActiveClassification: (cls: ClassificationI) =>
      dispatch(setClassificationActionCreator(cls)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
