// frontend/src/App.js
import React from 'react';
import ProductTracker from './components/ProductTracker';
import BucketList from './components/BucketList';

function App() {
    return (
        <div>
            <h1>Amazon Product Tracker</h1>
            <ProductTracker />
            <BucketList/>
        </div>
    );
}

export default App;
