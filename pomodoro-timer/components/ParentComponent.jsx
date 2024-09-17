import React, { useState } from 'react';
import UserCard from './UserCard';
import SetDailyTask from './SetDailyTask';

const ParentComponent = () => {
  const [activity, setActivity] = useState('');
  const userId = 'Pomo User'; 

  const handleActivitySelect = (selectedActivity) => {
    setActivity(selectedActivity);
  };

  return (
    <div>
      <UserCard userId={userId} activity={activity} />
      <SetDailyTask onActivitySelect={handleActivitySelect} />
    </div>
  );
};

export default ParentComponent;
