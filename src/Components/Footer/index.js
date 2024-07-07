import React, { useEffect, useState } from "react";

const Footer = ({
  totalPages,
  page,
  handlePreviousClick,
  handleNextClick,
  handlePageClick,
}) => {
  const [pages, setpages] = useState();

  useEffect(() => {
    const pageNumbers = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
    setpages(pageNumbers);
  }, [totalPages]);

  return (
    <>
      <div className="footer-wrapper">
        <span onClick={handlePreviousClick}>Previus</span>
        {pages &&
          pages.map((pageNumber, index) => {
            return (
              <span
                key={index}
                className={page === pageNumber ? "currentPage" : ""}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </span>
            );
          })}
        <span onClick={handleNextClick}>Next</span>
      </div>
    </>
  );
};

export default Footer;
