import { WebAppAdminPage } from './app.po';

describe('web-app-admin App', () => {
  let page: WebAppAdminPage;

  beforeEach(() => {
    page = new WebAppAdminPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
