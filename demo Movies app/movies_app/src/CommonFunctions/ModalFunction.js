import requests from '../requests'

//HÀM LẤY DỮ LIỆU CHI TIẾT THÔNG TIN CỦA MOVIES ĐÃ CHỌN
export async function getInforForMovie(idMovie, type) {
    //GỬI REQUEST LÊN SERVER ĐỂ LẤY PHIM
    async function fetchData(idMovie, type) {
        let url = type == 'movie' ? requests.getDetailForMovie : requests.getDetailForMovieOnTV;
        url = url.replace('MOVIE_ID', idMovie);
        let result;

        async function getData() {
            await fetch(url).then((res) => res.json()).then((data) => {
                result = data;
            });
        }
        await getData();
        return result;
    }

    const result = await fetchData(idMovie, type);
    return result;
}

//HÀM LẤY DỮ LIỆU VIDEO CỦA MOVIES CHỌN
export async function getVideoForMovie(idMovie, type) {
    //GỬI REQUEST LÊN SERVER ĐỂ LẤY PHIM
    async function fetchData(idMovie, type) {
        let url = type == 'movie' ? requests.getClipForMovie : requests.getClipForMovieOnTV;
        url = url.replace('MOVIE_ID', idMovie);
        let result;

        async function getData() {
            await fetch(url).then((res) => res.json()).then((data) => {
                result = data;
            });
        }
        await getData();
        return result;
    }

    const result = await fetchData(idMovie, type);
    return result;
}

//HÀM LẤY DỮ LIỆU  INFO CỦA PERSON được CHỌN
export async function getPersonInformation(peopleID) {
    //GỬI REQUEST LÊN SERVER ĐỂ LẤY info
    async function fetchData(peopleID) {
        let url = requests.getPersonInformation;
        url = url.replace('PEOPLE_ID', peopleID);
        let result;

        async function getData() {
            await fetch(url).then((res) => res.json()).then((data) => {
                result = data;
            });
        }
        await getData();
        return result;
    }

    const result = await fetchData(peopleID);
    return result;
}

//HÀM LẤY DỮ LIỆU MOVIES CỦA PERSON được CHỌN
export async function getImagedTaggedForPerson(peopleID) {
    //GỬI REQUEST LÊN SERVER ĐỂ LẤY PHIM
    async function fetchData(peopleID) {
        let url = requests.getImagedTaggedForPerson;
        url = url.replace('PEOPLE_ID', peopleID);
        let result;

        async function getData() {
            await fetch(url).then((res) => res.json()).then((data) => {
                result = data;
            });
        }
        await getData();
        return result;
    }

    const result = await fetchData(peopleID);
    return result;
}

//HÀM LẤY DỮ LIỆU CHI TIẾT VỀ 1 BỘ PHIM
export async function geMoreImageslForMovie(movieID) {
    async function fetchData(movieID) {
        let url = requests.getMoreImageForMovie;
        url = url.replace('MOVIE_ID', movieID);
        let result;

        async function getData() {
            await fetch(url).then((res) => res.json()).then((data) => {
                result = data;
            });
        }
        await getData();
        return result;
    }

    const result = await fetchData(movieID);
    return result;
}