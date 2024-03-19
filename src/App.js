
// import './App.css';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
// import Dash from './components/Admin_Dash';

// function App() {
//   return (
//     <div className=" w-full h-auto flex ">
//       <Sidebar/>
//       <div className='flex flex-col w-[80%]'>
//         <Navbar/>
//         <Dash/>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dash from './components/Admin_Dash';
import ClientNavbar from './components/ClientNavbar';
import ClientDash from './components/ClientDash';
import ClientSidebar from './components/ClientSidebar';
import Front from './components/Front';
import AdminLogin from './components/AdminLogin';
import ClientLogin from './components/ClientLogin';
import AdminSignup from './components/AdminSignup';
import ClientSignup from './components/ClientSignup'
import AddProject from './components/AddProject';
import ShowProjects from './components/AdminProjects'
import ClientProjects from './components/ClientProjects'
import AdminProfile from './components/AdminProfile';
import ClientProfile from './components/ClientProfile';
import UpdateProject from './components/UpdateProject';
import { Update } from '@mui/icons-material';
import DetailedProject from './components/DetailedProject';

function App() {
  // const [addedProducts, setAddedProducts] = useState([]);

  // useEffect(() => {
  //   // Load cart items from local storage on initial render
  //   const storedCart = localStorage.getItem('cartItems');
  //   if (storedCart) {
  //     setAddedProducts(JSON.parse(storedCart));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Save cart items to local storage whenever addedProducts changes
  //   localStorage.setItem('cartItems', JSON.stringify(addedProducts));
  // }, [addedProducts]);

  // const updateAddedProducts = (updatedAddedProducts) => {
  //   setAddedProducts(updatedAddedProducts);
  // };

  return (
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/*"
    //       element={
    //         <div className="flex flex-col h-auto">
    //           <div className="h-auto flex">
    //             <Sidebar />
    //             <Routes>
    //               <Route path="/" element={<Home />} />
    //               <Route
    //                 path="/cart"
    //                 element={
    //                   <Cart
    //                     addedProducts={addedProducts}
    //                     updateAddedProducts={updateAddedProducts}
    //                   />
    //                 }
    //               />
    //               <Route
    //                 path="/:categoryId"
    //                 element={
    //                   <DetailedCategory
    //                     addedProducts={addedProducts}
    //                     addToCart={(product) => updateAddedProducts([...addedProducts, product])}
    //                   />
    //                 }
    //               />
    //               <Route
    //                 path="/login"
    //                 element={
    //                   <div className="flex flex-col w-full">
    //                     <Login />
    //                   </div>
    //                 }
    //               />
    //               <Route
    //                 path="/profile"
    //                 element={
    //                   <div className="flex flex-col w-full">
    //                     <ProfilePage />
    //                   </div>
    //                 }
    //               />
    //               <Route
    //                 path="/order"
    //                 element={
    //                   <div className="flex flex-col w-full">
    //                     {/* <Navbar /> */}
    //                     <OrderConfirmation />
    //                   </div>
    //                 }
    //               />
    //               <Route path="/signup" element={<Signup />} />
    //               <Route path="/addproducts" element={<AddDetailForm />} />
    //             </Routes>
    //           </div>
    //           <Footer />
    //         </div>
    //       }
    //     />
    //   </Routes>
    // </Router>
    <Router>
      <Routes>
        <Route path='/'
        element={
          <div className='w-full h-auto flex'>
            <Front/>
          </div>
        }
        />
        <Route path='/admin-login'
        element={
          <div className='w-full h-auto flex'>
            <AdminLogin/>
          </div>
        }
        />
        <Route path='/client-login'
        element={
          <div className='w-full h-auto flex'>
            <ClientLogin/>
          </div>
        }
        />
        <Route path='/admin-signup'
        element={
          <div className='w-full h-auto flex'>
            <AdminSignup/>
          </div>
        }
        />
        <Route path='/client-signup'
        element={
          <div className='w-full h-auto flex'>
            <ClientSignup/>
          </div>
        }
        />
        <Route path='/add-project'
        element={
          <div className='w-full h-auto flex'>
            <AddProject/>
          </div>
        }
        />
        <Route path='/admin-projects'
        element={
          <div className='w-full h-auto flex'>
            <ShowProjects/>
          </div>
        }
        />
        <Route path='/client-projects'
        element={
          <div className='w-full h-auto flex'>
            <ClientProjects/>
          </div>
        }
        />
        <Route path='/admin-projects'
        element={
          <div className='w-full h-auto flex'>
            <ShowProjects/>
          </div>
        }
        />
        <Route path='/detailed-project'
        element={
          <div className='w-full h-auto flex'>
            <DetailedProject/>
          </div>
        }
        />
        <Route path='/admin-profile'
        element={
          <div className='w-full h-auto flex'>
            <AdminProfile/>
          </div>
        }
        />
        <Route path='/client-profile'
        element={
          <div className='w-full h-auto flex'>
            <ClientProfile/>
          </div>
        }
        />
        <Route path='/update-project'
        element={
          <div className='w-full h-auto flex'>
            <UpdateProject/>
          </div>
        }
        />
        {/* <Route path='/client-profile'
        element={
          <div className='w-full h-auto flex'>
            <ClientProfile/>
          </div>
        }
        /> */}
        <Route path="/admin"
        element={
  <div className=" w-full h-auto flex ">
     <Sidebar/>
     <div className='flex flex-col w-[80%]'>
       <Navbar/>
       <Dash/>
     </div>
  </div>
        }
        />
        <Route path="/client"
        element={
  <div className=" w-full h-auto flex ">
     <ClientSidebar/>
     <div className='flex flex-col w-[80%]'>
       <ClientNavbar/>
       <ClientDash/>
     </div>
  </div>
        }
        />

       
      </Routes>

    </Router>
  );
}

export default App;

