describe("template spec", () => {
  beforeEach(() => {
    cy.visitVampaginas();
  });

  it("Deve exibir os elementos principais da página", () => {
    // Aguardar alguns segundos para garantir que a página seja carregada completamente
    cy.wait(5000);

    cy.get(".mouth").should("exist");
    cy.get(".ahh").should("exist");
    cy.get('input[placeholder="Escreva sua próxima leitura"]').should("exist");
    cy.contains("h2", "Já sabe por onde começar?").should("exist");
    cy.contains("Econtre seu livro em nossa estante.").should("exist");
    cy.contains("Últimos Lançamentos").should("exist");
    cy.contains("Talvez você se interesse por:").should("exist");
    cy.contains("Contatos: Trabalhando nisso").should("exist");

    const currentYear = new Date().getFullYear();
    cy.contains(
      `© ${currentYear} Vampáginas. Todos os direitos reservados.`
    ).should("exist");
  });

  it("Deve realizar uma pesquisa e exibir resultados", () => {
    const termoPesquisa = "Machado de Assis";

    // Preencher o campo de pesquisa e verificar se o valor está correto
    cy.get('input[placeholder="Escreva sua próxima leitura"]')
      .type(termoPesquisa)
      .should("have.value", termoPesquisa);

    // Aguardar um pouco para permitir que a pesquisa seja concluída (dependendo da implementação da função realizarPesquisaLivros)
    cy.wait(1000);

    // Verificar se os resultados da pesquisa são exibidos

    cy.get("h5").should("exist").and("contain.text", "Machado de Assis");
  });
});
