import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Rate } from 'antd';
import {
    LeftSquareFilled, RightSquareFilled
} from '@ant-design/icons';

import requests from '../requests'
import { geMoreImageslForMovie, getInforForMovie } from '../CommonFunctions/ModalFunction'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Biến chung dùng để lấy poster
const baseURLforPoster = 'https://image.tmdb.org/t/p/original/'

function MyWatchList() {
    const upComingMoviesDiv = useRef(null);
    const [movies, setMovies] = useState([]);
    const [gallery, setGallery] = useState({});
    const [indexOfMovieInsideArray, setIndexOfMovieInsideArray] = useState(0);

    //LẤY DANH SÁCH PHIM
    async function getData() {
        await fetch(requests.getMovieWatchList).then((data) => data.json()).then((data) => {
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

        const selectedUpComingMovieContainer = upComingMoviesDiv.current.querySelector('.selectedUpComingMovieContainer');
        selectedUpComingMovieContainer.style.visibility = 'hidden';
        const selectedUpComingMovieCardImg = selectedUpComingMovieContainer.querySelector('.selectedUpComingMovieCardImg');
        selectedUpComingMovieCardImg.style.visibility = 'hidden';

        // GỬI REQUEST LÊN SERVER ĐỂ LẤY THÊM ẢNH
        const moreInfo = await geMoreImageslForMovie(gallery.id);
        const detailMovie = await getInforForMovie(gallery.id, 'movie');

        //KIẾM VỊ TRÍ POSTER CÓ TIẾNG ANH
        let englishPosterIndex = 0;
        for (let index = 0; index < moreInfo.posters.length; index++) {
            if (moreInfo.posters[index].iso_639_1 == 'en') {
                englishPosterIndex = index;
                break;
            }
        }

        //PART 1
        selectedUpComingMovieCardImg.style.backgroundImage = `url(${baseURLforPoster}${moreInfo.posters[englishPosterIndex].file_path})`;
        const movieCardImgHeight = 580;
        selectedUpComingMovieCardImg.style.height = `${movieCardImgHeight}px`;
        selectedUpComingMovieCardImg.style.width = `${Math.round(movieCardImgHeight * moreInfo.posters[englishPosterIndex].aspect_ratio)}px`;
        const selectedUpComingMovieTitle = selectedUpComingMovieContainer.querySelector('.selectedUpComingMovieTitle');
        selectedUpComingMovieTitle.textContent = detailMovie.title;

        const selectedUpComingMovieTagLine = selectedUpComingMovieContainer.querySelector('.selectedUpComingMovieTagLine');
        selectedUpComingMovieTagLine.textContent = detailMovie.tagline;

        // THAY ĐỔI NỘI DUNG PART 2 TRONG PHẦN SCROLL SELECTED MOVIE
        const selectedUpComingMoviePart2 = selectedUpComingMovieContainer.querySelector('.selectedUpComingMoviePart2');
        const parallaxSelectedUpComingMovie = selectedUpComingMoviePart2.querySelector('.parallaxSelectedUpComingMovie');
        parallaxSelectedUpComingMovie.style.backgroundImage = `url(${baseURLforPoster}${detailMovie.backdrop_path})`;

        // cập nhập thể loại phim
        const allCategories = detailMovie.genres;
        const wrapCategoriesOfSelectedUpComingMovie = selectedUpComingMoviePart2.querySelector('.wrapCategoriesOfSelectedUpComingMovie');
        wrapCategoriesOfSelectedUpComingMovie.textContent = '';

        const genres = document.createElement('div');
        genres.textContent = 'Genres: ';
        wrapCategoriesOfSelectedUpComingMovie.appendChild(genres);

        allCategories.forEach(category => {
            const a = document.createElement('a');
            a.textContent = category.name;
            a.classList.add('categoryOfSelectedUpComingMovie');
            a.setAttribute('href', "#selectedUpComingMoviePart2");

            wrapCategoriesOfSelectedUpComingMovie.appendChild(a);
        });

        //thay đổi nội dung mô tả
        const description = selectedUpComingMoviePart2.querySelector('.description');
        description.textContent = detailMovie.overview;

        //CẬP NHẬP GALLERY ẢNH PART 3
        const selectedUpComingMoviePart3 = selectedUpComingMovieContainer.querySelector('.selectedUpComingMoviePart3');
        selectedUpComingMoviePart3.innerHTML = '';
        selectedUpComingMoviePart3.style.height = `${50 * 2}px`;

        for (let index = 0; index < moreInfo.backdrops.length; index++) {
            if (index % 4 == 0) {
                const div = document.createElement('div');
                div.classList.add('imgGalleryPart3Container');
                selectedUpComingMoviePart3.appendChild(div);
            }

            const contrainerArr = selectedUpComingMoviePart3.querySelectorAll('.imgGalleryPart3Container');
            const lastContainer = contrainerArr[contrainerArr.length - 1];

            // TAO imgPart3Box
            const imgPart3Box = document.createElement('div');
            imgPart3Box.classList.add('imgPart3Box');
            const img = document.createElement('img');
            img.setAttribute('src', `${baseURLforPoster}${moreInfo.backdrops[index].file_path}`);
            const after = document.createElement('div');
            after.classList.add('imgPart3BoxAfter');
            const before = document.createElement('div');
            before.classList.add('imgPart3BoxBefore');

            imgPart3Box.appendChild(img);
            imgPart3Box.appendChild(after);
            imgPart3Box.appendChild(before);

            if (lastContainer != null) lastContainer.appendChild(imgPart3Box);
        }

        //Cập nhập lại chiều cao cho div selectedUpComingMoviePart3
        const contrainerArr = selectedUpComingMoviePart3.querySelectorAll('.imgGalleryPart3Container');
        selectedUpComingMoviePart3.style.height = `${(400 * contrainerArr.length) + 100 * 2}px`;
    };

    if (gallery.poster_path != null) {
        showGalleryDefault(indexOfMovieInsideArray).then(() => {
            setTimeout(() => {
                const selectedUpComingMovieContainer = upComingMoviesDiv.current.querySelector('.selectedUpComingMovieContainer');
                selectedUpComingMovieContainer.style.visibility = 'visible';

                const selectedUpComingMovieCard = upComingMoviesDiv.current.querySelector('.selectedUpComingMovieCard');
                selectedUpComingMovieCard.style.visibility = 'visible';

                const selectedUpComingMovieCardImg = selectedUpComingMovieContainer.querySelector('.selectedUpComingMovieCardImg');
                selectedUpComingMovieCardImg.style.visibility = 'visible';

                const selectedUpComingMoviePart3 = selectedUpComingMovieContainer.querySelector('.selectedUpComingMoviePart3');
                selectedUpComingMoviePart3.style.visibility = 'visible';

                galleryMovie().then(() => {
                    scrollMovieInfoPart2();
                    scrollMovieInfoPart3();
                })
            }, 100)
        }
        )
    }

    async function galleryMovie() {
        // GALLERY HÌNH ẢNH
        const comingMovieGallerySilderContain = upComingMoviesDiv.current.querySelector('.comingMovieGallerySilderContain');
        comingMovieGallerySilderContain.innerHTML = '';

        for (const element of movies) {
            const selectedUpComingMovieBackGround = document.createElement('div');
            selectedUpComingMovieBackGround.classList.add('selectedUpComingMovieBackGround');
            selectedUpComingMovieBackGround.style.backgroundImage = `url(${baseURLforPoster}${element.poster_path})`;

            comingMovieGallerySilderContain.appendChild(selectedUpComingMovieBackGround);
        }

        const selectedUpComingMovieBackGround = comingMovieGallerySilderContain.querySelectorAll('.selectedUpComingMovieBackGround');
        selectedUpComingMovieBackGround[indexOfMovieInsideArray].classList.add('active');

        const innerHTML = `<div class='socialIconSUCM'>
        <a class='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-facebook-square"></i></a>
        <a class='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-twitter"></i></a>
        <a class='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-pinterest-p"></i></a>
        <a class='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-skype"></i></a>
        </div>
        <div class='arrowShapeHoverContainerSUCM'>
            <div class='arrowShapeHoverSUCM'></div>
        </div>`;
        selectedUpComingMovieBackGround[indexOfMovieInsideArray].innerHTML = innerHTML;

        comingMovieGallerySilderContain.style.marginTop = `${315 * -1 * (indexOfMovieInsideArray)}px`;
    }

    function moveSlider(number) {
        const comingMovieGallerySilderContain = upComingMoviesDiv.current.querySelector('.comingMovieGallerySilderContain');
        const props = window.getComputedStyle(comingMovieGallerySilderContain);
        const oldValueString = props.getPropertyValue('margin-top');

        // xóa class active
        const allImages = comingMovieGallerySilderContain.querySelectorAll('.selectedUpComingMovieBackGround');
        let currentPos = 0;

        for (let index = 0; index < allImages.length; index++) {
            if (allImages[index].classList.contains('active')) {
                allImages[index].classList.remove('active');
                currentPos = index;
            }
        }

        //Thêm class active
        let newPos = currentPos + number;
        if (newPos < 0) {
            newPos = 0;
        }
        else if (newPos >= allImages.length) {
            newPos = allImages.length - 1;
        }
        allImages[newPos].classList.add('active');

        const oldValue = +oldValueString.substring(0, oldValueString.length - 2);
        let newValue = oldValue + 315 * (newPos - currentPos) * -1;

        comingMovieGallerySilderContain.style.marginTop = `${newValue}px`;

        setIndexOfMovieInsideArray(newPos);
        setGallery(movies[newPos]);

        // SET SCROLL VỀ VỊ TRÍ XUẤT PHÁT
        const selectedUpComingMovieContainer = upComingMoviesDiv.current.querySelector('.selectedUpComingMovieContainer');
        selectedUpComingMovieContainer.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

        return document.removeEventListener('click', moveSlider);
    }

    //CHỨC NĂNG SCROLL ANIMATION PART2
    function scrollMovieInfoPart2() {
        gsap.registerPlugin(ScrollTrigger);
        let tl = gsap.timeline({
            scrollTrigger: {
                scroller: ".selectedUpComingMovieContainer",
                trigger: ".selectedUpComingMoviePart2",
                toggleActions: "play pause resume complete",
                start: "-30% center",
                end: "bottom bottom",
                scrub: true,
                markers: false,
            }
        });

        tl.addLabel("part1")
            .from('.parallaxSelectedUpComingMovie', { opacity: 0, scale: 0.6 })
            .from('.parallaxSelectedUpComingMovieFilter', { opacity: 0.3 })
            .from('.wrapDetailOfSelectedUpComingMovie', { opacity: 0.2, y: 600 })
            .addLabel('changeOpacity')
            .to('.parallaxSelectedUpComingMovie', { opacity: 1, scale: 1 })
            .to('.parallaxSelectedUpComingMovieFilter', { opacity: 0.8 })
            .addLabel("showDetail")
            .to('.wrapDetailOfSelectedUpComingMovie', { y: 0, opacity: 1 })
    }

    //CHỨC NĂNG SCROLL PART 3
    function scrollMovieInfoPart3() {
        gsap.registerPlugin(ScrollTrigger);
        let tl = gsap.timeline({
            scrollTrigger: {
                scroller: ".selectedUpComingMovieContainer",
                trigger: ".selectedUpComingMoviePart3",
                toggleActions: "play pause resume complete",
                start: "top 30%",
                end: "bottom bottom",
                scrub: true,
                markers: false,
                // markers: { startColor: "white", endColor: "yellow", fontSize: "30px" }
            }
        });

        const selectedUpComingMovieContainer = upComingMoviesDiv.current.querySelector('.selectedUpComingMovieContainer');
        const selectedUpComingMoviePart3 = selectedUpComingMovieContainer.querySelector('.selectedUpComingMoviePart3');
        const imgGalleryPart3Container = selectedUpComingMoviePart3.querySelectorAll('.imgGalleryPart3Container');
        imgGalleryPart3Container.forEach((container) => {

            function tempTL() {
                let timeline = gsap.timeline({
                    scrollTrigger: {
                        scroller: ".selectedUpComingMovieContainer",
                        trigger: container,
                        toggleActions: "play pause resume complete",
                        start: "-40% center",
                        end: "bottom bottom",
                        scrub: true,
                    }
                });

                const imgParteBoxAfter = container.querySelectorAll('.imgPart3BoxAfter');
                const imgParteBoxBefore = container.querySelectorAll('.imgPart3BoxBefore');
                timeline.addLabel("part1")
                    .from(container, { xPercent: 100 })
                    .from(imgParteBoxAfter, { xPercent: 0 })
                    .from(imgParteBoxBefore, { xPercent: 0 })
                    .addLabel('moveContainer')
                    .to(container, { xPercent: 0 })
                    .addLabel("showImage")
                    .to(imgParteBoxAfter, { xPercent: -100 }, "moveContainer+0.5")
                    .to(imgParteBoxBefore, { xPercent: 100 }, "moveContainer+0.5")

                return timeline;
            }


            tl.add(tempTL())
        });
    }

    return (
        <div style={{ margin: "80px 0" }} ref={upComingMoviesDiv}>
            <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 16 }]}>
                <Col span={6}>
                    <div className='selectedUpComingMovieGallery'>
                        <div className='upArrowMovieGalleryCarousel'><h5 className='myWatchList'>My Watch List</h5></div>
                        <div className='selectedUpComingMovieGalleryCarousel'>
                            <div className='comingMovieGallerySilderContain'>
                                <div className='selectedUpComingMovieBackGround active'>
                                    <div className='socialIconSUCM'>
                                        <a className='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-facebook-square"></i></a>
                                        <a className='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-twitter"></i></a>
                                        <a className='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-pinterest-p"></i></a>
                                        <a className='socialIconDiv' href="#selectedUpComingMoviePart1"><i class="fab fa-skype"></i></a>
                                    </div>

                                    <div className='arrowShapeHoverContainerSUCM'>
                                        <div className='arrowShapeHoverSUCM'></div>
                                    </div>
                                </div>
                                <div className='selectedUpComingMovieBackGround'></div>
                                <div className='selectedUpComingMovieBackGround'></div>
                            </div>
                        </div>
                        <div className='downArrowMovieGalleryCarousel'>
                            <LeftSquareFilled onClick={() => { moveSlider(-1) }} />
                            <RightSquareFilled onClick={() => { moveSlider(1) }} /></div>
                    </div>
                </Col>

                <Col span={18}>
                    <div className='selectedUpComingMovieContainer'>
                        <div className='selectedUpComingMoviePart1'>
                            <div className='selectedUpComingMovieCardHover mchLeft'></div>
                            <div className='selectedUpComingMovieCardHover mchRight'></div>
                            <div className='selectedUpComingMovieCardHover mchTop'></div>
                            <div className='selectedUpComingMovieCardHover mchBottom'></div>
                            <div className='selectedUpComingMovieCard'>
                                <div className='selectedUpComingMovieCardImg'></div>
                                <div className='selectedUpComingMovieDescribe'>
                                    <div className='selectedUpComingMovieTitle'>
                                        Weathering With You
                                    </div>
                                    <div className='selectedUpComingMovieTagLine'>
                                        Lorem Lorem Lorem
                                    </div>
                                    <div className='selectedUpComingMovieRate'>
                                        <Rate className='selectedUpComingMovieRateValue' allowHalf disabled defaultValue={4} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="selectedUpComingMoviePart2" className='selectedUpComingMoviePart2'>
                            <div className='parallaxSelectedUpComingMovie'>
                                <div className='parallaxSelectedUpComingMovieFilter'></div>
                            </div>
                            <div className='wrapDetailOfSelectedUpComingMovie'>
                                <Row gutter={[8, { xs: 8, sm: 16, md: 16, lg: 24 }]}>
                                    <Col span={11} offset={13}>
                                        <div className='detailOfSelectedUpComingMovie'>
                                            <div className='wrapCategoriesOfSelectedUpComingMovie'>
                                                <div>Genres: </div>
                                                <a href="#selectedUpComingMoviePart2" className='categoryOfSelectedUpComingMovie'>Animation</a>
                                                <a href="#selectedUpComingMoviePart2" className='categoryOfSelectedUpComingMovie'>Romance</a>
                                                <a href="#selectedUpComingMoviePart2" className='categoryOfSelectedUpComingMovie'>Fantasy</a>
                                                <a href="#selectedUpComingMoviePart2" className='categoryOfSelectedUpComingMovie'>Comedy</a>
                                                <a href="#selectedUpComingMoviePart2" className='categoryOfSelectedUpComingMovie'>Action</a>
                                                <a href="#selectedUpComingMoviePart2" className='categoryOfSelectedUpComingMovie'>Science Fiction</a>
                                            </div>
                                            <p className='description'>The summer of his high school freshman year, Hodaka runs away from his remote island
                                            home to Tokyo, and quickly finds himself pushed to his financial and personal limits. The weather is
                                            unusually gloomy and rainy every day, as if taking its cue from his life. After many days of solitude,
                                            he finally finds work as a freelance writer for a mysterious occult magazine. Then, one day, Hodaka meets
                                            Hina on a busy street corner. This bright and strong-willed girl
                                                        possesses a strange and wonderful ability: the power to stop the rain and clear the sky.</p>

                                            <a className='trailerButton' href="#selectedUpComingMoviePart2"> Watch Trailer</a>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div id="selectedUpComingMoviePart3" className='selectedUpComingMoviePart3'>
                            <div className='imgGalleryPart3Container'>
                                <div className='imgPart3Box'>
                                    <img src="https://www.themoviedb.org/t/p/original/ize3ZieqSy0TCWljmVoEiy8fSFS.jpg" alt="imgGallery" />
                                    <div className='imgPart3BoxAfter'></div>
                                    <div className='imgPart3BoxBefore'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default MyWatchList
