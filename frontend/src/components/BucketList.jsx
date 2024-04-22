import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BucketList.css'

function BucketList() {
    const [bucketList, setBucketList] = useState([]);
    const [urlToAdd, setUrlToAdd] = useState('');
    const [shortNameToAdd, setShortNameToAdd] = useState('');

    useEffect(() => {
        const storedBucketList = JSON.parse(localStorage.getItem('bucketList'));
        console.log("Stored Bucket List:", storedBucketList);
        if (storedBucketList) {
            setBucketList(storedBucketList);
        }
    }, []);
    

    useEffect(() => {
        localStorage.setItem('bucketList', JSON.stringify(bucketList));
    }, [bucketList]);

    const addToBucketList = () => {
        if (urlToAdd.trim() !== '' && shortNameToAdd.trim() !== '') {
            const newItem = { url: urlToAdd, shortName: shortNameToAdd, showUrl: false };
            setBucketList([...bucketList, newItem]);
            setUrlToAdd('');
            setShortNameToAdd('');
            console.log("New Item Added to Bucket List:", newItem);
        }
    };
    
    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
    };

    const toggleDisplayUrl = (shortName) => {
        console.log("Toggling display for:", shortName);
        const updatedBucketList = bucketList.map(item => {
            if (item.shortName === shortName) {
                return { ...item, showUrl: !item.showUrl };
            }
            return item;
        });
        setBucketList(updatedBucketList);
        console.log("Updated Bucket List:", updatedBucketList);
        const selectedItem = updatedBucketList.find(item => item.shortName === shortName);
        if (selectedItem.showUrl) {
            copyToClipboard(selectedItem.url);
        }
    };
    

    return (
        <div className="bucket-list-container">
            <h2>Bucket List</h2>
            <div className="bucket-list">
                {bucketList.map((item, index) => (
                    <div key={index} className="bucket-list-item">
                        <button onClick={() => toggleDisplayUrl(item.shortName)}>{item.shortName}</button>
                        {item.showUrl && <span>{item.url}</span>}
                    </div>
                ))}
            </div>
            <div className="add-to-bucket">
                <input type="text" value={urlToAdd} onChange={(e) => setUrlToAdd(e.target.value)} placeholder="Enter URL" />
                <input type="text" value={shortNameToAdd} onChange={(e) => setShortNameToAdd(e.target.value)} placeholder="Enter Short Name" />
                <button onClick={addToBucketList}>Add</button>
            </div>
        </div>
    );
}

export default BucketList;
