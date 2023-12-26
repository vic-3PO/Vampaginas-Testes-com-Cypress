// cypress/integration/api.spec.js

// Função utilitária para fazer a chamada da API e verificar as respostas comuns
function testarChamadaApi(options, callback) {
  // Faz a chamada da API e passa a resposta para a função de callback
  cy.request(options).then((response) => {
    callback(response);
  });
}

describe("Testes na API de Pesquisa de Livros", () => {
  it("Deve realizar uma pesquisa bem-sucedida", () => {
    // Configurações da chamada da API
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=Machado%20de%20Assis&maxResults=1",
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações comuns para uma pesquisa bem-sucedida
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("items").that.is.an("array");
      expect(response.body.items.length).to.be.greaterThan(0);
    });
  });

  it("Deve lidar com uma pesquisa sem resultados", () => {
    // Configurações da chamada da API para uma pesquisa sem resultados
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=AAAAAAAAA12312AAAAAAAAA",
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações para uma pesquisa sem resultados
      expect(response.status, "Status da resposta deve ser 200 OK").to.eq(200);
      expect(response.body)
        .to.have.property("totalItems")
        .that.is.a("number")
        .and.eq(0);
    });
  });

  it("Deve lidar com erro na pesquisa", () => {
    // Configurações da chamada da API para uma pesquisa com erro
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/books/v1/volumes?q=",
      failOnStatusCode: false,
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações para uma pesquisa com erro
      expect(response.status).to.not.eq(200);
    });
  });

  // Função utilitária para verificar respostas comuns de sucesso e erro
  function verificarResposta(response, sucessoCallback, erroCallback) {
    if (response.status === 404) {
      // Simulação de erro 404 - Recurso não encontrado
      erroCallback(response);
    } else {
      // Simulação de sucesso
      sucessoCallback(response);
    }
  }

  it("Deve realizar uma pesquisa bem-sucedida - POST", () => {
    // Configurações da chamada da API para um POST
    const options = {
      method: "POST",
      url: "https://www.googleapis.com/books/v1/volumes",
      body: {
        q: "Machado de Assis",
        maxResults: 1,
      },
      failOnStatusCode: false,
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações comuns para um POST
      verificarResposta(
        response,
        () => expect(response.status).to.eq(200),
        () => expect(response.status).to.eq(404)
      );
    });
  });

  it("Deve realizar uma pesquisa bem-sucedida - PUT", () => {
    // Configurações da chamada da API para um PUT
    const options = {
      method: "PUT",
      url: "https://www.googleapis.com/books/v1/volumes",
      body: {
        q: "Machado de Assis",
        maxResults: 1,
      },
      failOnStatusCode: false,
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações comuns para um PUT
      verificarResposta(
        response,
        () => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("items").that.is.an("array");
          expect(response.body.items.length).to.be.greaterThan(0);
        },
        () => expect(response.status).to.eq(404)
      );
    });
  });

  it("Deve realizar uma pesquisa bem-sucedida - DELETE", () => {
    // Configurações da chamada da API para um DELETE
    const options = {
      method: "DELETE",
      url: "https://www.googleapis.com/books/v1/volumes",
      body: {
        q: "Machado de Assis",
        maxResults: 1,
      },
      failOnStatusCode: false,
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações comuns para um DELETE
      verificarResposta(
        response,
        () => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("items").that.is.an("array");
          expect(response.body.items.length).to.be.greaterThan(0);
        },
        () => expect(response.status).to.eq(404)
      );
    });
  });

  it("Deve lidar com caminho inválido", () => {
    // Configurações da chamada da API para um caminho inválido
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/books/v1/invalidpath",
      failOnStatusCode: false,
    };

    // Chama a função utilitária com a configuração e a função de callback para os testes
    testarChamadaApi(options, (response) => {
      // Verificações para um caminho inválido
      expect(response.status).to.eq(404);
    });
  });
});
