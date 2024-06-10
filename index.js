/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

// Ignore specific warning
LogBox.ignoreLogs(['Image source "null" doesn\'t exist']);
LogBox.ignoreLogs(['Request has not been opened']);
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.']);

AppRegistry.registerComponent(appName, () => App);
