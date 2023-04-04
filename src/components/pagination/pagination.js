import React, { useState, useEffect } from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-right">
      <button
        className="btn"
        onClick={() => onButtonClick("prev")}
        style={{ margin: "50" }}
      >
        <strong>
          <MdSkipPrevious fontSize="2em" />
          Previous
        </strong>
      </button>
      <button
        className="btn"
        onClick={() => onButtonClick("next")}
        style={{ margin: "50" }}
      >
        <strong>
          Next
          <MdSkipNext fontSize="2em" />
        </strong>
      </button>
    </div>
  );
};

export default Pagination;
