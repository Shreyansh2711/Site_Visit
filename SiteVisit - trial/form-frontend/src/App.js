import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from 'protected-route-react';
import { useDispatch, useSelector } from 'react-redux';
import LogIn from './Components/Authentication/LogIn';
import Register from './Components/Authentication/Register';
import Home from './Components/Home';
import AdminPage from './Components/Admin/AdminPage';
import FrontPage from './Components/FrontPage';
import SiteVisit from './Components/Admin/SiteVisit';
import Inventory from './Components/Inventory/Inventory';
import Items from './Components/Inventory/Items';
import Suppliers from './Components/Inventory/Suppliers';
import InventoryOutwards from './Components/Inventory/InventoryOutwards';
import InventoryInwards from './Components/Inventory/InventoryInwards';
import CreateItem from './Components/Inventory/Item/CreateItem';
import GetAllItems from './Components/Inventory/Item/GetAllItems';
import CreateSupplier from './Components/Inventory/Supplier/CreateSupplier';
import GetAllSupplier from './Components/Inventory/Supplier/GetAllSupplier';
import CreateInventoryInward from './Components/Inventory/InventoryInward/CreateInventoryInward';
import GetAllInventoryInward from './Components/Inventory/InventoryInward/GetAllInventoryInward';
import CreateInventoryOutward from './Components/Inventory/InventoryOutward/CreateInventoryOutward';
import GetAllInventoryOutward from './Components/Inventory/InventoryOutward/GetAllInventoryOutward';



const App = () => {

  const { isAuthenticated, error, message } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log({ isAuthenticated })
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

  }, [dispatch, error, message, isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* login route  */}
        <Route exact path="/login" element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect="/home"
          >
            <LogIn />
          </ProtectedRoute>
        } />

        {/* home route  */}
        <Route exact path="/home" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <Home />
          </ProtectedRoute>
        } />

        {/* register route  */}
        <Route exact path="/register" element={
          <ProtectedRoute
            isAuthenticated={!isAuthenticated}
            redirect="/home"
          >
            <Register />
          </ProtectedRoute>
        } />

        {/* admin page  */}
        <Route exact path="/admin" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <AdminPage />
          </ProtectedRoute>
        } />

        {/* user page  */}
        <Route exact path="/front" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <FrontPage />
          </ProtectedRoute>
        } />

        {/* siteVisit  */}
        <Route exact path="/admin/site-visit" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <SiteVisit />
          </ProtectedRoute>
        } />

        {/* inventory  */}
        <Route exact path="/admin/inventory" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <Inventory />
          </ProtectedRoute>
        } />

        {/* inventory items  */}
        <Route exact path="/admin/inventory/items" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <Items />
          </ProtectedRoute>
        } />

        {/* inventory suppliers  */}
        <Route exact path="/admin/inventory/suppliers" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <Suppliers />
          </ProtectedRoute>
        } />

        {/* inventory outwards  */}
        <Route exact path="/admin/inventory/outwards" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <InventoryOutwards />
          </ProtectedRoute>
        } />

        {/* inventory inwards  */}
        <Route exact path="/admin/inventory/inwards" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <InventoryInwards />
          </ProtectedRoute>
        } />

        {/* create Items  */}
        <Route exact path="/admin/inventory/items/create" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <CreateItem />
          </ProtectedRoute>
        } />

        {/* get all items  */}
        <Route exact path="/admin/inventory/items/all" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <GetAllItems />
          </ProtectedRoute>
        } />

        {/* create Supplier  */}
        <Route exact path="/admin/inventory/suppliers/create" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <CreateSupplier />
          </ProtectedRoute>
        } />

        {/* get all Suppliers  */}
        <Route exact path="/admin/inventory/suppliers/all" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <GetAllSupplier />
          </ProtectedRoute>
        } />

        {/* create Inventory Inwards  */}
        <Route exact path="/admin/inventory/inward/create" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <CreateInventoryInward />
          </ProtectedRoute>
        } />

        {/* get all Inventory Inwards  */}
        <Route exact path="/admin/inventory/inward/all" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <GetAllInventoryInward />
          </ProtectedRoute>
        } />

        {/* create Inventory Outward  */}
        <Route exact path="/admin/inventory/outward/create" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <CreateInventoryOutward />
          </ProtectedRoute>
        } />

        {/* get all Inventory Outwards  */}
        <Route exact path="/admin/inventory/outward/all" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <GetAllInventoryOutward />
          </ProtectedRoute>
        } />

        {/* 404 route  */}
        <Route path="*" element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            redirect="/login"
          >
            <h1>404</h1>
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
    </Router>

  )
}

export default App
