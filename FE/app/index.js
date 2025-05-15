import { registerRootComponent } from 'expo';

import App from './App';
import Login from './components/Login/Login';
import Home from './components/ChatRoomList/Home';
import ChatRoom from './components/ChatRoom/ChatRoom';


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
