import React from "react";

const Header = ({ modeArray, setMode, mode, setLimit, setPage }) => {
  const handleModeClick = (val) => {
    setMode(modeArray[val]);
    setPage(1);
    if (val === 1) {
      setLimit(10);
    } else {
      setLimit(5);
    }
  };

  return (
    <>
      <div className="header">
        <span>DBZ</span>
        <div className="selection-div">
          <span
            onClick={() => handleModeClick(0)}
            className={mode === modeArray[0] ? "" : "mode-selection"}
          >
            Pagination
          </span>
          <span
            onClick={() => handleModeClick(1)}
            className={mode === modeArray[1] ? "" : "mode-selection"}
          >
            Infinite Scroll
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
