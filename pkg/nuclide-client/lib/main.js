'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type {NuclideUri} from '../../nuclide-remote-uri';
import typeof * as FileSystemService from '../../nuclide-server/lib/services/FileSystemService';
import invariant from 'assert';

// TODO: Remove this once all services have been moved to framework v3.
import {
  getFileForPath,
  getService,
  getServiceLogger,
  getServiceByNuclideUri,
} from '../../nuclide-remote-connection';

export {
  getFileForPath,
  getService,
  getServiceLogger,
  getServiceByNuclideUri,
};

export function getFileSystemServiceByNuclideUri(uri: NuclideUri): FileSystemService {
  const service: ?FileSystemService = getServiceByNuclideUri('FileSystemService', uri);
  invariant(service);
  return service;
}
