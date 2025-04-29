import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  block.id = 'ai-campaign-form';
  const childDivs = block.querySelectorAll(':scope > div');

  childDivs.forEach(div => {
    const source = div.querySelector('source');
    const img = div.querySelector('img');

    if (source || img) {
      const imageUrl = source ? source.srcset : img.src;
      div.classList.add('background-image');
      div.style.backgroundImage = `url(${imageUrl})`;
      div.innerHTML = ''; // Clear image content so it doesn't render
    } else {
      div.classList.add('form-container');
      const infoDiv = div.querySelector(':scope > div');
      if (infoDiv) infoDiv.classList.add('information');

      // Create title section
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('title');

      const title = document.createElement('div');
      title.textContent = 'Get the ESG Report';

      titleDiv.append(title);
      div.prepend(titleDiv);

      // Move instrumentation from infoDiv to titleDiv (optional logic based on your use case)
      if (infoDiv) moveInstrumentation(infoDiv, titleDiv);
    }
  });

  const form = `
    <form>
      <!-- 1. First Name -->
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName"><br>

      <!-- 2. Last Name -->
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName"><br>

      <!-- 3. Work Email -->
      <label for="email">Work Email:</label>
      <input type="email" id="email" name="email"><br>

      <!-- 4. Phone Number -->
      <label for="phone">Phone Number:</label>
      <input type="tel" id="phone" name="phone"><br>

      <!-- 5. Company Name -->
      <label for="company">Company Name:</label>
      <input type="text" id="company" name="company"><br>

      <!-- 6. Job Title -->
      <label for="jobTitle">Job Title:</label>
      <input type="text" id="jobTitle" name="jobTitle"><br>

      <!-- 7. Country -->
      <label for="country">Country:</label>
      <select id="country" name="country">
        <option value="usa">United States</option>
      </select><br>

      <!-- 8. State -->
      <label for="state">State:</label>
      <select id="state" name="state">
        <option value="az">AZ</option>
        <option value="ca">CA</option>
        <option value="il">IL</option>
        <option value="ny">NY</option>
      </select><br>

      <!-- 9. Zip/Postal Code -->
      <label for="zip">Zip/Postal Code:</label>
      <input type="text" id="zip" name="zip"><br>

      <!-- 10. How can we help? -->
      <label for="help">How can we help?</label>
      <input type="text" id="help" name="help"><br>

      <button type="submit" class="button primary">Submit</button>
    </form>
  `;

  const informationEl = block.querySelector('.information');
  const formEl = document.createElement('div');
  formEl.classList.add('form-wrapper');
  formEl.innerHTML = `${form}`;
  
  // Move instrumentation from original info div to the new form wrapper
  if (informationEl) moveInstrumentation(informationEl, formEl);

  informationEl.prepend(formEl);
}