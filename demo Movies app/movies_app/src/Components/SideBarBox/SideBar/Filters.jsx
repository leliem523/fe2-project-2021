import React from 'react';
import PropTypes from 'prop-types';

Filters.propTypes = {
    
};

function Filters(props) {
    return (
        <>
            <input type="checkbox" id="opent-filters" />
            <li><label className="btn-side-bar btn-filters" htmlFor="opent-filters">Filters</label></li>
            <div className="body-content ver-2">
              <div className="show-me">
                <p>Show me</p>
                <input type="radio" name="show-me" id="ra-1" />
                <label htmlFor="ra-1">Everything</label><br />
                <input type="radio" name="show-me" id="ra-2" />
                <label htmlFor="ra-2">Movies I Haven't Seen</label><br />
                <input type="radio" name="show-me" id="ra-3" />
                <label htmlFor="ra-3">Movies I Have Seen</label><br />
              </div>
              <div className="availabilities">
                <p>Availabilities</p>
                <input type="checkbox" id="Availabilities" />
                <label htmlFor="Availabilities">Search all availabilities?</label>
              </div>
              <div className="release-dates">
                <p>Release Dates</p>
                <input type="checkbox" id="Release-Dates" />
                <label htmlFor="Release-Dates">Search all releases?</label><br />
                <label htmlFor="from-date">from</label>
                <input type="date" name="release-dates-dates" id="from-date" /><br />
                <label className="to-date" htmlFor="to-date">to</label>
                <input type="date" name="release-dates-dates" id="to-date" />
              </div>
              <div className="genres">
                <button type="submit">Action</button>
                <button type="submit">Adventure</button>
                <button type="submit">Animation</button>
                <button type="submit">Comedy</button>
                <button type="submit">Crime</button>
                <button type="submit">Documentary</button>
                <button type="submit">Drama</button>
                <button type="submit">Family</button>
                <button type="submit">Fantasty</button>
                <button type="submit">History</button>
              </div>
              <div className="certification">
                <p>Certification</p>
              </div>
              <div className="language">
                <p>Language</p>
                <select name id>
                  <option value="none">(none)</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="English">English</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Italian">Italian</option>
                  <option value="Russian">Russian</option>
                </select>
              </div>
              <div className="user-score">
                <p>User Score</p>
                <input type="range" min={0} max={100} name id />
              </div>
              <div className="minimum-user-votes">
                <p>Minimum User Votes</p>
                <input type="range" min={0} max={100} name id />
              </div>
              <div className="runtime">
                <p>Runtime</p>
                <input type="range" name id />
              </div>
              <div className="key-words">
                <p>Key Words</p>
                <input type="text" placeholder="Filter by keywords..." name id />
              </div>
            </div>
        </>
    );
}

export default Filters;