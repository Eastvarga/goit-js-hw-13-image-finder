import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

import {
  error,
  defaultModules,
  defaults,
  Stack,
} from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

const myStack = new Stack({
  dir1: 'down',
  dir2: 'left',
  firstpos1: 25,
  firstpos2: 30,
  context: document.body,
});
const errorOptions = {
  title: 'Some Error',
  text: 'Why default styles not work on me',
  stack: myStack,
  delay: 2000,
};
