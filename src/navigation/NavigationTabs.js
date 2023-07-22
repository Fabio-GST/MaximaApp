import HomeScreen from '../Screens/Home/HomeScreen';
import ShopScreen from '../Screens/Shop/ShopScreen';
import AnalysisScreen from '../Screens/Analyse/AnalysisScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';

export const TabArr = [
  { route: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { route: 'Shop', label: 'Shop', icon: 'store', component: ShopScreen },
  { route: 'Analysis', label: 'Analysis', icon: 'analytics', component: AnalysisScreen },
  { route: 'Profile', label: 'Profile', icon: 'person', component: ProfileScreen },
];
