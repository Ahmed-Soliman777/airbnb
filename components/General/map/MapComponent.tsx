"use client"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'

interface MapProps {
    center: [number, number],
    price?: number
}

const MapComponent = ({
    center,
    price
}: MapProps) => {

    // add marker icon for leadlet map marker
    const customIcon = new Icon({
        iconUrl: '/marker-icon.png',
        iconSize: [32, 42],
        iconAnchor: [32, 42],
        popupAnchor: [0, -42]
    })

    return (
        <div className="relative w-full h-full overflow-hidden border border-gray-200 shadow-sm">
            <MapContainer
                center={center}
                zoom={center ? 8 : 4}
                scrollWheelZoom={true}
                className='w-full h-full'
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    position={center}
                    icon={customIcon}
                >
                    {price &&
                        <Popup>
                            <p className="font-semibold">${price} / night</p>
                        </Popup>
                    }
                </Marker>
            </MapContainer>
        </div>
    )
}

export default MapComponent
