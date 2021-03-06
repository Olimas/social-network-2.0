import s from './Paginator.module.css'
import React, {useState} from "react";
import cn from "classnames"

type PropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged?: (pageNumber: number) => void
  portionSize?: number
}

const Paginator: React.FC<PropsType> = ({
                                          totalItemsCount,
                                          pageSize,
                                          currentPage = 1,
                                          onPageChanged = () => {},
                                          portionSize = 10
                                        }) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={s.paginator}>
      {portionNumber > 1 &&
      <button onClick={() => {
        setPortionNumber(portionNumber - 1)
      }}>PREV</button>}
      {pages
        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
        .map(p => {
          return <span className={cn({
            [s.selectedPage]: currentPage === p
          }, s.pageNumber)}
                       key={p}
                       onClick={(e) => {
                         onPageChanged(p)
                       }}>{p}</span>
        })}
      {portionCount > portionNumber &&
      <button onClick={() => {
        setPortionNumber(portionNumber + 1)
      }}>NEXT</button>}
    </div>
  )
}

export default Paginator;
