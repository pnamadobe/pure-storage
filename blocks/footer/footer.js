import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  /* custom */
  const lastSection = footer.querySelector('.section:first-of-type .default-content-wrapper');
  const lastTwoElementsOfFirstSection = lastSection.querySelectorAll(':scope > *:nth-last-child(-n+2)');
  
  // Create new divs for the left and right columns
  const leftColumn = document.createElement('div');
  leftColumn.classList.add('left-column');
  
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('right-column');
  
  // Loop through all child elements of lastSection
  const allElements = lastSection.children; // Get all child elements
  
  // Iterate through all elements
  Array.from(allElements).forEach(element => {
    // Check if the element is in the last two elements (rightColumn)
    if (Array.from(lastTwoElementsOfFirstSection).includes(element)) {
      rightColumn.appendChild(element); // Append to rightColumn
    } else {
      leftColumn.appendChild(element); // Append to leftColumn
    }
  });
  
  // Now append both columns to the lastSection
  lastSection.appendChild(leftColumn);
  lastSection.appendChild(rightColumn);

  block.append(footer);
}
