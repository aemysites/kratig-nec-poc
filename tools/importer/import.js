/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns5Parser from './parsers/columns5.js';
import columns7Parser from './parsers/columns7.js';
import hero8Parser from './parsers/hero8.js';
import cards4Parser from './parsers/cards4.js';
import cards1Parser from './parsers/cards1.js';
import cards9Parser from './parsers/cards9.js';
import tableBordered6Parser from './parsers/tableBordered6.js';
import columns10Parser from './parsers/columns10.js';
import tabs2Parser from './parsers/tabs2.js';
import hero3Parser from './parsers/hero3.js';
import hero11Parser from './parsers/hero11.js';
import hero12Parser from './parsers/hero12.js';
import columns16Parser from './parsers/columns16.js';
import cards15Parser from './parsers/cards15.js';
import carousel17Parser from './parsers/carousel17.js';
import columns18Parser from './parsers/columns18.js';
import hero19Parser from './parsers/hero19.js';
import cards20Parser from './parsers/cards20.js';
import columns25Parser from './parsers/columns25.js';
import table26Parser from './parsers/table26.js';
import columns29Parser from './parsers/columns29.js';
import cards21Parser from './parsers/cards21.js';
import columns30Parser from './parsers/columns30.js';
import columns23Parser from './parsers/columns23.js';
import search24Parser from './parsers/search24.js';
import cards28Parser from './parsers/cards28.js';
import columns31Parser from './parsers/columns31.js';
import columns35Parser from './parsers/columns35.js';
import cards32Parser from './parsers/cards32.js';
import cards36Parser from './parsers/cards36.js';
import cards34Parser from './parsers/cards34.js';
import columns38Parser from './parsers/columns38.js';
import hero22Parser from './parsers/hero22.js';
import hero40Parser from './parsers/hero40.js';
import carousel13Parser from './parsers/carousel13.js';
import cards43Parser from './parsers/cards43.js';
import search39Parser from './parsers/search39.js';
import columns45Parser from './parsers/columns45.js';
import columns47Parser from './parsers/columns47.js';
import columns46Parser from './parsers/columns46.js';
import cards41Parser from './parsers/cards41.js';
import columns33Parser from './parsers/columns33.js';
import columns51Parser from './parsers/columns51.js';
import columns53Parser from './parsers/columns53.js';
import hero50Parser from './parsers/hero50.js';
import columns54Parser from './parsers/columns54.js';
import columns55Parser from './parsers/columns55.js';
import hero56Parser from './parsers/hero56.js';
import columns58Parser from './parsers/columns58.js';
import cards61Parser from './parsers/cards61.js';
import cards49Parser from './parsers/cards49.js';
import cards60Parser from './parsers/cards60.js';
import hero63Parser from './parsers/hero63.js';
import hero57Parser from './parsers/hero57.js';
import hero66Parser from './parsers/hero66.js';
import tableBordered64Parser from './parsers/tableBordered64.js';
import columns70Parser from './parsers/columns70.js';
import carousel48Parser from './parsers/carousel48.js';
import tableBordered71Parser from './parsers/tableBordered71.js';
import columns68Parser from './parsers/columns68.js';
import columns74Parser from './parsers/columns74.js';
import table69Parser from './parsers/table69.js';
import accordion62Parser from './parsers/accordion62.js';
import columns72Parser from './parsers/columns72.js';
import columns78Parser from './parsers/columns78.js';
import tabs77Parser from './parsers/tabs77.js';
import columns83Parser from './parsers/columns83.js';
import cards42Parser from './parsers/cards42.js';
import hero85Parser from './parsers/hero85.js';
import tableBordered73Parser from './parsers/tableBordered73.js';
import cards82Parser from './parsers/cards82.js';
import cards84Parser from './parsers/cards84.js';
import hero86Parser from './parsers/hero86.js';
import tableBordered52Parser from './parsers/tableBordered52.js';
import columns89Parser from './parsers/columns89.js';
import columns90Parser from './parsers/columns90.js';
import tableBordered79Parser from './parsers/tableBordered79.js';
import hero87Parser from './parsers/hero87.js';
import cards88Parser from './parsers/cards88.js';
import cards80Parser from './parsers/cards80.js';
import tableBordered93Parser from './parsers/tableBordered93.js';
import cards94Parser from './parsers/cards94.js';
import cards95Parser from './parsers/cards95.js';
import accordion91Parser from './parsers/accordion91.js';
import columns97Parser from './parsers/columns97.js';
import tabs92Parser from './parsers/tabs92.js';
import cards75Parser from './parsers/cards75.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns5: columns5Parser,
  columns7: columns7Parser,
  hero8: hero8Parser,
  cards4: cards4Parser,
  cards1: cards1Parser,
  cards9: cards9Parser,
  tableBordered6: tableBordered6Parser,
  columns10: columns10Parser,
  tabs2: tabs2Parser,
  hero3: hero3Parser,
  hero11: hero11Parser,
  hero12: hero12Parser,
  columns16: columns16Parser,
  cards15: cards15Parser,
  carousel17: carousel17Parser,
  columns18: columns18Parser,
  hero19: hero19Parser,
  cards20: cards20Parser,
  columns25: columns25Parser,
  table26: table26Parser,
  columns29: columns29Parser,
  cards21: cards21Parser,
  columns30: columns30Parser,
  columns23: columns23Parser,
  search24: search24Parser,
  cards28: cards28Parser,
  columns31: columns31Parser,
  columns35: columns35Parser,
  cards32: cards32Parser,
  cards36: cards36Parser,
  cards34: cards34Parser,
  columns38: columns38Parser,
  hero22: hero22Parser,
  hero40: hero40Parser,
  carousel13: carousel13Parser,
  cards43: cards43Parser,
  search39: search39Parser,
  columns45: columns45Parser,
  columns47: columns47Parser,
  columns46: columns46Parser,
  cards41: cards41Parser,
  columns33: columns33Parser,
  columns51: columns51Parser,
  columns53: columns53Parser,
  hero50: hero50Parser,
  columns54: columns54Parser,
  columns55: columns55Parser,
  hero56: hero56Parser,
  columns58: columns58Parser,
  cards61: cards61Parser,
  cards49: cards49Parser,
  cards60: cards60Parser,
  hero63: hero63Parser,
  hero57: hero57Parser,
  hero66: hero66Parser,
  tableBordered64: tableBordered64Parser,
  columns70: columns70Parser,
  carousel48: carousel48Parser,
  tableBordered71: tableBordered71Parser,
  columns68: columns68Parser,
  columns74: columns74Parser,
  table69: table69Parser,
  accordion62: accordion62Parser,
  columns72: columns72Parser,
  columns78: columns78Parser,
  tabs77: tabs77Parser,
  columns83: columns83Parser,
  cards42: cards42Parser,
  hero85: hero85Parser,
  tableBordered73: tableBordered73Parser,
  cards82: cards82Parser,
  cards84: cards84Parser,
  hero86: hero86Parser,
  tableBordered52: tableBordered52Parser,
  columns89: columns89Parser,
  columns90: columns90Parser,
  tableBordered79: tableBordered79Parser,
  hero87: hero87Parser,
  cards88: cards88Parser,
  cards80: cards80Parser,
  tableBordered93: tableBordered93Parser,
  cards94: cards94Parser,
  cards95: cards95Parser,
  accordion91: accordion91Parser,
  columns97: columns97Parser,
  tabs92: tabs92Parser,
  cards75: cards75Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
