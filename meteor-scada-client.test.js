import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

require('./data/common/datatypes.test')
require('./data/common/object.test')

require('./data/client/runtime.test')

require('./navigation/store.test')
require('./navigation/provider.test')
require('./navigation/consumer.test')
require('./navigation/menuitem.test')
require('./navigation/submenuitem.test')
require('./navigation/tabitem.test')
require('./navigation/integration.test')

require('./utils/common/equal.test')
