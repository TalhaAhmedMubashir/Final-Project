import { useEffect } from 'react';
import {GetAuthenication } from '../Server/server';
import FlightDetail from '../Component/Flights';
import WeatherDetail from '../Component/Weather';


export default function DashBoard() {
    const urlParams = new URLSearchParams(window.location.search);
    
    useEffect(() => {
        async function fetchData() {
            if(urlParams.get('id')){
                await GetAuthenication()
            }
        }
        fetchData()
    }, []);

    return (
        <div className='RenderComp'>
            <WeatherDetail isdashboard="true"/>
            <FlightDetail isdashboard="true"/>
        </div>
    )
}
