import React, { useEffect } from 'react';
import * as THREE from "three";
import './main.scss';

function Main() {

    useEffect(() => {
        // initial
        var scene = new THREE.Scene();
        scene.background = new THREE.Color(0x282c34);
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 1.5;
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // render in container
        var container = document.querySelector('#container');
        document.body.appendChild(renderer.domElement);
        container.appendChild(renderer.domElement);

        // create globe
        // var geometry = new THREE.SphereGeometry(1, 32, 32);
        // var material = new THREE.MeshPhongMaterial();
        // var earthmesh = new THREE.Mesh(geometry, material);

        // material.map = THREE.ImageUtils.loadTexture({ globe_tx });

        const globe = new THREE.Group();
        scene.add(globe);


        var loader = new THREE.TextureLoader();
        loader.load('globe.jpg', function (texture) {
            var geometry = new THREE.SphereGeometry(1, 32, 32);
            var material = new THREE.MeshBasicMaterial({ map: texture, overdraw: 0.5 });
            var earthmesh = new THREE.Mesh(geometry, material);
            globe.add(earthmesh);
        });

        camera.position.z = 5;

        function animate() {
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
            globe.rotation.y += 0.01;
        }
        animate();

    }, [])

    return (
        <div id="container"></div>
    )
}

export default Main;
