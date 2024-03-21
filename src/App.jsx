import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import SurahSection from "./components/SurahSection/SurahSection";

function App() {
    return (
        <div>
        <Navbar></Navbar>
    <Header></Header>
    <Outlet></Outlet>
    <SurahSection></SurahSection>
        </div>
    );
}

export default App;
