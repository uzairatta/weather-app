import React, { useState } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    
    setLoading(true);
    setError('');
    setWeather('');
    
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const apiUrl = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
      
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const data = await response.json();
      
      if (data && data.current_condition) {
        const temp = data.current_condition[0].temp_C;
        const humidity = data.current_condition[0].humidity;
        const weatherDesc = data.current_condition[0].weatherDesc[0].value;
        
        setWeather(`${city.toUpperCase()} • ${temp}°C • 💧 ${humidity}% • ${weatherDesc}`);
      } else {
        setError('City not found. Try "London" or "New York"');
      }
    } catch (err) {
      console.log(err);
      setError('Unable to fetch weather. Please try another city.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 duration-300">
        
        {/* Title with more space */}
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
          Weather App
        </h1>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter city name..."
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="flex-1 px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
            >
              {loading ? 'Loading...' : 'Check'}
            </button>
          </div>
        </form>
        
        {/* Weather Display Area */}
        <div className="bg-gray-100 rounded-xl p-6 min-h-[120px] shadow-inner">
          {loading && (
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 text-lg">Fetching weather...</p>
            </div>
          )}
          
          {weather && (
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-800">
                {weather}
              </p>
            </div>
          )}
          
          {error && (
            <div className="text-center">
              <p className="text-red-600 text-lg font-medium">
                {error}
              </p>
            </div>
          )}
          
          {!weather && !error && !loading && (
            <div className="text-center">
              <p className="text-gray-500 text-lg">
                🌤️ Enter a city name above to check the weather
              </p>
            </div>
          )}
        </div>
        
        {/* Footer hint */}
        <p className="text-xs text-center text-gray-500 mt-6">
          Try: London, Tokyo, New York, Dubai
        </p>
      </div>
    </div>
  );
};

export default WeatherApp;