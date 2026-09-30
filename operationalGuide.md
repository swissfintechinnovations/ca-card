# Operational Guide

- Scope of the Card API | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Scope-of-the-Card-API)
- Central Design Decisions | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Central-Design-Decisions)
- Card API Level 1 | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Card-API-Level-1)
- Card API Level 2 | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Card-API-Level-2)
- Use Case Expense Management (Draft) | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Use-Case-Expense-Management-(Draft))
- Use of this spec | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Use-of-this-spec)
- Appendix | [Card Wiki Page](https://github.com/swissfintechinnovations/ca-card/wiki/Appendix)

# Scope of the Card API

## Card types covered with the Card API

In scope:
* Debit Cards
* Credit Cards
* Prepaid Cards
* Deposit Cards and Loyalty Cards (provision of these cards is at the discretion of the data provider)

Ouf of scope:
* Loyalty Cards with non-Scheme-based payment functionalities

The primary focus for developing the Card API specification was on the Mastercard and Visa schemes. However, the standard is designed to be inclusive of other schemes as well. Feedback that suggests necessary adaptations will be considered and implemented.

## Transaction types covered with the Card API

* All transactions authorized or settled via a payment card (given that the card type is in scope of this API)
* Card account-based transactions (e.g. fees, deposits, bill payments) are only available in Level 2. 
* Only financial transactions are covered (i.e., no PIN changes, balance inquiries, or status checks).

Matching transactions retrieved via Card API with debit card transactions which are accessible on the bank account via the XS2A API is not actively supported.  
The Card API only provides card transactions in Level 2 on the card account as well. Please note that this card account is not equivalent to the bank account. 

The current data model allows only one card account to be linked to a card and the card account will be linked to the main bank account for the card.
ATM Futura transactions which are debited to a different bank account will not be included in the API to maintain consistency between the balance and the sum of transactions.

## Provider and User of the API

### Provider

It refers to the technical provider of the data which can rely on the Card API to allow a user to retrieve such information.  
Any organization capable of implementing API endpoints that comply with the Common API Card API specifications (e.g., providing mandatory fields) can serve as a provider.  
For the Level 2, this means for example that all mandatory fields for a card account and other Level 2 entities must be provided as defined in the standard for credit and debit cards.  
In addition, the provider must be the party that can authenticate the user when a consent for data sharing needs to be confirmed.  
It is expected that most often Card Service Providers will act at least as technical providers of the Card API. It is important to note that the approval of the data owner, i.e., the issuer, is a prerequisite for any party to act as Card API provider.  
The data provider does not aggregate data across issuers. Data users could enable this, if the user grants the necessary consents.

### User

The target user group of the Card API are third parties (e.g. fintechs) who can do business and/or enable new services based on the data retrieved via Card API (depending on the Level 1 or 2 they have been enabled for). Direct usage of the API by end-customers is not foreseen.  
The user journey can be different depending on the requirements for data access defined by the provider and the established connectivity (e.g. via a hub vs. direct).

### Use Cases

Using the Card API for integrating Card Service Providers with distribution partners or issuers is not the main focus, as more detailed information and further enhanced use cases are usually required. 

### Conditions for data access

The contractual and technical requirements for exchanging card data and the allowed uses can be freely agreed upon between Provider and User. The standard does not set any specific rule in this regard. 


# Central Design Decisions

## Level concept

The specification of the Card API is structured in different maturity levels. From an API modelling point of view, a Matryoshka approach is chosen to ensure that different API users with different levels of information availability can still follow as similar an approach as possible. It also enables a more precise definition of the data model for data providers who do not want to offer all entities.

The two levels build on each other. This means that level 1 supports the basic functionality and requires less information for use. Level 2 offers broader functionality with additional endpoints, but also requires more complete data on the person/card/account. As the levels build on each other, it is possible to communicate to lower levels via a proxy that filters the corresponding fields. For example, a data provider can have implemented level 2, while the proxy or end user can only map level 1 information and still receive corresponding level 1 responses.

Parties negotiate among themselves which level of the API should be used; ideally, level 2, the more comprehensive level of the API, is aimed for, as this ensures maximum compatibility.

Please note that the two-tiered approach does not reflect card types, but different use cases as described below.

![API Structure](https://github.com/user-attachments/assets/84f9ed85-4219-44f9-a429-684c567e9b57)

## Name patterns for parameters

### Differentiation between *code / *reference / *id

The parameter names allow an easy recognition of the type of underlying identifier. The three following words are used as part of the parameter names for distinction:

* *Id: technical identifier for an instance of a resource which is always in the UUID format. It is used for direct access to a resource instance in an API endpoint. The UUIDs follow a standardized pattern, are assigned by the data provider and are not guaranteed to be unique across data providers. The method by which a user obtains access to the id can vary depending on the provider (e.g., as part of the consent flow).
* *Reference: functional identifier for an instance of a resource that can also be known by an end cus-tomer, is a generic string without a standardized format 
* *Code: identifier for an instance of a resource, can be mapped to a name in a finite set of values, is a generic string without a standardized format

## Supported character sets
The attributes in the ca-card standard which are defined with a general String datatype, support at least the characters defined in the global SFTI Common API standard.
Please refer to the definition in the Common API wiki: https://github.com/swissfintechinnovations/.github/wiki/Character-Set

API Providers are however free to use additional characters.
API Consumers are advised to use a flexible implementation for handling the additional characters. 


# Card API Level 1

## Model

![Card-API_Level1](https://github.com/swissfintechinnovations/ca-card/assets/141315380/7ec14f1a-7fa8-4cdb-bca2-8f806f0e843c)

### “cards” resource

The term “cards” refers to both physical and virtual credit or debit cards issued by banks or financial institutions.  
Physical cards are the traditional plastic cards that holders carry with them.  
Virtual cards, on the other hand, only exist in digital form and are often used for online payments. These virtual cards have a card number, expiration date and security code like physical cards.

### “card-tokens” resource

The term “card tokens” refers to the DPAN (Digital Primary Account Number) of a credit or debit card that is stored in digital wallets, wearables or with merchants (e.g. for click-to-pay). The “card token” serves as a replacement for the PAN and is used for transactions instead of the real card number. This reduces the risk of data misuse or fraud, as the sensitive card data is not transmitted directly.

### “transactions” resource

The term “transactions” refers to payments made with physical or virtual cards or with card tokens. These transactions are displayed on the cardholder's account and include all authorized and recorded payments entered by the cardholder.  
Transactions can include various types of payments, such as retail purchases, online payments, transfers between accounts, etc.  
Each transaction undergoes authorization and clearing, meaning it has been approved by the cardholder and the payment amount has been debited from the cardholder's account.  
At present, only financially relevant transactions are within scope. Declined authorizations and non-financial authorizations may be included at a later stage if the need arises.

## Use Cases

| Identifier | Description |
| -------- | ------- |
| PFM/BFM | Aggregation of transactions for cards from different issuers to make evaluations on spending behavior, budget, ecological footprint or more.<br>Limitation: Account-based transactions are not taken into account.<br>Challenge with these endpoints: incomplete view of card account transactions. |
| Card overview| Aggregation of cards and associated tokens from different issuers for display.<br>Restriction: Structure of cards in an account or customer relationship is not easily traceable. |

## Remarks

none so far


# Card API Level 2

## Model

<img width="592" height="482" alt="cardInfo model-Level 2-20260513" src="https://github.com/user-attachments/assets/9dca666a-508c-456d-833e-72dd1b1c912e" />

### “cards” resource

The term “cards” refers to both physical and virtual credit or debit cards issued by banks or financial institutions.  
Physical cards are the traditional plastic cards that holders carry with them.  
Virtual cards, on the other hand, only exist in digital form and are often used for online payments. These virtual cards have a card number, expiration date and security code like physical cards.

### “card-tokens” resource

The term “card tokens” refers to the DPAN (Digital Primary Account Number) of a credit or debit card that is stored in digital wallets, wearables or with merchants (e.g. for click-to-pay). The “card token” serves as a replacement for the PAN and is used for transactions instead of the real card number. This reduces the risk of data misuse or fraud, as the sensitive card data is not transmitted directly.

### “transactions” resource

The term “transactions” refers to payments made with physical or virtual cards or with card tokens. These transactions are displayed on the cardholder's account and include all authorized and recorded payments entered by the cardholder.  
Transactions can include various types of payments, such as retail purchases, online payments, transfers between accounts, etc.  
Each transaction undergoes authorization and clearing, meaning it has been approved by the cardholder and the payment amount has been debited from the cardholder's account.  
At present, only financially relevant transactions are within scope. Declined authorizations and non-financial authorizations may be included at a later stage if the need arises.

### “card-accounts” resource

The term “card-accounts” refers to the account on which card-related transactions are recorded, settled and managed. Depending on the card product, this can be a debit or credit account used for billing, balance management and repayment.  
A “card-account” provides the financial context for one or more cards and serves as the basis for statements, balances and other account-related information.

### “person” resource

The term “person” refers to a natural person associated with the card product ecosystem, such as a cardholder, account holder, joint holder or other entitled party. This resource contains the personal master data required to identify and manage that person in relation to cards, card-accounts and contracts.  
A single person may be linked to multiple cards, accounts or contractual relationships.

### “statements” resource

The term “statements” refers to periodic account statements generated for a card-account. These statements summarize financially relevant information for a defined billing period, such as transactions, fees, interest, repayments and balances.  
Statements can be provided in electronic or other formats and may only exist where the corresponding card product supports statement generation.

### “card-contracts” resource

The term “card-contracts” refers to the contractual agreements governing the issuance and use of cards and their related card-accounts. A “card-contract” defines the legal and commercial framework of the product relationship, for example the applicable terms, fees, limits, liability rules and product conditions.  
Depending on the setup, one contract can be associated with multiple card-accounts and card-accountbundles, but only one person.

### “card-accountbundles” resource

The term “card-accountbundles” refers to logical groupings of card-accounts that belong together from a product, contractual or operational perspective.  
This resource can be used to represent bundled account structures, for example where several card-accounts are managed as part of the same product offering or package.  
If supported by the data provider, “card-accountbundles” may also be used to model hierarchical bundle structures.

## Use Cases

| Identifier | Description |
| -------- | ------- |
| PFM/BFM | Everything from level 1, plus consideration of account-based transactions. |
| Card overview | Everything from level 1, plus more extensive information on card account data. |
| Expense Management | Share data with expense management providers including structuring options, i.e. end customers can map internal structures (organizational units) and contracts, for example. |


## Remarks

none so far


# Use Case Expense Management (Draft)

This page describes the view of the ca-card on the expense management use case. It is the most relevant use case that has been requested to be supported in the Card API standard by the community. 
Other use case descriptions could follow in the future, depending on the community need.

The page is currently in ****DRAFT**** status.

## Overview of expense management use case

Expenses incurred by employees in the course of their professional activities should be processed as quickly as possible, as automatically as possible, and with complete documentation. Corporate cards (credit, debit, and prepaid) are now an important instrument for achieving this.

All types of corporate cards are in use today, as they each offer advantages and disadvantages for companies; in other words, all types have their justification.

| Corporate card type | Advantages | Disadvantages |
|---|---|---|
| Credit card | Different cards with different limits possible; large structures for varying needs | A card issuer must be found that provides the required credit |
| Prepaid card | No credit required | The prepaid balance is typically only available to one person; with many users, a large total amount is tied up across multiple accounts |
| Debit card | No credit required; typically multiple cards per account possible | Dedicated account required; typically limited structuring options |


## Challenges in expense management

- **Transaction details:** To categorize and automate expenses efficiently, information such as MCC (Merchant Category Code), card assignment (employee/cost center), and merchant address are essential.
- **Real time:** To collect receipts as efficiently as possible, it is important to prompt employees as close as possible to the time of purchase to document the receipt.
- **Complete account visibility:** From an accounting perspective, it is essential to always have a consistent view of accounts. This requires transparency on fees, incoming payments, and reconciliation of balances.


## Special considerations for expense management with debit cards

In Switzerland, most banks have outsourced the issuing or processing of debit cards. For expense management using debit cards, either the Card API and/or the Account API can be used. Depending on the approach, there are limitations and constraints, as outlined below. Third parties who want to implement expense management need to consider these limitations.

### Card API only

- The issuer or processor usually has no visibility of the underlying account (including fees, incoming payments, or currency conversions). Without full and accurate transaction costs, expense management is effectively not possible.
- The API includes many compromises to account for the lack of account visibility (i.e. non-card transactions on the bank account).
- Real-time capabilities (push) are currently under development (not yet available).

### Account API only

- Transactions come without card-specific details, such as card assignment (employee/cost center) or MCC (Merchant Category Code). Without these details, expense management is effectively not possible.
- Real-time capabilities (push) are currently under development (not yet available).

### Card & Account API

- Two different APIs must be integrated.
- Transactions must be matched, currently likely requiring complex logic (e.g. booking date may differ, amount may differ, description text may differ). The matching logic may even vary by bank.
- Real-time capabilities (push) are currently under development (not yet available).



# Use of this spec

## Basics

For direct communication via the Card API, both parties must negotiate the level of the API used and agree on a level. 

## Direct communication
If only GET requests are used, it is possible that the sender supports a higher level of the API.  In this case, the recipient must ignore additional information in the response.

## Communication via proxy

In practice, communication is often redirected via third parties, so-called proxies. An example of such an implementation would be the bLink platform of SIX. A proxy supports all levels of the API and leaves the selection of the level to the communicating entities. The selection of the level determines the information content of the delivered data.
In this scenario, it is also possible to communicate via different levels:

* Data provider supports higher level<br>In this case, the proxy filters all undefined fields of the level and the TPP receives all data as defined in its level.
* Data provider supports lower level<br>In this case, the proxy fills in the missing fields with dummy data. In this way, the TPP receives a data structure with the expected fields. Caution: This response still only contains the information content of the level supported by the data provider.

![API-Implementation](https://github.com/swissfintechinnovations/ca-card/assets/141315380/3fd7c261-ace3-4ac8-8f96-8b2cbc589329)


# Appendix

## Basic understanding of the card business

This chapter contains a brief description of the most important roles for scheme-based payment cards. More detailed information can be found, for example, in the following source: [https://www.swiss-payment-association.ch/kreditkarten/kreditkartensystem](https://www.swiss-payment-association.ch/kreditkarten/kreditkartensystem)

### Role model for issuing cards

<img src="https://github.com/swissfintechinnovations/ca-card/assets/141315380/7b411dc0-4c93-4007-a3b7-494728d5a7d1" alt="Rollenverständnis im Kartengeschäft" width="auto" height="300">

Depending on the provider, some roles might be covered by the same organization.

### Cardholder

* Uses the payment card as payment instrument.
* Has a contractual relationship with the issuer.

### Distribution Partner

* Is selling cards legally offered by issuers to cardholders by using his own brand.
* Does not directly own the data about payment cards and transactions. But access to these data can be possible based on the contractual setup between issuer and cardholder without an explicit con-sent of the cardholder.
* Can take over some duties and obligations for the card issuing, depending on the contract with the card issuer.

### Card Issuer

* Bank or other organization which is legally issuing a payment card under a certain payment scheme (e.g. Mastercard, Visa, American Express, others) to cardholders. 
* Is responsible that payment cards and the issuer-side processing follow the rules of the payment scheme.
* Manages the payment cards of cardholders, authorizes transactions, and guarantees towards the scheme and acquirer the payment of valid authorizations.
* Is directly the owner of data about payment cards and transactions.
* Card issuers in Switzerland are for example banks, Cembra, Swisscard, Viseca Card Services.

### Card Service Provider

* Is operating the card and transaction processing on behalf of the card issuer. 
* Has a contract with the card issuer. 
* Can cover many parts of scheme and legal regulations as service for the card issuer. 
* Card service providers in Switzerland are for example UBS Card Center, SIX, Viseca Payment Ser-vices.

### Processor

* Provides services for the card service provider related to the card management and transaction processing. 
* Has a contract with the card service provider. 

### Embosser

* Is producing the physical card upon request of the card issuer.
* Has a contract with the card issuer.
