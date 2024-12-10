import React, { useState, useEffect } from 'react';
import './YouTu.css';

function Youtube() {
    const [videoItems, setVideoItems] = useState([]);
    const [query, setQuery] = useState('');  // Add state for search query
    const [loading, setLoading] = useState(false);  // Initialize loading state
    const [error, setError] = useState(null);

    const menuItems = [
        { icon: 'fas fa-home', Text: 'Home', active: true },
        { icon: 'fas fa-compass', Text: 'Compass' },
        { icon: 'fas fa-video', Text: 'Video' },
        { icon: 'fas fa-subscriptions', Text: 'subscriptions' },
    ];

    const libraryItems = [
        { icon: 'fas fa-clock', Text: 'Watch Later' },
        { icon: 'fas fa-thumbs-up', Text: 'Like videos' },
        { icon: 'fas fa-chevron-up', Text: 'Show more' },
    ];

    const subscriptionItems = [
        { img: 'https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Ellipse%201%20(2).png?raw=true', alt: 'Nadir In The Go', Text: 'Nadir In The Go' },
        { img: 'https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Ellipse%201%20(1).png?raw=true', alt: 'Coke Studio Bangla', Text: 'Coke Studio Bangla' },
        { img: 'https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Ellipse%201%20(2).png?raw=true', alt: 'MKBHD', Text: 'MKBHD' },
        { img: 'https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Ellipse%201%20(3).png?raw=true', alt: 'Figma', Text: 'Figma' },
        { img: 'https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Ellipse%201%20(4).png?raw=true', alt: 'ATC Android ToTo Company', Text: 'ATC Android ToTo Company' },
        { img: 'https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Ellipse%201%20(5).png?raw=true', alt: 'Alux.com', Text: 'Alux.com' },
    ];

    const filterButtons = [
        'All', 'Cook Studio', 'Comedy', 'Education', 'Entertainment', 'Gaming', 'How-to',
        'Music', 'News & Politics', 'Sports', 'Travel & Events', 'Videoblogging', 'World', 'More'
    ];

    // Function to fetch videos based on search query
    const fetchVideos = async (searchQuery) => {
        setLoading(true);
        setError(null);

        try {
            const API_KEY = 'AIzaSyCCsNBH--e_U5d--_hla_NlPbjr6ppRxiA';
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${searchQuery}&maxResults=10`);

            if (!response.ok) {
                throw new Error("Failed to fetch data from YouTube API");
            }

            const data = await response.json();

            const formattedData = data.items.map((item) => ({
                id: item.id.videoId,
                img: item.snippet.thumbnails.high.url,
                title: item.snippet.title,
                description: item.snippet.description,
            }));

            setVideoItems(formattedData);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSearch = (event) => {
        event.preventDefault();
        fetchVideos(query);
    };

    return (
        <>
            <div className='youtube-app'> 
                <div className="sidebar"> 
                    <div className="logo"> 
                        <img alt="YouTube Logo" height="50" src="https://github.com/PatelNeelMahesh/frontend_tasks/blob/main/02.youtube-clone/assets/Youtube%20logo.png?raw=true" width="70" /> 
                    </div> 
                    {menuItems.map((item, index) => ( 
                        <a key={index} className={item.active ? 'active' : ''} href="#"> 
                            <i className={item.icon}></i> {item.Text} 
                        </a> 
                    ))} 
                    <div className="section-title">LIBRARY</div> 
                    {libraryItems.map((item, index) => ( 
                        <a key={index} href="#"> 
                            <i className={item.icon}></i> {item.Text} 
                        </a> 
                    ))} <div className="section-title">SUBSCRIPTIONS</div> 
                    {subscriptionItems.map((item, index) => ( 
                        <a key={index} href="#"> 
                            <img alt={item.alt} height="25" src={item.img} width="25" /> {item.Text} 
                        </a> 
                    ))} 
                </div> 
                <div className="main-content"> 
                    <div className="filter-bar"> 
                        <form onSubmit={handleSearch}>
                            <input
                                placeholder="Search"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>
                    </div> 
                    <div className="filter-bar"> 
                        {filterButtons.map((buttonText, index) => ( 
                            <button key={index} className={index === 0 ? 'active' : ''}>{buttonText}</button> 
                        ))} 
                    </div> 
                    <div className="video-grid"> 
                        {loading && <p>Loading videos...</p>}
                        {error && <p>{error}</p>}
                        {videoItems.map((video, index) => ( 
                            <div key={index} className="video-item"> 
                                <img alt={video.title} src={video.img} /> 
                                <div className="video-info"> 
                                    <h3>{video.title}</h3> 
                                    <p>{video.description}</p> 
                                </div> 
                            </div> 
                        ))} 
                    </div> 
                </div> 
            </div>
        </>
    );
}

export default Youtube;
 