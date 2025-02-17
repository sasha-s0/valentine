import {Navigate, Route, Routes} from "react-router-dom";
import Heart from "./pages/Heart.jsx";
import WillYouBeMyValentine from "./pages/WillYouBeMyValentine.jsx";
import Gallery from "./pages/Gallery.jsx";
import SheSaidYes from "./pages/SheSaidYes.jsx";
import ProtectInformation from "./pages/ProtectInformation.jsx";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// eslint-disable-next-line react/prop-types
const RequireAuth = ({children}) => {
    const key = localStorage.getItem("SECRET_KEY");
    return key === SECRET_KEY ? children : <Navigate to="/heart" replace />;
};

const App = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Heart/>}/>
                <Route path="/beMyValentine" element={<WillYouBeMyValentine/>}/>
                <Route path="/sheSaidYes" element={<SheSaidYes/>}/>
                <Route path="/protected" element={<ProtectInformation/>}/>
                <Route path="/gallery" element={<RequireAuth><Gallery /></RequireAuth>} />
            </Routes>
        </>
    );
};

export default App;