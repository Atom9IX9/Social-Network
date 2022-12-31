import s from "./Paginator.module.css";

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
  let pagesNumbers = [];

  for (let i = 1; i <= pagesCount; i++) {
    pagesNumbers.push(i);
    pagesNumbers = pagesNumbers.filter(
      (el) => el >= props.currentPage - 7 && el < props.currentPage + 7
    );
  }

  // * Set 1 as first child in pagesNumbers
  pagesNumbers = [
    pagesNumbers[0] !== 1 ? "1... " : "",
    ...pagesNumbers,
    pagesNumbers[pagesNumbers.length - 1] !== pagesCount ? ` ...${pagesCount}` : "",
  ];

  let pages = pagesNumbers.map((p) => {
    return (
      <span
        key={p}
        onClick={(e) => {
          if (p === "1... ") {
            props.onPageChange(1);
          } else if (p === ` ...${pagesCount}`) {
            props.onPageChange(pagesCount);
          } else {
            props.onPageChange(p);
          }
        }}
        className={props.currentPage === p ? s.activePage : s.unactivePage}
      >
        {p}
      </span>
    );
  });

  return <>{pages}</>;
};

export default Paginator;
