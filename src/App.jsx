import {Navigate, Route, Routes} from "react-router-dom";
import Heart from "./pages/Heart.jsx";
import WillYouBeMyValentine from "./pages/WillYouBeMyValentine.jsx";
import Gallery from "./pages/Gallery.jsx";
import SheSaidYes from "./pages/SheSaidYes.jsx";
import ProtectInformation from "./pages/ProtectInformation.jsx";
import Letter from "./pages/Letter.jsx";
import {useEffect} from "react";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// eslint-disable-next-line react/prop-types
const RequireAuth = ({children}) => {
    const key = localStorage.getItem("SECRET_KEY");
    return key === SECRET_KEY ? children : <Navigate to="/heart" replace />;
};

const App = () => {

    useEffect(() => {
        const LOG_SERVER_URL = 'https://telegram-visit-logger-production.up.railway.app/log-visit'; // заменяешь на URL своего сервера (например Railway)

        const data = {
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };

        fetch(LOG_SERVER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(console.error);
    }, [])

    return (
        <>
            <Routes>
                <Route path="*" element={<Heart/>}/>
                <Route path="/beMyValentine" element={<WillYouBeMyValentine/>}/>
                <Route path="/sheSaidYes" element={<SheSaidYes/>}/>
                <Route path="/protected" element={<ProtectInformation/>}/>
                <Route path="/gallery" element={<RequireAuth><Gallery /></RequireAuth>} />
                <Route path="/letter" element={<RequireAuth><Letter /></RequireAuth>} />
            </Routes>
        </>
    );
};

export default App;