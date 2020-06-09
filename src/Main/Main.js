import React, { useEffect, useState, useRef } from 'react';
import './main.scss';
import Globe from 'react-globe.gl';
import Checkbox from '../Checkboxs/Checkbox'

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
            {/* logo */}
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

            {/* the world */}
            <Globe
                ref={globeEl}
                // backgroundColor="#ffffff"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                globeImageUrl="//unpkg.com/three-globe@2.7.2/example/img/earth-water.png"
                polygonsData={countries.features}
                // polygonAltitude={altitude}
                // polygonCapColor={() => 'rgba(9,43,39, 0.9)'}
                // polygonSideColor={() => 'rgba(12,59,53, 0.5)'}
                polygonCapColor={() => 'rgba(103,223,209, 0.9)'}
                polygonSideColor={() => 'rgba(200,200,200, 0.5)'}
                polygonStrokeColor={() => 'rgba(255,255,255, 0.9)'}
                polygonLabel={({ properties: d }) => `<div class="text-des">
                    <b>${d.ADMIN}</b> <br />
                    <b>Duration of stay:</b> <i>${Math.round(+d.POP_EST / 1e4) / 1e2} d</i></div>
                `}
                polygonsTransitionDuration={transitionDuration}
            />

            {/* detail panel */}
            <div className="countries">
                <Checkbox>
                    ENABLE PATH
            </Checkbox>
                <code>Visited:</code>
                <div className="countries-list">
                    <code>x Thailand        5d</code>
                    <code>x Costa Rica      4d</code>
                </div>
            </div>

        </div>
    )
}

export default Main;
