const RESOURCE_URL = 'https://flipkart-configuration-table.now.sh/api';

export function getConfigData() {
  return fetch(RESOURCE_URL).then(configData => configData.json());
}
