import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DiffMonitor from 'redux-devtools-diff-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor defaultIsVisible={false}
               toggleVisibilityKey="ctrl-h"
               changePositionKey="ctrl-w"
               changeMonitorKey="ctrl-m">
    <DiffMonitor />
    <LogMonitor />
  </DockMonitor>
);
