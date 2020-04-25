import React, { SyntheticEvent } from "react";
import { ClassificationI } from "api/interfaces";

interface PropsI {
  item: ClassificationI;
  onClick: (e: SyntheticEvent, cls: ClassificationI) => void;
  activeItemId: string;
}

const MenuItem = ({ activeItemId, item, onClick }: PropsI) => {
  const getMenuItemClass = (i: ClassificationI): string => {
    let itemCssClass = "header__navigation__link";
    if (i.id === activeItemId) {
      itemCssClass = `${itemCssClass} ${itemCssClass}--active`;
    }
    return itemCssClass;
  };

  return (
    <li className={getMenuItemClass(item)} onClick={(e) => onClick(e, item)}>
      {item.name}
    </li>
  );
};

export default MenuItem;
