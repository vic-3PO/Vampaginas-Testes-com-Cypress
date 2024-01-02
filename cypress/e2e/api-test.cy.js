describe("Testes na API do Google Books", () => {
  it("Deve realizar uma pesquisa bem-sucedida", () => {
    const query = "machado";

    cy.request({
      method: "GET",
      url: `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=AIzaSyAMwvo_BPRfczKRtuG4mUpG6noxWIZYFss&filter=free-ebooks`,
    }).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("items");
      expect(res.body.items).to.be.an("array");
      expect(res.body.items.length).to.be.greaterThan(0);
    });
  });

  it("Deve tratar uma pesquisa sem resultados", () => {
    const query =
      "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";

    cy.request({
      method: "GET",
      url: `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&maxResults=40&key=AIzaSyAMwvo_BPRfczKRtuG4mUpG6noxWIZYFss&filter=free-ebooks`,
    }).then((res) => {
      expect(res.status).to.equal(200);

      // Verificar se a propriedade 'items' existe apenas quando há resultados
      if (res.body.totalItems > 0) {
        expect(res.body).to.have.property("items");
        expect(res.body.items).to.be.an("array");
        expect(res.body.items.length).to.equal(0);
      } else {
        // Se não houver resultados, 'items' não deve existir
        expect(res.body).to.not.have.property("items");
      }
    });
  });

  it("Deve tratar erros na pesquisa de livros", () => {
    const invalidQuery = "";

    cy.request({
      method: "GET",
      url: `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        invalidQuery
      )}&maxResults=40&key=AIzaSyAMwvo_BPRfczKRtuG4mUpG6noxWIZYFss&filter=free-ebooks`,
      failOnStatusCode: false, // Adicione esta opção
    }).then((res) => {
      if (res.status === 400) {
        expect(res.body).to.have.property("error");
        expect(res.body.error.message).to.equal("Missing query.");
      } else {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("items");
      }
    });
  });
});
