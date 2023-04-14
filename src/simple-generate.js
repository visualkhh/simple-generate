#!/usr/bin/env node

import * as process from 'process';
import { Generator } from './index';

let data = process.argv[2]?.trim();
if (data) {
  data = data.startsWith("{") ? JSON.parse(data) : data;
  console.log(JSON.stringify(new Generator().run(data)));
} else {
  console.log('json or string input required')
}
