import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import UploadCertificate from './pages/UploadCertificate/UploadCertificate';
import DocumentsThumbnail from './pages/DocumentsThumbnail';
import LibraryComponent from './pages/DeparmentWisePage/LIibrary/LibraryComponent';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Marksheet from './UploadMarksheet/Marksheet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute/>}>
              <Route path='/home' element={<Home/>}>
                <Route path='' element={<LibraryComponent/>}/>
                <Route path='add' element={<DocumentsThumbnail/>}/>
                <Route path='upload' element={<UploadCertificate/>}/>
                <Route path='marksheet' element={<Marksheet/>}/>
              </Route>
            </Route>
            <Route path='/' element={<AdminLogin/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
