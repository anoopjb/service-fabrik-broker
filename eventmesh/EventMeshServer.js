'use strict';

const _ = require('lodash');
const CONST = require('../common/constants');
const errors = require('../common/errors');
const NotImplementedBySubclass = errors.NotImplementedBySubclass;

class EventMeshServer {

  /*
   * EventMeshServer
   * ===============
   *
   * Various key types are documented below.
   *
   * Top level keys:
   *    - /services
   *    - /deployments
   *
   * Resources:
   *    - /deployments/<resourceType>/<resourceId>
   * Resource attributes:
   *    - /deployments/<resourceType>/<resourceId>/options
   *    - /deployments/<resourceType>/<resourceId>/state
   *    - /deployments/<resourceType>/<resourceId>/lastoperation
   *
   * Annotations:
   *    - /deployments/<resourceType>/<resourceId>/<annotationName>/<annotationType>/<annotationId>
   * Annotations attributes:
   *    - /deployments/<resourceType>/<resourceId>/<annotationName>/<annotationType>/<annotationId>/options
   *    - /deployments/<resourceType>/<resourceId>/<annotationName>/<annotationType>/<annotationId>/state
   *
   */

  constructor() {}

  checkValidState(state) {
    return Promise.try(() => {
      if (_.indexOf(_.map(CONST.RESOURCE_STATE, (a) => a), state) < 0) {
        throw new errors.NotFound(`Could not find state ${state}`);
      }
    });
  }

  getServiceFolderName(resourceType, serviceId) {
    return `services/${resourceType}/${serviceId}`;
  }

  getResourceFolderName(resourceType, resourceId) {
    return `deployments/${resourceType}/${resourceId}`;
  }

  getAnnotationFolderName(resourceType, resourceId, annotationName, annotationType, annotationId) {
    const resourceFolderName = this.getResourceFolderName(resourceType, resourceId);
    return `${resourceFolderName}/${annotationName}/${annotationType}/${annotationId}`;
  }

  registerService(resourceType, serviceId, serviceAttributesValue, servicePlansValue) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('registerService');
  }

  getServiceAttributes(resourceType, serviceId) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('getServiceAttributes');
  }

  getServicePlans(resourceType, serviceId) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('getServicePlans');
  }

  createResource(resourceType, resourceId, val) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('createResource');
  }

  updateResourceState(resourceType, resourceId, stateValue) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('updateResourceState');
  }

  updateResourceKey(resourceType, resourceId, key, value) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('updateResourceKey');
  }

  getResourceKey(resourceType, resourceId, key) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('getResourceKey');
  }

  getResourceState(resourceType, resourceId) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('getResourceState');
  }

  registerWatcher(key, callback, isRecursive) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('registerWatcher');
  }

  annotateResource(resourceType, resourceId, annotationName, annotationType, annotationId, val) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('annotateResource');
  }

  updateAnnotationState(resourceType, resourceId, annotationName, annotationType, annotationId, stateValue) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('updateAnnotationState');
  }

  updateAnnotationKey(resourceType, resourceId, annotationName, annotationType, annotationId, key, value) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('updateAnnotationKey');
  }

  getAnnotationKey(resourceType, resourceId, annotationName, annotationType, annotationId, key) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('getAnnotationKey');
  }

  getAnnotationState(resourceType, resourceId, annotationName, annotationType, annotationId) {
    /* jshint unused:false */
    throw new NotImplementedBySubclass('getAnnotationState');
  }
}

module.exports = EventMeshServer;