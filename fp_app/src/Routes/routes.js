import UserCredentials from "../Screen/UserCredentials";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Defaultlayout from "../layout/DefaultLayout";
import DashBoard from "../Screen/DashBoard";
import FlightDetail from "../Component/Flights";
import WeatherDetail from "../Component/Weather";
import NotFound from "../Component/NotFound";

export default function AppRouting() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<UserCredentials/>} />
                    </Route>
                    <Route path="/user/Dashbaord" element={<Defaultlayout/>}>
                        <Route index element={<DashBoard/>} />
                        <Route path="/user/Dashbaord/flight" element={<FlightDetail/>}/>
                        <Route path="/user/Dashbaord/weather" element={<WeatherDetail/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}