import React from 'react';

const Intro = () => {
    return (
        <div className="intro">
            <div className="main">
                <div className="header">
                    <div className="overlay">
                        <div className="inner">
                            <h2 className="title">Unlimited movies, TV shows, and more.</h2>
                            <p className="content">Watch anywhere. Cancel anytime.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow one">
                <div className="shadow__container">
                    <div className="overlay">
                        <div className="inner">
                            <h2 className="title">COLLECTIONS,</h2>
                            <p className="content">Now on iOS + Android.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shadow two">
                <div className="shadow__container">
                    <div className="overlay">
                        <div className="inner">
                            <h2 className="title">Bring the whole world into your home.</h2>
                            <p className="content">Netflix is the world's leading media streaming platform, operating in
                            nearly every country in the world.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Intro;