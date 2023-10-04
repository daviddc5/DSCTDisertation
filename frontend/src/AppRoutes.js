//AppRoutes.js
import React, { useContext, useState, useEffect } from "react";
import { Route, Navigate, Routes } from 'react-router-dom';

// Components for routing and authentication
import ProtectedRoute from './ProtectedRoute';
import LoginPage from './LoginPage';

// Pages for the application's main features
import HomePage from "./HomePage/HomePage";
import SettingsPage from "./Settings/SettingsPage";
import StatisticsPage from "./StatisticsPage/StatisticsPage";
import WeeklyPage from "./WeeklyPage/WeeklyPage";
import SocialPage from "./SocialPage/SocialPage";
import NewTask from "./NewTask/NewTask";
import TodayPage from "./TodayPage/TodayPage";

// Sample data to initialize the app with
import InitialTodos from "./NewTask/InitialTodos";

// Context that provides Firebase functionality across the app
import FirebaseContext from "./FirebaseContext";

function AppRoutes() {

  // Extracting the current user from FirebaseContext to check authentication status
  const { currentUser } = useContext(FirebaseContext);

  // Initialize state for task list with either stored tasks or initial sample tasks
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : InitialTodos;
  });

  // Initialize state for task completion statistics and read from localStorage
  const [chartData, setChartData] = useState(() => {
    const storedChartData = localStorage.getItem("chartData");
    return storedChartData ? JSON.parse(storedChartData) : [];
  });

  // State for storing task completion stats for different time periods
  const [completionOfTasksStats, setCompletionOfTasksStats] = useState(() => {
    const storedStats = localStorage.getItem("completionOfTasksStats");
    return storedStats ? JSON.parse(storedStats) : { shortTerm: {}, longTerm: {} };
  });

  // Default settings for the task timer feature
  const [timerSettings, setTimerSettings] = useState({
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  });

  // Function to handle timer settings change from the Settings page
  const handleSettingsChange = (newSettings) => {
    setTimerSettings(newSettings.timerSettings);
  };

  // Update localStorage whenever task completion stats change
  useEffect(() => {
    localStorage.setItem("completionOfTasksStats", JSON.stringify(completionOfTasksStats));
  }, [completionOfTasksStats]);

  // Update localStorage whenever the list of tasks changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Update localStorage whenever task completion statistics change
  useEffect(() => {
    localStorage.setItem("chartData", JSON.stringify(chartData));
  }, [chartData]);


  return (
    <Routes>
      {/* Public route for the login page */}
      <Route path="/login" component={LoginPage} exact />
      
      {/* Root route, i.e., homepage of the application */}
      <ProtectedRoute 
        path="/" 
        element={<HomePage />} 
        index={true} 
        isAuthenticated={currentUser} 
        exact 
      />
      
      {/* Route for the settings page where users can change app settings */}
      <ProtectedRoute 
        path="/settings" 
        element={<SettingsPage onSettingsChange={handleSettingsChange} />} 
        isAuthenticated={currentUser} 
        exact 
      />
      
      {/* Route for the statistics page that displays task completion statistics */}
      <ProtectedRoute 
        path="/statistics" 
        element={<StatisticsPage todos={todos} chartData={chartData} setChartData={setChartData} completionOfTasksStats= {completionOfTasksStats} />} 
        isAuthenticated={currentUser} 
        exact 
      />
      
      {/* Route for the weekly overview of tasks */}
      <ProtectedRoute 
        path="/weekly" 
        element={<WeeklyPage todos={todos} setTodos={setTodos} />} 
        isAuthenticated={currentUser} 
        exact 
      />
      
      {/* Route for the social page to see social interactions or shared tasks */}
      <ProtectedRoute 
        path="/social" 
        element={<SocialPage todos={todos} />} 
        isAuthenticated={currentUser} 
        exact 
      />
      
      {/* Route to add a new task */}
      <ProtectedRoute 
        path="/newTask" 
        element={<NewTask todos={todos} setTodos={setTodos} completionOfTasksStats= {completionOfTasksStats} setCompletionOfTasksStats={setCompletionOfTasksStats} />} 
        isAuthenticated={currentUser} 
        exact 
      />
      
      {/* Route for today's tasks and activities */}
      <ProtectedRoute 
        path="/today" 
        element={
          <TodayPage 
            todos={todos} 
            setTodos={setTodos} 
            initialTodos={InitialTodos} 
            timerSettings={timerSettings} 
            chartData={chartData} 
            setChartData={setChartData} 
          />
        } 
        isAuthenticated={currentUser} 
        exact 
      />
  
      {/* If no route matches, redirect the user to the login page */}
      <Navigate to="/login" replace={true}/>
    </Routes>
  );
  
}

export default AppRoutes;
