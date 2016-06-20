'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type {NuclideContextView} from '../../nuclide-context-view';
import type {ContextProvider} from '../../nuclide-context-view/lib/ContextViewManager';
import {DefinitionPreviewView} from './DefinitionPreviewView';
import {React} from 'react-for-atom';
import invariant from 'assert';
import {Disposable} from 'atom';

// Unique ID of this context provider
const PROVIDER_ID: string = 'nuclide-definition-preview';
const PROVIDER_TITLE: string = 'Definition Preview';

class Activation {

  provider: ContextProvider;

  constructor() {

    this.provider = {
      getElementFactory: () => React.createFactory(DefinitionPreviewView),
      id: PROVIDER_ID,
      title: PROVIDER_TITLE,
    };
  }

  getContextProvider(): ContextProvider {
    return this.provider;
  }

  dispose() {
  }
}

let activation: ?Activation = null;

export function activate(state: Object | void) {
  if (activation == null) {
    activation = new Activation();
  }

}

export function deactivate() {
  if (activation != null) {
    activation.dispose();
    activation = null;
  }
}

export function consumeNuclideContextView(contextView: NuclideContextView): IDisposable {
  invariant(activation != null);
  contextView.registerProvider(activation.getContextProvider());
  return new Disposable(() => {
    contextView.deregisterProvider(PROVIDER_ID);
  });
}