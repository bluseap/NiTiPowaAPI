import { NiTiShopAPIPage } from './app.po';

describe('ni-ti-shop-api App', () => {
  let page: NiTiShopAPIPage;

  beforeEach(() => {
    page = new NiTiShopAPIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
