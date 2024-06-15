import { Container } from 'inversify';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { DefaultAuthService } from './default-auth.service.js';
import { ExceptionFilter } from '../../libs/rest/index.js';
import { AuthExceptionFilter } from './auth.exception-filter.js';

export function createAuthContainer() {
  const authContainer = new Container();

  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}