import { TestBed } from '@angular/core/testing';
import { KEYS, SessionService } from './session.service';
import { EncryptService } from '../encrypt/encrypt.service';
import { environment } from '@environment';

const dataToEncryptMock = 'aA123456';
const dataEncryptedMock = 'U2FsdGVkX19b5f/401KnTVFDMR1dsrNXVozhZ5GMvQ8=';
const objectToEncryptMock = { rut: '1111111-1', password: '345674567' };
const encryptedObjectLocalMock = '"U2FsdGVkX1/F8eNyVP1qZl5QB4uc+QBdaN6ErmSTnfSBOrOtxSPuDQCCghhmW6AZSSSWmvNaHQ/M0f2D1BhsaA=="';

describe('SessionService', () => {

  let service;
  let store = {};
  const mockSessionStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => delete store[key],
    clear: () => store = {}
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [SessionService, EncryptService]
  }));

  beforeAll(() => {
    environment.production = false;
    service = new SessionService(new EncryptService());
  });

  it('setData()', () => {
    const spy = spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    service.setData('key', 12);
    expect(spy).toHaveBeenCalled();
    expect(store['key']).toEqual('12');
  });

  it('setData() - data tipo objeto', () => {
    spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    const object = { code: 200, message: 'Prueba' };
    service.setData('key', object);
    expect(service.getDataObject('key')).toEqual(object);
  });

  it('getData()', () => {
    const spy = spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    service.getData('key');
    expect(spy).toHaveBeenCalled();
  });

  it('getDataObject()', () => {
    const spy = spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    const data = {
      user_id: 1,
      user_name: 'Jose Pérez'
    };
    store['usuario'] = JSON.stringify(data);
    service.getDataObject('usuario');
    expect(spy).toHaveBeenCalled();
  });

  it('deleteItem()', () => {
    const spy = spyOn(sessionStorage, 'removeItem').and.callFake(mockSessionStorage.removeItem);
    service.deleteItem('key');
    expect(spy).toHaveBeenCalled();
  });

  it('isLogin()', () => {
    store[KEYS.token] = '8937298579879867';
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    expect(service.isLogin()).toBeTruthy();
  });

  it('getToken()', () => {
    const token = 'abcdjkd782586867';
    store[KEYS.token] = token;
    spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
    expect(service.getToken()).toEqual(token);
  });

  // production
  describe('Storage en ambiente Produccion', () => {
    it('setData() - produccion', () => {
      environment.production = true;
      const spy = spyOn(sessionStorage, 'setItem').and.callFake(mockSessionStorage.setItem);
      spyOn(TestBed.inject(EncryptService), 'encrypt').and.returnValue(dataEncryptedMock);
      service.setData('keyProd', dataToEncryptMock);
      expect(spy).toHaveBeenCalled();
    });

    it('getData() - produccion', () => {
      environment.production = true;
      store['keyProd'] = dataEncryptedMock;
      spyOn(TestBed.inject(EncryptService), 'decrypt').and.returnValue(dataToEncryptMock);
      const spy = spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
      service.getData('keyProd');
      expect(spy).toHaveBeenCalled();
    });

    it('getDataObject() - produccion', () => {
      environment.production = true;
      store['keyObjectProd'] = encryptedObjectLocalMock;
      spyOn(TestBed.inject(EncryptService), 'decrypt').and.returnValue(objectToEncryptMock);
      const spy = spyOn(sessionStorage, 'getItem').and.callFake(mockSessionStorage.getItem);
      service.getDataObject('keyObjectProd');
      expect(spy).toHaveBeenCalled();
    });
  });

});
