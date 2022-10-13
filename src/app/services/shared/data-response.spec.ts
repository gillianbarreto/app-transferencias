import { DataResponse } from './data-response';

describe('DataResponse', () => {
  let dataResponse = new DataResponse(200, 'Ok', { ok: true })

  it('getCode', () => {
    expect(dataResponse.getCode()).toBe(200);
  });

  it('getMessage', () => {
    expect(dataResponse.getMessage()).toBe('Ok');
  });

  it('getPayload', () => {
    expect(dataResponse.getPayload().ok).toBeTruthy();
  });

});
