import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import UploadCertificate from './pages/UploadCertificate/UploadCertificate';
import DocumentsThumbnail from './pages/DocumentsThumbnail';
import LibraryComponent from './pages/DeparmentWisePage/LIibrary/LibraryComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}>
              <Route path='/' element={<LibraryComponent/>}/>
              <Route path='add' element={<DocumentsThumbnail/>}/>
              <Route path='upload' element={<UploadCertificate/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
