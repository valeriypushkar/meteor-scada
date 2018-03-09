import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

require('./navigation/store.test')
require('./navigation/provider.test')
require('./navigation/menuitem.test')
