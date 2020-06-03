import React, { useEffect } from 'react';
import * as THREE from "three";
import './main.scss';

import Globe from 'react-globe.gl';

function Main() {
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    //     useEffect(() => {
    //         // initial
    //         var scene = new THREE.Scene();
    //         scene.background = new THREE.Color(0x191919);
    //         var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //         camera.position.z = 1.5;
    //         var renderer = new THREE.WebGLRenderer();
    //         renderer.setSize(window.innerWidth, window.innerHeight);

    //         // render in container
    //         var container = document.querySelector('#container');
    //         document.body.appendChild(renderer.domElement);
    //         container.appendChild(renderer.domElement);

    //         // create globe
    //         // var geometry = new THREE.SphereGeometry(1, 32, 32);
    //         // var material = new THREE.MeshPhongMaterial();
    //         // var earthmesh = new THREE.Mesh(geometry, material);

    //         // material.map = THREE.ImageUtils.loadTexture({ globe_tx });

    //         const globe = new THREE.Group();
    //         scene.add(globe);

    //         var geometry = new THREE.SphereGeometry(1, 32, 32);
    //         var loader = new THREE.TextureLoader();

    //         const material = new THREE.MeshBasicMaterial({
    //             map: loader.load('https://i.imgur.com/45naBE9.jpg')
    //         });
    //         var earthmesh = new THREE.Mesh(geometry, material);
    //         globe.add(earthmesh);

    //         globe.position.y = .25;
    //         globe.rotation.x = .3;
    //         camera.position.z = 2.3;

    //         function animate() {
    //             renderer.render(scene, camera);
    //             requestAnimationFrame(animate);
    //             globe.rotation.y += 0.005;
    //         }
    //         animate();

    //     }, [])

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
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                // pointsData={gData}
                pointAltitude="size"
                pointColor="color"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            />
        </div>
    )
}

export default Main;
