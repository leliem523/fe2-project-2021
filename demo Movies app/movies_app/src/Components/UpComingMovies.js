import React, { useState, useEffect, useRef } from 'react';
import requests from '../requests';
import { geMoreImageslForMovie, getInforForMovie } from '../CommonFunctions/ModalFunction'

// Biến chung dùng để lấy poster
const baseURLforPoster = 'https://image.tmdb.org/t/p/original/'

function UpComingMovies() {
    const ucmContainer = useRef(null);
    const [movies, setMovies] = useState([]);
    const [gallery, setGallery] = useState({});
    const [indexOfMovieInsideArray, setIndexOfMovieInsideArray] = useState(0);


    //LẤY DANH SÁCH PHIM
    async function getData() {
        await fetch(requests.getUpComingMoviesNoLanguage).then((data) => data.json()).then((data) => {
            // data.results.sort((v1, v2) => {
            //     return v2.vote_average - v1.vote_average;
            // })
            setMovies(data.results);
            setGallery(data.results[indexOfMovieInsideArray]);
        });
    }

    useEffect(() => {
        getData();
    }, [])

    // HIỂN THỊ GALLERY ẢNH RA MÀN HÌNH MẶC ĐỊNH
    async function showGalleryDefault() {
        ucmContainer.current.style.visibility = 'hidden';

        //Xóa dữ liệu ban đầu
        const ucmBG1Holder = ucmContainer.current.querySelector('.ucmBG1Holder');
        ucmBG1Holder.innerHTML = '';

        for (const movie of movies) {
            // GỬI REQUEST LÊN SERVER ĐỂ LẤY THÔNG TIN THÊM
            // const moreInfo = await getInforForMovie(movie.id, 'movie');

            //TẠO CÁC ĐỐI TƯỢNG ucmBGContainer
            const ucmBG1Container = document.createElement('div');
            ucmBG1Container.classList.add('ucmBG1Container');

            const movieTitleLogo = document.createElement('h1');
            movieTitleLogo.classList.add('myWatchList');
            movieTitleLogo.innerHTML = movie.title;

            ucmBG1Container.appendChild(movieTitleLogo);

            const iphoneBGHolder = document.createElement('div');
            iphoneBGHolder.classList.add('iphoneBGHolder');
            const iphoneBGImage = document.createElement('div');
            iphoneBGImage.classList.add('iphoneBGImage');
            iphoneBGImage.style.backgroundImage = `url(${baseURLforPoster}${movie.backdrop_path})`;

            iphoneBGHolder.appendChild(iphoneBGImage);

            const ucmBG = document.createElement('div');
            ucmBG.classList.add('ucmBG');
            ucmBG.style.backgroundImage = `url(${baseURLforPoster}${movie.backdrop_path})`;

            ucmBG1Container.appendChild(iphoneBGHolder);
            ucmBG1Container.appendChild(ucmBG);

            ucmBG1Holder.appendChild(ucmBG1Container);
        }

        // DI CHUYỂN CÁC ucmBG1Container ĐỂ TẠO CAROUSEL
        const ucmBG1Container = ucmContainer.current.querySelectorAll('.ucmBG1Container');

        ucmBG1Container.forEach((element, index) => {
            element.style.left = `${index * 5}%`;
        });
    }

    if (gallery.poster_path != null) {
        // console.log(movies)
        // showGalleryDefault().then(() => {
        //     setTimeout(() => {
        //         ucmContainer.current.style.visibility = 'visible';
        //     }, 100)
        // })
    }

    function moveSliderIphone() {
        // const ucmBG1Holder = ucmContainer.current.querySelector('.ucmBG1Holder');
        // const rangeSliderIphone = ucmContainer.current.querySelector('.rangeSliderIphone');

        // // DI CHUYỂN CAROUSEL
        // ucmBG1Holder.style.left = `-${rangeSliderIphone.value * 20}%`;

        const ucmBG1Holder = ucmContainer.current.querySelector('.ucmBG1Holder.active');
        const rangeSliderIphone = ucmContainer.current.querySelector('.rangeSliderIphone');

        // DI CHUYỂN CAROUSEL
        ucmBG1Holder.style.left = `-${rangeSliderIphone.value * 100}%`;

        return document.removeEventListener('change', moveSliderIphone);
    }

    function clickMovieBox() {
        const movieBoxes = ucmContainer.current.querySelectorAll('.movieBox');

        movieBoxes.forEach((movieBox, index) => {
            movieBox.addEventListener('click', () => {
                let oldValueIndexContainActiveClass = 0;
                let newValueIndexContainActiveClass = index;
                const ucmBG1Holders = ucmContainer.current.querySelectorAll('.ucmBG1Holder');
                ucmBG1Holders.forEach((ucmBG1Holder, pos) => {
                    if (ucmBG1Holder.classList.contains('active')) {
                        oldValueIndexContainActiveClass = pos;
                    }
                    ucmBG1Holder.classList.remove('active');
                });

                if (newValueIndexContainActiveClass < 0 || newValueIndexContainActiveClass > 4) {
                    newValueIndexContainActiveClass = oldValueIndexContainActiveClass;
                }
                ucmBG1Holders[newValueIndexContainActiveClass].classList.add('active');

                // CẬP NHẬP LẠI THANH TRƯỢT
                const rangeSliderIphone = ucmContainer.current.querySelector('.rangeSliderIphone');
                rangeSliderIphone.value = 0;

                // cập nhập lại hình ảnh về trang đầu tiên
                const ucmBG1HolderActive = ucmContainer.current.querySelector('.ucmBG1Holder.active');
                ucmBG1HolderActive.style.left = `0`;

                //TRƯỢT AREA VỀ BÊN TRÁI
                const movieArrowShowUpLink = ucmContainer.current.querySelector('.movieArrowShowUpLink');
                const isometricItemArea = ucmContainer.current.querySelector('.isometricItemArea');
                isometricItemArea.style.transform = `translateX(-90%)`;
                isometricItemArea.style.background = `transparent`;
                isometricItemArea.classList.remove('show');

                setTimeout(() => {
                    movieArrowShowUpLink.innerHTML = `<i class="fas fa-arrow-circle-right"></i></i>`;
                }, 300)
            })
        });

        return document.removeEventListener('mouseover', clickMovieBox);
    }


    function showItemMovie() {
        const movieArrowShowUpLink = ucmContainer.current.querySelector('.movieArrowShowUpLink');
        const isometricItemArea = ucmContainer.current.querySelector('.isometricItemArea');

        if (isometricItemArea.classList.contains('show')) {
            isometricItemArea.classList.remove('show');
            isometricItemArea.style.transform = `translateX(-90%)`;
            isometricItemArea.style.background = `transparent`;

            setTimeout(() => {
                movieArrowShowUpLink.innerHTML = `<i class="fas fa-arrow-circle-right"></i></i>`;
            }, 300)
        }
        else {
            isometricItemArea.classList.add('show');

            isometricItemArea.style.transform = `translateX(0)`;
            isometricItemArea.style.background = `#38120e`;

            setTimeout(() => {
                movieArrowShowUpLink.innerHTML = `<i class="fas fa-arrow-circle-left"></i>`;
            }, 300)
        }
        return document.removeEventListener('click', showItemMovie);
    }

    return (

        <div ref={ucmContainer} id='ucmContainer' className='ucmContainer'>
            {/* MOVIE 1 */}
            <div className='ucmBG1Holder active'>
                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>
            </div>
            {/* MOVIE 2 */}
            <div className='ucmBG1Holder '>
                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>
            </div>
            {/* MOVIE 3 */}
            <div className='ucmBG1Holder '>
                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>
            </div>
            {/* MOVIE 4 */}
            <div className='ucmBG1Holder '>
                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>
            </div>
            {/* MOVIE 5 */}
            <div className='ucmBG1Holder '>
                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>

                <div className='ucmBG1Container'>
                    <div className="movieTitleLogo"></div>
                    <div className='iphoneBGHolder'>
                        <div className='iphoneBGImage'></div>
                    </div>
                    <div className='ucmBG'></div>
                </div>
            </div>
            <div>
                <input onChange={() => { moveSliderIphone() }} className="rangeSliderIphone" type="range" name="rangeSlider" defaultValue="0" step="1" min="0" max="3" />
            </div>

            <div onMouseOver={clickMovieBox} className='isometricItemArea'>

                <div className='movieBox'></div>
                <div className='movieBox'></div>
                <div className='movieBox'></div>
                <div className='movieBox'></div>
                <div className='movieBox'></div>

                {/* DECORATION MOVIE BOX */}
                <div className='movieBox'></div>
                <div className='movieBox'></div>
                <div className='movieBox'></div>
                {/* <div className='movieBox'></div>
                <div className='movieBox'></div> */}

                <div className='movieArrowShowUp'>
                    <a onClick={showItemMovie} className='movieArrowShowUpLink' href="#ucmContainer"><i class="fas fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div className='isometricItemAreaTitle'>
                <h1 className="whatispopular titleInsideUCMIsometric">Up Coming Movies</h1>
            </div>
        </div>
    )
}

export default UpComingMovies
