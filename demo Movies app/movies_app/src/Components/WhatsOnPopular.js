import React, { useEffect, useState, useRef } from 'react'
import requests from '../requests'
import { getInforForMovie, getVideoForMovie } from '../CommonFunctions/ModalFunction'
import {
    PlayCircleFilled, InfoCircleFilled, LikeFilled, CalendarFilled, ClockCircleFilled
    , PlusOutlined, CaretRightFilled
} from '@ant-design/icons';

function WhatsOnPopular() {
    const [movies, setMovies] = useState([]);
    const whatsOnPopular = useRef(null);
    const urlArray = [requests.fetchPopularMovies,
    requests.fetchOnTV,
    requests.fetchForRent,
    requests.fetchInTheater
    ];
    const typeArray = ['movie',
        'tv',
        'tv',
        'movie'
    ];

    //Biến dùng chung để lấy clip
    const clipURL = 'https://www.youtube.com/embed/';

    const [url, setURL] = useState(urlArray[0]);
    // MẢNG DÙNG ĐỂ HIỂN THỊ KẾT QUẢ Movies
    const showMoviesArray = [];

    //Mỗi khi thay đổi URL
    useEffect(() => {
        async function fetchData() {
            await fetch(url).then((res) => res.json()).then((jsonres) => {
                setMovies(jsonres.results);
            });
        }
        fetchData();
    }, [url])

    //Mỗi khi thay đổi Page
    const defaultPage = 0;
    const [page, setPage] = useState(defaultPage);

    useEffect(() => {
        setPage(page);
    }, [page])

    //Mỗi khi thay đổi thể loại phim ( 'tv' or 'movie')
    const [type, setType] = useState('movie');

    // Biến chung dùng để lấy poster
    const baseURLforPoster = 'https://image.tmdb.org/t/p/original/'

    // cHỈ HIỂN THỊ 1 SỐ LƯỢNG NHẤT ĐỊNH (5) POPULAR MOVIES 1 TRANG

    function get5Movies(pos) {

        let start = 5 * pos;
        let end = start + 5;
        // ĐƯA DỮ LIỆU VÀO TRONG MẢNG SHOWMOVIES
        for (let index = start; index < movies.length; index++) {
            if (index < end) {
                showMoviesArray.push(movies[index]);
            }
            else {
                break;
            }
        }
    }

    const content = useRef(null);

    //HÀM HIỆU ỨNG KHI THAY ĐỔI THỂ LOẠI POPULAR
    async function anchorClick() {
        const anchors = content.current.querySelectorAll('.anchor');
        const background_anchor = content.current.querySelector('.bgAnchor');
        const bgAnchorProps = window.getComputedStyle(background_anchor);
        const anchor_width = bgAnchorProps.getPropertyValue('width');

        await anchors.forEach((anchor, index) => {
            anchor.addEventListener('click', () => {
                // Xoa class selected o cac doi tuong anchor
                for (let index = 0; index < anchors.length; index++) {
                    anchors[index].classList.remove('selected');
                }

                //Them class
                anchor.classList.add('selected');

                //Dich chuyen background_anchor
                background_anchor.style.left = `${index * parseInt(anchor_width, 10)}px`;

                setURL(urlArray[index]);

                //Cập nhập lại page để render
                setPage(0);

                clickCubePage(0);

                //Cập nhập lạ thể loại phim để lấy dữ liệu
                setType(typeArray[index]);
            })
        });

        return document.removeEventListener('click', anchorClick);
    }

    //HÀM HIỆU ỨNG KHI CLICK VÀO PHIM
    async function moviesClick() {
        // SCRIPTS FOR CAROUSEL POSTER MOVIES
        const posterCardContainers = content.current.querySelectorAll('.posterCardContainer');
        let posArray = [1, 2, 3, 4, 5];
        let centerCardNumber = posArray[2];

        function findCardNumPos(distance, position) {
            let result = distance;

            if (distance < 0) {
                distance = posArray.length + distance;
                result = distance;
            }

            result += position;
            if (result >= posArray.length) {
                result -= posArray.length;
            }

            return result;
        }

        posterCardContainers.forEach((ele, index) => {
            ele.addEventListener('click', () => {
                const tempArr = ['num1', 'num2', 'num3', 'num4', 'num5'];
                //Chỉ là xóa class
                for (let i = 0; i < posterCardContainers.length; i++) {
                    posterCardContainers[i].classList.remove('target');

                    tempArr.forEach(num => {
                        posterCardContainers[i].classList.remove(num);
                    });
                }

                //Thêm class
                for (let i = 0; i < posterCardContainers.length; i++) {
                    const positionCard = posArray[findCardNumPos(index + 1 - centerCardNumber, i)];

                    posterCardContainers[positionCard - 1].classList.add(`num${i + 1}`);
                }

                ele.classList.add('target');
            })
        });

        return document.removeEventListener('click', moviesClick);
    }

    /*
        CÁC HÀM HỖ TRỢ HIỆU ỨNG PAGINATION
    */
    //Lấy vị trí của trang hiện tại (class cubeNumber có active)
    async function getCurrentPage() {
        let result = 0;

        const posterPagination = content.current.querySelector('.posterPagination');

        //Ep kieu HTML children ve array
        const children = Array.from(posterPagination.children);

        for (let index = 0; index < children.length; index++) {
            if (children[index].classList.contains('active')) {
                result = index;
                break
            }
        }

        return result;
    }

    //Biến mảng pagination
    const paginArr = [1, 2, 3, 4];
    //Mỗi khi chuyển trang, luôn luôn mong đợi sau 1.2 s sẽ kết thúc hiệu ứng
    const time = 1000;
    //Hàm hiệu ứng cho posterPagination khi click
    async function clickCubePage(index) {
        const currentPage = await getCurrentPage();
        const destinationPage = index;

        //Tính khoảng cách cần dịch chuyển => suy ra mỗi lần đi qua 1 nút sẽ cần bao nhiêu giây
        let distance = Math.abs(destinationPage - currentPage);
        let tempTime = distance <= 1 ? 400 : time;
        while (distance !== 0) {
            let animationTime = tempTime / distance;

            const cubePages = content.current.querySelectorAll('.cubePage');
            cubePages[currentPage].classList.remove('active');
            setTimeout(() => {
                cubePages[destinationPage].classList.add('active');
            }, tempTime)

            if (currentPage < destinationPage) {
                for (let index = currentPage; index < destinationPage; index++) {
                    if (index == destinationPage - 1) {
                        distance = 0;
                    }

                    cubePages[index].classList.add('onMoving');

                    setTimeout(() => { cubePages[index].classList.remove('onMoving'); }, (Math.abs(currentPage - index)) * animationTime)
                }
            }
            else {
                for (let index = currentPage; index > destinationPage; index--) {
                    if (index == destinationPage + 1) {
                        distance = 0;
                    }

                    cubePages[index].classList.add('onMoving');
                    setTimeout(() => { cubePages[index].classList.remove('onMoving'); }, (Math.abs(currentPage - index)) * animationTime)
                }
            }
        }

        //Cập nhập lại page để render
        await setPage(destinationPage);

        return document.removeEventListener('click',clickCubePage);
    }

    // CLICK WATCH TRAILER BUTTON
    async function watchTrailer(movie, type) {
        const modal = whatsOnPopular.current.querySelector('.modalTrailerContainer');
        const title = modal.querySelector('.headerTitle');
        const srcClip = modal.querySelector('.videoTrailer');
        const closeButton = modal.querySelector('.closeButton');

        async function updateData() {
            // HIỂN THỊ MODAL BOX, THAY ĐỔI TÊN VÀ SRC CLIP
            title.textContent = type == 'movie' ? movie.title : movie.name;

            const srcMovie = await getVideoForMovie(movie.id, type);

            //Tìm key có trailer
            let trailerResult = 0;
            for (let index = 0; index < srcMovie.results.length; index++) {
                if (srcMovie.results[index].type.includes('Trailer')) {
                    trailerResult = index;
                    break;
                }
            }

            let movieURLTrailer = srcMovie.results[trailerResult].key;
            srcClip.setAttribute("src", `${clipURL}${movieURLTrailer}`);

            closeButton.addEventListener('click', () => {
                modal.style.display = 'none';
                srcClip.setAttribute("src", `${clipURL}${movieURLTrailer}`);
            });
        }
        modal.style.display = 'block';
        await updateData();

        return document.removeEventListener('click',watchDetail);
    }

    // CLICK DETAIL BUTTON
    async function watchDetail(movie, type) {
        const modal = whatsOnPopular.current.querySelector('.modalInfoContainer');
        const modalBackground = modal.querySelector('.infoBackground');
        const closeButton = modal.querySelector('.closeButton');
        const logo = modal.querySelector('.logoMovieImg');
        const title = modal.querySelector('.movieTitleInsideModal');
        const tagLine = modal.querySelector('.movieTagLine');
        const dateRealeas = modal.querySelector('.minorInfo.date span');
        const vote = modal.querySelector('.minorInfo.vote span');
        const length = modal.querySelector('.minorInfo.length span');
        const movieOverView = modal.querySelector('.movieOverView');
        const tagMovieList = modal.querySelector('.tagMovieList');
        const info = await getInforForMovie(movie.id, type);

        // HIỂN THỊ MODAL BOX, THAY ĐỔI DỮ LIỆU BÊN TRONG
        async function updateData() {

            title.textContent = type == 'movie' ? movie.title : movie.name;

            logo.style.display = 'block';
            if (info.production_companies[0].logo_path != null) {
                logo.setAttribute('src', `${baseURLforPoster}${info.production_companies[0].logo_path}`)
            }
            else {
                logo.style.display = 'none';
            }

            tagLine.textContent = info.tagline;
            dateRealeas.textContent = type == 'movie' ? `${info.release_date} ` : `${info.first_air_date} `;
            vote.textContent = `${info.vote_count} `;
            length.textContent = type == 'movie' ? `${info.runtime} min ` : `${info.episode_run_time} min `
            movieOverView.textContent = info.overview;

            //Xóa các thẻ tag thể loại cũ, cập nhập thẻ mới vào
            while (tagMovieList.firstChild) {
                tagMovieList.removeChild(tagMovieList.firstChild);
            }

            //Cập nhập thẻ thể loại mới
            info.genres.forEach(genre => {
                const genreEle = document.createElement('a');
                genreEle.classList.add('tagMovie');
                genreEle.textContent = genre.name;
                genreEle.setAttribute('href', '#');
                tagMovieList.append(genreEle);
            });

            //Cập nhập ảnh nền
            modalBackground.style.backgroundImage = `url(${baseURLforPoster}${info.backdrop_path})`;

            //Cập nhập lại background để có kích thước bằng nội dung content
            const heightBackGround = whatsOnPopular.current.querySelector('.movieInfoContentWrap');
            modalBackground.style.height = `${window.getComputedStyle(heightBackGround).getPropertyValue('height')}`;
        };

        modal.style.display = 'block';
        await updateData();

        //NHẤN NÚT CLOSE TĂT MODAL BOX
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        return document.removeEventListener('click',watchDetail);
    }

    return (
        <div id='whatsOnPopularID' ref={whatsOnPopular} style={{ background: '#000' }}>
            <div className="content_popular" ref={content}>
                <div className="col_header">
                    <h1 className='whatispopular'>What's popular</h1>
                    <div className="selector_wrap">
                        <div onMouseOver={anchorClick} className="selector">
                            <div className="anchor selected">
                                <h2 className='selector_title'>Streaming</h2>
                                <div className="bgAnchor"></div>
                            </div>

                            <div className="anchor">
                                <h2 className='selector_title'>On TV</h2>
                            </div>

                            <div className="anchor">
                                <h2 className='selector_title'>For Rent</h2>
                            </div>

                            <div className="anchor">
                                <h2 className='selector_title'>In Theater</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="movies_showroom">
                    <div onMouseOver={moviesClick} className="posterMovies">
                        {/* Gọi Hàm để chỉ lấy đúng số lượng phim hiển thị */}
                        {get5Movies(page)}
                        {
                            showMoviesArray.map((movie, index) => {
                                return (
                                    <div key={index} className={`posterCardContainer num${index + 1}${(index + 1 != 3) ? '' : ' target'}`}>
                                        <div style={{
                                            backgroundImage: `url(${baseURLforPoster}${movie.poster_path})`,
                                            backgroundSize: 'cover'
                                        }} className="posterCard">
                                        </div>
                                        <div className="posterCardLight"></div>
                                        <div className='movieInfoContainer'>
                                            <div className='movie_button_wrap'>
                                                <a onClick={() => { watchTrailer(movie, type) }} title='Watch Trailer' href="#whatsOnPopularID"><PlayCircleFilled className='button_watch' /></a>
                                                <a onClick={() => { watchDetail(movie, type) }} title='More Detail' href="#whatsOnPopularID"><InfoCircleFilled className='button_watch' /></a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="posterPaginationContainer">
                    <div className="posterPagination">
                        {
                            paginArr.map((cube, index) => {
                                return (
                                    <div key={index} onClick={() => clickCubePage(index)} className={index == 0 ? 'cubePage active' : 'cubePage'}>
                                        <div className='cubeNumber'>
                                            {cube}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            {/* MODAL BOX FOR TRAILER CLIP */}
            <div className='modalTrailerContainer'>
                <div className='modalTrailer'>
                    <div className='headerContainer'>
                        <div className='headerTitle'>
                            The Avenger
                        </div>
                        <span className='closeButton'>&times;</span>
                    </div>

                    <div className='trailerContainer'>
                        <iframe width="100%" height="100%" className='videoTrailer' src={`${clipURL}BuymMF06XY`} title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            {/* MODAL BOX FOR DETAIL INFORMATION */}
            <div className='modalInfoContainer'>
                <div className='modalInfo'>
                    <div className='closeButtonInfoModal'>
                        <span className='closeButton'>&times;</span>
                    </div>
                    <div className='modalInfoContainerWrap'>
                        <div className='movieInfoContent'>
                            <div className='movieInfoContentWrap'>
                                <div className='movieLogo'>
                                    <img className='logoMovieImg' src="https://image.tmdb.org/t/p/original/hUzeosd33nzE5MCNsZxCGEKTXaQ.png" alt="logo" />
                                </div>
                                <h1 className='movieTitleInsideModal'>Mulan</h1>

                                <div className='movieInfoDescription'>
                                    <p className='movieTagLine'>Unleash the power behind the armor.</p>
                                    <div className='date_vote_length'>
                                        <div className='minorInfo date'>
                                            <span className=''>2020-09-04 </span><CalendarFilled />
                                        </div>
                                        <div className='minorInfo vote'>
                                            <span className=''>14730 </span><LikeFilled />
                                        </div>
                                        <div className='minorInfo length'>
                                            <span className=''>115 min </span><ClockCircleFilled />
                                        </div>
                                    </div>
                                    <p className='movieOverView'>
                                        When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns,
                                        Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father.
                                        She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun,
                                         she is tested every step of the way and must harness her innermost strength and embrace her true potential.</p>

                                    <div className='tagMovieList'>
                                        <a href="#" className='tagMovie'>Adventure</a>
                                        <a href="#" className='tagMovie'>Fantasy</a>
                                    </div>

                                    <div className='play_addToList_Buttons'>
                                        <a href="#" className='movieButtonModal'><CaretRightFilled /> Play</a>
                                        <a href="#" className='movieButtonModal'><PlusOutlined /> My List</a>
                                    </div>
                                </div>

                                <div className='watchTrailerButton'>
                                    <span className='watchIcon'><PlayCircleFilled /> </span>watch trailer
                                </div>
                            </div>
                        </div>

                        <div className='infoBackground'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhatsOnPopular
