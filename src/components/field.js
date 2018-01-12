import {h} from 'preact';

const Field = ({class: className}) => (
  <div class={`field ${className}`}><input type="text" /></div>
);

export default Field;
