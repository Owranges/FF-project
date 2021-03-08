import React from "react"
import Header from "../../Global/header/Header"
import Footer from "../../Global/footer/Footer"
import "./univers.css"

import ff7Cloudprofile from "../../Img/UniversImg/ff7Cloudprofile.png"
import ff7Barretprofile from "../../Img/UniversImg/ff7Barretprofile.png"
import ff7Aerithprofile from "../../Img/UniversImg/ff7Aerithprofile.png"
import ff7RougeXIIIprofile from "../../Img/UniversImg/ff7RougeXIIIprofile.png"
import ff7Tifaprofile from "../../Img/UniversImg/ff7Tifaprofile.png"

function Univers() {
    return (
        <div>
            <Header></Header>
            <div className="page-univers text-center page-img">
                <div >
                    <img src={ff7Cloudprofile} className='profil-personnage' alt='Cloud from ff7' />
                    <p className="page-img text-white">CLOUD STRIFE</p>
                </div>
                <div>
                    <img src={ff7Aerithprofile} className='profil-personnage' alt='Aerith from ff7' />
                    <p className="page-img text-white">AERITH GAINSBOROUGH</p>
                </div>
                <div >
                    <img src={ff7Tifaprofile} className='profil-personnage' alt='Tifa from ff7' />
                    <p className="page-img text-white">TIFA LOCKHART</p>
                </div>
                <div >
                    <img src={ff7Barretprofile} className='profil-personnage' alt='Barret from ff7' />
                    <p className="page-img text-white">BARRET WALLACE</p>
                </div>
                <div>
                    <img src={ff7RougeXIIIprofile} className='profil-personnage' alt='RougeXIIIfrom ff7' />
                    <p className="page-img text-white">RED XIII</p>
                </div>

            </div>
            <Footer></Footer>
        </div >
    )
}

export default Univers