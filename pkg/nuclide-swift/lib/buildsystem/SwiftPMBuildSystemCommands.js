'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import featureConfig from '../../../nuclide-feature-config';
import SwiftPMBuildSystemStore from './SwiftPMBuildSystemStore';

export function buildCommand(store: SwiftPMBuildSystemStore): {
  command: string;
  args: Array<string>
} {
  const commandArgs = [
    'build',
    '--chdir', store.getChdir(),
    '--configuration', store.getConfiguration(),
  ];
  if (store.getXcc().length > 0) {
    commandArgs.push('-Xcc', store.getXcc());
  }
  if (store.getXlinker().length > 0) {
    commandArgs.push('-Xlinker', store.getXlinker());
  }
  if (store.getXswiftc().length > 0) {
    commandArgs.push('-Xswiftc', store.getXswiftc());
  }
  if (store.getBuildPath().length > 0) {
    commandArgs.push('--build-path', store.getBuildPath());
  }

  return {
    command: _swiftPath(),
    args: commandArgs,
  };
}

export function testCommand(store: SwiftPMBuildSystemStore): {
  command: string;
  args: Array<string>
} {
  const commandArgs = [
    'test',
    '--chdir', store.getChdir(),
  ];
  if (store.getBuildPath().length > 0) {
    commandArgs.push('--build-path', store.getBuildPath());
  }
  return {
    command: _swiftPath(),
    args: commandArgs,
  };
}

function _swiftPath(): string {
  const path = (featureConfig.get('nuclide-swift.swiftToolchainPath'): any);
  if (path) {
    return `${path}/usr/bin/swift`;
  }

  if (process.platform === 'darwin') {
    return '/Library/Developer/Toolchains/swift-latest.xctoolchain/usr/bin/swift';
  }

  return 'swift';
}
