import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Heart from "./pages/Heart.jsx";
import WillYouBeMyValentine from "./pages/WillYouBeMyValentine.jsx";
import Gallery from "./pages/Gallery.jsx";
import {useEffect} from "react";
import SheSaidYes from "./pages/SheSaidYes.jsx";

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
                <Route path="*" element={<h2 className="min-h-dvh min-w-dvw flex justify-center items-center">Вы попали куда-то не туда...</h2>}/>
                <Route path="/heart" element={<Heart/>}/>
                <Route path="/beMyValentine" element={<WillYouBeMyValentine/>}/>
                <Route path="/sheSaidYes" element={<SheSaidYes/>}/>
                <Route path="/gallery" element={<Gallery/>}/>
            </Routes>
        </>
    );
};

export default App;