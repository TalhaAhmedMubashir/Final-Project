import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Sidebar from '../Component/SideBar';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import FooterComp from '../Component/FooterComp';

export default function Defaultlayout() {

    let [state, setstate] = useState({
        name: "",
        email: "",
    });

    let [displaymenu, setdisplaymenu] = useState(false)

    useEffect(() => {
        let timeoutreference = setTimeout(() => {
            setstate({
                name: sessionStorage.getItem("fullname"),
                email: sessionStorage.getItem("email")
            }
            )
        }, 2000)
        return (() => clearTimeout(timeoutreference))
    }, []);


    function switchdisplaysetting() {
        if (displaymenu) {
            setdisplaymenu(false)
        } else {
            setdisplaymenu(true)
        }
    }

    return (
        <>
            <div className="nav">
                <div className="navFD">
                    <div className="navFDC"><button className="navTRIOButton sidebar-parent" onClick={() => switchdisplaysetting()}><MenuOpenRoundedIcon />Menu{(displaymenu ? <Sidebar /> : null)}</button></div>
                </div>
                <div className="navSD">
                    <h6 className="navuserinfo">
                        {
                            (state.name.length > 0 ? <Displayuserdetail name={state.name} email={state.email} /> : <div className='loading'><span className="spinner-border spinner-border-sm" /> Loading...</div>)
                        }
                    </h6>
                </div>
                <div className="navSD">
                    <div className="navFDC"><button onClick={clearrecord} className="navTRIOButton"><LogoutRoundedIcon /> Logout</button></div>
                </div>
            </div>
            <div className='outletScreen'>
                <Outlet />
            </div>
            <div className='Footer'>
                <FooterComp />
            </div>
        </>
    )
}


export function Displayuserdetail(props) {
    return (
        <div><SupervisedUserCircleRoundedIcon />{"Hello! " + props.name.charAt(0).toUpperCase() + props.name.slice(1)}{" "}<EmailRoundedIcon />{props.email}</div>
    )
}

export function clearrecord() {
    window.location.href = '/';
    // Replace the current page in the history with the target URL
    window.history.replaceState(null, null, '/');
    
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('fullname')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('localuser')
    sessionStorage.removeItem('verificationToken');
}