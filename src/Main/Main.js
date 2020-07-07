import React, { useEffect, useState, useRef } from 'react';
import './main.scss';
import Globe from 'react-globe.gl';
import Checkbox from '../Checkboxs/Checkbox';
import * as THREE from "three";
// import { TorusGeometry } from 'three';
// import Shop from '../Shop/Shop';
import { useHistory } from 'react-router-dom';

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

    const globeEl = useRef();
    const history = useHistory();
    const [countries, setCountries] = useState({ features: [] });
    const [altitude, setAltitude] = useState(0.01);
    // const [scalerank, setScalerank] = useState(1);
    const [transitionDuration, setTransitionDuration] = useState(1000);
    // const [countriesToggle, setCountriesToggle] = useState({ text: [] });
    const [list, updateList] = useState(countriesList);
    const [year, updateYear] = useState(yearList);
    const [currentYear, getCurrentYear] = useState("2020");
    const [disabled, setDisabled] = useState(true);
    const [errorDisabled, setErrorDisabled] = useState(true);
    const [countryName, setCountryName] = useState("Country Name");
    const [inputValue, setInputValue] = useState({ cn: [], dos: [] });
    const [capColor, setCapColor] = useState('rgba(0,0,0,0)');
    const [arcsData, setArcsData] = useState();
    const [isEnablePath, setEnablePath] = useState(false);

    // let capColor = 'rgba(0,0,0,0)', sideColor = 'rgba(0,0,0,0)', strokeColor = 'rgba(0,0,0,0)';
    // var capColor = 'rgba(103,223,209, 0.9)';
    var sideColor = 'rgba(200,200,200, 0.5)';
    var strokeColor = 'rgba(255,255,255, 0.9)';

    useEffect(() => {
        // load data
        fetch('./ne_110m_admin_0_countries.geojson')
            .then(res => res.json())
            .then(countries => {
                setCountries(countries);
                setAltitude(() => feat => {
                    const persistedList = JSON.parse(localStorage.getItem('visited'));
                    if (!persistedList.map(list =>
                        // {
                        list.name
                        // if (list.days <= 10) {
                        //     return 0.2;
                        // } else if (list.days > 10 && list.days <= 20) {
                        //     return 0.4;
                        // } else if (list.days > 20 && list.days <= 30) {
                        //     return 0.6;
                        // } else {
                        //     return 1;
                        // }
                        // }
                    ).includes(feat.properties.ADMIN)) {
                        return 0.01;
                    }
                    return 0.4;
                });
            }).catch(err => {
                console.log("Error Reading data " + err);
            });

        const storageItem = JSON.parse(localStorage.getItem('visited'));
        storageItem && updateList(storageItem);
    }, []);


    useEffect(() => {
        console.log(list);
        localStorage.setItem('visited', JSON.stringify(list));
    }, [list])

    const handleRemoveItem = (e) => {
        const name = e.target.getAttribute("name");
        if (name === "all") {
            setErrorDisabled(false);
            return;
        }
        updateList(list.filter(item => item.name !== name));
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
            updateList(name => {
                return [...name, { name: countryName, days: parseInt(value), year: currentYear }];
            });
        }
    }

    const enablePath = (e) => {
        if (!isEnablePath) {
            setArcsData([...Array(list.length).keys()].map(() => ({
                startLat: (Math.random() - 0.5) * 180,
                startLng: (Math.random() - 0.5) * 360,
                endLat: (Math.random() - 0.5) * 180,
                endLng: (Math.random() - 0.5) * 360,
                color: 'rgba(255,255,255,0.5)'
            })));
            setEnablePath(true);
        } else {
            setArcsData([]);
            setEnablePath(false);
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

            {/* shop */}
            <div className="sharethis-inline-share-buttons"></div>
            <a>
                <i className='fas shop' onClick={() => history.push('/shop')}>&#xf291;</i>
            </a>

            {/* the world */}
            <Globe
                ref={globeEl}
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                globeImageUrl="//unpkg.com/three-globe@2.7.2/example/img/earth-water.png"
                polygonsData={countries.features}
                polygonAltitude={altitude}
                polygonCapColor={(feat) => {
                    const persistedList = JSON.parse(localStorage.getItem('visited'));
                    if (!persistedList.map(list => list.name)
                        .includes(feat.properties.ADMIN)) {
                        return 'rgba(0,0,0, 0)';
                    }
                    return 'rgba(103,223,209, 0.9)';
                }}
                polygonSideColor={() => sideColor}
                polygonStrokeColor={() => strokeColor}
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
                }}

                arcsData={arcsData}
                arcColor={'color'}
                arcDashLength={() => Math.random()}
                arcDashGap={() => Math.random()}
                arcDashAnimateTime={() => Math.random() * 4000 + 500}
            />
            {/* end globe */}

            {/* detail panel */}
            <div className="countries">
                <Checkbox >
                    <code onClick={enablePath}>ENABLE PATH</code>
                </Checkbox>
                <div className="countries-header">
                    <code>{currentYear} Visited:</code>
                    <code className="countries-header-reset-button" name="all" onClick={handleRemoveItem}>Reset</code>
                </div>
                <div className="countries-list">
                    {list ? list.filter(res => res.year === currentYear)
                        .map(item => {
                            return (
                                <>
                                    <code name={item.name} onClick={handleRemoveItem}>x {item.name} {item.days} days</code>
                                </>
                            );
                        }) : null}
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
                        <input value={inputValue.dos} onKeyDown={keyPress} onChange={handleChange} className="input-list" placeholder="   days" />
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

