import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/landingPage/LandingPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </div>
    );
}

export default App;
