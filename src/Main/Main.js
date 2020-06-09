import React, { useEffect, useState, useRef } from 'react';
import './main.scss';
import Globe from 'react-globe.gl';

function Main() {

    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [altitude, setAltitude] = useState(0.1);
    const [transitionDuration, setTransitionDuration] = useState(1000);

    useEffect(() => {
        // load data
        fetch('./ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countries => {
                setCountries(countries);
                // setTimeout(() => {
                //     setTransitionDuration(4000);
                //     setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST) * 7e-5));
                // }, 3000);
            }).catch(err => {
                console.log("Error Reading data " + err);
            });
    }, []);

    return (
        <div id="container">
            <a
                className="info"
                href="https://www.instagram.com/brag.it.out/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <code>Brag</code>
                <code>it</code>
                <code>out!</code>
            </a>

            <Globe
                ref={globeEl}
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                // globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                polygonsData={countries.features}
                // polygonAltitude={altitude}
                polygonCapColor={() => 'rgba(9,43,39, 0.9)'}
                polygonSideColor={() => 'rgba(12,59,53, 0.5)'}
                // polygonCapColor={() => 'rgba(103,223,209, 0.8)'}
                // polygonSideColor={() => 'rgba(23,107,97, 0.5)'}
                polygonLabel={({ properties: d }) => `
        <b>${d.ADMIN}</b> <br />
        <b>Duration of stay:</b> <i>${Math.round(+d.POP_EST / 1e4) / 1e2} d</i>
      `}
                polygonsTransitionDuration={transitionDuration}
            />
        </div>
    )
}

export default Main;
