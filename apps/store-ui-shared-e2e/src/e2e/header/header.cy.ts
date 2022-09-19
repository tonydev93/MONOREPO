describe('store-ui-shared: Header component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=header--primary', {qs: {'title': 'Hello'}}));
    
    it('should render the component', () => {
      cy.get('.MuiToolbar-root').should('contain', '');
    });
});
