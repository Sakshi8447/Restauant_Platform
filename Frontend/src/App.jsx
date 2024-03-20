import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home.jsx"
import About from "./pages/About.jsx"
import AddRestaurant from "./pages/AddRestaurant.jsx"
import AddDish from "./pages/AddDish.jsx"
import Header from "./components/Header.jsx";
// import dotenv from "dotenv"

// dotenv.config();

const App = () => {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<AddRestaurant />} />
                <Route path="/addDish" element={<AddDish />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;