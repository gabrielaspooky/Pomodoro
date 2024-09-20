import React, { useState } from 'react';
import UserCard from "../components/ui/UserCard"
import SetDailyTask from '../components/ui/DailyTask'; // Ajusta la ruta si es necesario

const ParentComponent = ({ username }) => {
  const [activity, setActivity] = useState('');

  const handleActivitySelect = (selectedActivity) => {
    setActivity(selectedActivity);
  };

  return (
    <div>
      <UserCard username={username} activity={activity} /> {/* Pasar username y actividad */}
      <SetDailyTask onActivitySelect={handleActivitySelect} /> {/* Componente para seleccionar actividad */}
    </div>
  );
};

export default ParentComponent;
