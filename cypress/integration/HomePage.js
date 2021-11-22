describe("Verify", ()=>{
    before(()=>{
        cy.visit("/")
    })
    it("Verify Content of Home Page",()=>{
        cy.get('div.justify-content-center>h2').contains('Current temperature')
        

    })

    it('Verify Moisturizer',()=>{
        cy.get('div.container').within(()=>{
            cy.get('div.text-center>h3').eq(0).contains('Moisturizers')
            cy.get('p.text-justify').eq(0).contains("Don't let cold weather ruin your skin. Use your favourite moisturizer and keep your skin stay young.")
            cy.get('button').eq(0).contains('Buy moisturizers')
            cy.get('div.text-center>h3').eq(1).contains('Sunscreens')
            cy.get('p.text-justify').eq(1).contains("Treat your skin right. Don't leave your home without your favorite sunscreen. Say goodbye to sunburns.")
            cy.get('button').eq(1).contains('Buy sunscreens')

        })
    })

    it("Navigate to moisturizers page",()=>{
        cy.get('a[href="/moisturizer"]').click().then(()=>{
            cy.get('h2').contains('Moisturizers')
            cy.get('ul.navbar-nav>button').contains('Cart - Empty')
            cy.get('div.justify-content-center').eq(1).children('div').then(()=>{
                cy.get('div.text-center').within(()=>{
                    cy.get('img').should('be.exist')
                    // cy.get('p').eq(0).contains('Max honey and almond moisturiser')
                    // cy.get('p').eq(1).contains('Price: Rs. 220')
                    cy.get('button').contains('Add').click()
                })
            })
            cy.get('ul.navbar-nav>button').contains('Cart - 1 item(s)').click().then(()=>{
                cy.get('h2').contains('Checkout')
            })
        })


    })
})