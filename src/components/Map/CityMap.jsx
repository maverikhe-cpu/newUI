import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CityMap.css';

const createCustomIcon = (status) => {
    // Default is amber (gold)
    const extraClass = status === 'alert' ? 'alert' : '';

    return L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-dot ${extraClass}"></div><div class="marker-pulse ${extraClass}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

const CityMap = ({ onSiteSelect }) => {
    const position = [31.2304, 121.4737]; // Shanghai
    const [sites, setSites] = useState([]);

    useEffect(() => {
        // Generate mock sites clustered around the center
        const mockSites = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            lat: 31.2304 + (Math.random() - 0.5) * 0.15,
            lng: 121.4737 + (Math.random() - 0.5) * 0.15,
            name: `项目 #${String(i + 1).padStart(3, '0')}`,
            address: `浦东新区 科技大道 ${Math.floor(Math.random() * 800) + 1}号`,
            status: Math.random() > 0.95 ? 'alert' : 'active',
            progress: Math.floor(Math.random() * 100),
        }));
        setSites(mockSites);
    }, []);

    return (
        <MapContainer
            center={position}
            zoom={12}
            style={{ height: '100%', width: '100%', background: '#0B1026' }}
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains="abcd"
                maxZoom={19}
            />
            {sites.map(site => (
                <Marker
                    key={site.id}
                    position={[site.lat, site.lng]}
                    icon={createCustomIcon(site.status)}
                    eventHandlers={{
                        click: () => onSiteSelect(site),
                    }}
                />
            ))}
        </MapContainer>
    );
};

export default CityMap;
