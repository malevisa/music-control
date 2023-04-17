import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import ImgError from '../../assets/404-error.png';
import '../not-found/notFound.css';

function NotFound404() {

    return (

        <>

            <Navbar />

            <div className="notfound_content">
                <h1>Desculpe, página não encontrada.</h1>
                <img src={ImgError} alt="Not-Found Image" />
            </div>

            <Footer />

        </>

    );

}

export default NotFound404;