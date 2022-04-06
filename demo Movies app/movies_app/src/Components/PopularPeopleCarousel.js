import React, { useEffect, useState, useRef } from 'react';
import { getPersonInformation, getImagedTaggedForPerson } from '../CommonFunctions/ModalFunction';

function PopularPeopleCarousel(props) {
    const [people, setPeople] = useState([]);
    const myCars = useRef(null);
    const popularPeopleCarousel = useRef(null);

    const imgPath = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/';
    // Biến chung dùng để lấy poster
    const baseURLforPoster = 'https://image.tmdb.org/t/p/original/'

    // cHỈ HIỂN THỊ 1 SỐ LƯỢNG NHẤT ĐỊNH (6) POPULAR PEOPLE
    // MẢNG DÙNG ĐỂ HIỂN THỊ KẾT QUẢ
    const showPeopleArray = [];

    useEffect(() => {
        async function fetchData() {
            await fetch(props.fetchURL).then((res) => res.json()).then((jsonres) => {
                setPeople(jsonres.results);
            });
        }
        fetchData();
    }, [])

    function get6People() {
        //Săp XẾP MẢNG PEOPLE GIẢM DẦN THEO ĐỘ PHỘ BIẾN
        people.sort((per1, per2) => {
            return per2.popularity - per1.popularity;
        })

        let numberOfPeopleInArray = 0;
        // ĐƯA DỮ LIỆU VÀO TRONG MẢNG SHOWPEOPLE
        for (let index = 0; index < people.length; index++) {
            //TÌM KIẾM 6 NGƯỜI CÓ ĐỘ NỔI TIẾNG CAO
            if (numberOfPeopleInArray < 6 && people[index].profile_path != null) {
                showPeopleArray.push(people[index]);
                numberOfPeopleInArray++;
            }
        }
    }

    function hoverPicture() {
        myCars.current.style.animationPlayState = 'paused';

        return window.removeEventListener('mouseover', hoverPicture);
    }

    function mouseOutPicture() {
        myCars.current.style.animationPlayState = 'running';
        return window.removeEventListener('mouseout', mouseOutPicture);
    }

    async function clickPicturePeople(peopleID) {
        const modal = popularPeopleCarousel.current.querySelector('.modalPeopleInfoContainer');
        const closeButton = modal.querySelector('.closeButton');

        //B1: GỬI REQUEST LẤY DỮ LIỆU
        const info = await getPersonInformation(peopleID);
        const moviesObj = await getImagedTaggedForPerson(peopleID);

        async function updateData() {
            //B2: THAY ĐỔI DỮ LIỆU
            const nameInfo = modal.querySelector('.nameInfo');
            nameInfo.textContent = info.name;
            const genderInfo = modal.querySelector('.genderInfo');
            genderInfo.textContent = info.gender == 1 ? 'Female' : 'Male';
            const birthayInfo = modal.querySelector('.birthayInfo');
            birthayInfo.textContent = info.birthday;
            const placeOfBirthInfo = modal.querySelector('.placeOfBirthInfo');
            placeOfBirthInfo.textContent = info.place_of_birth;
            const biographyContent = modal.querySelector('.biographyContent');
            biographyContent.textContent = info.biography;
            const peopleIMG = modal.querySelector('.peopleIMG');
            peopleIMG.setAttribute('src', `${baseURLforPoster}${info.profile_path}`);
            const knownForMovie = modal.querySelector('.knownForMovie');
            knownForMovie.innerHTML = '';

            //Sắp xếp mảng phim để lấy những phim ăn khách nhất => hiển thị ra Known For
            moviesObj.cast.sort((valueA, valueB) => {
                return valueB.vote_count - valueA.vote_count;
            })

            for (let index = 0; index < 8; index++) {
                const knownForMovieInfo = document.createElement('div');
                knownForMovieInfo.classList.add('knownForMovieInfo');

                const knownForMovieImg = document.createElement('img');
                knownForMovieImg.classList.add('knownForMovieImg');
                knownForMovieImg.setAttribute('src', `${baseURLforPoster}${moviesObj.cast[index].poster_path}`);

                const knownForMovieTitle = document.createElement('p');
                knownForMovieTitle.classList.add('knownForMovieTitle');
                knownForMovieTitle.textContent = moviesObj.cast[index].title;

                knownForMovieInfo.appendChild(knownForMovieImg);
                knownForMovieInfo.appendChild(knownForMovieTitle);
                knownForMovie.appendChild(knownForMovieInfo);
            }
        }

        //B3: HIỂN THỊ DỮ LIỆU
        await updateData().then(() => {
            modal.style.display = 'block';
        })

        //NHẤN NÚT CLOSE TĂT MODAL BOX
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        return modal.removeEventListener('click',clickPicturePeople);
    }

    return (
        <div ref={popularPeopleCarousel} className="carousel_people_wrap">
            <h2 className='popularPeopleTitle'>Popular People</h2>

            <div className='carousel_people_container '>
                <div className="carousel_people">
                    <div className="carousel_people_core" ref={myCars}>
                        {/* GOi Hàm để chỉ lấy đúng số lượng ng hiển thị */}
                        {get6People()}
                        {
                            showPeopleArray.map((person, index) => {
                                return (
                                    <div onClick={() => { clickPicturePeople(person.id) }} onMouseOut={mouseOutPicture} onMouseOver={hoverPicture} key={index} className="picture_people" style={{ backgroundImage: `url(${imgPath}${person.profile_path}) ` }}>
                                        <div className="name_people">{person.name}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='seeAllPeopleContainer'>
                <a href="#">  <h2 className='seeAllPeopleTitle'>See all people</h2></a>
            </div>

            {/* MODAL BOX FOR PEOPLE INFORMATION */}
            <div className='modalPeopleInfoContainer'>
                <div className='modalInfo'>
                    <div className='closeButtonInfoModal'>
                        <span className='closeButton'>&times;</span>
                    </div>
                    <div className='modalPeopleInfoContainerWrap'>
                        <div className='peopleInfoContainer'>
                            <div className='profileSection'>
                                <div className='blueCircleBG'></div>
                                <div className='pinkCircleBG'></div>
                                <div className='infoWrap'>
                                    <div className='infoDetail'>
                                        <h1 className='nameInfo'>Scarlett Johansson</h1>
                                        <div className='minorInfoPerson'>
                                            <span className='genderInfo'>Female</span>
                                            <span className='birthayInfo'>1984-11-22</span>
                                            <span className='placeOfBirthInfo'>New York City, New York, USA</span>
                                        </div>
                                        <div className='biographyInfo'>
                                            Biography
                                            <p className='biographyContent'>
                                                Scarlett Johansson, born November 22, 1984, is an American actress, model and singer. She made her film debut in North (1994)
                                                and was later nominated for the Independent Spirit Award for Best Female Lead for her performance in Manny & Lo (1996),
                                                garnering further acclaim and prominence with roles in The Horse Whisperer (1998) and Ghost World (2001). She shifted to
                                                adult roles with her performances in Girl with a Pearl Earring (2003) and Sofia Coppola's Lost in Translation (2003),
                                                for which she won a BAFTA award for Best Actress in a Leading Role; both films earned her Golden Globe Award nominations as well.
                                                <br /><br />
                                                A role in A Love Song for Bobby Long (2004) earned Johansson her third Golden Globe for Best Actress nomination. Johansson garnered another Golden Globe nomination
                                                for Best Supporting Actress with her role in Woody Allen's Match Point (2005). She has played the Marvel
                                                comic book character Black Widow/Natasha Romanoff in Iron Man 2 (2010), The Avengers (2012), and Captain
                                                America: The Winter Soldier (2014), Avengers: Age of Ultron (2015), Captain America: Civil War (2016),
                                                Avengers: Infinity War (2018), Avengers: Endgame (2019), and Black Widow (2020). The 2010 Broadway revival
                                                of Arthur Miller's A View From the Bridge won Johansson the Tony Award for Best Performance by a Featured Actress
                                                in a Play. As a singer, Johansson has released two albums, Anywhere I Lay My Head and Break Up.
                                                <br /><br />
                                                Johansson was nominated for two Academy Awards in 2020 for her work in Marriage Story (2019), and Jojo Rabbit (2019). Johansson was born
                                                in New York City. Her father, Karsten Johansson, is a Danish-born architect, and her paternal grandfather, Ejner Johansson,
                                                was a screenwriter and director. Her mother, Melanie Sloan, a producer, comes from an Ashkenazi Jewish family from the Bronx.
                                                Johansson has an older sister, Vanessa, who is an actress; an older brother, Adrian; a twin brother, Hunter (who appeared
                                                in the film Manny & Lo with Scarlett); and a half-brother, Christian, from her father's re-marriage .
                                            </p>
                                        </div>

                                        <div className='knownFor'>
                                            Known For
                                            <div className='knownForMovie'>
                                                <div className='knownForMovieInfo'>
                                                    <img className='knownForMovieImg' src="https://image.tmdb.org/t/p/original/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg" alt="img" />
                                                    <p className='knownForMovieTitle'>Avengers: Infinity War</p>
                                                </div>
                                                <div className='knownForMovieInfo'>
                                                    <img className='knownForMovieImg' src="https://image.tmdb.org/t/p/original/wkSzJs7oMf8MIr9CQVICsvRfwA7.jpg" alt="img" />
                                                    <p className='knownForMovieTitle'>Lost in Translation</p>
                                                </div>
                                                <div className='knownForMovieInfo'>
                                                    <img className='knownForMovieImg' src="https://image.tmdb.org/t/p/original/myRzRzCxdfUWjkJWgpHHZ1oGkJd.jpg" alt="img" />
                                                    <p className='knownForMovieTitle'>Ghost in the Shell</p>
                                                </div>
                                                <div className='knownForMovieInfo'>
                                                    <img className='knownForMovieImg' src="https://image.tmdb.org/t/p/original/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg" alt="img" />
                                                    <p className='knownForMovieTitle'>The Avengers</p>
                                                </div>
                                                <div className='knownForMovieInfo'>
                                                    <img className='knownForMovieImg' src="https://image.tmdb.org/t/p/original/6azpBJGcLx9SKif8h9VMnflBfa.jpg" alt="img" />
                                                    <p className='knownForMovieTitle'>Black Widow</p>
                                                </div>
                                                <div className='knownForMovieInfo'>
                                                    <img className='knownForMovieImg' src="https://image.tmdb.org/t/p/original/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg" alt="img" />
                                                    <p className='knownForMovieTitle'>Avengers: Infinity War</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='peopleIMGContainer'>
                            <div className='peopleIMGSection'>
                                <div className='peopleIMGSectionScreen'></div>
                                <div className='peopleIMGWrap'>
                                    <img className='peopleIMG' src="https://image.tmdb.org/t/p/original/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg" alt="img" />
                                </div>
                                <div className='peopleIMGSectionLight'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularPeopleCarousel
