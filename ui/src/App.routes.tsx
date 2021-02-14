import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Collage from './modules/photos/pages/collage/ColalgeContainer';
import Photo from './modules/photos/pages/photo/Photo';

interface RouteDefinition {
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}

export const COLLAGE_PATH: string = '/collage';
export const PHOTO_PATH = (path: string = ':path') => `/photo/${path}`;

const DefualtComponent = (props: any) => <Redirect to={COLLAGE_PATH} />

export const routes: Array<RouteDefinition> = [
    { path: COLLAGE_PATH, component: Collage },
    { path: PHOTO_PATH(), component: Photo },
    { path: '**', component: DefualtComponent }
];

