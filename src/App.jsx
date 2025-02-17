import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Heart from "./pages/Heart.jsx";
import WillYouBeMyValentine from "./pages/WillYouBeMyValentine.jsx";
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
                <Route path="/heart" element={<Heart/>}/>
                <Route path="/valentine" element={<WillYouBeMyValentine/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
            </Routes>
        </>
    );
};

export default App;