import React from "react";

WhereToWatch.propTypes = {};

function WhereToWatch() {
  return (
    <>
      <input type="checkbox" id="open-where-to-watch" />
      <li>
        <label
          className="btn-side-bar btn-where-to-watch"
          htmlFor="open-where-to-watch"
        >
          Where to watch
        </label>
      </li>
      <div className="body-content ver-3">
        <div className="my-services">
          <p>My Services</p>
          <input type="checkbox" name id="check-my-services" />
          <label htmlFor="check-my-services">
            Restrict searches to my subscribed services?
          </label>
        </div>
        <div className="country">
          <p>Country</p>
          <select name id="country">
            <option value="Argentina">Argentina</option>
            <option value="Viet Nam">Viet Nam</option>
            <option value="America">America</option>
            <option value="Brazil">Brazil</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
            <option value="Hungary">Hungary</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default WhereToWatch;
