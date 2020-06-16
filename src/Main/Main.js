import React, { useEffect, useState, useRef } from 'react';
import './main.scss';
import Globe from 'react-globe.gl';
import Checkbox from '../Checkboxs/Checkbox';
import * as THREE from "three";

function Main() {

    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [altitude, setAltitude] = useState(0.1);
    const [transitionDuration, setTransitionDuration] = useState(1000);
    // let capColor = 'rgba(0,0,0,0)', sideColor = 'rgba(0,0,0,0)', strokeColor = 'rgba(0,0,0,0)';
    var capColor = 'rgba(103,223,209, 0.9)';
    var sideColor = 'rgba(200,200,200, 0.5)';
    var strokeColor = 'rgba(255,255,255, 0.9)';

    const N = 300;
    const randomData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        alt: Math.random() * 0.8 + 0.1,
        radius: Math.random() * 5,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    const [data, setData] = useState(randomData);

    useEffect(() => {
        // load data
        fetch('./ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countries => {
                setCountries(countries);
                // setTimeout(() => {
                //     setTransitionDuration(4000);
                //     setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST / 9) * 7e-5));
                // }, 3000);
            }).catch(err => {
                console.log("Error Reading data " + err);
            });

        (function moveSpheres() {
            data.forEach(d => d.lat += 0.2);
            setData(data.slice());
            requestAnimationFrame(moveSpheres);
        })();

    }, []);

    useEffect(() => {
        globeEl.current.pointOfView({ altitude: 3.5 });
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
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                globeImageUrl="//unpkg.com/three-globe@2.7.2/example/img/earth-water.png"
                polygonsData={countries.features}
                polygonAltitude={altitude}
                polygonCapColor={() => capColor}
                polygonSideColor={() => sideColor}
                polygonStrokeColor={() => strokeColor}
                // polygonCapColor={() => 'rgba(103,223,209, 0.9)'}
                // polygonSideColor={() => 'rgba(200,200,200, 0.5)'}
                // polygonStrokeColor={() => 'rgba(255,255,255, 0.9)'}
                polygonLabel={({ properties: d }) => `<div class="text-des">
                    <b>${d.ADMIN}</b> <br />
                    <b>Duration of stay:</b> <i>${Math.round(+d.POP_EST / 1e4) / 1e2} d</i></div>
                `}
                polygonLabel={({ properties: d }) => `<div class="text-des">
                <b>${d.ADMIN}</b> <br />
            `}
                polygonsTransitionDuration={transitionDuration}
                onPolygonClick={({ properties: d }) => {
                    setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST / 9) * 7e-5));
                    console.log(d.ADMIN, altitude);
                }}

                customLayerData={data}
                customThreeObject={d => new THREE.Mesh(
                    new THREE.SphereBufferGeometry(d.radius),
                    new THREE.MeshLambertMaterial({ color: d.color })
                )}
                customThreeObjectUpdate={(obj, d, { properties: data }) => {
                    Object.assign(altitude, altitude);
                    // Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
                }}
            />
            {/* end globe */}

            {/* detail panel */}
            <div className="countries">
                <Checkbox>
                    ENABLE PATH
            </Checkbox>
                <code>Visited:</code>
                <div className="countries-list">
                    <code>x Thailand        5d</code>
                    <code>x Costa Rica      4d</code>
                    <code className="countries-list-reset-button">Reset</code>
                </div>
            </div>

            {/* timeline */}
            <div className="timeline">
                <code className="timeline-padB-active">all</code>
                <code className="timeline-padB">2020</code>
                <code className="timeline-padB">2019</code>
                <code className="timeline-padB">2018</code>
                <code className="timeline-padB">2017</code>
                <code className="timeline-padB">2016</code>
            </div>

        </div>
    )
}

export default Main;
