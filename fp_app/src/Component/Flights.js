import { useState, useEffect } from 'react';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import { GetFlightDetail } from '../Server/server';
import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';
import ConnectingAirportsSharpIcon from '@mui/icons-material/ConnectingAirportsSharp';


export default function FlightDetail(props) {
    const [state, setstate] = useState([])

    useEffect(
        () => {
            async function fetchflightdetail() {
                let data = await GetFlightDetail()
                setstate([...data])
            }

            let ref = setTimeout(() => {
                fetchflightdetail()
            }, 3000);
            return () => {
                clearTimeout(ref);
            };
        }, []
    )
    return (
        <div className="main-render-div-data">
            <div className={props.isdashboard? 'main-render-div-data-firstchild-flight1' : 'main-render-div-data-firstchild-flight2'}>
                <div className='main-render-div-data-firstchild-flight-first'><div className={props.isdashboard?'ICon-Style':'ICon-Style3'}>F</div></div>
                <div onClick={async () => { let data = await GetFlightDetail(); setstate([...data]) }}><CloudSyncTwoToneIcon className='LoopRoundedIcon-style' /></div>
            </div>
            <div>
                {
                    (state.length > 0 ? state.map((data, index) => {
                        return <SubFunctionFlightDetail flightname={data.flightname} altitude={data.altitude} speed={data.speed} location={data.location} fuel={data.fuel} arrivalestiamtedtime={data.arrivalestiamtedtime} distance={data.distance} aircraftname={data.aircraftname} key={index} />
                    })
                        :
                        <div className='loading'><span className="spinner-border spinner-border-sm" /> Loading...</div>
                    )
                }
            </div>
        </div>
    )
}

export function SubFunctionFlightDetail(props) {

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-1 flight-main-div-icon'><ConnectingAirportsSharpIcon /></div>
                <div className='col-md-10 flight-main-div'>
                    <div className='col-xl-3 flight-main-div-item'><div>Flight Name</div> <div className="data-style">{props.flightname}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>Altitude</div> <div className="data-style">{props.altitude}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>Speed</div> <div className="data-style">{props.speed}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>Location</div> <div className="data-style">{props.location}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>Fuel</div><div className="data-style">{props.fuel}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>ASTime</div><div className="data-style">{props.arrivalestiamtedtime}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>Distance</div> <div className="data-style">{props.distance}</div></div>
                    <div className='col-xl-3 flight-main-div-item'><div>Aircraft Name</div> <div className="data-style">{props.aircraftname}</div></div>
                </div>
            </div>
        </div>
    )
}

