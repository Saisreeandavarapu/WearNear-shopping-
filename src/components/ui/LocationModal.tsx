import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Navigation, Search, Check, X, Clock, Building } from 'lucide-react';

const POPULAR_NEIGHBORHOODS = [
  { name: 'Indiranagar 1st Stage', city: 'Bengaluru', eta: '20-25 mins', stores: 18 },
  { name: 'Koramangala 4th Block', city: 'Bengaluru', eta: '25-30 mins', stores: 24 },
  { name: 'HSR Layout Sector 2', city: 'Bengaluru', eta: '30-35 mins', stores: 15 },
  { name: 'Lavelle Road / MG Road', city: 'Bengaluru', eta: '20-25 mins', stores: 22 },
  { name: 'Jayanagar 4th Block', city: 'Bengaluru', eta: '30-40 mins', stores: 19 },
  { name: 'Whitefield Main Road', city: 'Bengaluru', eta: '35-45 mins', stores: 14 }
];

export const LocationModal: React.FC = () => {
  const { isLocationModalOpen, setIsLocationModalOpen, currentLocation, setCurrentLocation, showToast } = useApp();
  const [searchVal, setSearchVal] = useState('');
  const [detecting, setDetecting] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleSelectLocation = (locName: string) => {
    setCurrentLocation(locName);
    showToast(`Delivery location set to ${locName}`, 'success');
    setIsLocationModalOpen(false);
  };

  const handleDetectGPS = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      const detected = '100ft Road, Indiranagar, Bengaluru';
      setCurrentLocation(detected);
      showToast('Detected accurate current location via GPS', 'success');
      setIsLocationModalOpen(false);
    }, 1000);
  };

  const filteredLocalities = POPULAR_NEIGHBORHOODS.filter((item) =>
    item.name.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 text-brand-text">
      {/* Backdrop */}
      <div
        onClick={() => setIsLocationModalOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Content */}
      <div className="relative z-10 bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-float max-h-[90vh] flex flex-col overflow-hidden animate-slide-up border border-brand-border">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-brand-cream/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-brand-blue-light flex items-center justify-center text-brand-blue">
              <MapPin className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <h3 className="font-editorial font-bold text-brand-text text-base sm:text-lg">Select Delivery Location</h3>
              <p className="text-xs text-brand-muted">Hyperlocal fashion delivered in 30-45 mins</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-full text-brand-muted hover:text-brand-text hover:bg-brand-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search area, landmark or apartment..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-cream/40 border border-brand-border rounded-xl text-sm focus:outline-none focus:border-brand-blue transition-colors text-brand-text"
            />
          </div>

          {/* GPS Detect button */}
          <button
            onClick={handleDetectGPS}
            disabled={detecting}
            className="w-full flex items-center justify-between p-3.5 rounded-xl border border-dashed border-brand-border hover:border-brand-blue hover:bg-brand-blue-light/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-blue-light flex items-center justify-center text-brand-blue group-hover:scale-105 transition-transform">
                <Navigation className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-text">
                  {detecting ? 'Detecting high precision GPS...' : 'Use Current Device Location'}
                </p>
                <p className="text-xs text-brand-muted">Fast pinpoint using browser geolocation</p>
              </div>
            </div>
            <span className="text-xs font-bold text-brand-blue">Locate Me</span>
          </button>

          {/* Popular Neighborhoods List */}
          <div>
            <p className="text-xs font-bold text-brand-muted uppercase tracking-wider mb-2">
              Popular Hubs in Your City
            </p>
            <div className="space-y-1.5">
              {filteredLocalities.map((item) => {
                const isSelected = currentLocation.includes(item.name.split(' ')[0]);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleSelectLocation(`${item.name}, ${item.city}`)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-left ${
                      isSelected
                        ? 'bg-brand-blue-light/60 border border-brand-blue/30 text-brand-blue font-medium'
                        : 'hover:bg-brand-cream/50 border border-transparent text-brand-text'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building className={`w-4 h-4 ${isSelected ? 'text-brand-blue' : 'text-brand-muted'}`} />
                      <div>
                        <p className="text-xs sm:text-sm font-medium">{item.name}</p>
                        <p className="text-[11px] text-brand-muted">{item.stores} Verified Boutique Stores Nearby</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.eta}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-brand-blue stroke-[2.5]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
