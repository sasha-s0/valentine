import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Letter from "./pages/Letter.jsx";
import Gallery from "./pages/Gallery.jsx";
import {useEffect} from "react";

const App = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate("/heart", {replace: true});
        }
    }, [location.pathname, navigate]);


    return (
        <>
            <Routes>
                <Route path="/" element={<h2>Love is loading...</h2>}/>
                <Route path="/heart" element={<Home/>}/>
                <Route path="/valentine" element={<Letter/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
            </Routes>
        </>
    );
};

export default App;