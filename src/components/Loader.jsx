import ReactDOM from 'react-dom';

const Loader = (props) => ReactDOM.createPortal(props.children, document.getElementById('overlay'));

export default Loader;