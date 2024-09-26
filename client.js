document.addEventListener('DOMContentLoaded', () => {
  const adressSeraching = async () => {
    let query = document.querySelector('.inputSearch').value;
    const token = import.meta.env.VITE_API_KEY;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ query: query }),
    };

    try {
      const response = await fetch(
        'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        options,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const suggestions = data.suggestions;

      const resultContainer = document.querySelector('.searchResult');
      resultContainer.innerHTML = '';

      suggestions.forEach((suggestion) => {
        const resultItem = document.createElement('div');
        resultItem.textContent = suggestion.unrestricted_value;
        resultItem.classList.add('result-item');
        resultItem.onclick = () => {
          displayAddress(suggestion);
          resultContainer.innerHTML = '';
        };
        resultContainer.appendChild(resultItem);
      });
    } catch (error) {
      console.log('Ошибка:', error);
    }
  };

  const displayAddress = (suggestion) => {
    let addressDisplay = document.querySelector('.addressDisplay');
    if (!addressDisplay) {
      // Если элемент не найден, создаем его
      addressDisplay = document.createElement('div');
      addressDisplay.className = 'addressDisplay';
      document.querySelector('#app').appendChild(addressDisplay);
    }

    addressDisplay.innerHTML = `
        <p>Индекс: ${suggestion.data.postal_code || 'Не указано'}</p>
        <p>Регион: ${suggestion.data.region_with_type || 'Не указано'}</p>
        <p>Город: ${suggestion.data.city || 'Не указано'}</p>
        <p>Район: ${suggestion.data.city || 'Не указано'}</p>
        <p>Улица: ${suggestion.data.street_with_type || 'Не указано'}</p>
        <p>Номер дома: ${suggestion.data.house || 'Не указано'}</p>
        <p>Корпус: ${suggestion.data.block || 'Не указано'}</p>
        <p>Кваритира: ${suggestion.data.flat || 'Не указано'}</p>
      `;
  };

  const inputSearch = document.querySelector('.inputSearch');
  inputSearch.addEventListener('input', adressSeraching);
});
