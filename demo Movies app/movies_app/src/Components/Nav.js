import React from 'react';

const Nav = () => {
    return (
        <div className="nav">
            <a href="index.html" className="logo">
                <svg viewBox="0 0 111 30" className="svg-icon svg-icon-netflix-logo" focusable="false">
                    <g id="netflix-logo">
                        <path
                            d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                            id="Fill-14"></path>
                    </g>
                </svg>
            </a>

            <div className="nav__pc">
                <ul>
                    <li>
                        <a href="" className="nav__btn nav__btn__active">Home</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">TV Shows</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">Movies</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">People</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">Blogs</a>
                    </li>
                </ul>
            </div>

            <label className="nav__showmore-btn" for="nav__showmore-btn-input">Show more</label>
            <input type="checkbox" name="" id="nav__showmore-btn-input" hidden />

            <label className="nav__overlay" for="nav__showmore-btn-input"></label>

            <div className="nav__mobile">
                <ul>
                    <li>
                        <a href="" className="nav__btn nav__btn__active">Home</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">TV Shows</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">Movies</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">People</a>
                    </li>
                    <li>
                        <a href="" className="nav__btn">Blogs</a>
                    </li>
                </ul>
            </div>



            <div className="nav__btns">
                <label className="nav__search-btn" for="nav__search-btn-input">
                    <svg className="nav__search-btn" aria-hidden="true" focusable="false" data-prefix="fas"
                        data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z">
                        </path>
                    </svg>
                </label>
                <input type="checkbox" name="" id="nav__search-btn-input" hidden />
                <label className="nav__overlay" for="nav__search-btn-input"></label>
                <div className="nav__mobile">
                    <form action="" method="get" className="section__search">
                        <input type="text" name="keyword" id="keyword" className="searchbox" placeholder="Type here to search..." />
                        <button type="submit" className="searchbtn">Search</button>
                    </form>
                </div>

                <div className="hamburger-btn">
                    <div className="bar"></div>
                </div>
            </div>
        </div>
    )
}

export default Nav;