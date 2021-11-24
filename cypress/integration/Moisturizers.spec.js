var item_name, item_price;

describe("Buy a moisturizer item", () => {
    before(() => {
        cy.visit("/")
    })
    it("Verify Elements of Home Page",()=>{
        cy.get('div.justify-content-center>h2').contains('Current temperature')
        cy.get('div.container').within(()=>{
            cy.get('div.text-center>h3').eq(0).contains('Moisturizers')
            cy.get('p.text-justify').eq(0).contains("Don't let cold weather ruin your skin. Use your favourite moisturizer and keep your skin stay young.")
            cy.get('button').eq(0).contains('Buy moisturizers')
            cy.get('div.text-center>h3').eq(1).contains('Sunscreens')
            cy.get('p.text-justify').eq(1).contains("Treat your skin right. Don't leave your home without your favorite sunscreen. Say goodbye to sunburns.")
            cy.get('button').eq(1).contains('Buy sunscreens')

        })

    })


    it("Navigate to moisturizers page and Add an item",()=>{
        cy.get('a[href="/moisturizer"]').click().then(()=>{
            cy.get('h2').contains('Moisturizers')
            cy.get('ul.navbar-nav>button').contains('Cart - Empty')
            cy.get('div.justify-content-center').eq(1).children('div').then(()=>{
                cy.get('div.text-center').within(()=>{
                    cy.get('img').should('be.exist')
                    cy.get('p').eq(0).invoke('text').then((text)=>{
                        item_name=text
                    })
                    //cy.log(this.text)

                    cy.get('p').eq(1).invoke('text').then((text)=>{
                        item_price=text.substring(11,text.length)
                        //cy.log(item_price)
                    })
                    cy.get('button').contains('Add').click()
                })
            })
            cy.get('ul.navbar-nav>button').contains('Cart - 1 item(s)').click()

        })


       })

    it("Verify the item in Checkout Page", () => {
        cy.get('h2').contains('Checkout')
        cy.get('table').within(()=>{
            cy.get('thead').children('tr').then(()=>{
                cy.get('th').eq(0).contains("Item")
                cy.get('th').eq(1).contains("Price")
            })
            cy.get('tbody').children('tr').then(()=>{
                cy.get('td').eq(0).should('have.text',item_name)
                cy.get('td').eq(1).should("have.text",item_price)
            })
        })

        cy.get('button[type="submit"]>span').should('have.text', 'Pay with Card').click()
        cy.wait(5000)
        cy.frameLoaded('iframe.stripe_checkout_app').then(() => {
            cy.iframe()
                .find('div.bodyView').should('be.visible').within(() => {
                    
                    cy.get('div.contentView').should('be.visible').within(() => {
                        cy.get('div.image img').should('have.attr', 'src', 'https://stripe.com/img/documentation/checkout/marketplace.png')
                        cy.get('div.title h1').should('have.text', 'Stripe.com')
                        cy.get('div.title h2').should('have.text', 'Example charge')
                    })
                    cy.get('div.paymentView').within(() => {
                        cy.get('div.emailInput>input').type("test@yopmail.com")
                        cy.get('div.cardPaymentView').within(() => {
                            cy.get('div.cardNumberInput>input').type("1234567890123456")
                            cy.get('div.cardExpiresInput>input').type("0312")
                            cy.get('div.cardCVCInput>input').type("616")
                        })
                    })
                     cy.get('#submitButton').contains(`Pay INR ₹${item_price}.00`).click()

                })
        })

    })
})