import React from 'react';
import './shop.scss';
import tWhite from './tshirt-white.png';
import sizeSelect from './size.png';
import { useHistory } from 'react-router-dom';

function Shop() {
    const history = useHistory();

    return (
        <div className="test">
            <div
                className="info-shop"
                onClick={() => history.push('/main')}
            >
                <code>Brag</code>
                <code>it</code>
                <code>out!</code>
            </div>

            <div className="products">
                <img alt="" src={tWhite} />
                <code className="title">T-shirt</code>
                <code className="price">€20</code>
                <p className="title">_____________________________</p>
                <img alt="" className="size" src={sizeSelect} />
                <code className="des">
                    Product code: UJN657_1WO4_F0009_S_201 <br />
                    <br />
                    - Slim fit<br />
                    - Ribbed knit crew neck<br />
                    - Twin-needle stitching on the hem and sleeves<br />
                    - Patch pocket<br />
                    - Prada Oval logo on the chest<br />
                    - 92% cotton, 8% elastane<br />
                    <br />
                    66 cm Height<br />
                    <br />
                    The model is 187 cm tall and wear a size 48
                </code>
            </div>
            <button className="proceed">Proceed</button>

        </div >
    )
}

export default Shop;