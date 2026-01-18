import React, { useState, useEffect } from 'react';
import { Battery, BatteryCharging, MapPin, Wifi, Clock, CloudSun, Navigation } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ApiShowcaseProps {
  theme: ThemeConfig;
}

// Extend Navigator interface for experimental Battery API
interface BatteryManager {
  level: number;
  charging: boolean;
  addEventListener: (type: string, listener: () => void) => void;
  removeEventListener: (type: string, listener: () => void) => void;
}

interface NavigatorWithBattery extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export const ApiShowcase: React.FC<ApiShowcaseProps> = ({ theme }) => {
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState(false);
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<{ city: string; country: string; ip: string } | null>(null);
  const [weather, setWeather] = useState<{ temp: number; windspeed: number } | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(true);
  const [isGPS, setIsGPS] = useState(false);

  // Time API
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Battery API
  useEffect(() => {
    const nav = navigator as NavigatorWithBattery;
    if (nav.getBattery) {
      nav.getBattery().then((battery) => {
        const updateBattery = () => {
          setBatteryLevel(Math.floor(battery.level * 100));
          setIsCharging(battery.charging);
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
        
        return () => {
            battery.removeEventListener('levelchange', updateBattery);
            battery.removeEventListener('chargingchange', updateBattery);
        }
      });
    }
  }, []);

  // Geolocation (GPS + IP Fallback) & Weather
  useEffect(() => {
    const fetchData = async () => {
      let lat: number | undefined;
      let lon: number | undefined;
      let city: string | undefined;
      let country: string | undefined;
      let ip: string | undefined;
      let usedGPS = false;

      setLoadingGeo(true);

      // 1. Try Browser Geolocation (Most Precise - GPS/Wi-Fi)
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) return reject('Geolocation not supported');
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          });
        });

        lat = position.coords.latitude;
        lon = position.coords.longitude;
        usedGPS = true;

        // Reverse Geocode for City Name (Using BigDataCloud Free API)
        const geoNameRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
        );
        const geoNameData = await geoNameRes.json();
        
        // Extract the most relevant locality name
        city = geoNameData.city || geoNameData.locality || geoNameData.principalSubdivision;
        country = geoNameData.countryName;
        
        // Fetch IP separately (since GPS doesn't provide it)
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            ip = ipData.ip;
        } catch {
            ip = "Secured / Hidden";
        }

      } catch (gpsError) {
        console.warn("GPS Access Failed/Denied, falling back to IP Geolocation");
        
        // 2. Fallback: IP Geolocation (ipapi.co / ipwho.is)
        try {
            // Try Primary IP Service
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000);
            const response = await fetch('https://ipapi.co/json/', { signal: controller.signal });
            clearTimeout(timeoutId);
            
            if (!response.ok) throw new Error('Primary API failed');
            const data = await response.json();
            
            if (data.error) throw new Error(data.reason || 'API Error');

            lat = data.latitude;
            lon = data.longitude;
            city = data.city;
            country = data.country_name;
            ip = data.ip;
        } catch (e) {
            // Fallback to ipwho.is
            try {
                const response = await fetch('https://ipwho.is/');
                if (!response.ok) throw new Error('Fallback API failed');
                const data = await response.json();
                
                if (!data.success) throw new Error('Fallback API returned failure');

                lat = data.latitude;
                lon = data.longitude;
                city = data.city;
                country = data.country;
                ip = data.ip;
            } catch (fallbackError) {
                console.warn("All Geo-IP services unreachable.");
            }
        }
      }

      if (city && country) {
         setLocation({ city, country, ip: ip || 'Unknown' });
         setIsGPS(usedGPS);
      }

      // Fetch Weather if lat/lon exists (Works for both GPS and IP coords)
      // This ensures weather is precise to the exact coordinates
      if (lat && lon) {
        try {
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
            const weatherData = await weatherRes.json();
            setWeather({
              temp: weatherData.current_weather.temperature,
              windspeed: weatherData.current_weather.windspeed
            });
        } catch (e) {
            console.warn("Weather fetch failed");
        }
      }
      
      setLoadingGeo(false);
    };

    fetchData();
  }, []);

  const Card = ({ title, children, icon: Icon }: { title: string, children?: React.ReactNode, icon: any }) => (
    <div className={`${theme.colors.surface} ${theme.colors.border} border p-4 ${theme.radius} flex items-center space-x-4 shadow-sm`}>
      <div className={`p-3 ${theme.colors.secondary} rounded-full`}>
        <Icon className={`w-6 h-6 ${theme.colors.accent}`} />
      </div>
      <div className="flex-1">
        <h3 className={`text-xs uppercase tracking-wider ${theme.colors.muted} mb-1`}>{title}</h3>
        <div className={`font-bold ${theme.colors.text} text-lg leading-tight`}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className={`text-2xl font-bold ${theme.colors.text} mb-2`}>System & Environment</h2>
        <p className={theme.colors.muted}>Real-time data fetched via Browser Geolocation (GPS) & Web APIs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Battery */}
        <Card title="Device Power" icon={isCharging ? BatteryCharging : Battery}>
          {batteryLevel !== null ? (
            <span className="flex items-center gap-2">
              {batteryLevel}% {isCharging && <span className="text-xs text-green-500 animate-pulse">(Charging)</span>}
            </span>
          ) : (
            <span className="text-sm">Not Available</span>
          )}
        </Card>

        {/* Time */}
        <Card title="System Time" icon={Clock}>
          {time.toLocaleTimeString()}
        </Card>

        {/* Location */}
        <Card title="Digital Footprint" icon={isGPS ? Navigation : MapPin}>
          {loadingGeo ? (
            <span className="animate-pulse">Locating...</span>
          ) : location ? (
            <div className="flex flex-col">
               <span className="flex items-center gap-2 flex-wrap">
                 {location.city}, {location.country}
                 {isGPS && <span className={`text-[10px] ${theme.colors.primary} text-white px-1.5 py-0.5 rounded-full font-bold shadow-sm`}>GPS ACTIVE</span>}
               </span>
               <span className={`text-xs ${theme.colors.muted}`}>{location.ip}</span>
            </div>
          ) : (
            "Location Hidden"
          )}
        </Card>

        {/* Weather */}
        <Card title="Local Weather" icon={CloudSun}>
          {weather ? (
            <span>{weather.temp}°C <span className="text-xs">Wind: {weather.windspeed}km/h</span></span>
          ) : (
            "N/A"
          )}
        </Card>
      </div>
      
      <div className={`mt-6 p-4 ${theme.colors.secondary} ${theme.radius} border ${theme.colors.border}`}>
        <div className="flex items-start gap-3">
            <Wifi className={`w-5 h-5 ${theme.colors.accent} mt-1`} />
            <div>
                <h4 className={`font-bold ${theme.colors.text}`}>Live Connectivity</h4>
                <p className={`text-sm ${theme.colors.muted}`}>
                    You are currently accessing this portfolio via a secure connection. 
                    {isGPS 
                      ? " Your location is being verified via High-Precision GPS integration." 
                      : " Your location is estimated via IP Address."}
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};