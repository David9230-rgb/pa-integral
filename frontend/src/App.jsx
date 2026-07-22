import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Login from "./pages/Login";
import Mozo from "./pages/Mozo";
import Cocinero from "./pages/Cocinero";
import Register from "./pages/Register";


function App(){

return(

<BrowserRouter>

<Routes>

<Route 
path="/"
element={<Login/>}
/>


<Route
path="/mozo"
element={<Mozo/>}
/>


<Route
path="/cocinero"
element={<Cocinero/>}
/>

<Route
path="/register"
element={<Register />} />



</Routes>


</BrowserRouter>

)

}


export default App;