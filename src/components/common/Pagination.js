import React, {PropTypes} from 'react';
import {genIntegerSequence} from '../../utils/utilityMethods';

const Pagination = ({firstPageNum, lastPageNum, currentPageNum, handlePageSelect, handleFirstPageSelect, handleLastPageSelect, handleNextPageSelect, handlePrevPageSelect}) => {
  let pageNumsArray = [...genIntegerSequence(firstPageNum, lastPageNum)];

  let pagesArray = pageNumsArray.map(pageNum => {
    let isFirstPage = pageNum == firstPageNum;
    let isCurrentPage = pageNum == currentPageNum;
    let isLastPage = pageNum == lastPageNum;

    return {
      pageNum: pageNum,
      isFirstPage: isFirstPage,
      isCurrentPage: isCurrentPage,
      isLastPage: isLastPage
    };
  });

  return (
    <div>
      {lastPageNum > firstPageNum &&
        <nav aria-label="List navigation">
          <ul className="pagination">
            {currentPageNum > firstPageNum &&
            <li onClick={handleFirstPageSelect}>
                                <span aria-label="First">
                                  <span aria-hidden="true">First</span>
                                </span>
            </li>
            }

            {currentPageNum > firstPageNum &&
            <li onClick={handlePrevPageSelect}>
                              <span aria-label="Previous">
                                <span aria-hidden="true">&lsaquo;</span>
                              </span>
            </li>
            }

            {pagesArray.map(pageObj =>
              <li key={pageObj.pageNum}
                  value={pageObj.pageNum}
                  onClick={pageObj.isCurrentPage === false ? handlePageSelect : ""}
                  className={pageObj.isCurrentPage === true ? "active" : ""}>
                <span>{pageObj.pageNum}</span>
              </li>
            )}

            {currentPageNum < lastPageNum &&
            <li onClick={handleNextPageSelect}>
                              <span aria-label="Next">
                                <span aria-hidden="true">&rsaquo;</span>
                              </span>
            </li>
            }

            {currentPageNum < lastPageNum &&
            <li onClick={handleLastPageSelect}>
                              <span aria-label="Last">
                                <span aria-hidden="true">Last</span>
                              </span>
            </li>
            }
          </ul>
        </nav>
      }
    </div>
  );
};

Pagination.propTypes = {
  firstPageNum: PropTypes.number.isRequired,
  lastPageNum: PropTypes.number.isRequired,
  currentPageNum: PropTypes.number.isRequired,
  handlePageSelect: PropTypes.func.isRequired,
  handleFirstPageSelect: PropTypes.func.isRequired,
  handleLastPageSelect: PropTypes.func.isRequired,
  handleNextPageSelect: PropTypes.func.isRequired,
  handlePrevPageSelect: PropTypes.func.isRequired
};

export default Pagination;
