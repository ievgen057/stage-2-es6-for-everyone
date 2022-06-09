import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';
  #endpointDetails;

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    try {
      if(!id) throw new Error('fighters ID wasn`t transmitted')
      
      this.#endpointDetails =`details/fighter/${id}.json`
      const apiResult = await callApi(this.#endpointDetails)
      return apiResult

    } catch (error) {
      throw error
    }
  }
}

export const fighterService = new FighterService();
