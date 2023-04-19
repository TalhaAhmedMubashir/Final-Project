import { useState, useEffect } from 'react';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';
import { GetWeatherDetail } from '../Server/server';
import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';
import WbSunnySharpIcon from '@mui/icons-material/WbSunnySharp';


export default function WeatherDetail(props) {
    const [state, setstate] = useState([])

    useEffect(
        () => {
            async function fetchflightdetail() {
                let data = await GetWeatherDetail()
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
            <div className={props.isdashboard?'main-render-div-data-firstchild-weather1':'main-render-div-data-firstchild-weather2'}>
                <div className='main-render-div-data-firstchild-weather-first'><div className={props.isdashboard?'ICon-Style2':"ICon-Style4"}>W</div></div>
                <div onClick={async () => { let data = await GetWeatherDetail(); setstate([...data]) }}><CloudSyncTwoToneIcon className='LoopRoundedIcon-style' /></div>
            </div>
            <div>
                {
                    (state.length > 0 ? state.map((data, index) => {
                        return <SubFunctionWeatherDetail temperature={data.temperature} humidity={data.humidity} location={data.location} uvindex={data.uvindex} key={index} />
                    })
                        :
                        <div className='loading'><span class="spinner-border spinner-border-sm" /> Loading...</div>
                    )
                }
            </div>

        </div>
    )
}

export function SubFunctionWeatherDetail(props) {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-1 flight-main-div-icon'><WbSunnySharpIcon /></div>
                <div className='col-md-11 weather-main-div'>
                    <div className="name-data-style">Temperature<br /> <div className="data-style">{props.temperature}</div></div>
                    <div className="name-data-style">Humidity<br /><div className="data-style">{props.humidity}</div></div>
                    <div className="name-data-style">Location<br /><div className="data-style">{props.location}</div></div>
                    <div className="name-data-style">uvindex<br /><div className="data-style">{props.uvindex}</div></div>
                </div>
            </div>
        </div>
    )
}


