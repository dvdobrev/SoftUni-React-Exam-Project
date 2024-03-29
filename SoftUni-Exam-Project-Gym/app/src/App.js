
import { Routes, Route } from 'react-router-dom';

import { UserProvider } from './contexts/UserContext';


import { Header } from './components/Header';
import { MainBanner } from './components/MainBanner';
import { CallToAction } from './components/CallToAction';
import { Trainers } from './components/Trainers';
import { ContakUsArea } from './components/ContaktUsArea';
import { Classes } from "./components/Classes";
// import { Programs } from "./components/Programs";
import { PlansCatalog } from './components/Plans/PlansCatalog';
import { PageNotFound } from './components/PageNotFound';
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import { Logout } from './components/Logout';

import { MyPlans } from './components/Plans/MyPlans';
import { CreatePlan } from "./components/Plans/CreatePlan";
import { EditPlan } from './components/Plans/EditPlan';
import { PlanDetails } from './components/Plans/PlanDetails';

import { Footer } from './components/Footer';
import { RoutGuard } from './routGuards/RoutGuard';
import { LoginGuard } from './routGuards/LoginGuard';

import { PlanProvider } from './contexts/PlanContext';

import { useLocalStorage } from './hooks/useLocalStorage';
import { Profile } from './components/Profil';
import { EditProfile } from './components/EditProfile';

function App() {
    // useEffect(() => {
    //     // Clear local storage on component mount
    //     localStorage.clear();
    // }, []);

    const [userData, setUserData] = useLocalStorage('userData', {});

    return (

        <UserProvider>

            <div className="App">

                <Header />
                <Routes>
                    <Route path="/" element={
                        <main>
                            <MainBanner />
                            <CallToAction />
                        </main>}
                    />

                    <Route path="/trainers" element={<Trainers />} />
                    {/* <Route path="/programs" element={<Programs />} /> */}
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/contact" element={<ContakUsArea />} />
                </Routes>

                <PlanProvider>
                    <Routes>
                        <Route path="/plansCatalog" element={<PlansCatalog />} />
                        <Route path="/pageNotFound" element={<PageNotFound />} />
                        {/* <Route path="/profile" element={<Profile userData={userData} />} />
                        <Route path="/profile/edit" element={<EditProfile />} /> */}

                        <Route element={<RoutGuard />}>
                            <Route path="/myPlans" element={<MyPlans />} />
                            <Route path="/createPlan" element={<CreatePlan />} />
                            <Route path="/plans/:planId/edit" element={<EditPlan />} />
                            <Route path="/profile" element={<Profile userData={userData} />} />
                            <Route path="/profile/edit" element={<EditProfile />} />
                        </Route>

                        <Route path="/plans/:planId/details" element={<PlanDetails />} />

                        <Route element={<LoginGuard />}>

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route element={<RoutGuard />}>
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Routes>
                </PlanProvider>

                <Footer />

            </div>
        </UserProvider >
    );
}

export default App;
