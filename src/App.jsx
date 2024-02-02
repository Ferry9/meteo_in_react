import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './assets/pages/Home'
import './App.css'





export default function App(){
  return(
    
    <>

      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Home />} />
            <Route path='/Home' element={<Home/>}/>
           
          </Route>
        </Routes>
      </BrowserRouter>
    
    
    </>

    )
    
}

