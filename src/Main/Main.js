import React, { useEffect, useState, useRef } from 'react';
import './main.scss';
import Globe from 'react-globe.gl';
import Checkbox from '../Checkboxs/Checkbox';
import * as THREE from "three";
import { TorusGeometry } from 'three';

function Main() {

    const yearList = [
        { year: "all", active: false },
        { year: "2020", active: true },
        { year: "2019", active: false },
        { year: "2018", active: false },
        { year: "2017", active: false },
        { year: "2016", active: false },
    ];

    const countriesList = [];

    const N = 300;
    const randomData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        alt: Math.random() * 0.8 + 0.1,
        radius: Math.random() * 5,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    const globeEl = useRef();
    const [countries, setCountries] = useState({ features: [] });
    const [altitude, setAltitude] = useState(0.1);
    const [scalerank, setScalerank] = useState(1);
    const [transitionDuration, setTransitionDuration] = useState(1000);
    const [countriesToggle, setCountriesToggle] = useState({ text: [] });
    const [data, setData] = useState(randomData);
    const [list, updateList] = useState(countriesList);
    const [year, updateYear] = useState(yearList);
    const [currentYear, getCurrentYear] = useState("2020");
    const [disabled, setDisabled] = useState(true);
    const [errorDisabled, setErrorDisabled] = useState(true);
    const [countryName, setCountryName] = useState("Country Name");
    const [inputValue, setInputValue] = useState({ cn: [], dos: [] });

    // let capColor = 'rgba(0,0,0,0)', sideColor = 'rgba(0,0,0,0)', strokeColor = 'rgba(0,0,0,0)';
    var capColor = 'rgba(103,223,209, 0.9)';
    var sideColor = 'rgba(200,200,200, 0.5)';
    var strokeColor = 'rgba(255,255,255, 0.9)';

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

        updateList(JSON.parse(localStorage.getItem('visited')));
    }, []);

    useEffect(() => {
        globeEl.current.pointOfView({ altitude: 3.5 });
    }, []);

    const handleRemoveItem = (e) => {
        const name = e.target.getAttribute("name");
        if (name === "all") {
            setErrorDisabled(false);
            return;
        }
        updateList(list.filter(item => item.name !== name));
        localStorage.setItem('visited', JSON.stringify(list));
    };

    const handleYearChanged = (e) => {
        const getYear = e.target.getAttribute("year");
        getCurrentYear(getYear);

        updateYear(year.map(item => {
            if (item.year === getYear) {
                item.active = true;
            } else {
                item.active = false;
            }

            return item;
        }));

    };

    const inputPanel = (e) => {
        setDisabled(true);
    };

    const errorPopup = (e) => {
        setErrorDisabled(true);
        updateList([]);
        localStorage.setItem('visited', JSON.stringify(list));
    };

    const errorPopupCancel = (e) => {
        setErrorDisabled(true);
    };

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            const value = e.target.value;
            setDisabled(true);
            updateList(name => [...name, { name: countryName, days: value }]);
            localStorage.setItem('visited', JSON.stringify(list));
            console.log(list);
        }
    }

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
                // polygonLabel={({ properties: d }) => `<div class="text-des">
                //     <b>${d.ADMIN}</b> <br />
                //     <b>Duration of stay:</b> <i>${Math.round(+d.POP_EST / 1e4) / 1e2} d</i></div>
                // `}
                polygonLabel={({ properties: d }) => {
                    if (disabled) {
                        return `<div class="text-des">
                    <code>${d.ADMIN}</code> <br />`
                    }
                }}
                polygonsTransitionDuration={transitionDuration}
                onPolygonClick={({ properties: d }) => {
                    setDisabled(false);
                    setCountryName(d.ADMIN);
                    // d.scalerank === 1 ? d.scalerank = 0 : d.scalerank = 1;
                    // setAltitude(() => feat => Math.max(0.1, Math.sqrt(+feat.properties.POP_EST / 9) * 7e-5));
                }}

                customLayerData={data}
                customThreeObject={d => new THREE.Mesh(
                    new THREE.SphereBufferGeometry(d.radius),
                    new THREE.MeshLambertMaterial({ color: d.color })
                )}
                customThreeObjectUpdate={(obj, d, { properties: data }) => {
                    Object.assign(altitude, altitude);
                    // console.log(d.scalerank);
                    // Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, d.alt));
                }}
            />
            {/* end globe */}

            {/* detail panel */}
            <div className="countries">
                <Checkbox>
                    <code>ENABLE PATH</code>
                </Checkbox>
                <div className="countries-header">
                    <code>{currentYear} Visited:</code>
                    <code className="countries-header-reset-button" name="all" onClick={handleRemoveItem}>Reset</code>
                </div>
                <div className="countries-list">
                    {list.map(item => {
                        return (
                            <>
                                <code name={item.name} onClick={handleRemoveItem}>x {item.name} {item.days}</code>
                            </>
                        );
                    })}
                </div>
            </div>

            {/* timeline */}
            <div className="timeline">
                {year.map(item => {
                    return (
                        <>
                            <code className={item.active ? "timeline-padB-active" : "timeline-padB"} year={item.year} onClick={handleYearChanged}>{item.year}</code>
                        </>
                    )
                })}
            </div>

            {/* Input panel */}
            {!disabled ?
                <div className="input-panel">
                    <code><strong>{countryName}</strong></code>
                    <code className="input-panel-button" onClick={inputPanel}>x</code>
                    {/* <code className="input-panel-button" onClick={inputPanel}>✓</code> */}
                    <br></br><br></br>
                    {/* <code>Purpose of visit: </code> */}
                    {/* <input /><br></br> */}
                    <div className="input">
                        <code className="input-question">Duration of stay: </code>
                        <input value={inputValue.dos} onKeyDown={keyPress} onChange={handleChange} className="input-list" placeholder="1d 1m 1y" />
                    </div>
                </div> : null
            }

            {/* error popup */}
            {!errorDisabled ?
                <div className="error-popup">
                    <code><strong>Reset {currentYear}</strong></code>
                    <code className="error-popup-button" onClick={errorPopup}>Reset</code>
                    <code className="error-popup-button-cancel" onClick={errorPopupCancel}>Cancel</code>
                    <div className="error">
                        <code className="error-question">This action cannot be undone. <br></br> Do you really want to reset {currentYear} ?</code>
                    </div>
                </div> : null
            }

        </div >
    )
}

export default Main;
