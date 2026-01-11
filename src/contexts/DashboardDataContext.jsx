import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultDashboardData, validateData } from '../config/dashboardData';

const DashboardDataContext = createContext();

export const useDashboardData = () => {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error('useDashboardData must be used within DashboardDataProvider');
  }
  return context;
};

export const DashboardDataProvider = ({ children }) => {
  const [data, setData] = useState(defaultDashboardData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }, [data]);

  // Update a specific data point using dot notation path
  const updateData = (path, value) => {
    setData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;
      newData.lastModified = new Date().toISOString();
      return newData;
    });
  };

  // Update multiple data points at once
  const updateMultiple = (updates) => {
    setData(prev => {
      const newData = { ...prev };
      Object.entries(updates).forEach(([path, value]) => {
        const keys = path.split('.');
        let current = newData;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      });
      newData.lastModified = new Date().toISOString();
      return newData;
    });
  };

  // Export data as JSON file
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import data from JSON file
  const importData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);

          // Validate imported data
          const errors = validateData(imported);
          if (errors.length > 0) {
            reject(new Error(`Validation errors:\n${errors.join('\n')}`));
            return;
          }

          setData(prev => ({
            ...prev,
            ...imported,
            lastModified: new Date().toISOString()
          }));
          resolve(imported);
        } catch (err) {
          reject(new Error('Invalid JSON format'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  // Reset to default data
  const resetData = () => {
    if (window.confirm('确定要重置所有数据为默认值吗？此操作不可撤销。')) {
      setData({ ...defaultDashboardData, lastModified: new Date().toISOString() });
    }
  };

  const value = {
    data,
    updateData,
    updateMultiple,
    exportData,
    importData,
    resetData
  };

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
};
