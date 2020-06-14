import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretDown, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCaretDown);
library.add(faPlayCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);
