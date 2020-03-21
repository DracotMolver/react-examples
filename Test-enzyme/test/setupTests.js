// -====================== Configuración de Enzyme y JS ======================
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// -====================== Obtener todos los test a ejecutar ======================
const context = require.context('./tests', true, /.*\.(test|spect)\.js$/);
context.keys().forEach(context);
