import {useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const [state, setstate] = useState(0);

  const navItems = [
    { text: 'Dashboard', link: '/user/Dashbaord' },
    { text: 'Flights', link: '/user/Dashbaord/flight' },
    { text: 'weather ', link: '/user/Dashbaord/weather' },
  ];

  useEffect(()=>{
    console.log("State : ",state)
  },[state])

  return (
    <div className="sidebar">
      <ul className="nav-sidebar flex-column">
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <NavLink className={`nav-link ${state === index ? 'active' : ' '}`} to={item.link} onClick={() => setstate(index)}>
              <span>{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};