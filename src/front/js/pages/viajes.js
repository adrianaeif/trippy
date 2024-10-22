import '../../styles/viajes.css';
import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../store/appContext.js"
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options); // Cambia 'es-ES' según tu preferencia de idioma
};


const Viajes = () => {

    const { store, actions } = useContext(Context);

    // const [usuario, setUsuario] = useState(store.user[0]);

    useEffect(() => {
        actions.get_trips();
    }, []);

    const trips = store.viajes || [];


    const countGroups = () => {
        let groupNumber = 0;
        trips.forEach((trip) => {
            if (trip.people > 1) {
                groupNumber += 1;
            }
        })
        return groupNumber
    }




    return (
        <>
            {/* User Banner */}

            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">

                <div className="container rounded d-flex bg-light p-4 shadow ms-5 me-3 mb-3 mb-md-0" style={{ maxWidth: "80%", width: "100%", marginTop: "20px" }}>
                    <div className="d-flex flex-column align-items-start flex-grow-1 mx-3" >
                        <h5>{ }</h5>
                        <p>{ }</p>
                    </div>
                    <div className="mx-4 text-end">
                        <p className="mb-1"><i className="iconos fa-solid fa-map-location-dot me-2"></i>Proximos viajes: <span className="colorAzul fw-bold">{ }</span></p>
                        <p className="mb-3"><i className="iconos fa-solid fa-user-group me-2"></i>Grupos: <span className="colorAzul fw-bold">{ }</span></p>
                    </div>

                </div>

                <img src="" className="rounded-circle ms-0 me-5 shadow" style={{ objectFit: 'cover', width: "120px", height: "120px" }} />

            </div>



            {/* individual trips*/}

            {trips.map((item, index) => {
                return (<div key={index} className="viaje container d-flex mb-3 my-5 rounded-pill p-2 bg-light " style={{ width: "100%", maxWidth: "65%" }}>
                    <img src="" className="ima rounded-circle shadow" style={{ objectFit: 'cover', width: "100px", height: "100px" }} />
                    <div className="mt-1 flex-grow-1">
                        <h6 className="mb-2">{item.destino}</h6>
                        <p className="mb-0 mt-3">{formatDate(item.fecha_inicio)}</p>
                        <p className="mb-0 mt-1">
                            <i className="iconos fa-solid fa-clock me-2"></i>
                            0
                        </p>
                    </div>
                    <div className="d-flex flex-column justify-content-end ms-auto p-3">
                        <p className="mb-0 fw-normal">Presupuesto: <span className="colorAzul fw-bold">{item.presupuesto || "No disponible"}</span></p>
                        <p className="mb-0 fw-normal">Presupuesto personal: <span className="colorAzul fw-bold">{item.presupuesto_personal}</span></p>
                        <p className="mb-0 fw-normal">Número de personas: <span className="colorAzul fw-bold">0</span></p>
                    </div>

                    <div className="d-flex align-items-center ms-3 me-3 fs-3">
                        <Link to="/individual-trip" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <i className="fa-solid fa-chevron-right opacity-50"></i>
                        </Link>
                    </div>
                </div>)
            })}

            <div className="d-flex justify-content-evenly">

                <Link to="/add-new-trip" className="btn bg-light mt-5 p-3 mx-3 shadow w-50">
                    <i className="fa-solid fa-circle-plus me-2 text-success"></i>
                    Añadir un nuevo viaje
                </Link>

            </div>


        </>
    )
}

export default Viajes