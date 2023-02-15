import * as React from "react";
import style from "./Paginator.module.css";

type PaginatorProps = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
};

const Paginator: React.FC<PaginatorProps> = ({
  totalItemsCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  let pagesCount: number = Math.ceil(totalItemsCount / pageSize);
  let pagesNumbers: Array<number | string> = [];

  for (let i = 1; i <= pagesCount; i++) {
    pagesNumbers.push(i);
    pagesNumbers = pagesNumbers.filter(
      (number) => number >= currentPage - 7 && number < currentPage + 7
    );
  }
  // * Set 1 as first child in pagesNumbers
  pagesNumbers = [
    pagesNumbers[0] !== 1 ? "1... " : "",
    ...pagesNumbers,
    pagesNumbers[pagesNumbers.length - 1] !== pagesCount
      ? ` ...${pagesCount}`
      : "",
  ];
  let pages = pagesNumbers.map((p) => {
    return (
      <span
        key={p}
        onClick={(e) => {
          if (p === "1... ") {
            onPageChange(1);
          } else if (p === ` ...${pagesCount}`) {
            onPageChange(pagesCount);
          } else {
            onPageChange(+p);
          }
        }}
        className={currentPage === p ? style.activePage : style.unactivePage}
      >
        {p}
      </span>
    );
  });  
  if (pages[pages.length - 1].key === " ...0") return <></>
  return <>{pages}</>;
};

export default Paginator;
