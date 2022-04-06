import React, { useState, useEffect, useRef } from 'react'
import { Carousel, Progress, Rate } from 'antd';
import {
    PlayCircleFilled, InfoCircleFilled, LikeFilled, CalendarFilled, ClockCircleFilled
    , PlusOutlined, CaretRightFilled
} from '@ant-design/icons';
import { getInforForMovie, getVideoForMovie } from '../CommonFunctions/ModalFunction'

//Cài đặt cấu hình cho carousel
const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4,
};

// Biến chung dùng để lấy poster
const baseURLforPoster = 'https://image.tmdb.org/t/p/original/'

//Biến dùng chung để lấy clip
const clipURL = 'https://www.youtube.com/embed/';

function CarouselMoviesApp(props) {
    const [movies, setMovies] = useState([]);
    const myCarousel = useRef(null);

    useEffect(() => {
        async function fetchData() {
            await fetch(props.fetchURL).then((res) => res.json()).then((jsonres) => {
                setMovies(jsonres.results);
            });
        }
        fetchData();

    }, []);

    // Nếu overView quá dài => cắt chuỗi
    const overViewCut = (overView) => {
        if (overView.length >= 220) {
            const result = overView.substring(0, 220) + '[...]';
            return result;
        }
        else {
            return overView;
        }
    }

    // CLICK WATCH TRAILER BUTTON
    async function watchTrailer(movie, type) {
        const modal = myCarousel.current.querySelector('.modalTrailerContainer');
        const title = modal.querySelector('.headerTitle');
        const srcClip = modal.querySelector('.videoTrailer');
        const closeButton = modal.querySelector('.closeButton');

        // HIỂN THỊ MODAL BOX, THAY ĐỔI TÊN VÀ SRC CLIP
        async function updateData() {
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

        await updateData();
        modal.style.display = 'block';

        return document.removeEventListener('click', watchTrailer);
    }

    // CLICK DETAIL BUTTON
    async function watchDetail(movie, type) {
        const modal = myCarousel.current.querySelector('.modalInfoContainer');
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

        async function updateData() {
            // HIỂN THỊ MODAL BOX, THAY ĐỔI DỮ LIỆU BÊN TRONG
            title.textContent = type == 'movie' ? movie.title : movie.name;

            logo.style.display = 'block';
            if (info.production_companies[0].logo_path != null) {
                logo.setAttribute('src', `${baseURLforPoster}${info.production_companies[0].logo_path}`)
            }
            else {
                logo.style.display = 'none';
            }

            tagLine.textContent = info.tagline;
            dateRealeas.textContent = type == 'movie' ? `${info.release_date} ` : `${movie.first_air_date} `;
            vote.textContent = `${info.vote_count} `;
            length.textContent = `${info.runtime} min `;
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
            const heightBackGround = myCarousel.current.querySelector('.movieInfoContentWrap');
            modalBackground.style.height = `${window.getComputedStyle(heightBackGround).getPropertyValue('height')}`;
        }

        modal.style.display = 'block';
        await updateData();

        //NHẤN NÚT CLOSE TĂT MODAL BOX
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        return document.removeEventListener('click',watchDetail);
    }

    return (
        <div ref={myCarousel}>
            <Carousel {...settings} autoplay>
                {
                    movies.map((movie, index) => {
                        return (
                            <div key={index} >
                                <div className="movie_banner_info">
                                    <div className='poster_wrap'>
                                        <div className='backFace_Poster_wrap'>
                                            <div className='info_container'>

                                                <div className='rate_poster_wrap'>
                                                    <Rate allowHalf disabled defaultValue={movie.vote_average / 2} />
                                                </div>
                                                <div className='title_wrap'>
                                                    <h2 className='movie_banner_title'>{movie.title}</h2>
                                                </div>
                                                <img className='backFace_poster' src={`${baseURLforPoster}${movie.backdrop_path}`} alt="img" />
                                                <div className='overviewWrap'>
                                                    <p>{overViewCut(movie.overview)}</p>
                                                </div>
                                                <div className='movie_banner_button'>
                                                    <div className='movie_button_wrap'>
                                                        <a onClick={() => { watchTrailer(movie, 'movie') }} title='Watch Trailer' href="#"><PlayCircleFilled className='button_watch' /></a>
                                                        <a onClick={() => { watchDetail(movie, 'movie') }} title='More Detail' href="#"><InfoCircleFilled className='button_watch' /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img width='100%' height="600px" className='movie_poster' src={`${baseURLforPoster}${movie.poster_path}`} alt="" />
                                    </div>

                                    <div className="vote_average">
                                        <div className='progressCover'>
                                            <Progress
                                                type="circle"
                                                strokeColor='#c31432'
                                                width={60}
                                                strokeWidth={7}
                                                percent={movie.vote_average * 10}
                                                trailColor='#200122'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </Carousel>

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

export default CarouselMoviesApp
