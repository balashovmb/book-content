describe('Book status page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Renders status page', () => {
    cy.contains('Book status');
    cy.contains('Number of chapters: 1');
    cy.contains('Number of finished chapters: 0');
    cy.contains('Number of sections: 2');
    cy.contains('Number of finished sections: 1');
  });

  it('Changes section and chapter status to completed', () => {
    const checkbox = cy.get('[data-testid="section-0.1-completed"]');
    checkbox.click();

    checkbox.should('be.checked');
    cy.get('[data-testid="chapter-0-completed"]').should('be.checked');
    cy.contains('Number of chapters: 1');
    cy.contains('Number of finished chapters: 1');
    cy.contains('Number of finished sections: 2');
  });

  it('Changes section status to uncompleted', () => {
    const checkbox = cy.get('[data-testid="section-0.0-completed"]');
    checkbox.click();

    checkbox.should('not.be.checked');
    cy.contains('Number of finished sections: 0');
  });

  it('Creates new section', () => {
    cy.get('[data-testid="chapter-0-new-section-input"]').type('Test section');
    cy.get('[data-testid="chapter-0-new-section-submit"]').click();

    cy.get('[data-testid="section-0.2-title"]').should('have.text', 'Test section');
    cy.get('[data-testid="section-0.2-completed"]').should('not.be.checked');
    cy.contains('Number of sections: 3');
  });

  it('Creates new chapter', () => {
    cy.get('[data-testid="new-chapter-input"]').type('Test chapter');
    cy.get('[data-testid="new-chapter-submit"]').click();

    cy.get('[data-testid="chapter-1-title"]').should('have.text', 'Test chapter');
    cy.get('[data-testid="chapter-1-completed"]').should('not.be.checked');
    cy.contains('Number of chapters: 2');
  });
})
