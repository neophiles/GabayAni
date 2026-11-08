import { useState, useEffect, useCallback } from "react";

const useUserLocation = () => {
  const [location, setLocation] = useState<GeolocationCoordinates | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = useCallback((): Promise<GeolocationCoordinates> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const errorMsg = "Geolocation is not supported by this browser.";
        setError(errorMsg);
        return reject(new Error(errorMsg));
      }

      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(position.coords);
          setIsLoading(false);
          resolve(position.coords);
        },
        (err) => {
          let errorMsg = "An unknown error occurred."
          
          if (err.code == err.PERMISSION_DENIED) {
            errorMsg = "Please enable location permissions in your browser settings."
          }

          else if (err.code === err.POSITION_UNAVAILABLE || err.code === err.TIMEOUT) {
            errorMsg = "Please turn on location services on your device."
          }

          setError(errorMsg);
          setIsLoading(false);
          reject(new Error(errorMsg));
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }, []);

  useEffect(() => {
    getLocation().catch(() => {

    })
  }, [getLocation]);

  return { location, error, isLoading, getLocation };
};

export default useUserLocation;
