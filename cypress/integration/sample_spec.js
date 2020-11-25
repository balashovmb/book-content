describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })
})

describe('My First Test', () => {
  it('finds the content "type"', () => {
    cy.visit('/')


    cy.contains('Section0').click()
  })
})