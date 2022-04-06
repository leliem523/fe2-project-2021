import './Styles/Styles.css';
import requests from './requests';
import CarouselMoviesApp from './Components/Carousel';
import { Row, Col } from 'antd';
import PopularPeopleCarousel from './Components/PopularPeopleCarousel';
import WhatsOnPopular from './Components/WhatsOnPopular';
import MyWatchList from './Components/MyWatchList';
import TopSection from './Components/TopSection';
import UpComingMovies from './Components/UpComingMovies';
import Footer from './Components/Footer';
import SideBar from './Components/SideBarBox/SideBar/main';

function App() {

  return (
    <div style={{ background: '#000' }}>
      <TopSection style={{ paddingBottom: "50px" }} />

      <CarouselMoviesApp style={{ marginTop: '50px' }} fetchURL={requests.fetchPopularMovies}></CarouselMoviesApp>

      <div style={{ paddingTop: '50px', paddingBottom: '100px' }} className='container'>
        <Row gutter={24}>
          <Col span={18}>
            <WhatsOnPopular></WhatsOnPopular>
          </Col>

          <Col span={6}>
            <PopularPeopleCarousel fetchURL={requests.fetchPopularPeople}></PopularPeopleCarousel>
          </Col>
        </Row>
      </div>

      <SideBar />

      <div style={{ marginTop: '10px' }}>
        <MyWatchList fetchURL={requests.fetchUpComingMovies}></MyWatchList>

        <UpComingMovies></UpComingMovies>
      </div>

      <div style={{ marginTop: '40px' }}>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
