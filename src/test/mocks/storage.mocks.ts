export class SessionServiceMock {

    store = {};

    public setData(key: string, data: any): void {
      this.store[key] = data;
    }
    public getData(key: string): any {
      return key in this.store ? this.store[key] : null;
    }
    public getDataObject(key: string): any {
      return key in this.store ? this.store[key] : null;
    }
    public deleteItem(key: string): void {
      this.store[key] = null;
    }
    public initStorage() {
      this.store = {};
    }
  }