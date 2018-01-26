// -====================== Configuración de Enzyme y JS ======================
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// -====================== Obtener todos los test a ejecutar ======================
let context = require.context('./test', true, /.*\.test\.js$/);
context.keys().forEach(context);
module.exports = context;
