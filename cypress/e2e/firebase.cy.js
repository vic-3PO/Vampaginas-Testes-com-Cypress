describe("Testes de Login", () => {
    it("Deve fazer login com sucesso", () => {
      cy.visit("https://vampaginas.vercel.app/login"); // Substitua pelo caminho real
  
      // Preencher formulário
      cy.get('input[type="email"]').type("adm@adm.com");
      cy.get('input[type="password"]').type("123456");
  
      // Enviar formulário
      cy.get('button[type="submit"]').click();
  
      // Verificar se redirecionou para a página de perfil
      cy.url().should("include", "/perfil"); // Substitua pelo caminho real
    });
  
    it("Deve exibir mensagem de erro em caso de falha no login", () => {
      cy.visit("https://vampaginas.vercel.app/login"); // Substitua pelo caminho real
  
      // Preencher formulário com credenciais inválidas
      cy.get('input[type="email"]').type("email-invalido@example.com");
      cy.get('input[type="password"]').type("senha-incorreta");
  
      // Enviar formulário
      cy.get('button[type="submit"]').click();
  
      // Verificar se exibiu a mensagem de erro
      cy.get(".error").should("contain.text", "Falha ao fazer login"); // Substitua pela classe real da mensagem de erro
    });
  });

  

  describe("Testes de Registro", () => {
    it("Deve registrar uma nova conta com sucesso", () => {
      cy.visit("https://vampaginas.vercel.app/registrar");
  
      // Preencher formulário
      cy.get('input[type="email"]').type("novo-email@example.com");
      cy.get('.sc-dSCufp input').eq(1).type("nova-senha"); 
      cy.get('.sc-dSCufp input').eq(2).type("nova-senha"); 

      // Enviar formulário
      cy.get('button[type="submit"]').click();
    });
  
    it("Deve exibir mensagem de erro em caso de falha no registro", () => {
      cy.visit("https://vampaginas.vercel.app/registrar");
  
      // Preencher formulário com informações inválidas
      cy.get('input[type="email"]').type("novo-email@example.com");
      cy.get('.sc-dSCufp input').eq(1).type("nova-senha"); 
      cy.get('.sc-dSCufp input').eq(2).type("nova-senha"); 
  
      // Enviar formulário
      cy.get('button[type="submit"]').click();
  
      // Verificar se exibiu a mensagem de erro
      cy.get(".error").should("contain.text", "Falha ao criar uma conta");
    });
  });