import React from "react";

Sort.propTypes = {};

function Sort() {
  return (
    <>
      <input type="checkbox" id="open-sort" />
      <li>
        <label className="btn-side-bar btn-sort" htmlFor="open-sort">
          Sort
        </label>
      </li>
      <div className="body-content ver-1">
        <p>Sort Results By</p>
        <select id="Sort">
          <option value="Popularity Descending">Popularity Descending</option>
          <option value="Popularity Ascending">Popularity Ascending</option>
          <option value="Rating Descending">Rating Descending</option>
          <option value="Rating Ascending">Rating Ascending</option>
          <option value="Release Date Descending">
            Release Date Descending
          </option>
          <option value="Release Date Ascending">Release Date Ascending</option>
        </select>
      </div>
    </>
  );
}

export default Sort;
