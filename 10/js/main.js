import {createDescriptions} from './data.js';
import {renderPictures} from './pictures.js';
import './upload-form.js';

const pictures = createDescriptions();

renderPictures(pictures);
