import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserLayout from "./layouts/UserLayout/UserLayout";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<UserLayout></UserLayout>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
