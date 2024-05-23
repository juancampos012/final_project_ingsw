import React, { useState, useEffect } from 'react';
import { Trip } from '../request/trip';
import { User } from '../request/users';
import Cookies from 'js-cookie';

const tripController = new Trip();
const userController = new User();

export const KanbaBoard = () => {
    const [trips, setTrips] = useState([]);
    const [parsedLocations, setParsedLocations] = useState({});
    const [userId, setUserId] = useState("");
    const miCookie = Cookies.get('jwt');

    React.useEffect(() => {
        userController.verifyToken(miCookie)
        .then(data => {
            return data.json();
        })
        .then(response => {
            if(response.user){
                setUserId(response.user.user.id);
            }
        })
        .catch(error => {
            console.error(error); 
        });
    }, [miCookie]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await tripController.getListTrip(userId);
            setTrips(response);
            await parseLocations(response);
          } catch (error) {
            console.error('Hubo un error al cargar los datos:', error);
          }
        };
        fetchData();
    }, [userId]);

    const parseLocation = async (location) => {
        try {
          const locObj = JSON.parse(location);

          const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locObj.lat},${locObj.lng}&key=AIzaSyAf2AHLtGvjMJouKecs0kkw1AQw2YTZfdc`);
          const data = await response.json();
      
          if (data.status === 'OK') {
            return data.results[0].formatted_address;
          } else {
            console.error('Error al obtener la dirección:', data.status);
            return 'Error al obtener la dirección';
          }
        } catch (error) {
          console.error('Error al analizar la ubicación:', error);
          return 'Ubicación inválida';
        }
    };

    const parseLocations = async (trips) => {
        const locations = {};
        for (const trip of trips) {
            locations[trip.id] = {
                origin: await parseLocation(trip.originPlace),
                destination: await parseLocation(trip.destinationPlace),
            };
        }
        setParsedLocations(locations);
    };

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData('itemID', item.id);
        console.log(item);
    }

    const draggingOver = (evt) => {
        evt.preventDefault();
    }

    const onDrop = (evt, completed) => {
        const itemID = evt.dataTransfer.getData('itemID');
        const item = trips.find(item => item.id === itemID);
        item.completed = completed;

        const newState = trips.map(trip => {
            if (trip.id === itemID) return item;
            return trip;
        });

        setTrips(newState);
    }

    const formatTime = (timeInHours) => {
        const hours = Math.floor(timeInHours);
        const minutes = Math.round((timeInHours - hours) * 60);
        return `${hours} hrs ${minutes} min`;
    }

    return (
        <>
            <h1 className="h1-kanba">
                Mis Viajes
                <img className='icon-react' src="src/assets/react.svg" alt="" />
            </h1>
            <br />

            <div className='drag-and-drop'>
                <div className='column column--1'>
                    <h3>
                        Viajes por hacer
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, false)}>
                        {trips.length > 0 ? trips.filter(item => !item.completed).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>Viaje</strong>
                                <p className='body'>Origen: {parsedLocations[item.id]?.origin || 'Cargando...'}</p>
                                <p className='body'>Destino: {parsedLocations[item.id]?.destination || 'Cargando...'}</p>
                                <p className='body'>Distancia: {item.distance} km</p>
                                <p className='body'>Tiempo: {formatTime(item.time)}</p>
                            </div>
                        )) : <p>No tienes viajes pendientes</p>}
                    </div>
                </div>

                <div className='column column--2'>
                    <h3>
                        Viajes realizados
                    </h3>
                    <div className='dd-zone' droppable="true" onDragOver={draggingOver} onDrop={(evt) => onDrop(evt, true)}>
                        {trips.length > 0 ? trips.filter(item => item.completed).map(item => (
                            <div className='dd-element' key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                                <strong className='title'>Viaje</strong>
                                <p className='body'>Origen: {parsedLocations[item.id]?.origin || 'Cargando...'}</p>
                                <p className='body'>Destino: {parsedLocations[item.id]?.destination || 'Cargando...'}</p>
                                <p className='body'>Distancia: {item.distance} km</p>
                                <p className='body'>Tiempo: {formatTime(item.time)}</p>
                            </div>
                        )) : <p>No tienes viajes realizados</p>}
                    </div>
                </div>

            </div>
        </>
    )
}
