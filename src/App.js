import React from 'react'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Card from './components/Card'
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Admin_Dashboard from './components/Admin_Dashboard/Admin_Dashboard';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path='/admin' element={<Admin_Dashboard/>}/>
                </Routes>
            </Router>
            <Card
                url="#"
                img_url="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp"
                card_text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure dignissimos, itaque quia laboriosam debitis enim reprehenderit voluptas placeat? Id, inventore. Rerum laboriosam suscipit cum sunt nemo, asperiores harum aspernatur velit cupiditate tempora expedita nihil unde eius officia impedit, aliquam ut fugiat qui libero."
                name="John Doe"
            />
        </>
    )
}

export default App