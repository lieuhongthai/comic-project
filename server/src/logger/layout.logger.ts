import { FactoryProvider } from '@nestjs/common';
import { Configuration } from 'log4js';

export const LOG4JS_DEFAULT_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  pattern: '%[%d{yyyy-MM-dd hh:mm:ss:SSS} %p --- [%x{name}]%] : %m',
  tokens: {
    name: (logEvent) => {
      return (logEvent.context && logEvent.context['name']) || '-';
    },
  },
};

export const LOG4JS_NO_COLOR_DEFAULT_LAYOUT = {
  type: 'pattern',
  // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
  // we use process id instead thread id
  pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS} %p --- [%x{name}]%]] : %m',
  tokens: {
    name: (logEvent) => {
      return (logEvent.context && logEvent.context['name']) || '-';
    },
  },
};

export const LOG4JS_DEFAULT_CONFIG = {
  appenders: {
    stdout: {
      type: 'stdout',
      layout: LOG4JS_DEFAULT_LAYOUT,
    },
    file: {
      type: 'file',
      filename: './logs/application.log',
      maxLogSize: 20 * 1024 * 1024, // maxLogSize use bytes ad unit
      backups: 10, // default use 5 so 1KB file size total rotating
      layout: LOG4JS_NO_COLOR_DEFAULT_LAYOUT,
    },
  },
  categories: {
    default: {
      enableCallStack: true,
      appenders: ['stdout', 'file'],
      level: 'debug',
    },
  },
};
