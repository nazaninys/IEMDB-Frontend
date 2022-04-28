import './App.css';
import Navbar from './common/Navbar';
import Movies from './Movies/Movies';
import Movie from "./Movie/Movie";
import Login from "./Login/Login";
import {BrowserRouter, Navigate, Route, Routes, Outlet} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getMovie} from "./Services/Movie";
import Actor from './Actor/Actor';
import Watchlist from "./Watchlist/Watchlist";
import ProtectedRoute from "./common/Test";
import ProtectedRoutes from "./common/Test";
import {toast} from "react-toastify";


toast.configure();
function App() {
    const [showToast, setShowToast] = useState(false);
    const [searchBy, setSearchBy] = useState("name");
    const [searchValue, setSearchValue] = useState("");
    const changeSearchOptions = (newSearchBy, newSearchValue) => {
        setSearchBy(newSearchBy);
        setSearchValue(newSearchValue);
    }

    const showLogoutToast = () => {
        setShowToast(true);
        toast.info("You logged out successfully");
    }



    const routes =(
        <Routes>
            <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue} showToast={showToast}/>} />
            <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route path="/movies/:movieId" element={<Movie />}/>
            <Route path="/actors/:actorId" element={<Actor />}/>
            <Route path="/watchlist" element={<Watchlist /> } />
        </Routes>
    )
    const otherRoutes = (
        <Routes>
            <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />
            <Route path="*" element={<Login />}/>
        </Routes>
    )
    const loggedIn = localStorage.getItem("user") == null? false:true;

    return (
        <header>

            <BrowserRouter forceRefresh={true}>
                <Navbar searchDetails={changeSearchOptions} showLogoutToast={showLogoutToast} />
                {/*<Routes forceRefresh={true}>*/}
                {/*    <Route path="/login" element={<Login setLogin={changeLogin} login={loggedIn}/>}/>*/}
                {/*    <Route element={<ProtectedRoutes login={loggedIn}/>} >*/}

                {/*    <Route exact path="/" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />*/}
                {/*    <Route exact path="/movies" element={<Movies searchBy={searchBy} searchValue={searchValue}/>} />*/}
                {/*    <Route path="/movies/:movieId" element={<Movie />}/>*/}
                {/*    <Route path="/movies/:movieId" element={<RequireAuth> <Movie/> </RequireAuth>}/>*/}

                {/*    <Route path="/actors/:actorId" element={<Actor />}/>*/}
                {/*    <Route path="/watchlist" element={<Watchlist /> } />*/}
                {/*</Route>*/}
                {/*    /!*<Route children={<Movies />}/>*!/*/}

                {/*    <Route path="*" element={<p>There's nothing here: 404!</p>} />*/}

                {/*</Routes>*/}
                {loggedIn ? routes : otherRoutes}

            </BrowserRouter>
        </header>
    );
}




function RequireAuth({ children }) {
    const { authed } = JSON.parse(localStorage.getItem("loggedIn"));

    return authed === true ? <Outlet /> : <Navigate to="/login" replace />;
}

// function ProtectedRoute({ component: Component, ...restOfProps }) {
//     const isAuthenticated = localStorage.getItem("loggedIn");
//     console.log("this", isAuthenticated);
//
//     return (
//         <Route
//             {...restOfProps}
//             render={(props) =>
//                 isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
//             }
//         />
//     );
// }

export default App;
