import Adapter from 'enzyme-adapter-react-16';
import 'babel-polyfill'; //regeneratedTransform error for async so added
import { configure } from 'enzyme';
configure({adapter: new Adapter()});