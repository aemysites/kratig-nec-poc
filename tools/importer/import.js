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
import hero8Parser from './parsers/hero8.js';
import columns5Parser from './parsers/columns5.js';
import hero11Parser from './parsers/hero11.js';
import columns7Parser from './parsers/columns7.js';
import cards9Parser from './parsers/cards9.js';
import columns10Parser from './parsers/columns10.js';
import cards4Parser from './parsers/cards4.js';
import cards1Parser from './parsers/cards1.js';
import hero3Parser from './parsers/hero3.js';
import carousel17Parser from './parsers/carousel17.js';
import cards15Parser from './parsers/cards15.js';
import tableBordered6Parser from './parsers/tableBordered6.js';
import hero19Parser from './parsers/hero19.js';
import columns18Parser from './parsers/columns18.js';
import cards21Parser from './parsers/cards21.js';
import cards20Parser from './parsers/cards20.js';
import columns29Parser from './parsers/columns29.js';
import table26Parser from './parsers/table26.js';
import hero12Parser from './parsers/hero12.js';
import carousel13Parser from './parsers/carousel13.js';
import columns25Parser from './parsers/columns25.js';
import search24Parser from './parsers/search24.js';
import cards28Parser from './parsers/cards28.js';
import columns31Parser from './parsers/columns31.js';
import columns30Parser from './parsers/columns30.js';
import columns35Parser from './parsers/columns35.js';
import hero22Parser from './parsers/hero22.js';
import columns36Parser from './parsers/columns36.js';
import cards32Parser from './parsers/cards32.js';
import hero40Parser from './parsers/hero40.js';
import cards34Parser from './parsers/cards34.js';
import cards43Parser from './parsers/cards43.js';
import cards41Parser from './parsers/cards41.js';
import columns47Parser from './parsers/columns47.js';
import columns46Parser from './parsers/columns46.js';
import search39Parser from './parsers/search39.js';
import hero45Parser from './parsers/hero45.js';
import columns51Parser from './parsers/columns51.js';
import columns53Parser from './parsers/columns53.js';
import hero50Parser from './parsers/hero50.js';
import columns55Parser from './parsers/columns55.js';
import hero56Parser from './parsers/hero56.js';
import cards42Parser from './parsers/cards42.js';
import columns58Parser from './parsers/columns58.js';
import carousel49Parser from './parsers/carousel49.js';
import tableBordered52Parser from './parsers/tableBordered52.js';
import hero57Parser from './parsers/hero57.js';
import cards61Parser from './parsers/cards61.js';
import columns54Parser from './parsers/columns54.js';
import cards60Parser from './parsers/cards60.js';
import columns38Parser from './parsers/columns38.js';
import columns62Parser from './parsers/columns62.js';
import hero63Parser from './parsers/hero63.js';
import hero65Parser from './parsers/hero65.js';
import columns70Parser from './parsers/columns70.js';
import columns67Parser from './parsers/columns67.js';
import accordion69Parser from './parsers/accordion69.js';
import tableStripedBordered59Parser from './parsers/tableStripedBordered59.js';
import columns74Parser from './parsers/columns74.js';
import tableStripedBordered66Parser from './parsers/tableStripedBordered66.js';
import cards48Parser from './parsers/cards48.js';
import columns76Parser from './parsers/columns76.js';
import tableBordered73Parser from './parsers/tableBordered73.js';
import hero68Parser from './parsers/hero68.js';
import columns80Parser from './parsers/columns80.js';
import tabs72Parser from './parsers/tabs72.js';
import tabs79Parser from './parsers/tabs79.js';
import columns23Parser from './parsers/columns23.js';
import table75Parser from './parsers/table75.js';
import columns85Parser from './parsers/columns85.js';
import hero87Parser from './parsers/hero87.js';
import hero88Parser from './parsers/hero88.js';
import cards86Parser from './parsers/cards86.js';
import tableBordered71Parser from './parsers/tableBordered71.js';
import cards84Parser from './parsers/cards84.js';
import columns91Parser from './parsers/columns91.js';
import cards90Parser from './parsers/cards90.js';
import hero83Parser from './parsers/hero83.js';
import columns92Parser from './parsers/columns92.js';
import hero89Parser from './parsers/hero89.js';
import accordion94Parser from './parsers/accordion94.js';
import cards97Parser from './parsers/cards97.js';
import tableBordered95Parser from './parsers/tableBordered95.js';
import tabs93Parser from './parsers/tabs93.js';
import columns99Parser from './parsers/columns99.js';
import cards96Parser from './parsers/cards96.js';
import cards77Parser from './parsers/cards77.js';
import tableBordered81Parser from './parsers/tableBordered81.js';
import tabs98Parser from './parsers/tabs98.js';
import cards82Parser from './parsers/cards82.js';
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
  hero8: hero8Parser,
  columns5: columns5Parser,
  hero11: hero11Parser,
  columns7: columns7Parser,
  cards9: cards9Parser,
  columns10: columns10Parser,
  cards4: cards4Parser,
  cards1: cards1Parser,
  hero3: hero3Parser,
  carousel17: carousel17Parser,
  cards15: cards15Parser,
  tableBordered6: tableBordered6Parser,
  hero19: hero19Parser,
  columns18: columns18Parser,
  cards21: cards21Parser,
  cards20: cards20Parser,
  columns29: columns29Parser,
  table26: table26Parser,
  hero12: hero12Parser,
  carousel13: carousel13Parser,
  columns25: columns25Parser,
  search24: search24Parser,
  cards28: cards28Parser,
  columns31: columns31Parser,
  columns30: columns30Parser,
  columns35: columns35Parser,
  hero22: hero22Parser,
  columns36: columns36Parser,
  cards32: cards32Parser,
  hero40: hero40Parser,
  cards34: cards34Parser,
  cards43: cards43Parser,
  cards41: cards41Parser,
  columns47: columns47Parser,
  columns46: columns46Parser,
  search39: search39Parser,
  hero45: hero45Parser,
  columns51: columns51Parser,
  columns53: columns53Parser,
  hero50: hero50Parser,
  columns55: columns55Parser,
  hero56: hero56Parser,
  cards42: cards42Parser,
  columns58: columns58Parser,
  carousel49: carousel49Parser,
  tableBordered52: tableBordered52Parser,
  hero57: hero57Parser,
  cards61: cards61Parser,
  columns54: columns54Parser,
  cards60: cards60Parser,
  columns38: columns38Parser,
  columns62: columns62Parser,
  hero63: hero63Parser,
  hero65: hero65Parser,
  columns70: columns70Parser,
  columns67: columns67Parser,
  accordion69: accordion69Parser,
  tableStripedBordered59: tableStripedBordered59Parser,
  columns74: columns74Parser,
  tableStripedBordered66: tableStripedBordered66Parser,
  cards48: cards48Parser,
  columns76: columns76Parser,
  tableBordered73: tableBordered73Parser,
  hero68: hero68Parser,
  columns80: columns80Parser,
  tabs72: tabs72Parser,
  tabs79: tabs79Parser,
  columns23: columns23Parser,
  table75: table75Parser,
  columns85: columns85Parser,
  hero87: hero87Parser,
  hero88: hero88Parser,
  cards86: cards86Parser,
  tableBordered71: tableBordered71Parser,
  cards84: cards84Parser,
  columns91: columns91Parser,
  cards90: cards90Parser,
  hero83: hero83Parser,
  columns92: columns92Parser,
  hero89: hero89Parser,
  accordion94: accordion94Parser,
  cards97: cards97Parser,
  tableBordered95: tableBordered95Parser,
  tabs93: tabs93Parser,
  columns99: columns99Parser,
  cards96: cards96Parser,
  cards77: cards77Parser,
  tableBordered81: tableBordered81Parser,
  tabs98: tabs98Parser,
  cards82: cards82Parser,
  ...customParsers,
};

const transformers = [
  cleanupTransformer,
  imageTransformer,
  linkTransformer,
  sectionsTransformer,
  ...(Array.isArray(customTransformers)
    ? customTransformers
    : Object.values(customTransformers)),
];

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    transformers.forEach((transformerFn) => (
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
